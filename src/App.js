import React, { Component } from 'react';
import './App.css';

class PostMessage extends Component {
  render() {
    return (
      <div className="post-message-wrapper">
        <input type="text"/>
        <a href="#" className="send-msg">Send Messnge</a>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Maria Order App React</h1>
        <PostMessage/>
      </div>
    );
  }
}

export default App;
