/**
 * Created by AntonioGiordano on 17/06/16.
 */

import Log from '../app/Log/Log.js'

var db

const log = (realm, result, message, params) => {
  switch (process.env.NODE_ENV) {
    case 'PRODUCTION':
      console.log(realm + ' | ' + result + ' - ' + message)
      var log = new Log({
        realm, result, message, params
      })
      log.save(db, () => null)
      break
    default:
      console.log(realm + ' | ' + result + ' - ' + message)
      var l = new Log({
        realm, result, message, params
      })
      l.save(db, () => null)
      break
  }
}

exports.register = (server, options, next) => {
  db = server.plugins['hapi-mongodb'].db

  const expose = {
    log: log
  }

  if (options.decorate) {
    server.decorate('server', 'hapi-log', expose)
    server.decorate('request', 'hapi-log', expose)
  } else {
    Object.keys(expose).forEach((key) => {
      server.expose(key, expose[key])
    })
  }

  next()
}

exports.register.attributes = {
  name: 'hapi-log',
  version: '0.0.1'
}
