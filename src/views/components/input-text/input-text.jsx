/**
 * Created by AntonioGiordano on 05/10/16.
 */

import React from 'react'
import {FORM_INPUT_STATES} from '../../../../shared/misc.js'
import css from './input-text.scss'

const InputText = React.createClass({
  propTypes: {
    fieldId: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    inputType: React.PropTypes.string,
    inputName: React.PropTypes.string,
    label: React.PropTypes.string,
    msgError: React.PropTypes.string,
    status: React.PropTypes.string,
    defaultValue: React.PropTypes.any,
    placeholder: React.PropTypes.string,
    isVisible: React.PropTypes.bool,
    css: React.PropTypes.object,
    cssRootClass: React.PropTypes.string
  },
  getDefaultProps () {
    return {
      inputType: 'text',
      inputName: null,
      label: null,
      msgError: null,
      status: null,
      defaultValue: '',
      placeholder: '',
      isVisible: true
    }
  },
  componentDidMount () {
    if (this.refs.input) {
      this.refs.input.value = this.props.defaultValue
    }
  },
  componentWillReceiveProps (nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue && this.refs.input && this.refs.input.value !== nextProps.defaultValue) {
      this.refs.input.value = nextProps.defaultValue
    }
  },
  componentDidUpdate(prevProps) {
    if (this.props.isVisible && !prevProps.isVisible && this.refs.input) {
      this.refs.input.value = this.props.defaultValue
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
      case FORM_INPUT_STATES.loading:
        return 'loading'
      default:
        return ''
    }
  },
  getCss (className) {
    if (this.props.css && this.props.css[className]) return css[className] + ' ' + this.props.css[className]
    return css[className]
  },
  renderOutputIcon () {
    switch (this.props.status) {
      case FORM_INPUT_STATES.success:
        return <i className='material-icons'>done</i>
      case FORM_INPUT_STATES.neutral:
        return <i className='material-icons'>warning</i>
      case FORM_INPUT_STATES.error:
        return <i className='material-icons'>clear</i>
      case FORM_INPUT_STATES.loading:
        return <i className='material-icons'>cached</i>
      default:
        return null
    }
  },
  render () {
    if (!this.props.isVisible) return null
    return (
      <div className={css.inputTextRoot + ' ' + this.props.cssRootClass}>
        {
          (this.props.summary !== null)
            ? <summary title={this.props.label}>{this.props.label}</summary>
            : null
        }
        <div className={this.getCss('inputContainer')}>
          <input
            ref='input'
            onChange={this.onInputChange}
            type={this.props.inputType}
            name={this.props.inputName ? this.props.inputName : undefined}
            placeholder={this.props.placeholder}
            className={this.getCss(this.getOutputClass())}
          />
          <output className={this.getCss(this.getOutputClass())}>
            {
              this.renderOutputIcon()
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

module.exports = InputText
