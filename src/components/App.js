import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import ReactLoading from 'react-loading';
import '../App.css';
import Categories from './Categories';
import PostList from './PostList';


class App extends Component {

  componentDidMount() {
    // TO-DO - Show the loading spinner
  }

  render() {

    return (
      <div className="App">

        <Categories />

        <Route path='/:category?' component={PostList} />

      </div>

    );
  }
}

export default App;