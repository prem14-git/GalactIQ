# Cloudinary Setup Guide

## 1. Create a Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Get your credentials from the dashboard

## 2. Backend Environment Variables
Add these to your `backend/.env` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 3. Features Implemented
- ✅ Image upload to Cloudinary
- ✅ Automatic image optimization (800x600 max, auto quality)
- ✅ Image deletion when records are deleted/updated
- ✅ Organized folder structure (`galactiq/` folder)
- ✅ File type validation (images only)
- ✅ File size limits (5MB max)

## 4. Benefits
- **Persistent Storage**: Images survive server restarts
- **Global Access**: Images accessible from anywhere
- **Automatic Optimization**: Cloudinary handles image resizing and compression
- **CDN**: Fast global delivery
- **Free Tier**: 25GB storage, 25GB bandwidth per month

## 5. Migration from Local Storage
- Old local images in `backend/uploads/` will need to be re-uploaded
- New uploads will automatically go to Cloudinary
- Existing database records with local URLs will need to be updated

## 6. Deployment Notes
- No need to upload the `uploads/` folder to Render
- Cloudinary credentials should be set as environment variables on Render
- Images will be served from Cloudinary's CDN
