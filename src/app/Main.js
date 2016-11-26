/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import queryString from 'query-string';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Gallery from './Gallery';
import Upload from './Upload';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const floatingStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    let parsed = queryString.parse(location.search);
    this.state = {
      showHeader: parsed.headless ? false : true,
      uploading: false,
      photos: []
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('/api/v1/allphotos').then(req => {
      return req.json();

    }).
    then((photos) => {
      this.setState({photos});
    }).
    catch(e => {
      this.setState({photos: []});
    });
  }

  toggleUpload() {
    this.setState({
      uploading: !this.state.uploading
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        {this.renderHeader()}
        <Gallery photos={this.state.photos} />
        <FloatingActionButton onTouchTap={this.toggleUpload.bind(this)} secondary={true} style={floatingStyle}>
          <ContentAdd/>
        </FloatingActionButton>
        <Upload opened={this.state.uploading} handleClosing={this.toggleUpload.bind(this)} onUploaded={this.fetchData.bind(this)}/>
      </div>
      </MuiThemeProvider>
    );
  }

  renderHeader() {
    if (this.state.showHeader) {
      return (<AppBar
          title="Gallery"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconClassNameLeft="muidocs-icon-navigation-expand-more"/>);
    } else {
      return '';
    }
  }
}

export default Main;
