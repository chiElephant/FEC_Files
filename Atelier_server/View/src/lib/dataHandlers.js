import axios from 'axios';

export async function getProductData(product_id) {
  try {
    const response = await axios.get(`/products/${product_id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching product data:', error);
    throw new Error('Failed to fetch product data');
  }
}

export async function getMetadata(product_id) {
  return { avgRating: product_id, totalReviews: product_id };
}

export async function getStyles(product_id) {
  try {
    const response = await axios.get(`/products/${product_id}/styles`);
    const styleData = {
      styles: response.data,
      defaultStyle: response.data.find((style) => style.default_style),
    };
    return styleData;
  } catch (error) {
    console.log('Error fetching styles', error);
    throw new Error('Failed to fetch styles');
  }
}

export async function addToCart(currentStyle, size, qty) {
  const url = `/cart/${size}/${qty}`;
  const body = {
    // eslint-disable-next-line no-underscore-dangle
    styleId: currentStyle._id,
  };
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.log('Error adding item to cart', error);
    throw new Error('Failed to add item to cart');
  }
}
