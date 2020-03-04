import React, { Component } from 'react'

const protectionLevels = require('../shared/protectionLevels').default

class PDFPasswordProperties extends Component {
  render () {
    const { entity, onChange } = this.props
    const pdfPassword = entity.pdfPassword || {}

    const changePDFPassword = (change) => {
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
        <div key='password-field' className='form-group'>
          <label>Password</label>
          <input
            type='password'
            autoComplete='off'
            placeholder='write a password'
            value={pdfPassword.password || ''}
            onChange={(v) => changePDFPassword({ password: v.target.value })}
          />
        </div>,
        <div key='owner-password-field' className='form-group'>
          <label>Owner Password</label>
          <input
            type='password'
            autoComplete='off'
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
      </div>
    )
  }
}

export default PDFPasswordProperties
