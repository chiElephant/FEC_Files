const { cloudinary } = require('./cloudinary');

const uploadToCloudinary = (req, res, next) => {
  const { photos } = req.body;

  const promises = photos.map((file) =>
    cloudinary.uploader
      .upload(file, {
        upload_preset: 'FEC_project',
      })
      .then(
        (result) =>
          // console.log('Cloudinary Upload Success: ', result.url);
          result.url
      )
      .catch(next)
  );

  Promise.all(promises).then((urls) => {
    req.body.photoUrls = urls;
    console.log('uploaded photos urls: ', urls);
    next();
  });
};

module.exports = { uploadToCloudinary };
