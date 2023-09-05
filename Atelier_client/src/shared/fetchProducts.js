import fetchProductsFromAPI from '../utils/fetchProductsFromAPI';
import JsonDataHandler from '../utils/JsonDataHandler';

export default async function fetchProducts({ API_KEY }) {
  let products;
  const dataHandler = new JsonDataHandler('products.json');

  if (await dataHandler.checkIfDataExists()) {
    products = await dataHandler.retrieveData();
  } else {
    products = await fetchProductsFromAPI(API_KEY);
    await dataHandler.storeData(products);
  }

  return products;
}
