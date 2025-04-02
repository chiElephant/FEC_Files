import { cloudinary } from './cloudinary';

export default async function uploadToCloudinary(photos) {
  if (photos.length === 0) {
    return;
  }

  try {
    const promises = photos.map(async (file) => {
      const result = await cloudinary.uploader.upload(file, {
        upload_preset: 'FEC_project',
      });
      return result.url;
    });

    const urls = await Promise.all(promises);

    const formattedURLs = urls.map((url) => {
      const sliced = url.split('upload/');
      return `${sliced[0]}upload/f_auto/${sliced[1]}`;
    });

    return formattedURLs;
  } catch (error) {
   thorw Error(error)
  }
}

export { uploadToCloudinary };
