const express = require('express');
const router = express.Router();
const Product = require('./product');
const { NotFoundError, ValidationError } = require('./errors');





// List all products, with filtering and pagination
// To filter by category, use: GET /api/products?category=electronics
// For pagination, use: GET /api/products?page=2&limit=5
router.get('/', async (req, res) => {
    try {
        const {category, page = 1, limit = 10} = req.query;
        const filter = {};
        if (category) filter.category = category;

        const products = await Product.find(filter)
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(parseInt(limit));

        res.send(products)
    } catch (error) {
        res.status(500).send(error);
    }
});

// Search by name
// To search by name use: GET /api/products/search?name=tablet
router.get('/search', async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: 'Name query parameter is required' });

    const products = await Product.find({ name: { $regex: name, $options: 'i' } });
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Product statistics by category
// To view product statistics, use: GET /api/products/stats
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw new NotFoundError('Product Not Found');
        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Middleware to validate product data before creation or update
function validateProduct(req, res, next) {
  function isValid(product) {
    const { id, name, description, price, category, inStock } = product;
    return (
      typeof id === 'string' &&
      typeof name === 'string' &&
      typeof description === 'string' &&
      typeof price === 'number' &&
      typeof category === 'string' &&
      typeof inStock === 'boolean'
    );
  }

  if (Array.isArray(req.body)) {
    for (const product of req.body) {
      if (!isValid(product)) {
        return res.status(400).json({ message: 'Invalid product data in array' });
      }
    }
  } else {
    if (!isValid(req.body)) {
      return res.status(400).json({ message: 'Invalid product data' });
    }
  }
  next();
};

// Create a new product
router.post('/', validateProduct, async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            // Insert many products at once
            const products = await Product.insertMany(req.body);
            res.status(201).send(products);
        } else {
            // Insert a single product
            const product = new Product(req.body);
            await product.save();
            res.status(201).send(product);
        }
    } catch(error) {
        res.status(400).send(error);
    }
});

// Update an existing product
router.put('/:id', validateProduct, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators:true}
        );
        if (!product) return res.status(404).send();
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send();
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});












module.exports = router;