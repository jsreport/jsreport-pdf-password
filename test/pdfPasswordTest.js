var path = require('path')
var fs = require('fs')
var should = require('should')
var hummus = require('hummus')
var Reporter = require('jsreport-core')

var tempDirectory = path.join(__dirname, '/temp')
var pdfRecipesToTest = ['phantom-pdf', 'electron-pdf']

describe('pdf password', function () {
  var reporter

  beforeEach(function () {
    reporter = new Reporter({
      rootDirectory: path.join(__dirname, '../'),
      tempDirectory: tempDirectory
    })

    reporter.use(require('jsreport-templates')())
    reporter.use(require('jsreport-phantom-pdf')())
    reporter.use(require('../')())

    return reporter.init()
  })

  it('should not fail when rendering and extension is inactive', function () {
    var request = {
      template: {
        content: 'Test',
        recipe: 'phantom-pdf',
        engine: 'none',
        pdfPassword: {
          active: false
        }
      }
    }

    return reporter.render(request, {}).then(function (response) {
      should(response.content.toString()).containEql('%PDF')
    })
  })

  it('should fail when rendering and password option is not specified', function (done) {
    var request = {
      template: {
        content: 'Test',
        recipe: 'phantom-pdf',
        engine: 'none',
        pdfPassword: {
          active: true
        }
      }
    }

    reporter.render(request, {}).then(function () {
      done(new Error('render should have thrown an error'))
    }).catch(function (err) {
      if (err) {
        done()
      }
    })
  })

  it('should fail when rendering and trying to use a protection level with no owner password', function (done) {
    var request = {
      template: {
        content: 'Test',
        recipe: 'phantom-pdf',
        engine: 'none',
        pdfPassword: {
          active: true,
          password: '1234',
          protectionLevel: 4
        }
      }
    }

    reporter.render(request, {}).then(function () {
      done(new Error('render should have thrown an error'))
    }).catch(function (err) {
      if (err) {
        done()
      }
    })
  })

  it('should fail when rendering and trying to use an invalid protection level', function (done) {
    var request = {
      template: {
        content: 'Test',
        recipe: 'phantom-pdf',
        engine: 'none',
        pdfPassword: {
          active: true,
          password: '1234',
          ownerPassword: '123456',
          protectionLevel: 'some level'
        }
      }
    }

    reporter.render(request, {}).then(function () {
      done(new Error('render should have thrown an error'))
    }).catch(function (err) {
      if (err) {
        done()
      }
    })
  })
})

pdfRecipesToTest.forEach(function (recipe) {
  describe('pdf password with ' + recipe + ' recipe', function () {
    var reporter

    beforeEach(function () {
      reporter = new Reporter({
        rootDirectory: path.join(__dirname, '../'),
        tempDirectory: tempDirectory
      })

      reporter.use(require('jsreport-templates')())
      reporter.use(require('jsreport-phantom-pdf')())
      reporter.use(require('jsreport-electron-pdf')())
      reporter.use(require('../')())

      return reporter.init()
    })

    it('should render', function () {
      var request = {
        template: {
          content: 'Test',
          recipe: recipe,
          engine: 'none',
          pdfPassword: {
            active: true,
            password: '1234'
          }
        }
      }

      return reporter.render(request, {}).then(function (response) {
        should(response.content.toString()).containEql('%PDF')
      })
    })

    it('should render a pdf with password', function () {
      var request = {
        template: {
          content: 'Test',
          recipe: recipe,
          engine: 'none',
          pdfPassword: {
            active: true,
            password: '1234'
          }
        }
      }

      return reporter.render(request, {}).then(function (response) {
        var pdfName = path.join(tempDirectory, 'pdf-with-password-source-' + recipe + '.pdf')
        var pdfReader

        fs.writeFileSync(pdfName, response.content)
        pdfReader = hummus.createReader(pdfName, { password: '1234' })

        should(pdfReader.getPagesCount()).be.eql(1)
        should(pdfReader.isEncrypted()).be.eql(true)
      })
    })
  })
})
