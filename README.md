# Synapsis FE Test

This project is a front-end application built as a technical test for PT Synapsis Sinergi Digital. The application is developed using modern web technologies to provide a dynamic and responsive user experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management:**
  - Create, Read, Update, and Delete (CRUD) operations for users.
  - Search functionality to filter users by name or email.
- **Blog Posts:**
  - List and detail views for blog posts.
  - Pagination support for browsing through posts.
  - Display comments associated with each post.

## Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Data Fetching:** React Query
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Icons:** Lucide Icons
- **UI Components:** Custom components and Shadcn UI

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/derrydwi/synapsis-fe-test.git
   cd synapsis-fe-test
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Create a `.env` or `.env.local` file and add your environment variables:
   ```env
   TOKEN=your_go_rest_co_in_token_here
   NEXT_PUBLIC_TOKEN=your_go_rest_co_in_token_here
   ```

## Usage

- To run the development server:

  ```bash
  npm run dev
  # or
  yarn run dev
  # or
  pnpm run dev
  # or
  bun run dev
  ```

- To run the production server:

  ```bash
  npm run build
  # or
  yarn run build
  # or
  pnpm run build
  # or
  bun run build
  ```

Open http://localhost:3000 with your browser to see the result.

## API Endpoints

This application interacts with the GoREST API to perform various operations. Below are some key endpoints:

- Users:

  - GET /users - Fetch a list of users.
  - GET /users/:id - Fetch a user by ID.
  - POST /users - Create a new user.
  - PUT /users/:id - Update a user by ID.
  - DELETE /users/:id - Delete a user by ID.

- Posts:

  - GET /posts - Fetch a list of posts.
  - GET /posts/:id - Fetch a post by ID.
  - GET /posts/:id/comments - Fetch comments for a post by ID.

## Components

- **UserCard**: Displays user information in a card layout.
- **Pagination**: Handles pagination for lists.
- **PostDetail**: Shows details of a post, including comments.
- **FormUser**: Manages the form for creating and updating users.
- **Dialog**: Modal dialog component for various interactions.
- **Button, Input, Avatar**: Custom UI elements for consistent design.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature/YourFeature).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
