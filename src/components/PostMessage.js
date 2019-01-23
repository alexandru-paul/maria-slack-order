import React, { Component } from 'react';

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

export default PostMessage;
