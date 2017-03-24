/**
 * Created by AntonioGiordano on 23/03/17.
 */

import React, {PropTypes} from 'react'
import Dropzone from '../components/dropzone/dropzone.js'
import css from './dashboard.scss'

const Dashboard = React.createClass({
  propTypes: {},
  getDefaultProps () {
    return {}
  },
  getInitialState () {
    return {}
  },
  render () {
    return (
      <div className={css.root}>
        <h1>PARSEX</h1>
        <div className={css.box}>
          <Dropzone />
        </div>
      </div>
    )
  }
})

export default Dashboard
