import React, { Component } from 'react';
import './App.css';

class PostMessage extends Component {
  buildUrl(url, parameters) {
    let qs = "";
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            qs +=
                encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1); //chop off last "&"
        url = url + "?" + qs;
    }

    return url;
}

  postMessage = (e) => {
    e.preventDefault();
    let getprm = this.props.getQueryString('access_token');
    let fetchUrl = this.buildUrl('https://slack.com/api/chat.postMessage',{
                    token : getprm,
                    channel :'GFLS780EN',
                    text : 'test from oauth app',
                    as_user : 'true',
                  });
    fetch(fetchUrl).then(response => response.json()).then(data => console.log(data));
  }

  render() {
    return (
      <div className="post-message-wrapper">
        <input type="text" className="slack-msg"/>
        <a href="#" className="send-msg" onClick={this.postMessage}>Send Messnge</a>
      </div>
    );
  }
}

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
