/**
 * Created by AntonioGiordano on 05/10/16.
 */

import React from 'react'
import {FORM_INPUT_STATES} from '../../../../shared/misc.js'
import css from './radio-group.scss'

const RadioGroup = React.createClass({
  propTypes: {
    fieldId: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    inputName: React.PropTypes.string.isRequired,
    values: React.PropTypes.array.isRequired,
    label: React.PropTypes.string,
    msgError: React.PropTypes.string,
    status: React.PropTypes.string,
    defaultValue: React.PropTypes.any,
    css: React.PropTypes.object,
    cssRootClass: React.PropTypes.string
  },
  getDefaultProps () {
    return {
      inputName: null,
      label: null,
      msgError: null,
      status: null,
      values: [],
      defaultValue: null,
      placeholder: ''
    }
  },
  getInitialState () {
    return {
      selectedValue: this.props.defaultValue
    }
  },
  componentWillReceiveProps (nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue && this.state.selectedValue !== nextProps.defaultValue) {
      this.setState({
        selectedValue: nextProps.defaultValue
      })
    }
  },
  onInputChange (e) {
    this.props.onChange(this.props.fieldId, e.target.value)
    this.setState({
      selectedValue: e.target.value
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
        {
          (this.props.summary !== null)
            ? <summary title={this.props.label}>{this.props.label}</summary>
            : null
        }
        <div className={this.getCss('inputContainer')}>
          {
            this.props.values.map((item) => {
              return (
                <label key={item.key}>
                  <input
                    checked={this.state.selectedValue === item.key}
                    type='radio'
                    ref={item.key}
                    value={item.key}
                    name={this.props.inputName ? this.props.inputName : undefined}
                    onChange={this.onInputChange}
                  />
                  <span>{item.value}</span>
                </label>
              )
            })
          }
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

module.exports = RadioGroup
