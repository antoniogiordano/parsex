'use strict'

const versiony = require('auto-versiony')
const fs = require('fs')

if (!fs.existsSync('src/server/bundles-version.json')) {
  fs.writeFileSync('src/server/bundles-version.json', '{"version": "0.17.55"}')
}

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-develop')
  grunt.loadNpmTasks('grunt-contrib-compress')

  grunt.initConfig({
    watch: {
      ejs: {
        files: 'src/**/**',
        filter: function (filepath) {
          return (filepath.substr(filepath.length - 3) === 'ejs' || filepath.substr(filepath.length - 3) === 'css' || filepath.substr(filepath.length - 4) === 'scss' || filepath.substr(filepath.length - 4) === 'less')
        },
        tasks: ['copy:ejs'],
        options: {
          spawn: true,
          events: 'all'
        }
      },
      bundles: {
        files: 'public/js/bundles/**',
        tasks: ['upgradeBundleVersion', 'copy:versiony'],
        options: {
          spawn: false,
          events: 'all'
        }
      },
      serverFiles: {
        files: [
          'lib/**/**'
        ],
        tasks: ['develop'],
        options: {nospawn: true}
      }
    },
    copy: {
      ejs: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: '**',
            dest: 'lib/',
            filter: function (filepath) {
              return (filepath.substr(filepath.length - 3) === 'ejs' || filepath.substr(filepath.length - 3) === 'css' || filepath.substr(filepath.length - 4) === 'scss' || filepath.substr(filepath.length - 4) === 'less')
            }
          }
        ]
      },
      versiony: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: '**/*.json',
            dest: 'lib/'
          }
        ]
      }
    },
    develop: {
      server: {
        file: 'lib/server/server.js',
        args: ['--e=LOCALE']
      }
    },
    compress: {
      main: {
        options: {
          archive: 'aws-build/admin.' + versiony
            .from('./release-version.json')
            .patch()
            .maxPatch(99)
            .maxMinor(99)
            .to('./release-version.json')
            .end().version + '.zip'
        },
        files: [
          {src: ['.ebextensions/**', 'lib/**', 'protected/**', 'public/**', 'package.json'], dest: './'}
        ]
      }
    }
  })

  grunt.registerTask('upgradeBundleVersion', 'Upgrade the bundle version at every webpack bundles', function () {
    grunt.log.writeln('Upgrading bundles version...')
    versiony
      .from('src/server/bundles-version.json')
      .patch()
      .maxPatch(99)
      .maxMinor(99)
      .to('src/server/bundles-version.json')
      .end()
    grunt.log.writeln('Upgraded!')
  })

  grunt.registerTask('default', [
    'copy',
    'watch',
    'develop'
  ])

  grunt.registerTask('deploy', ['compress'])
}
