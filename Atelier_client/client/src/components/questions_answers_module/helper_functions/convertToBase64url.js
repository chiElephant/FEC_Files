export default async function convertToBase64url(e) {
  const files = [...e.target.files].map((file) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  });

  const res = await Promise.all(files);

  return res;
}
