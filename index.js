var assign = require('object-assign')
var main = require('./lib/pdfPassword')
var config = require('./jsreport.config')

module.exports = function (options) {
  var newConfig = assign({}, config)

  newConfig.options = options
  newConfig.main = main
  newConfig.directory = __dirname

  return newConfig
}
