import React, { Component, Fragment } from 'react';

class Authorization extends Component {
    logout = (e) => {
        let logoutUrl = 'https://slack.com/api/auth.revoke?token=' + this.props.access_token;
        e.preventDefault();
        fetch(logoutUrl).then(response => response.json()).then((logoutResponse) => {
          if(logoutResponse.ok) {
            window.location.href="/";
            this.setState({access_token: 'not_set'});
            document.cookie = 'maria_order_access_token' + "=" + '' + ";" + 'Thu, 01 Jan 1970 00:00:00 UTC' + ";path=/";
          }
        })
    }

    render() {
        return(
            <Fragment>
                {!this.props.username &&
                    <div className="login">
                        <h1 className="login_title">Welcome to the Maria Order App,</h1>
                        <a href="https://slack.com/oauth/authorize?client_id=3172847953.530129890726&scope=chat%3Awrite%3Auser+im%3Aread+channels%3Aread+mpim%3Aread+users%3Aread+groups%3Aread+users.profile%3Aread&redirect_uri=https://slack-oauth.eldev.ro/login.php">Please Login with Slack</a>
                        {this.props.login_error &&
                        <div className="login_error">Login error! : {this.props.login_error}</div>
                        }
                    </div>
                }
                {this.props.username &&
                    <div className="welcome-bar">
                        <div className="user-info">
                            <img src={this.props.avatar} alt="User Avatar"/>
                            <span className="username">{this.props.username}</span>
                        </div>
                        <a className="logout" href="#" onClick={this.logout}>Logout</a>
                    </div>
                }
            </Fragment>
        );
    }
}

export default Authorization;