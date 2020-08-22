let AppHelpers = {};

AppHelpers.baseUrl = () => {

    const appUrl = "https://9952f26eae2a.ngrok.io";
    return appUrl? appUrl:"localhost:3000";
    
};

export default AppHelpers;