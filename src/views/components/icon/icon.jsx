/**
 * Created by AntonioGiordano on 17/06/16.
 */

import React, { PropTypes } from 'react'
import css from './icon.scss'

const TYPES = {
  MATERIAL_ICON: 'material-icon'
}

export { TYPES }

const Icon = React.createClass({
  propTypes: {
    type: PropTypes.string,
    style: PropTypes.object,
    css: PropTypes.object,
    cssRootClass: PropTypes.string
  },
  getDefaultProps () {
    return {
      type: TYPES.MATERIAL_ICON,
      style: {},
      css: null,
      cssRootClass: ''
    }
  },
  getCss (className) {
    if (this.props.css && this.props.css[className]) return css[className] + ' ' + this.props.css[className]
    return css[className]
  },
  render () {
    switch (this.props.type) {
      case TYPES.MATERIAL_ICON:
        return <i
          className={`material-icons ${css.iconRoot} ${this.props.cssRootClass}`}
          style={this.props.style}>
          {this.props.children}
        </i>
    }
  }
})

export default Icon
