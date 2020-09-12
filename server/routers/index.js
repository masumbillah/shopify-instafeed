const dotenv = require('dotenv');
const InstafeedsHelpers = require("../models/instafeeds/instafeed-media-helpers");

const InstafeedsCollection = require("../models/instafeeds/instafeed-media-collection");

dotenv.config();

const { HOST } = process.env;

const Routers = (router) => {

  router.get('/index-token', async (ctx, res) => {
    let instance = this;

    try {
      
      let url = `https://api.instagram.com/oauth/authorize?client_id=1570157449825539&redirect_uri=${HOST}/index-token-callback&scope=user_profile,user_media&response_type=code`;
      ctx.redirect(url);
  
    } catch (error) {
      console.log(error)
    }
  })
  
  router.get('/index-token-callback', async (ctx, res) => {
    let instance = this;
    try {
      let userCode = InstafeedsHelpers.getUserCode(ctx),
          accessTokenData = await InstafeedsHelpers.getInstagramAccessToken(userCode),
          mediaList = await InstafeedsHelpers.getInstagramMedia(accessTokenData),
          mediaListData = mediaList && mediaList.data;
  
          mediaListData.forEach( mediaInfo => {
            
            mediaInfo = {...mediaInfo, storeId: "12345"}
            InstafeedsCollection.create(mediaInfo);
          });
  
    ctx.redirect(`${HOST}/instafeed`);
      
    } catch (error) {
      console.log(error)
    }
  })
  
  router.get('/api/instagram-users', async (ctx, req, res) => {
    try {
  
      ctx.body = {
        status: 'success',
        data: []
      }
    } catch (error) {
      console.log(error)
    }
  })
  
  router.get('/api/instagram-media', async (ctx, req, res) => {
    try {
  
      let mediaList = await InstafeedsCollection.find({}) || [];

      console.log("mediaList",mediaList);

      ctx.body = {
        status: 'success',
        data: mediaList
      }
    } catch (error) {
      console.log(error)
    }
  });

};

module.exports = Routers;