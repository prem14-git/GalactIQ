import configureCloudinary from '../config/cloudinary.js';

const uploadToCloudinary = async (file, folder = 'galactiq') => {
  try {
    // Get configured Cloudinary instance
    const cloudinary = configureCloudinary();
    
    // Convert buffer to base64
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { width: 800, height: 600, crop: 'limit' }, // Resize large images
        { quality: 'auto' } // Optimize quality
      ]
    });
    
    return {
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to cloud storage');
  }
};

const deleteFromCloudinary = async (public_id) => {
  try {
    if (public_id) {
      const cloudinary = configureCloudinary();
      await cloudinary.uploader.destroy(public_id);
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error);
  }
};

export { uploadToCloudinary, deleteFromCloudinary };
