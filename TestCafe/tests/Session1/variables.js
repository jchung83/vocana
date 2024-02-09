// Credentials
const credentials = ( user ) => {
  let creds = {
    "email":"",
    "password":""
  }
    switch (user) {
        case "artist":
          creds.email = 'jchung@sparxworks.com';
          creds.password = 'Aa.123456';
          console.log("logueando a jchung@sparxworks.com");
          break;
        case "admin":
          creds.email = 'admin@sparxworks.com';
          creds.password = 'Admin#2024';
          console.log("logueando a admin@sparxworks.com");
          break;
        default:
          console.log("no se encontro usuario");
      }
    return creds
    };
module.exports = creds;