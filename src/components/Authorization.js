import React, { Component, Fragment } from 'react';

class Authorization extends Component {
    logout = (e) => {
        let logoutUrl = 'https://slack.com/api/auth.revoke?token=' + this.props.getQueryString('access_token');
        e.preventDefault();
        fetch(logoutUrl).then(response => response.json()).then((logoutResponse) => {
          if(logoutResponse.ok) {
            window.location.href="/";
          }
        })
    }

    render() {
        return(
            <Fragment>
                {!this.props.username &&
                    <div className="login">
                        <a href="https://slack.com/oauth/authorize?client_id=3172847953.530129890726&scope=chat%3Awrite%3Auser+im%3Aread+channels%3Aread+mpim%3Aread+users%3Aread+groups%3Aread+users.profile%3Aread&redirect_uri=https://slack-oauth.eldev.ro/login.php">Please Login with Slack</a>
                        {this.props.login_error &&
                        <div className="login_error">Login error! : {this.props.login_error}</div>
                        }
                    </div>
                }
                {this.props.username &&
                    <div className="welcome-bar">
                        <img src={this.props.avatar} alt="User Avatar"/>
                        <h1>Hello {this.props.username}, and welcome to the Maria Order App</h1>
                        <a href="#" onClick={this.logout}>Logout</a>
                    </div>
                }
            </Fragment>
        );
    }
}

export default Authorization;