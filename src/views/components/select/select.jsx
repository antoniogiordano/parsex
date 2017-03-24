/**
 * Created by AntonioGiordano on 05/10/16.
 */

import React, {PropTypes} from 'react'
import {FORM_INPUT_STATES} from '../../../../shared/misc.js'
import css from './select.scss'

const Select = React.createClass({
  propTypes: {
    fieldId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    defaultValue: PropTypes.any,
    inputName: PropTypes.string,
    label: PropTypes.string,
    summary: PropTypes.string,
    msgError: PropTypes.string,
    status: PropTypes.string,
    placeholder: PropTypes.string,
    css: PropTypes.object,
    cssRootClass: PropTypes.string
  },
  getDefaultProps () {
    return {
      inputType: 'text',
      inputName: null,
      defaultValue: null,
      label: null,
      summary: null,
      onChange: () => {},
      msgError: null,
      status: null,
      placeholder: '',
      css: null,
      cssRootClass: null
    }
  },
  getInitialState () {
    return {
      value: this.props.defaultValue || '__NULL__'
    }
  },
  componentWillReceiveProps (nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue) {
      this.setState({
        value: nextProps.defaultValue || '__NULL__'
      })
    }
  },
  onInputChange (e) {
    this.props.onChange(this.props.fieldId, e.target.value)
  },
  getOutputClass () {
    switch (this.props.status) {
      case FORM_INPUT_STATES.success:
        return 'success'
      case FORM_INPUT_STATES.neutral:
        return 'neutral'
      case FORM_INPUT_STATES.error:
        return 'error'
      default:
        return ''
    }
  },
  getCss (className) {
    if (this.props.css && this.props.css[className]) return css[className] + ' ' + this.props.css[className]
    return css[className]
  },
  render () {
    return (
      <div className={css.root + ' ' + this.props.cssRootClass}>
        {
          (this.props.label !== null)
            ? <summary title={this.props.label}>{this.props.label}</summary>
            : null
        }
        <div className={this.getCss('inputContainer')}>
          <select value={this.state.value} className={this.getCss(this.getOutputClass())} onChange={this.onInputChange}>
            {
              Object.keys(this.props.options).map((optionKey) => {
                return (
                  <option key={optionKey} value={optionKey}>
                    {
                      this.props.options[optionKey]
                    }
                  </option>
                )
              })
            }
            <option value='__NULL__'></option>
          </select>
          <output className={this.getCss(this.getOutputClass())}>
            {
              (this.props.status === FORM_INPUT_STATES.success)
                ? <i className='material-icons'>done</i>
                : null
            }
            {
              (this.props.status === FORM_INPUT_STATES.neutral)
                ? <i className='material-icons'>warning</i>
                : null
            }
            {
              (this.props.status === FORM_INPUT_STATES.error)
                ? <i className='material-icons'>clear</i>
                : null
            }
          </output>
        </div>
        <dialog>
          <span>{this.props.msgError}</span>
        </dialog>
      </div>
    )
  }
})

export default Select