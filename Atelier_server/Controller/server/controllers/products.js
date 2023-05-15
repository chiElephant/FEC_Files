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
    console.log('styles', styles, product_id);
    res.status(200).json(styles);
  } catch (error) {
    console.error(
      `Error reading styles for product id ${product_id} from db`,
      error
    );
    res.status(500).send('Error reading styles from db');
  }
}

// function readProduct(req, res) {
//   const { product_id } = req.params;

//   cache
//     .get(product_id)
//     .then((reply) => {
//       if (reply !== null) {
//         console.log('Returned Data from Cache');
//         return res.status(200).json(JSON.parse(reply));
//       }
//       Products.findOne({ product_id }, async (error, product) => {
//         if (error) {
//           return res
//             .status(500)
//             .send(`Error reading product_id ${product_id} from db`, error);
//         }
//         await cache
//           .set(`${product_id}`, JSON.stringify(product))
//           .catch((err) => res.status(500).send(err));

//         res.status(200).json(product);
//       });
//     })
//     .catch((er) => res.status(500).send(er));
// }

// function readStyle(req, res) {
//   const { product_id } = req.params;

//   cache
//     .get(`${product_id}_styles`)
//     .then((reply) => {
//       if (reply !== null) {
//         console.log('Returned Data from Cache');
//         return res.status(200).json(JSON.parse(reply));
//       }

//       Styles.find({ product_id }, async (error, styles) => {
//         if (error) {
//           return res
//             .status(500)
//             .send(
//               `Error reading product_id ${product_id} styles from db`,
//               error
//             );
//         }

//         const { length } = styles;

//         if (length === 0) {
//           res.status(404).send('Product ID does not exist');
//         } else {
//           await cache
//             .set(`${product_id}_styles`, JSON.stringify(styles))
//             .catch((err) => console.error(err));

//           res.status(200).json(styles);
//         }
//       });
//     })
//     .catch((err) => res.status(500).send(err));
// }

function readRelated(req, res) {}

function createCart(req, res) {}

module.exports = {
  readAllProducts,
  readProduct,
  readStyles,
  readRelated,
  createCart,
};
