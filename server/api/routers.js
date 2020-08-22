const KoaRouter = require('koa-router');
const router = new KoaRouter();
import StoresHelpers from "../models/stores/stores-helpers"

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
      let userCode = StoresHelpers.getUserCode(ctx),
          accessTokenData = await StoresHelpers.getInstagramAccessToken(userCode),
          mediaList = await StoresHelpers.getInstagramMedia(accessTokenData);
      
      console.log("mediaList", mediaList);
  
      let isFound = instagramUsers.find(element => element.id === userInfo.id);

     instagramMediaList.push(mediaList);
  
      console.log("instagramMediaList", instagramMediaList);
  
    ctx.redirect(`${HOST}/instafeed`);
      
    } catch (error) {
      console.log(error)
    }
  })
  
  router.get('/api/instagram-users', async (ctx, req, res) => {
    try {
  
      ctx.body = {
        status: 'success',
        data: instagramUsers
      }
    } catch (error) {
      console.log(error)
    }
  })
  
  router.get('/api/instagram-media', async (ctx, req, res) => {
    try {
  
      ctx.body = {
        status: 'success',
        data: instagramMediaList
      }
    } catch (error) {
      console.log(error)
    }
  });