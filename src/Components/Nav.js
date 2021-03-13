import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Search from './Search';


 class Nav extends Component {
  

  
  handleRoute = text => {
    this.props.history.push(`/search/${text}`);
  }
  

  
  render() {  
    return (

        <nav className="main-nav">
        <div className="search-form">
            <Search onSubmit={this.handleRoute}/>      
        </div> 
         
        <ul>
            <li><NavLink to="/cats">Cats</NavLink></li>
            <li><NavLink to="/dogs">Dogs</NavLink></li>
            <li><NavLink to="/computers">Computers</NavLink></li>  
        </ul>
      </nav>
     
    );
  }
}
export default withRouter(Nav);