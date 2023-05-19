const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
  feature_id: Number,
  product_id: Number,
  feature: String,
  value: String,
});

const PhotoSchema = new mongoose.Schema({
  photo_id: Number,
  style_id: Number,
  url: String,
  thumbnail_url: String,
});

const SkuSchema = new mongoose.Schema({
  sku_id: Number,
  style_id: Number,
  quantity: Number,
  size: String,
});

// const StyleSchema = new mongoose.Schema({
//   id: Number,
//   productId: Number,
//   name: String,
//   original_price: String,
//   sale_price: String,
//   default_style: Boolean,
//   lastModified: Date,
//   photos: [{ url: String, thumbnail_url: String }],
//   skus: { String: { quantity: Number } },
// });
const StyleSchema = new mongoose.Schema({
  skus: {
    XS: { quantity: { type: Number, default: 0 } },
    S: { quantity: { type: Number, default: 0 } },
    M: { quantity: { type: Number, default: 0 } },
    L: { quantity: { type: Number, default: 0 } },
    XL: { quantity: { type: Number, default: 0 } },
  },
  _id: mongoose.Types.ObjectId,
  id: Number,
  productId: Number,
  name: String,
  sale_price: String,
  original_price: String,
  default_style: Boolean,
  lastModified: Date,
  photos: [
    {
      _id: mongoose.Types.ObjectId,
      url: String,
      thumbnail_url: String,
    },
  ],
});

const ProductSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [{ feature: String, value: String }],
  last_modified: Date,
});

const Products = mongoose.model('Products', ProductSchema);
const Features = mongoose.model('Features', FeatureSchema);
const Styles = mongoose.model('Styles', StyleSchema);
const Photos = mongoose.model('Photos', PhotoSchema);
const Skus = mongoose.model('Skus', SkuSchema);

module.exports = {
  Products,
  Styles,
  Features,
  Photos,
  Skus,
};

// const mongoose = require('mongoose');

// const FeatureSchema = new mongoose.Schema({
//   feature_id: Number,
//   product_id: Number,
//   feature: String,
//   value: String,
// });

// const PhotoSchema = new mongoose.Schema({
//   photo_id: Number,
//   style_id: Number,
//   url: String,
//   thumbnail_url: String,
// });

// const SkuSchema = new mongoose.Schema({
//   sku_id: Number,
//   style_id: Number,
//   quantity: Number,
//   size: String,
// });

// const StyleSchema = new mongoose.Schema({
//   style_id: Number,
//   product_id: Number,
//   name: String,
//   original_price: String,
//   sale_price: String,
//   default_style: Boolean,
//   last_modified: Date,
// });

// const ProductSchema = new mongoose.Schema({
//   product_id: Number,
//   name: String,
//   slogan: String,
//   description: String,
//   category: String,
//   default_price: String,
//   last_modified: Date,
// });

// const Products = mongoose.model('Products', ProductSchema);
// const Features = mongoose.model('Features', FeatureSchema);
// const Styles = mongoose.model('Styles', StyleSchema);
// const Photos = mongoose.model('Photos', PhotoSchema);
// const Skus = mongoose.model('Skus', SkuSchema);

module.exports = {
  Products,
  Styles,
  Features,
  Photos,
  Skus,
};
