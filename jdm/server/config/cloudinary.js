const cloudinary = require('cloudinary');
const { cloud_name, api_key, api_secret } = require('.');

module.exports = () => {
    cloudinary.config({ 
        cloud_name, 
        api_key, 
        api_secret 
      });
}