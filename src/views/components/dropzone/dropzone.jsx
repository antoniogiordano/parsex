/**
 * Created by antoniogiordano on 02/02/17.
 */

import React, {PropTypes} from 'react'
import _ from 'lodash'
import axios from 'axios'
import Button from '../button/button.js'
import Icon from '../icon/icon.js'
import Progress from 'react-progressbar'
import css from './dropzone.scss'

const DropZone = React.createClass({
  propTypes: {
    onDrop: PropTypes.func.isRequired,
    postUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    allowMultipleFiles: PropTypes.bool,
    translate: PropTypes.object,
    lang: PropTypes.string,
    css: React.PropTypes.object,
    cssRootClass: React.PropTypes.string
  },
  getDefaultProps () {
    return {
      allowMultipleFiles: false,
      translate: {get: (lang, text) => text},
      lang: 'en_US'
    }
  },
  getInitialState () {
    return {
      isDragActive: false,
      uploadingFiles: []
    }
  },
  uploadingFilesCompare (a, b) {
    if (a.progress < b.progress) {
      return 1
    }
    if (a.progress > b.progress) {
      return -1
    }
    return 0
  },
  onDragLeave (e) {
    this.setState({
      isDragActive: false
    })
  },
  onDragOver (e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'

    this.setState({
      isDragActive: true
    })
  },
  onDrop (e) {
    const {translate, lang} = this.props
    e.preventDefault()

    this.setState({
      isDragActive: false
    })

    var files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }

    if (!this.props.allowMultipleFiles && files.length > 1) {
      swal({
        title: translate.get(lang, 'Error'),
        text: translate.get(lang, 'Multiple files upload is not allowed'),
        type: 'warning'
      })
    } else {
      this.setState({
        uploadingFiles: []
      })
      _.each(files, this.uploadFile)
    }
  },
  onClick () {
    this.refs.fileInput.click()
  },
  uploadFile (file) {
    const {translate, lang} = this.props
    var dropMan = this
    var uploadedFile = {
      name: file.name,
      onUpload: (err, response) => {
        if (err) {
          swal({
            type: 'error',
            title: translate.get(lang, 'Error'),
            text: err.message
          })
        } else {
          if (response.data.result === 1) {
            dropMan.props.onDrop(dropMan.props.name, response.data)
          }
        }
        _.remove(dropMan.state.uploadingFiles, (upFile) => {
          return upFile.id === uploadedFile.id
        })
        dropMan.setState({
          uploadingFiles: dropMan.state.uploadingFiles.sort(dropMan.uploadingFilesCompare)
        })
      },
      progress: 0,
      id: Math.random().toString()
    }
    this.state.uploadingFiles.push(uploadedFile)
    this.setState({
      uploadingFiles: this.state.uploadingFiles.sort(this.uploadingFilesCompare)
    })

    var fd = new window.FormData()
    fd.append('file', file)
    axios.put(this.props.postUrl, fd, {
      withCredentials: true,
      onUploadProgress: (progressEvent) => {
        var percentComplete = progressEvent.loaded / progressEvent.total
        uploadedFile.progress = parseInt(percentComplete * 100, 10)
        dropMan.setState({
          uploadingFiles: dropMan.state.uploadingFiles.sort(dropMan.uploadingFilesCompare)
        })
      }
    })
      .then((res) => {uploadedFile.onUpload(null, res)})
      .catch(uploadedFile.onUpload)
  },
  containerClass () {
    let className = `${css.root} ${this.props.cssRootClass}`
    return this.state.isDragActive ? `${className} ${this.getCss('light')}` : `${className} ${this.getCss('dark')}`
  },
  getCss (className) {
    if (this.props.css && this.props.css[className]) return `${css[className]} ${this.props.css[className]}`
    return css[className]
  },
  render () {
    const {translate, lang} = this.props
    const {uploadingFiles} = this.state
    return (
      <div className={this.containerClass()} onDragLeave={this.onDragLeave} onDragOver={this.onDragOver} onDrop={this.onDrop}>
        <span>{translate.get(lang, 'Drop here')}</span>
        <span>{translate.get(lang, 'or')}</span>
        <Button
          onClick={this.onClick}
          loading={uploadingFiles.length > 0}
          disabled={uploadingFiles.length > 0}
        >
          <span>{translate.get(lang, 'Select')}</span>
          <Icon>file_upload</Icon>
        </Button>
        <input type='file' multiple ref='fileInput' onChange={this.onDrop} />
        {
          this.state.uploadingFiles.map((uploadedFile) => {
            return (
              <div key={uploadedFile.name} className={this.getCss('progressContainer')}>
                <p>{uploadedFile.name}</p>
                <p>{`${uploadedFile.progress.toFixed(1)} %`}</p>
                <Progress completed={uploadedFile.progress} color='#379ACE' />
              </div>
            )
          })
        }
      </div>
    )
  }
})

export default DropZone
