const dotenv = require('dotenv');
dotenv.config();

const { 
    SHOPIFY_API_SECRET_KEY, 
    SHOPIFY_API_KEY, 
    PORT,
    HOST,
    INSTAGRAM_APP_ID,
    INSTAGRAM_APP_SECRET,
   } = process.env;

const InstafeedsHelpers = {};

InstafeedsHelpers.getUserCode = (ctx) => {

    if(!(ctx && ctx.request && ctx.request.url)) return null;

    let url = ctx.request.url;
    return url.split("=")[1];
};

InstafeedsHelpers.getInstagramAccessToken = async(userCode) => {

    try {

      let FormData = require('form-data'),
          myHeaders = new Headers(),
          formdata = new FormData();
      
      myHeaders.append("Cookie", "csrftoken=Y1a39GmQlBLulXgY6b1vJZwQz0zFSQ3X; rur=ATN");

      formdata.append("client_id", INSTAGRAM_APP_ID);
      formdata.append("client_secret", INSTAGRAM_APP_SECRET);
      formdata.append("grant_type", "authorization_code");
      formdata.append("redirect_uri", `${HOST}/index-token-callback`);
      formdata.append("code", userCode);
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
  
      return fetch("https://api.instagram.com/oauth/access_token", requestOptions)
        .then(response => response.text())
        .then(result => {return result;})
        .catch(error => console.log('error', error));

    } catch(error) { console.log(error) };
   
  };

  InstafeedsHelpers.getInstagramMedia = () => {

    try{
  
      let parseResponseData = jsonBigint.parse(data);
          userId = parseResponseData.user_id.toString(),
          accessToken = parseResponseData.access_token.toString(),
          myHeaders = new Headers(),
          url = `https://graph.instagram.com/me/media?fields=username,id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`;
  
          myHeaders.append("Cookie", "csrftoken=Y1a39GmQlBLulXgY6b1vJZwQz0zFSQ3X; rur=ATN");
  
      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
     return fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {return JSON.parse(result);})
        .catch(error => console.log('error', error));
          
    } catch(error){ console.log(error) };

  }

  InstafeedsHelpers.getInstagramUserInfo = async(data) => {
  
    try{
  
      let parseResponseData = jsonBigint.parse(data);
          userId = parseResponseData.user_id.toString(),
          accessToken = parseResponseData.access_token.toString(),
          myHeaders = new Headers(),
          url = `https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${accessToken}`;
      
          myHeaders.append("Cookie", "csrftoken=Y1a39GmQlBLulXgY6b1vJZwQz0zFSQ3X; rur=ATN");
  
      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
     return fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {return JSON.parse(result);})
        .catch(error => console.log('error', error));
          
    } catch(error){ console.log(error) }
  
  };

export default InstafeedsHelpers;


