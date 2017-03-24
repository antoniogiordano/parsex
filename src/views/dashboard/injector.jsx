/**
 * Created by AntonioGiordano on 08/07/16.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './dashboard.js'

const props = JSON.parse(document.getElementById('props').innerHTML)
ReactDOM.render(
  <Dashboard {...props} />,
  document.getElementById('main-content-wrapper')
)
