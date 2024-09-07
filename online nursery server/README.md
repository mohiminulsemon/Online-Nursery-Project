<div align="center">
  <h1>Nursery Website Backend and Frontend</h1>
</div>

---

## Introduction

A comprehensive nursery website where users can browse and purchase various plants and gardening products. The website supports product management, order creation, and a shopping cart, with payment options integrated for smooth transactions.

## Project Description

This project is a full-stack web application that allows users to browse products, add them to the cart, and place orders with multiple payment options, including Stripe and Cash on Delivery (COD). The admin can manage products and categories, including adding, updating, and deleting items. The project also includes features like real-time UI updates, pagination, filtering, and search functionality to improve the user experience.

### Live link : https://onlinenursery.netlify.app/

## Features

### Public Routes 🚀

- All routes on the website are accessible without authentication.

### Product and Category Management 🛠️

- **Product List Table**: Display products in a table format, including columns for the image, title, price, category, and actions.
- **Action Buttons**: Update and delete products. Opening forms and confirmation modals for modifying and removing products.
- **Adding Products**: Form to add new products with fields like category, title, price, quantity, description, rating, and image.
- **Real-time Updates**: UI reflects changes in real-time, with optimistic updates.

### Product Browsing 🌿

- **Filtering, Pagination, Sorting, and Searching**: Advanced filtering, pagination, and sorting for easier product browsing.
- **Product Details**: Detailed information view of a product.

### Shopping Cart 🛒

- **Add to Cart**: Add products to the cart with quantity management and stock checking.
- **Proceed to Checkout**: Move to checkout from the cart section.

### Checkout and Payment 💳

- **Order Creation**: Orders are created in the database with customer details and stock is automatically updated.
- **Payment Options**:
  - **Stripe Integration**: Secure online payments with Stripe.js.
  - **Cash on Delivery (COD)**: Option to pay in cash upon delivery.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js, MongoDB
- **Other Technologies**: Stripe.js, ImgBB for image uploads

## Backend Routes

### Product Routes

- `POST /create-product` - Create a new product.
- `GET /` - Fetch all products.
- `GET /:productId` - Fetch a single product by ID.
- `PATCH /:productId` - Update a product by ID.
- `DELETE /:productId` - Delete a product by ID.

### Category Routes

- `POST /create-category` - Create a new category.
- `GET /` - Fetch all categories.
- `GET /:categoryId` - Fetch a single category by ID.
- `PATCH /:categoryId` - Update a category by ID.
- `DELETE /:categoryId` - Delete a category by ID.

### Order Routes

- `POST /create-order` - Create a new order.
- `GET /` - Fetch all orders.

## Installation Guideline

### Prerequisites

- Node.js
- MongoDB
- Any package manager (npm or yarn)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/mohiminulsemon/Online-Nursery-Project.git
   cd nursery-website
