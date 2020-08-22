import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, Layout, Page, ResourceList, Stack, Link, Heading } from '@shopify/polaris';
import AppHelpers from "../common/app-helpers";
import axios from 'axios';

const QUERY_SHOP = gql`
  query {
    shop {
      id
      name
      email
      contactEmail
      url
      plan {
        partnerDevelopment
        shopifyPlus
      }
    }
  }
`;

const getInstagramUser = async ()=> {
    return fetch(`${AppHelpers.baseUrl()}/api/instagram-users`, {
      method: 'GET',
      redirect: 'follow'
      }).then(response => response.text())
        .then(result => { return JSON.parse(result);} )
        .catch(error => console.log('error', error));
  };

const getInstagramMediaList = async ()=> {
    return fetch(`${AppHelpers.baseUrl()}/api/instagram-media`, {
      method: 'GET',
      redirect: 'follow'
      }).then(response => response.text())
        .then(result => { return JSON.parse(result);} )
        .catch(error => console.log('error', error));
  };

const Instafeed = (props) => {
  
  const { loading, error, data } = useQuery(QUERY_SHOP);
  let shop = data && data.shop;

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
      <Page>
        <Layout>
          <Layout.Section secondary>
            <Link class="btn btn-sm" url={`/index-token?${shop.name}`} monochrome={false} external={true}>Connect instragram</Link>
            <UsersList usersProps={getInstagramUser()} />

            <MediaList mediaProps={getInstagramMediaList()} />
          </Layout.Section>
        </Layout>
      </Page>
    )
}

const UsersList = ({usersProps}) => {

  const [users, setUsers] = useState([]);

  usersProps.then(users => setUsers(users) ).catch(error=> console.log(error))

let userList = "";

if(users.length) userList = users.map((user) => <li key={user.id}>Id: {user.id}, Username: {user.username}, accountType: {user.account_type}, totalMedia: {user.media_count}</li> );

  return <ol>{userList}</ol>;
};

const MediaList = ({mediaProps}) => {

  const [mediaList, setMediaList] = useState([]);
  mediaProps.then(media => setMediaList(media &&  media.data[0].data) ).catch(error=> console.log(error))

let list = "";

if(mediaList.length) list = mediaList.map((mediaInfo, index) => <div key={mediaInfo.id+"_"+index} style={{marginRight: 25}}> <a href={mediaInfo.media_url} target="_blank" > <img src={mediaInfo.media_url} title={mediaInfo.caption} style={{width:200, marginTop: 25}} /></a> <br/>  <hr/> <p>{mediaInfo.caption}</p> </div> );

return <React.Fragment> <Heading> {list.length? `Instafeed Media list`:""} </Heading> <div style={{display: 'flex'}}>{list}</div></React.Fragment>; 

};

export default Instafeed;
