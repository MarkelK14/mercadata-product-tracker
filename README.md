# Mercadata Product Tracker

Mercadata Product Tracker is a powerful application for tracking products, prices, and availability across an online store.

## Table of Contents
- [Mercadata Product Tracker](#mercadata-product-tracker)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Features
- Track products by EAN and subcategory
- Manage product photos
- Store and retrieve historical price data
- Insert or update product information
- Retrieve product and price information for analytics

## Tech Stack
- Node.js
- Express.js
- MySQL
- JavaScript (ES6+)

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/MarkelK14/mercadata-product-tracker.git
   ```
2. Enter the project directory:
   ```bash
   cd mercadata-product-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
1. Copy the example environment file and update it with your settings:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` to set your database credentials and other environment variables.

## Usage
1. Start the application:
   ```bash
   npm start
   ```
2. Access the dashboard at [http://localhost:3000](http://localhost:3000).

## Folder Structure
```
mercadata-product-tracker/
├── src/
│   ├── api/            # API logic and handlers
│   ├── config/         # Database and application configuration
│   ├── repositories/   # Database access and queries
│   └── services/       # Business logic and services
├── .env.example        # Example environment variables
├── index.js            # Application entry point
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

## Contributing
Contributions are welcome! Please open an issue or pull request for suggestions or improvements. Make sure to follow the code style and add relevant tests.

## License
This project is licensed under the MIT License.