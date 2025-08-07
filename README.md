# eShuri - Digital Learning Platform

**eShuri** is a web platform designed to bridge Rwanda’s education gap by providing curriculum-aligned lessons, assessments, and collaborative tools for secondary school students.

---

## Features

- **Modern Frontend**: A responsive and user-friendly interface built with **React**, **Vite**, and **Tailwind CSS** (using shadcn/ui).
- **Scalable Backend**: Powered by **Supabase** for database (PostgreSQL), authentication, and instant APIs.
- Continuous Integration (CI) pipeline configured with GitHub Actions to ensure code quality
- Linting and unit testing automated on Pull Requests
- Modular and scalable codebase designed for easy extension
- Infrastructure prepared for containerization and cloud deployment (next phases)

---

## Project Structure

```
ishuri-app/
├── public/           # Static assets
├── src/              # Main application source code (React components, etc.)
├── supabase/         # Supabase migrations and configuration
├── terraform/        # Terraform files for Azure infrastructure
├── .dockerignore
├── Dockerfile        # Production Docker configuration
├── package.json
└── vite.config.ts    # Vite configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 20 or higher recommended)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/munyaneza-w/ISHURI-APP.git 
   cd e-shuri-connect
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the App Locally

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Running with Docker

To run the application using Docker, ensure you have Docker installed.

1. Build the Docker image:
   ```bash
   docker build -t eshuri-app .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 -d eshuri-app
   ```

The application will be accessible at http://localhost:8080.

## Running Tests

Run unit tests with:

```bash
npm test
```

## Linting

Check code styles and errors with:

```bash
npm run lint
```

## Continuous Integration

This project uses GitHub Actions for Continuous Integration. Every Pull Request triggers the following checks:

Dependency installation

Code linting with ESLint

Running unit tests

## Contributing
Contributions are welcome! Please:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes and open a Pull Request for review.

## License

This project is licensed under the ISC License.

## Contact

For questions or support, open an issue on GitHub or contact me at w.munyaneza134@gmail.com.