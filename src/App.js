import React, { Component } from 'react';
import './App.css';
import PostMessage from './components/PostMessage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      avatar: '',
    }
  }

  getQueryString(param) {
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
    
    return getParams[param];
  }

  componentDidMount() {
    let getUserDataUrl = 'https://slack.com/api/users.profile.get?token='+ this.getQueryString('access_token');
    fetch(getUserDataUrl).then(response => response.json()).then((data) => {
      this.setState({
        username: data.profile.first_name,
        avatar: data.profile.image_192,
      });
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.username &&
          <div className="welcome-bar">
            <img src={this.state.avatar} />
            <h1>Hello {this.state.username}, and welcome to the Maria Order App</h1>
          </div>
        }
        <PostMessage getQueryString={this.getQueryString}/>
      </div>
    );
  }
}

export default App;
