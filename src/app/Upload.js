import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Upload extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fileSelected: false,
      fileName: '',
      file: null
    }
  }

  _handleChange(e){
    this.setState({
      fileName: e.target.value,
      fileSelected: true,
      file: e.target
    });
  }

  _openFileDialog(){
    this.fileUpload.click();
  }

  _handleSubmit(){
    var blobFile = this.state.file.files[0];
    var formData = new FormData();
    formData.append('image', blobFile);

    var myHeaders = new Headers({
      "Content-Type": "application/json",
    });

    return fetch('/api/v1/upload', {
        method: 'POST',
        headers: myHeaders
      }
    ).
      then(() => {
        var bc = new BroadcastChannel("upload");
        bc.postMessage(blobFile);
        // The fake post returns inmediatelly, wait till the
        // new response is cached
        setTimeout(() => {
          this.props.onUploaded();
          this.props.handleClosing();
        }, 1000);
      }).
      catch((e) => {
        alert('Error uploading file: ' + e);
      });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleClosing}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={!this.state.fileSelected}
        onTouchTap={this._handleSubmit.bind(this)}
      />,
    ];
    return (
      <Dialog
          title="Upload new photo"
          actions={actions}
          modal={true}
          open={this.props.opened}
        >
          <TextField
            hintText="Select image to upload"
            onClick={this._openFileDialog.bind(this)}
            value={this.state.fileName}
          />
          <input
            ref={(fileUpload) => { this.fileUpload = fileUpload; }}
            type="file" 
            style={{"display" : "none"}}
            onChange={this._handleChange.bind(this)}
            accept="image/*"/>
        </Dialog>
    );
  }

}

export default Upload;
