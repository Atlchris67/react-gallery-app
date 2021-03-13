import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import GalleryItem from './GalleryItem';
import NoPhoto from './NoPhoto';


class Photos extends PureComponent {

  componentDidMount = () => {
    // Lifts App.js state to search for image keyword
    this.props.history.listen(location => this.props.search(location.pathname.replace(/[^\w\s]/gi, '').replace("search", '')));
    this.props.search(this.props.text);
  }

  render() {
    const results = this.props.data;
    let photos = results.Photos;
   
    if (results.length) {
     // Maps each photo in the 24 photo Flickr object received from App.js and passes them to Photo.js
     photos = results.map(photo =>
        <GalleryItem key={photo.id} url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`} pathId={photo.id} />
      );
    } else {
      photos = <NoPhoto />
    }
    // Returns loading Flickr animated logo icon while waiting for API fetch, once fetch is successful it displays image thumbnail gallery to the page 
    return (
      <div className="photo-container">
        <h2>Results</h2>
        
          {this.props.loading ? <img  className="loading" src={require("../images/805.svg")} alt="Loading Flickr..." /> : <ul>{photos}</ul>}
        
      </div>
    );
  }

}

export default withRouter(Photos);