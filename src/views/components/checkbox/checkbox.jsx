/**
 * Created by AntonioGiordano on 05/10/16.
 */

import React from 'react'
import {FORM_INPUT_STATES} from '../../../../shared/misc.js'
import css from './checkbox.scss'

const Checkbox = React.createClass({
  propTypes: {
    fieldId: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    inputName: React.PropTypes.string,
    value: React.PropTypes.bool.isRequired,
    label: React.PropTypes.string,
    msgError: React.PropTypes.string,
    status: React.PropTypes.string,
    defaultValue: React.PropTypes.bool,
    css: React.PropTypes.object,
    cssRootClass: React.PropTypes.string
  },
  getDefaultProps () {
    return {
      inputName: null,
      label: null,
      msgError: null,
      status: null,
      value: false,
      defaultValue: null,
      placeholder: ''
    }
  },
  getInitialState () {
    return {
      value: this.props.defaultValue
    }
  },
  componentWillReceiveProps (nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue ) {
      this.setState({
        value: nextProps.defaultValue
      })
    }
  },
  onInputChange (e) {
    this.props.onChange(this.props.fieldId, e.target.checked)
    this.setState({
      value: e.target.checked
    })
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
    return (
      <div className={css.inputTextRoot + ' ' + this.props.cssRootClass}>
        <div className={this.getCss('inputContainer')}>
          <label>
            <input
              checked={this.state.value}
              type='checkbox'
              value='true'
              name={this.props.inputName ? this.props.inputName : undefined}
              onChange={this.onInputChange}
            />
            {
              (this.props.summary !== null)
                ? <summary title={this.props.label}>{this.props.label}</summary>
                : null
            }
          </label>
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

export default Checkbox
