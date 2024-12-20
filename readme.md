# Blog Platform Backend

A backend server built using **TypeScript**, **Node.js**, **Express.js**, and **MongoDB with Mongoose**. This API handles user authentication, role-based access control, blog CRUD operations, and provides a public API with advanced features like search, sort, and filter functionalities. The application also includes comprehensive error handling to ensure a smooth user experience.

## 📋 Features

- **Role-Based Access Control**:
  - **Admin**: Can manage users and blogs.
  - **Users**: Can manage their own blogs.
- **Secure Authentication**: Supports login and registration with role differentiation.
- **Password Security**: Uses **bcrypt** to securely hash and store user passwords.
- **Token-Based Authentication**: Utilizes **JWT** to authenticate users before performing CRUD operations.
- **Validation**: Leverages **Zod** for robust schema validation.
- **Public Blog API**: Allows anyone to view blogs with search, sorting, and filtering.
- **Error Handling**: Comprehensive error responses for consistent debugging and user feedback.

---

## 🛠️ Technologies

- **TypeScript**: For type safety and better code maintainability.
- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for building APIs.
- **MongoDB with Mongoose**: For database operations.
- **Zod**: For validating request data and ensuring schema consistency.
- **bcrypt**: For securely hashing and comparing passwords.
- **JWT**: For managing user authentication.
- **ESLint**: Linting tool to enforce consistent coding styles.
- **Prettier**: Code formatter to maintain consistent formatting across the codebase.

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>=14.x.x)
- **MongoDB** (local or hosted, e.g., MongoDB Atlas)
- **Git**
- **TypeScript** (Optional: If you prefer to install globally)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayan-akd/b4-assignment-3-blog-project.git
   cd blog-platform-backend
    ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory and add your MongoDB connection URI:

   ```bash
   NODE_ENV=<development | production>
   PORT=<your_port_number>
   DATABASE_URL=<your_mongodb_connection_string>
   DEFAULT_PASS=<your_default_password>
   BCRYPT_SALT_ROUNDS=<your_bcrypt_salt_rounds>
   JWT_ACCESS_SECRET=<your_jwt_access_secret>
   JWT_ACCESS_EXPIRES_IN=<access_token_expiry_time>
   ```

4. Start the development server:

   ```bash
   npm run start:dev
   ```

The server will run at http://localhost:5000 (or another port if you configure it differently).

## 🛠️ Scripts

The project includes several npm scripts for development and production:

- `npm run start`: Starts the application in production mode.
- `npm run start:dev`: Starts the application in development mode with live reloading using `ts-node-dev`.
- `npm run build`: Builds the application for production.
- `npm run dev`: Watches for changes and compiles TypeScript files automatically.
- `npm run lint`: Lints the codebase using **ESLint**.
- `npm run lint:fix`: Automatically fixes linting errors.
- `npm run format`: Formats the codebase using **Prettier**.
- `npm run format:fix`: Automatically fixes formatting issues with **Prettier**.

## API Endpoints

### Authentication
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user and get a JWT token.

### Blog Management
- **POST /api/blogs**: Create a new blog (requires authentication).
- **PATCH /api/blogs/:id**: Update a blog by its ID (requires authentication).
- **DELETE /api/blogs/:id**: Delete a blog by its ID (requires authentication).
- **GET /api/blogs**: Get all blogs with search, sort, and filter functionalities.

### Admin Actions
- **PATCH /api/admin/users/:userId/block**: Block a user by updating the `isBlocked` property (requires admin privileges).
- **DELETE /api/admin/blogs/:id**: Delete any blog by its ID (requires admin privileges).


## Project Live Link

[Live API](https://b4-assignment-3-blog-project.vercel.app)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the **MongoDB** team for providing a reliable database solution.
- Special thanks to **Zod**, **Prettier**, and **ESLint** for enhancing code quality and maintainability.

Feel free to clone and contribute to this project. If you find any bugs or have suggestions for improvements, feel free to open an issue or pull request!
Happy coding! 🛠️