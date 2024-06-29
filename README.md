# Food delivery Web Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)



## Introduction
This is a full-stack food delivery web application built with the MERN (MongoDB, Express.js, React, Node.js) stack. The application allows users to browse products, add items to the cart, and make purchases. Admin users can manage products, orders, and user information.

The application is hosted on Render. You can visit it [here](https://food-delivery-frontend-u8jx.onrender.com).

## Features
- User authentication and authorization (JWT)
- Product listing and details
- Shopping cart functionality
- Add, remove, and update product quantities in the cart.
- Search items functionality based on the menu
- product review and rating
- Chapa payment Integration
- Order management
- User profile management
- Admin dashboard for managing products and orders
- 
- Responsive design

## Technologies Used
- **Frontend**: React,React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Hosting**: Render 

## Installation
### Prerequisites
- Expressjs and npm installed
- MongoDB installed and running

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/food-delivery.git
    cd food-delivery
    ```

2. Navigate to the backend directory:
    ```bash
    cd backend
    ```

3. Install backend dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
   
    JWT_SECRET=your JWT secret
    CHAPA_SECRET_KEY=your chapa secret key

    ```

5. Start the backend server:
    ```bash
    npm run server
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm run dev
    ```

## Configuration
- **MongoDB**: Ensure MongoDB is running locally or use a cloud MongoDB service (e.g., MongoDB Atlas).
## Usage
1. Register as a new user or log in with existing credentials.
2. Browse the product catalog.
3. Add products to the cart and proceed to checkout.
4. Admin users can log in to the admin dashboard to manage products and orders.

## Demo on how to use the website
![Frontend Screenshot](https://i.imgur.com/XKFc6WV.png)




