# CRM VSM - Article Management System

## Overview
CRM VSM is a Content Management System (CMS) designed to manage articles efficiently. It provides a user-friendly interface for creating, reading, updating, and deleting articles. The application is built using Node.js for the backend and MongoDB for the database.

## Project Structure
```
crm-vsm
├── src
│   ├── controllers
│   │   └── articleController.js
│   ├── models
│   │   └── article.js
│   ├── routes
│   │   └── articleRoutes.js
│   ├── views
│   │   ├── manage-articles.html
│   │   └── styles
│   │       └── manage-articles.css
│   └── app.js
├── config
│   └── db.js
├── package.json
├── .env
└── README.md
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crm-vsm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory and add your MongoDB connection string:
     ```
     MONGODB_URI=<your_mongodb_connection_string>
     ```

4. **Run the application**
   ```bash
   npm start
   ```

## Usage
- Navigate to `http://localhost:3000/manage-articles` to access the article management interface.
- Use the provided forms to add, edit, or delete articles.

## Features
- Create, read, update, and delete articles.
- User-friendly interface for managing articles.
- MongoDB for data storage.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.