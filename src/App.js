import React, { Component, Fragment } from 'react';
import './App.css';
import PostMessage from './components/PostMessage';
import Authorization from './components/Authorization';

class App extends Component {
  constructor() {
    super();
    this.state = {
      access_token: 'not_set',
      login_error: '',
      username: '',
      avatar: '',
    }
  }

  componentDidMount() {
    let access_token = document.cookie.match(new RegExp('(^| )' + 'maria_order_access_token' + '=([^;]+)'));
    if (access_token) {
      access_token = access_token[2];
      this.setState({access_token});
    }
    {access_token &&
      fetch('https://slack.com/api/users.profile.get?token='+ access_token).then(response => response.json()).then((data) => {
        {!data.ok &&
          this.setState({
            login_error: data.error
          });
        }

        {data.ok &&
          this.setState({
            username: data.profile.first_name,
            avatar: data.profile.image_48,
          });
        }
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="header container">
          <Authorization {...this.state} />
        </div>
        <div className="app container">
          {this.state.username &&
            <PostMessage {...this.state} />
          }
        </div>
      </Fragment>
    );
  }
}

export default App;
