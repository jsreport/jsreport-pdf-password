import Studio from 'jsreport-studio'
import PDFPasswordProperties from './PDFPasswordProperties'

var isPDFRecipe = require('../shared/isPDFRecipe').default

Studio.addPropertiesComponent(
  'pdf-password',
  PDFPasswordProperties,
  (entity) => entity.__entitySet === 'templates' && isPDFRecipe(entity.recipe)
)

Studio.addApiSpec({
  template: {
    pdfPassword: {
      active: true,
      password: '...',
      ownerPassword: '...',
      protectionLevel: 5
    }
  }
})
