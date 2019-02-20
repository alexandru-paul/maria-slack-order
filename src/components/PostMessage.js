import React, { Component } from 'react';

class PostMessage extends Component {
  buildUrl(url, parameters) {
    let qs = "";
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1); //chop off last "&"
        url = url + "?" + qs;
    }

    return url;
  }

  postMessage = (e) => {
    let access_token = this.props.access_token;
    let order_message = document.querySelector('.order-msg').value;
    let food_vendor = document.querySelector('.food-vendor').value;
    let fetchUrl = this.buildUrl('https://slack.com/api/chat.postMessage',{
                    token : access_token,
                    channel :'GFLS780EN',
                    text : '<@U0MUWKVEY> Hey! I\'d like to order: *' + order_message + '* from: *' + food_vendor + '*',
                    as_user : 'true',
                    link_names : '1',
                  });
    e.preventDefault();
    if(!e.target.classList.contains('disabled')) {
      fetch(fetchUrl).then(response => response.json()).then((data) => {
        if(data.ok) {
          document.querySelectorAll('.user-feedback').forEach((el) => {
            el.style.opacity = 1;
            el.style.zIndex = 1
          });
          document.querySelectorAll('.food-vendor, .order-msg').forEach(el => el.value = '');
          document.querySelectorAll('a.send-msg, input.order-msg, .menu-link').forEach(el => el.classList.add('disabled'));
        }
      });
    }
  }

  showMenu = (foodVendor) => {
    let menuLink = '';

    switch(foodVendor) {
      case 'Grafitti' :
        menuLink = 'http://www.graffitifoods.ro/#meniu';
        break;

      case 'Almondo' :
        menuLink = 'https://www.almondopizza.ro/';
        break;

      case 'Fabio' :
        menuLink = 'https://www.fabiopizza.ro/';
        break;

      default :
        menuLink = '';
    }

    document.querySelector('.menu-link').innerHTML = '<a href="'+ menuLink +'" target="_blank">Meniu '+ foodVendor +'</a>';
  }

  handleDisabled = (e) => {
    if ((document.querySelector('.food-vendor').value !== '') && (document.querySelector('.order-msg').value !== '') ) {
      document.querySelector('.send-msg').classList.remove('disabled');
    }
    else {
      document.querySelector('.send-msg').classList.add('disabled');
    }

    if(e.target.classList.contains('food-vendor') && (document.querySelector('.food-vendor').value !== '')) {
      document.querySelectorAll('.order-msg, .menu-link').forEach(el => el.classList.remove('disabled'));
      this.showMenu(e.target.value);
    }
    else if((document.querySelector('.food-vendor').value === '')) {
      document.querySelectorAll('.order-msg, .menu-link').forEach(el => el.classList.add('disabled'));
    }
  }

  hideConfirmation = (e) => {
    e.preventDefault();
    e.target.style.opacity = 0;
    e.target.style.zIndex = -1;
  }

  render() {
    return (
      <div className="post-message-wrapper">

        <select className="food-vendor" onChange={ this.handleDisabled }>
          <option value="">Please Select a Food Vendor</option>
          <option value="Grafitti">Grafitti</option>
          <option value="Almondo">Almondo</option>
          <option value="Fabio">Fabio Pizza</option>
        </select>
        <div className="menu-link disabled"></div>
        <input type="text" name="order" placeholder="Write down your order here" className="order-msg disabled" onChange={ this.handleDisabled }/>
        <div className="send-msg-wrapper">
          <a href="#" className="send-msg disabled" onClick={ this.postMessage }>Send Message</a>
        </div>
        <div className="user-feedback" onClick={this.hideConfirmation}>
          <span>Message succesfully sent!<br/>Thank you for using the app, see you next time :)</span>
        </div>

      </div>
    );
  }
}

export default PostMessage;
