/**
 * Created by AntonioGiordano on 05/10/16.
 */

const React = require('react')
import {FORM_INPUT_STATES} from '../../../../shared/misc.js'

const Textarea = React.createClass({
  propTypes: {
    fieldId: React.PropTypes.string.isRequired,
    inputName: React.PropTypes.string,
    rows: React.PropTypes.number,
    label: React.PropTypes.string,
    summary: React.PropTypes.string,
    onChange: React.PropTypes.func,
    msgError: React.PropTypes.string,
    status: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    css: React.PropTypes.object
  },
  getDefaultProps () {
    return {
      inputName: null,
      rows: 2,
      label: null,
      summary: null,
      onChange: () => {},
      msgError: null,
      status: FORM_INPUT_STATES.neutral,
      defaultValue: '',
      css: require('./textarea.scss')
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
  onInputChange (e) {
    this.props.onChange(this.props.fieldId, e.target.innerText)
  },
  getOutputClass (css) {
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
  render () {
    var css = this.props.css
    return (
      <div className={css.root}>
        {
          (this.props.summary !== null)
            ? <summary title={this.props.summary}>{this.props.label}</summary>
            : null
        }
        <div className={css.inputContainer}>
          {
            this.props.inputName !== null ?
              <div
                contentEditable
                onInput={this.onInputChange}
                name={this.props.inputName}
                rows={this.props.rows}
                className={css.textarea + ' ' + this.getOutputClass(css)}
              /> :
              <div
                contentEditable
                onInput={this.onInputChange}
                rows={this.props.rows}
                className={css.textarea + ' ' + this.getOutputClass(css)}
              />
          }
          <output className={this.getOutputClass(css)}>
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
        <dialog>{this.props.msgError}</dialog>
      </div>
    )
  }
})

module.exports = Textarea
