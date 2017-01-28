var PDF_RECIPE_REG_EXP = /pdf/

function isPDFRecipe (recipeName) {
  return PDF_RECIPE_REG_EXP.test(recipeName)
}

module.exports.default = isPDFRecipe
