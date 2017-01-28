import React, { Component } from 'react'

const protectionLevels = require('../shared/protectionLevels').default

class PDFPasswordProperties extends Component {
  render () {
    const { entity, onChange } = this.props
    const pdfPassword = entity.pdfPassword || {}

    const changePDFPassword = (change) => {
      if (change.active === false) {
        change.password = ''
        change.ownerPassword = ''
        change.protectionLevel = -1
      }

      onChange(
        Object.assign(
          {},
          entity,
          { pdfPassword: Object.assign({}, entity.pdfPassword, change) }
        )
      )
    }

    return (
      <div className='properties-section'>
        <div className='form-group'>
          <label>add password to PDF</label>
          <input
            type='checkbox' checked={pdfPassword.active === true}
            onChange={(v) => changePDFPassword({ active: v.target.checked })}
          />
        </div>

        {
          pdfPassword.active && (
            [
              <div key='password-field' className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  placeholder='write a password'
                  value={pdfPassword.password || ''}
                  onChange={(v) => changePDFPassword({ password: v.target.value })}
                />
              </div>,
              <div key='owner-password-field' className='form-group'>
                <label>Owner Password</label>
                <input
                  type='password'
                  placeholder='write a password'
                  value={pdfPassword.ownerPassword || ''}
                  onChange={(v) => changePDFPassword({ ownerPassword: v.target.value })}
                />
              </div>,
              <div key='protection-level-field' className='form-group'>
                <label>Protection Level</label>
                <select
                  value={pdfPassword.protectionLevel || -1}
                  onChange={(v) => changePDFPassword({ protectionLevel: parseInt(v.target.value) })}
                >
                  <option key={-1} value={-1}>None</option>
                  {protectionLevels.map((level) => {
                    return <option key={level.value} value={level.value}>{level.description}</option>
                  })}
                </select>
              </div>
            ]
          )
        }
      </div>
    )
  }
}

export default PDFPasswordProperties
