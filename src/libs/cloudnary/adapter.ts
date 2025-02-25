export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);
  formData.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME!);
  formData.append("api_key", process.env.CLOUDINARY_API_KEY!);
  formData.append("api_secret", process.env.CLOUDINARY_API_SECRET!); 
}