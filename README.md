[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19705505&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 



# Week 2 Express.js Product API

A RESTful API for managing products, built with Express.js and MongoDB.  
It supports CRUD operations, middleware for logging, authentification, validation, error handling, and advanced features like filtering, pagination, search, statistics.

---

## 🚀 How to Run the Server

1. **Clone the repository and navigate to the project folder.**

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**  
   Copy `.env.example` to `.env` and update values if needed.

4. **Start MongoDB:**  
   Make sure MongoDB is running locally (default: `mongodb://localhost:27017/productdb`).

5. **Start the server:**
   ```
   npm start
   ```
   The server will run on [http://localhost:3000](http://localhost:3000).

---

## 📚 API Endpoints

All requests require the header:  
`x-api-key: 12345-KLMNO-67890-PQRST`

### Product Routes

| Method | Endpoint                  | Description                                 |
|--------|---------------------------|---------------------------------------------|
| GET    | `/api/products`           | List all products ( filtering & pagination) |
| GET    | `/api/products/:id`       | Get a specific product by MongoDB `_id`     |
| POST   | `/api/products`           | Create a new product (single or multiple)   |
| PUT    | `/api/products/:id`       | Update an existing product                  |
| DELETE | `/api/products/:id`       | Delete a product                            |
| GET    | `/api/products/search`    | Search products by name                     |
| GET    | `/api/products/stats`     | Get product statistics by category          |

---

## 📝 Examples

### Get All Products (with optional filtering & pagination)
**Request:**
```
GET  http://localhost:3000/api/products?category=electronics&page=1&limit=5
Headers: x-api-key: 12345-KLMNO-67890-PQRST
```
**Response:**
```json
[
  {
    "_id": "664af6fbc6132afbc53b7f92",
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  },
  {
    "_id": "684af6fcc6132afbc53b7f93",
    "id": "2",
    "name": "Smartphone",
    "description": "Latest model with 128GB storage",
    "price": 800,
    "category": "electronics",
    "inStock": false,
    "__v": 0
   },
   {
    "_id": "684dbb745e58d57c43c1ec93",
    "id": "4",
    "name": "Television",
    "description": "Full HD Metallic Bezel-less Design Android TV",
    "price": 25999,
    "category": "electronics",
    "inStock": true,
    "__v": 0
   }
]
```

---

### Get Product by ID
**Request:**
```
GET  http://localhost:3000/api/products/684af6fbc6132afbc53b7f92
Headers: x-api-key: 12345-KLMNO-67890-PQRST
```
**Response:**
```json
{
  "_id": "664af6fbc6132afbc53b7f92",
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

---

### Search by Name
**Request:**
```
GET http://localhost:3000/api/products/search?name=chair
Headers: x-api-key: 12345-KLMNO-67890-PQRST
```
**Response:**
```json
[
  {
    "_id": "665af6fbc6132afbc53b7f99",
    "id": "10",
    "name": "Office Chair",
    "description": "Ergonomic office chair with lumbar support",
    "price": 150,
    "category": "furniture",
    "inStock": true,
    "__v": 0
  }
]
```

---

### Get Product Statistics by Category
**Request:**
```
GET http://localhost:3000/api/products/stats
Headers: x-api-key: 12345-KLMNO-67890-PQRST
```
**Response:**
```json
[
  { "_id": "electronics", "count": 2 },
  { "_id": "furniture", "count": 2 }
]
```

---

## 🌱 Environment Variables

See `.env.example` for required variables.

---

## 🛠️ Notes

- All product data must include: `id`, `name`, `description`, `price`, `category`, `inStock`.
- Use the MongoDB `_id` for routes that require a product ID.
- Error responses will include a message and appropriate HTTP status code.
- You can use [Postman](https://www.postman.com/) or `curl` to test the API endpoints.  
  Remember to include the `x-api-key` header in every request.

---

## 📄 License

MIT
```

```env
MONGO_URI=mongodb://localhost:27017/productdb
API_KEY=12345-KLMNO-67890-PQRST
PORT=3000
```
