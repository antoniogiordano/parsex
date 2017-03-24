/**
 * Created by AntonioGiordano on 17/06/16.
 */

import React, { PropTypes } from 'react'
import css from './button.scss'

const Button = React.createClass({
  propTypes: {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    style: PropTypes.object,
    css: PropTypes.object,
    cssRootClass: PropTypes.string
  },
  getDefaultProps () {
    return {
      onClick: () => null,
      disabled: false,
      loading: false,
      title: '',
      style: {},
      css: null,
      cssRootClass: ''
    }
  },
  getCss (className) {
    if (this.props.css && this.props.css[className]) return css[className] + ' ' + this.props.css[className]
    return css[className]
  },
  onClick () {
    if (!this.props.disabled) this.props.onClick()
  },
  render () {
    return (
      <button
        title={this.props.title}
        onClick={this.onClick}
        className={css.buttonRoot + ' ' + this.props.cssRootClass + (this.props.disabled ? ' ' + this.getCss('disabled') : '')}
        style={this.props.style}>
        {
          this.props.children
        }
        {
          this.props.loading
            ? <i className={`material-icons ${css.loading}`}>cached</i>
            : null
        }
      </button>
    )
  }
})

export default Button