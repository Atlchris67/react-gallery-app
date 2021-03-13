import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Gallery from './Components/Gallery';
import Nav from './Components/Nav';


import {
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import history from "./Components/history";
import apiKey from "./config/config";
import NotFound from './Components/NotFound';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true
    };
  } 

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'everything') => {
    this.setState({
      loading: true
    });

    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&sort=relevance&content_type=1&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({ 
        photos: response.data.photos.photo,
        loading: false
       });
       console.log(response)
      console.log(this.state.photos);
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() { 
      // Creates url object from browser history.
 
  // Parses out just the search text from the url object.
  let searchText = history.location.pathname.replace(/[^\w\s]/gi, '').replace("search", '');
    return (
      <Router  history={history}>
   
        <div className="container">
            
          <Nav onSearch={this.performSearch}/>  
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/" />} />
            <Route path="/cats" render={() => <Gallery data={this.state.photos} search={this.performSearch} text="everything" loading={this.state.loading}/>} />
            <Route path="/dogs" render={() => <Gallery data={this.state.photos} search={this.performSearch} text="dogs" loading={this.state.loading}/>} />
            <Route path="/computers" render={() => <Gallery data={this.state.photos} search={this.performSearch} text="computers" loading={this.state.loading}/>} />
            <Route exact path="/search/:text" render={() => <Gallery data={this.state.photos}  search={this.performSearch} text={searchText} loading={this.state.loading}/>} />
            <Route component={NotFound} />
          </Switch>   

        </div> 
      
      </Router>
      
    );
  }
}
