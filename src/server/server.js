/**
 * Created by antoniogiordano on 04/01/17.
 */

'use strict'

import Hapi from 'hapi'
// import HapiLog from './hapi-internal-log.js'
import Joi from 'joi'
import minimist from 'minimist'
import async from 'async'
import Inert from 'inert'
import Vision from 'vision'
import path from 'path'
import config from './server-config.js'

const noop = (err) => {
  if (err) throw err
}

const handleError = (err) => {
  if (err) {
    console.log(err)
    throw err
  }
}

const build = (opts, cb) => {
  console.log(opts)
  const server = new Hapi.Server({
    connections: {
      routes: {
        cors: true,
        files: {
          relativeTo: path.join(__dirname, '../../public')
        }
      }
    }
  })
  cb = cb || noop
  process.env.NODE_ENV = opts.env
  server.connection({
    port: opts.port
  })

  async.series([
    (cb) => {
      // Register inert plugin to handle Static files (./public/*)
      server.register(Inert, (err) => {
        if (err) cb(err)

        server.route({
          method: 'GET',
          path: '/{param*}',
          handler: {
            directory: {
              path: '.',
              redirectToSlash: false,
              index: true
            }
          }
        })
        cb(null, 'inert')
      })
    },
    (cb) => {
      // Register EJS HTML rendering Plugin
      server.register(Vision, (err) => {
        if (err) return cb(err)

        server.views({
          engines: {ejs: require('ejs')},
          relativeTo: __dirname,
          path: '../views'
        })
        cb(null, 'vision')
      })
    }
  ], (err) => {
    if (err) return handleError(err)

    // App API
    server.route(require('../app/routes.js'))

    cb(null, server)
  })

  return server
}

module.exports = build

const start = (opts, cb) => {
  opts.port = config.port(opts.env)
  build(opts, (err, server) => {
    if (err) return cb(err)
    server.start((err) => {
      cb(err, server)
    })
  })
}

module.exports.start = start

if (require.main === module) {
  var opts = minimist(process.argv.slice(2), {
    integer: ['port'],
    alias: {
      port: 'p',
      env: 'e'
    },
    default: {
      env: 'LOCALE'
    }
  })
  Joi.validate(opts, Joi.object().keys({
    env: Joi.string().valid(['LOCALE', 'STAGE', 'TEST_STAGE', 'PRODUCTION']).required()
  }), {
    allowUnknown: true
  }, (err, opts) => {
    if (err) throw err
    start((opts), (err, server) => {
      handleError(err)

      console.log('Server running at:', server.info.uri + ' in ' + opts.env + ' mode')
    })
  })
} else {
  console.log('Running in test mode')
}
