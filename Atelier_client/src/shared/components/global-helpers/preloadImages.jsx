function preloadImages(imageUrls, onPreloadComplete) {
  const promises = [];

  imageUrls.forEach((imageUrl) => {
    const img = new Image();
    const promise = new Promise((resolve) => {
      img.onload = resolve;
    });
    img.src = imageUrl;
    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    onPreloadComplete();
  });
}

export default preloadImages;
