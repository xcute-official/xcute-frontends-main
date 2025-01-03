export const config = {
    authSecret: process.env.AUTH_SECRET!,
}

export const cloudinaryConfig = {
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
    url: process.env.CLOUDINARY_URL!,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!
}