require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const koaBody = require('koa-body')
const jsonBigint = require('json-bigint');
const mongoose = require('mongoose');

dotenv.config();
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');

const { 
  SHOPIFY_API_SECRET_KEY, 
  SHOPIFY_API_KEY, 
  PORT,
  HOST,
  INSTAGRAM_APP_ID,
  INSTAGRAM_APP_SECRET,

 } = process.env;

const port = parseInt(PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


const server = new Koa();
const router = new KoaRouter();

let products = [],
    instagramUsers = [],
    instagramMediaList = [];

router.get('/api/products', async (ctx) => {
  try {
    ctx.body = {
      status: 'success',
      data: products
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/api/products', koaBody(), async (ctx) => {
  try {
    const body = ctx.request.body;
    await products.push(body)
    ctx.body = "Item Added"
  } catch (error) {
    console.log(error)
  }
})

router.delete('/api/products', koaBody(), async (ctx) => {
  try {
    products = [];
    ctx.body = "All items deleted!"
  } catch (error) {
    console.log(error)
  }
})

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
    let userCode = getUserCode(ctx),
        accessTokenData = await getInstagramAccessToken(userCode),
        mediaList = await getInstagramMedia(accessTokenData);
        //userInfo = await getInstagramUserInfo(accessTokenData);
    
    console.log("mediaList", mediaList);

    let isFound = instagramUsers.find(element => element.id === userInfo.id);

    // if(!!isFound) {
    //   instagramUsers = instagramUsers.filter(element => element.id !== userInfo.id);
    //   instagramUsers.push(userInfo);
    // } else instagramUsers.push(userInfo);

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
})

// Router Middleware
server.use(router.allowedMethods());
server.use(router.routes());

//Connect mongodb
mongoose.connect(
  'mongodb://localhost/shopify_db',
  { 
    useUnifiedTopology: true,
    useNewUrlParser: true 
  }
)
.then(() => console.log('DB Connected!'))
.catch(err => console.log( "Error:", err.message));

app.prepare().then(() => {
  
  server.use(session(server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: [
        'read_products',
        'write_products',
        'read_script_tags',
        'write_script_tags'
      ],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;

        console.log("shop", shop);

        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });
        ctx.redirect('/');
      },
    }),
  );

  server.use(graphQLProxy({ version: ApiVersion.October19 }))
  server.use(verifyRequest());

  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });

});

const getInstagramAccessToken = async(userCode) => {
  var FormData = require('form-data');
  try{

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "csrftoken=Y1a39GmQlBLulXgY6b1vJZwQz0zFSQ3X; rur=ATN");

    var formdata = new FormData();
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
        
  } catch(error){ console.log(error) }

};

const getInstagramUserInfo = async(data) => {

  try{

    let parseResponseData = jsonBigint.parse(data);
        userId = parseResponseData.user_id.toString(),
        accessToken = parseResponseData.access_token.toString(),
        myHeaders = new Headers(),
        url = `https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${accessToken}`;
        //url = `https://graph.instagram.com/${userId}?fields=id,username,account_type,media_count&access_token=${accessToken}`;

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

const getInstagramMedia = async(data) => {

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
        
  } catch(error){ console.log(error) }

};

const getUserCode = (ctx) => {
  if(!(ctx && ctx.request && ctx.request.url)) return null;

    let url = ctx.request.url;
    return url.split("=")[1];
};