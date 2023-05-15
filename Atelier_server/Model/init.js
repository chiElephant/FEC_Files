const { exec } = require('child_process');

// Define paths to CSV files
const productsCSV = '/init_data/product.csv';
const featuresCSV = '/init_data/features.csv';
const stylesCSV = '/init_data/styles.csv';
const skusCSV = '/init_data/skus.csv';
const photosCSV = '/init_data/photos.csv';

const options = {
  maxTimeMS: 999999999, // set the maximum time for the aggregation in milliseconds
};

// Define aggregation pipelines for products and styles
const productAggregation = [
  {
    $set: {
      lastModified: new Date(),
    },
  },
  {
    $lookup: {
      from: 'features',
      localField: 'id',
      foreignField: 'product_id',
      as: 'features',
    },
  },
  {
    $project: {
      features: {
        id: 0,
        product_id: 0,
        _id: 0,
      },
    },
  },
  {
    $merge: {
      into: 'products',
    },
  },
];

const styleAggregation = [
  {
    $set: {
      lastModified: new Date(),
    },
  },
  {
    $lookup: {
      from: 'photos',
      localField: 'id',
      foreignField: 'styleId',
      as: 'photos',
      pipeline: [
        {
          $project: {
            _id: 0,
            styleId: 0,
            id: 0,
          },
        },
      ],
    },
  },
  {
    $lookup: {
      from: 'skus',
      localField: 'id',
      foreignField: 'styleId',
      as: 'skus',
    },
  },
  {
    $addFields: {
      skus: {
        $arrayToObject: {
          $reduce: {
            input: '$skus',
            initialValue: [],
            in: {
              $concatArrays: [
                '$$value',
                [
                  {
                    k: {
                      $toString: '$$this.size',
                    },
                    v: {
                      quantity: '$$this.quantity',
                    },
                  },
                ],
              ],
            },
          },
        },
      },
    },
  },
  {
    $merge: {
      into: 'styles',
    },
  },
];

// Define function to import data from a CSV file to a MongoDB collection
const createDocs = (csvFilePath, collection) =>
  new Promise((resolve, reject) => {
    console.log(`Importing ${collection}`);
    exec(
      `mongoimport --uri=mongodb://localhost/atelier --collection=${collection} --file=${csvFilePath} --type=csv --headerline`,
      (error, stdout, stderr) => {
        console.log('stdout', stdout);
        if (error) {
          reject(error);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
        console.log(`Successfully imported ${collection}`);
        resolve(collection);
      }
    );
  });

// Define function to import data from all CSV files and create indexes
const importData = async () => {
  try {
    await Promise.all([
      createDocs(productsCSV, 'products'),
      createDocs(featuresCSV, 'features'),
      createDocs(stylesCSV, 'styles'),
      createDocs(photosCSV, 'photos'),
      createDocs(skusCSV, 'skus'),
    ]);

    console.log('Indexing Products');
    await db.products.createIndex({ id: 1 });

    console.log('Indexing Features');
    await db.features.createIndex({ product_id: 1 });

    console.log('Indexing Styles');
    await db.styles.createIndex({ productId: 1 });

    console.log('Indexing Photos');
    await db.photos.createIndex({ styleId: 1 });

    console.log('Indexing Skus');
    await db.skus.createIndex({ styleId: 1 });

    console.log('Aggregating Products');
    await db.products.aggregate(productAggregation);

    console.log('Aggregating Styles');
    await db.styles.aggregate(styleAggregation, options);
    db.features.drop();
    db.photos.drop();
    db.skus.drop();

    console.log('Done importing and aggregating data');
  } catch (err) {
    console.log('Error importing data', err);
  }
};

// Connect to MongoDB database and drop existing data
use('atelier');
db.dropDatabase();
console.log('Dropped Atelier');

importData();
