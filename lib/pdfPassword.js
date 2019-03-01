'use strict'

var path = require('path')
var util = require('util')
var fs = require('fs')
var hummus = require('hummus')
var isPDFRecipe = require('../shared/isPDFRecipe').default
var isValidProtectionLevel = require('../shared/isValidProtectionLevel').default

var readFileAsync = util.promisify(fs.readFile)

function PdfPassword (reporter, definition) {
  this.reporter = reporter
  this.definition = definition
  this.tempAutoCleanupDirectory = reporter.options.tempAutoCleanupDirectory

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
  var reporter = this.reporter

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

  if ((password == null || password === '') && (ownerPassword == null || ownerPassword === '')) {
    throw new Error('(jsreport-pdf-password) when password protection is activated on a template you must supply a password or owner password')
  }

  if (password != null && password !== '') {
    passwordProtectionOptions.userPassword = password
  }

  if (protectionLevel != null) {
    if (protectionLevel === -1) {
      throw new Error('(jsreport-pdf-password) You must specify a protection level')
    } else {
      if (ownerPassword == null || ownerPassword === '') {
        throw new Error('(jsreport-pdf-password) in order to use a protection flag you must supply a ownerPassword')
      } else if (isNaN(protectionLevel) || !isValidProtectionLevel(protectionLevel)) {
        throw new Error('(jsreport-pdf-password) invalid value for protection flag')
      }
    }
  }

  if (ownerPassword != null && ownerPassword !== '') {
    if (protectionLevel == null) {
      throw new Error('(jsreport-pdf-password) You must specify a protection level')
    }

    passwordProtectionOptions.ownerPassword = ownerPassword
    passwordProtectionOptions.userProtectionFlag = protectionLevel
  }

  reporter.logger.debug('pdf-password starting to add password to PDF file', request)

  var withPasswordPdfFilename

  return reporter.writeTempFile((uuid) => {
    withPasswordPdfFilename = `${uuid}-with-password.pdf`
    return `${uuid}-without-password.pdf`
  }, response.content).then(function (result) {
    var originalPdfFile = result.pathToFile
    var withPasswordPdfFile = path.join(path.dirname(originalPdfFile), withPasswordPdfFilename)

    hummus.recrypt(originalPdfFile, withPasswordPdfFile, passwordProtectionOptions)

    return readFileAsync(withPasswordPdfFile)
  }).then(function (pdfWithPasswordBuf) {
    reporter.logger.debug('pdf-password finished adding password to PDF file', request)
    response.content = pdfWithPasswordBuf
  })
}

module.exports = function (reporter, definition) {
  reporter.pdfPassword = new PdfPassword(reporter, definition)
}
