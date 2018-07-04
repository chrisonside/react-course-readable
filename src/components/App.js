import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ReactLoading from 'react-loading';
import '../App.css';
import PostForm from './PostForm';
import PostList from './PostList';
import Post from './Post';


class App extends Component {

  componentDidMount() {
    // TO-DO - Show the loading spinner
  }

  render() {

    return (
      <div className="App">

        <Switch>
          <Route exact path='/add-post' component={PostForm}/>
          <Route exact path='/:category?' component={PostList} />
          <Route exact path='/:category?/:id?' component={Post} />
        </Switch>

      </div>

    );
  }
}

export default App;