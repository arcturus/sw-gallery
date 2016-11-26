/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start'
  }
}

class Gallery extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <ImageGallery
        ref={i => this._imageGallery = i}
        items={this.props.photos}
        slideInterval={2000}
        />
    );
  }

}

export default Gallery;
