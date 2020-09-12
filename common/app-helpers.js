let AppHelpers = {};

AppHelpers.baseUrl = () => {

    const appUrl = "https://bb5be3aab728.ngrok.io";
    return appUrl? appUrl:"localhost:3000";
    
};

export default AppHelpers;