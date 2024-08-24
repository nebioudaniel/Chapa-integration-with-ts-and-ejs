Here's a polished `README.md` file for your project:

```markdown
# Simple E-Commerce with Chapa Integration

This project is a simple e-commerce application built using TypeScript, Express, and EJS. It integrates with Chapa for payment processing.

## Features
- **Express Server**: Handles routing and serves HTML pages.
- **EJS Templates**: Renders dynamic views.
- **Chapa Payment Integration**: Manages payment creation and verification.

## Prerequisites
- Node.js (version 16 or higher recommended)
- TypeScript
- A Chapa account for obtaining an API key

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/simple-ecommerce-ts.git
cd simple-ecommerce-ts
```

### 2. Install Dependencies

Make sure you have npm or yarn installed. Run:

```bash
npm install
```

or

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project with the following content:

```
PORT=4400
CHAPA_URL=https://api.chapa.co/v1/transaction/initialize
CHAPA_AUTH=your_chapa_secret_key_here
```

Replace `your_chapa_secret_key_here` with your actual Chapa secret key.

### 4. Build the Project

Compile the TypeScript code to JavaScript:

```bash
npx tsc
```

### 5. Run the Application

Start the server:

```bash
npm start
```

or

```bash
yarn start
```

### 6. Test the Application

Open your browser and navigate to `http://localhost:4400` to view the application.

- **Home Page**: GET `/` - Displays the main page.
- **Payment Endpoint**: POST `/api/pay` - Initiates a payment request.
- **Verify Payment**: GET `/api/verify-payment/:id` - Verifies the payment status.
- **Payment Success**: GET `/api/payment-success` - Displays a success message upon successful payment.

## Directory Structure
- **src/**                # TypeScript source files
  - `server.ts`         # Main application file
  - **views/**            # EJS template files
- **dist/**               # Compiled JavaScript files
- **.env**                # Environment variables
- **package.json**        # NPM dependencies and scripts
- **tsconfig.json**       # TypeScript configuration
- **README.md**           # Project documentation
```

Replace `https://github.com/your-username/simple-ecommerce-ts.git` with your actual repository URL and update any other project-specific details as needed.
