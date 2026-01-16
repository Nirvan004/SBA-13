Product API
Overview

The Product API is a RESTful backend service built with Node.js, Express, and MongoDB (via Mongoose). This API serves as the backbone for an online store, enabling internal tools and the public-facing website to manage and display a complex product inventory.
The project demonstrates advanced backend concepts including:
CRUD operations for product management
Data validation with Mongoose schemas
Dynamic filtering, sorting, and pagination
Robust error handling and response management

Users Can:
Create new products in the inventory
Retrieve single or multiple products
Update product details
Delete products from the catalog
Filter, sort, and paginate product listings

Features
Full CRUD functionality: Create, Read, Update, Delete products
Advanced querying: Filter by category, price range; sort by price or other fields
Pagination: Efficiently navigate large product catalogs
Data validation: Ensures all products meet schema requirements
Robust error handling: Returns descriptive errors for invalid requests
JSON API responses: Standardized response format for all endpoints

Tech Stack
Node.js – JavaScript runtime
Express – Web framework for building RESTful APIs
MongoDB Atlas – Cloud database
Mongoose – MongoDB object modeling
dotenv – Environment variable management
Postman – API testing

State Management & Data Handling

Uses Mongoose models to define product schema and enforce data validation
Dynamically builds queries based on request parameters for filtering, sorting, and pagination
Standardized JSON responses with appropriate HTTP status codes
Handles invalid requests gracefully (400, 404, 500)

Additional Notes
Built for scalability: Supports large product catalogs
JSON responses make it compatible with any frontend framework
Can be extended to support authentication, order management, and more
Deployed backend can be connected to public frontend (React, Vue, etc.)
