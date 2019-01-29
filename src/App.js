import React, { Component, Fragment } from 'react';
import './App.css';
import PostMessage from './components/PostMessage';
import Authorization from './components/Authorization';

class App extends Component {
  constructor() {
    super();
    this.state = {
      login_error: '',
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
    {this.getQueryString('access_token') &&
      fetch(getUserDataUrl).then(response => response.json()).then((data) => {
        {!data.ok &&
          this.setState({
            login_error: data.error
          });
        }

        {data.ok &&
          this.setState({
            username: data.profile.first_name,
            avatar: data.profile.image_192,
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Authorization {...this.state} />

        {this.state.username &&
          <PostMessage getQueryString={this.getQueryString}/>
        }
      </div>
    );
  }
}

export default App;
