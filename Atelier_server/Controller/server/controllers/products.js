// const cache = require('../../redis/cache');
const { Products, Styles } = require('../../../Model/models');

async function readAllProducts(req, res) {
  try {
    const products = await Products.find({})
      .lean()
      .select('id name')
      .limit(100)
      .sort({ id: 1 });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error reading products from db', error);
    res.status(500).send('Error reading products from db');
  }
}

async function readProduct(req, res) {
  const { product_id } = req.params;
  try {
    const product = await Products.findOne({ id: product_id });
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error reading product id ${product_id} from db`, error);
    res.status(500).send('Error reading product from db');
  }
}

async function readStyles(req, res) {
  const { product_id } = req.params;

  try {
    const styles = await Styles.find({ productId: product_id });
    res.status(200).json(styles);
  } catch (error) {
    console.error(
      `Error reading styles for product id ${product_id} from db`,
      error
    );
    res.status(500).send('Error reading styles from db');
  }
}

// function readRelated(req, res) {}

async function createCart(req, res) {
  const { size, qty } = req.params;
  const { styleId } = req.body;

  try {
    const style = await Styles.findOne({ _id: styleId });
    style.skus[size].quantity -= parseInt(qty, 10);
    await style.save();
    res.status(200).json(style);
  } catch (error) {
    console.error(`Error updating style ${styleId} quantity`, error);
    res.status(500).send('Error adding quantity to cart');
  }
}

module.exports = {
  readAllProducts,
  readProduct,
  readStyles,
  // readRelated,
  createCart,
};
