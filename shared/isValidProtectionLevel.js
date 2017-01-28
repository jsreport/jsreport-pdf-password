var protectionLevels = require('./protectionLevels').default

function isValidProtectionLevel (protectionLevel) {
  return protectionLevels.some(function (level) {
    return protectionLevel === level.value
  })
}

module.exports.default = isValidProtectionLevel
