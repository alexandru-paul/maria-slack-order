import React, { Component } from 'react';
import './App.css';

class PostMessage extends Component {
  getQueryString() {
    let getParams = {};
    if(document.location.toString().indexOf('?') !== -1) {
        var query = document.location
                      .toString()
                      // get the query string
                      .replace(/^.*?\?/, '')
                      // and remove any existing hash string (thanks, @vrijdenker)
                      .replace(/#.*$/, '')
                      .split('&');

        for(var i=0, l=query.length; i<l; i++) {
          var aux = decodeURIComponent(query[i]).split('=');
          getParams[aux[0]] = aux[1];
        }
    }
    
    return getParams;
  }

  postMessage= (e) => {
    e.preventDefault();
    let getprm = this.getQueryString();
    fetch('https://slack.com/api/chat.postEphemeral', {
      method: 'POST',
      body: JSON.stringify({
        token:getprm['access_token'],
        channel :'GFLS780EN',
        text : 'test from oauth app',
        as_user : 'true',
      })
    }).then(response => console.log(response.json()));
  }

  render() {
    return (
      <div className="post-message-wrapper">
        <input type="text"/>
        <a href="#" className="send-msg" onClick={this.postMessage}>Send Messnge</a>
      </div>
    );
  }
}

class App extends Component {
  componentDidMount() {
    
  }

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
