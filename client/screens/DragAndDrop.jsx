import React, { Component } from 'react'
import xhrCheck from '../util/xmlCheck'
import filePreview from '../util/filePreview'
import '../styles/_dragAndDrop.scss'
class DragAndDrop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xhrAvailable: false,
      files: [],
      filePrev: []
    }
  }

  componentDidMount(){
    this.checkXML()
  }

  checkXML = () => {
    const xhrAvailable = xhrCheck()
    this.setState({xhrAvailable})
  }

  handleUpload = e => {
    // e.target.files is for the actual browse button
    // e.dataTransfer is for the drag and drop option
    let files = e.target.files || e.dataTransfer.files
    files = Array.from(files)
    const fileURLS = files.map(file => this.processFiles(file))
    files = [...this.state.files, ...files]
    this.setState({files})
  }

  processFiles = file => {
    const reader = new FileReader()
    const fileProps = file.type.split('/')
    reader.fileType = fileProps[0]
    reader.fileFormat = fileProps[1]
    reader.fileName = file.name

    reader.onload = (event) => {
      const { fileType } = event.target
      this.setState({filePrev: [...this.state.filePrev, filePreview[fileType](event.target)]})
    }

    reader.fileType === 'text' && reader.fileFormat === 'plain'
    ? reader.readAsText(file)
    : reader.readAsDataURL(file)
  }

  handleDragOver = e => {
    e.stopPropagation()
    e.preventDefault()

    e.target.className = e.type === 'dragover'
      ? 'hover'
      : ''
  }

  handleDragLeave = e => {
    e.stopPropagation()
    e.preventDefault()

    this.handleDragOver(e)
  }

  handleDrop = e => {
    e.stopPropagation()
    e.preventDefault()
    this.handleDragOver(e)
    this.handleUpload(e)
  }

  render() {
    const { xhrAvailable, files } = this.state
    return (
      <div>
        <form id="upload">
          <fieldset>
            <input type="hidden" id="MAX_FILE_SIZE" name="MAX_FILE_SIZE" value="300000" />
              <div>
                <label>Files to Upload:</label>
                <button onClick={(e) => {e.preventDefault(); this.setState({files: []})}}> Clear </button>
                <input type="file" id="fileselect" name="fileselect[]"  onChange={this.handleUpload} />
                  <div
                    id="filedrag"
                    onDragOver={this.handleDragOver}
                    onDragLeave={this.handleDragLeave}
                    onDrop={this.handleDrop}
                    style={ !xhrAvailable ? {display: 'none'} : {display: 'block'}  }
                  >
                  Or drop files here
                  </div>
                  {
                    !xhrAvailable &&
                    <div id="submissionbutton">
                      <button type="submit">Upload Files</button>
                    </div>
                  }
              </div>
          </fieldset>
        </form>
        <div id="images">
          {
            this.state.filePrev
          }
        </div>
        <div id="message">
          {
            files.map((file, i) => (
              <p key={i}>
                FileInformation <br />
                <strong>{file.name}</strong> <br />
                type: <strong>{file.type}</strong> <br />
                size: <strong>{file.size}</strong> bytes
              </p>
            ))
          }
          <p>Status Messages</p>
        </div>
      </div>
    )
  }
}

export default DragAndDrop
