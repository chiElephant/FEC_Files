import fetchProductFromAPI from '../utils/fetchProductFromAPI';
import JsonDataHandler from '../utils/JsonDataHandler';

export default async function fetchProduct({ API_KEY, productId }) {
  let products;
  const dataHandler = new JsonDataHandler(`product-${productId}.json`);

  if (await dataHandler.checkIfDataExists()) {
    products = await dataHandler.retrieveData();
  } else {
    products = await fetchProductFromAPI(API_KEY, productId);
    await dataHandler.storeData(products);
  }

  return products;
}
