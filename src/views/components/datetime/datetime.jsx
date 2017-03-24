/**
 * Created by AntonioGiordano on 05/10/16.
 */

const React = require('react')
const DateTime = require('react-datetime')
import {FORM_INPUT_STATES} from '../../../../shared/misc.js'

const DateTimeInput = React.createClass({
  propTypes: {
    fieldId: React.PropTypes.string.isRequired,
    inputName: React.PropTypes.string,
    label: React.PropTypes.string,
    summary: React.PropTypes.string,
    onChange: React.PropTypes.func,
    msgError: React.PropTypes.string,
    status: React.PropTypes.string,
    defaultValue: React.PropTypes.object,
    css: React.PropTypes.object
  },
  getDefaultProps () {
    return {
      inputName: null,
      label: null,
      summary: null,
      onChange: () => {},
      msgError: null,
      status: FORM_INPUT_STATES.neutral,
      defaultValue: '',
      css: require('./datetime.scss')
    }
  },
  getInitialState () {
    return {
      value: this.props.defaultValue
    }
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.defaultValue !== null) {
      this.setState({
        value: nextProps.defaultValue
      })
    }
  },
  __getOutputClass (css) {
    switch (this.props.status) {
      case FORM_INPUT_STATES.success:
        return css.success
      case FORM_INPUT_STATES.neutral:
        return css.neutral
      case FORM_INPUT_STATES.error:
        return css.error
      default:
        return ''
    }
  },
  __onDateTimeChanged (value) {
    this.setState({
      value: value
    })
    this.props.onChange(this.props.fieldId, value)
  },
  render () {
    var css = this.props.css
    return (
      <div className={css.root}>
        {
          (this.props.label !== null)
            ? <label>{this.props.label}</label>
            : null
        }
        {
          (this.props.summary !== null)
            ? <summary title={this.props.summary}>{this.props.summary}</summary>
            : null
        }
        <div className={css.inputContainer}>
          <DateTime onChange={this.__onDateTimeChanged} defaultValue={this.state.value} />
          <output className={this.__getOutputClass(css)}>
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
        {
          (this.props.status === FORM_INPUT_STATES.error && this.props.msgError !== null)
            ? <dialog className='open-dialog error'>{this.props.msgError}</dialog>
            : null
        }
      </div>
    )
  }
})

module.exports = DateTimeInput
