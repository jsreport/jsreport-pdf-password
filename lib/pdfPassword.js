'use strict'

var path = require('path')
var fs = require('fs')
var Promise = require('bluebird')
var uuid = require('uuid').v1
var hummus = require('hummus')
var isPDFRecipe = require('../shared/isPDFRecipe').default
var isValidProtectionLevel = require('../shared/isValidProtectionLevel').default

var readFileAsync = Promise.promisify(fs.readFile)
var writeFileAsync = Promise.promisify(fs.writeFile)

var DEFAULT_PROTECTION_LEVEL = 5

function PdfPassword (reporter, definition) {
  this.reporter = reporter
  this.definition = definition
  this.tempDirectory = reporter.options.tempDirectory

  var self = this

  reporter.documentStore.registerComplexType('PdfPasswordType', {
    active: { type: 'Edm.Boolean' },
    password: { type: 'Edm.String' },
    ownerPassword: { type: 'Edm.String' },
    protectionLevel: { type: 'Edm.Int32' }
  })

  if (reporter.documentStore.model.entityTypes.TemplateType) {
    reporter.documentStore.model.entityTypes.TemplateType.pdfPassword = {
      type: 'jsreport.PdfPasswordType'
    }
  }

  reporter.afterRenderListeners.add(definition.name, this, function (request, response) {
    return self.addPassword(request, response)
  })
}

PdfPassword.prototype.addPassword = function (request, response) {
  if (!isPDFRecipe(request.template.recipe)) {
    return
  }

  var pdfPasswordOptions = request.template.pdfPassword || {}
  var isActive = (pdfPasswordOptions.active === true || pdfPasswordOptions.active === 'true')
  var password = pdfPasswordOptions.password
  var ownerPassword = pdfPasswordOptions.ownerPassword
  var protectionLevel = pdfPasswordOptions.protectionLevel
  var passwordProtectionOptions = {}

  if (!isActive) {
    return
  }

  if (password == null || password === '') {
    throw new Error('(jsreport-pdf-password) when password protection is activated on a template you must supply a password')
  }

  passwordProtectionOptions.userPassword = password

  if (protectionLevel != null) {
    protectionLevel = parseInt(protectionLevel, 10)

    if (protectionLevel === -1) {
      protectionLevel = DEFAULT_PROTECTION_LEVEL
    } else {
      if (ownerPassword == null || ownerPassword === '') {
        throw new Error('(jsreport-pdf-password) in order to use a protection flag you must supply a ownerPassword')
      } else if (isNaN(protectionLevel) || !isValidProtectionLevel(protectionLevel)) {
        throw new Error('(jsreport-pdf-password) invalid value for protection flag')
      }
    }
  } else {
    protectionLevel = DEFAULT_PROTECTION_LEVEL
  }

  if (ownerPassword != null && ownerPassword !== '') {
    passwordProtectionOptions.ownerPassword = ownerPassword
    passwordProtectionOptions.userProtectionFlag = protectionLevel
  }

  request.logger.debug('pdf-password starting to add password to PDF file')

  var id = uuid()
  var originalPdfFile = path.join(this.tempDirectory, id + '-without-password.pdf')
  var withPasswordPdfFile = path.join(this.tempDirectory, id + '-with-password.pdf')

  return writeFileAsync(originalPdfFile, response.content).then(function () {
    hummus.recrypt(originalPdfFile, withPasswordPdfFile, passwordProtectionOptions)

    return readFileAsync(withPasswordPdfFile)
  }).then(function (pdfWithPasswordBuf) {
    request.logger.debug('pdf-password finished adding password to PDF file')
    response.content = pdfWithPasswordBuf
  })
}

module.exports = function (reporter, definition) {
  reporter.pdfPassword = new PdfPassword(reporter, definition)
}
