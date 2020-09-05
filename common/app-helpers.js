let AppHelpers = {};

AppHelpers.baseUrl = () => {

    const appUrl = "https://3c3b313982a0.ngrok.io";
    return appUrl? appUrl:"localhost:3000";
    
};

export default AppHelpers;