let AppHelpers = {};

AppHelpers.baseUrl = () => {

    const appUrl = "https://2ee5112e5291.ngrok.io";
    return appUrl? appUrl:"localhost:3000";
    
};

export default AppHelpers;