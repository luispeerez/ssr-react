import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import * as asyncExampleActions from '../actions/asyncExampleActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import 'bulma/css/bulma.css';

import PostsList from './PostsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.incrementAsync = this.incrementAsync.bind(this);
    this.incrementIfOdd = this.incrementIfOdd.bind(this);
    this.requestFetch = this.requestFetch.bind(this);
  }

  incrementIfOdd() {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  incrementAsync() {
    this.props.onIncrementAsync();
    //setTimeout(this.props.onIncrement, 1000)
  }

  requestFetch(){
    this.props.onFetchRequested('destinythegame');
  }

  render() {
    const { value, onIncrement, onDecrement } = this.props;

    let errorFetchNotification = null;

    if(this.props.errorFetch){
      errorFetchNotification = (
        <div className="notification is-danger">
        {this.props.errorFetch}
        </div>
      );
    }

    return (
      <div>
        <p>
          Clicked: {value} times
          {' '}
          <button onClick={onIncrement}>
            +
          </button>
          {' '}
          <button onClick={onDecrement}>
            -
          </button>
          {' '}
          <button onClick={this.incrementIfOdd}>
            Increment if odd
          </button>
          {' '}
          <button onClick={this.incrementAsync}>
            Increment async
          </button>
        </p>

        <p>
          <button onClick={this.requestFetch}>
            Request subreddit fetch
          </button>
        </p>

        {errorFetchNotification}

        <PostsList posts={this.props.posts}/>

      </div>
    )
  }
}

App.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    value: state.counter,
    posts: state.posts,
    errorFetch: state.errorFetch
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actions, asyncExampleActions), dispatch);
  //return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

//export default App