import cloudinary from 'cloudinary';

// Lazy configuration - only configure when first accessed
let isConfigured = false;

const configureCloudinary = () => {
  if (!isConfigured) {
    // console.log('Configuring Cloudinary...');
    // console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
    // console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '***SET***' : 'NOT SET');
    // console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '***SET***' : 'NOT SET');
    
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    isConfigured = true;
  }
  return cloudinary.v2;
};

export default configureCloudinary;
