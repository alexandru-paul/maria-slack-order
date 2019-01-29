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
    let order_message = document.querySelector('.order-msg').value;
    let food_vendor = document.querySelector('.food-vendor').value;
    let fetchUrl = this.buildUrl('https://slack.com/api/chat.postMessage',{
                    token : getprm,
                    channel :'GFLS780EN',
                    text : '<@U0MUWKVEY> Hey! I\'d like to order: *' + order_message + '* from: *' + food_vendor + '*',
                    as_user : 'true',
                    link_names : '1',
                  });
    fetch(fetchUrl).then(response => response.json()).then(data => console.log(data));
  }

  render() {
    return (
      <div className="post-message-wrapper">
        <select className="food-vendor">
          <option value="">Please Select a Food Vendor</option>
          <option value="Grafitti">Grafitti</option>
          <option value="Gustacio">Gustacio</option>
          <option value="Almondo">Almondo</option>
          <option value="Fabio">Fabio Pizza</option>
        </select>
        <input type="text" name="order" placeholder="Write down your order here:" className="order-msg"/>
        <a href="#" className="send-msg" onClick={this.postMessage}>Send Messnge</a>
      </div>
    );
  }
}

export default PostMessage;
