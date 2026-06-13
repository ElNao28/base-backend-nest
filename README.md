# NestJS Backend Base

A starter backend template built with NestJS that includes common features required by most applications, such as authentication, user management, email services, file uploads, role-based authorization, and database migrations.

## Features

- JWT Authentication
- Role-Based Access Control (RBAC)
- User Management
- Email Service
- File Uploads
- PostgreSQL Integration
- Database Migrations
- Environment Configuration
- Docker Support
- Swagger API Documentation

## Requirements

Before running the project, make sure you have the following tools installed:

- [Git](https://git-scm.com/) (required to clone the repository)
- [Node.js](https://nodejs.org/en/download) (recommended version: 22.x or higher)
- [Nest CLI](https://docs.nestjs.com/) (`npm install -g @nestjs/cli`)
- [Docker](https://www.docker.com/) (optional)

## Clone Repository

```bash
$ git clone https://github.com/ElNao28/base-backend-nest.git
$ cd base-backend-nest
```

## Install Dependencies

Using pnpm:

```bash
$ pnpm install
```

Using npm:

```bash
$ npm install
```

## Create Environment File

Create a `.env` file in the project root directory and copy the contents of `.env.example`.

```text
root
├── migrations
├── src
├── test
├── .env.example
├── .env
├── docker-compose.yml
└── ...
```

Configure the required environment variables with your own credentials and settings.

## Run Docker Services (Optional)

If you want to run PostgreSQL and pgAdmin using Docker, execute:

```bash
$ docker compose up -d
```

This command will create and start the required containers.

## Run Database Migrations

After installing dependencies, configuring environment variables, and starting the database, run:

```bash
$ pnpm run migration:run
```

This command creates the base database structure, including tables such as users and roles, and inserts the default roles.

## Start the Application

Run the project in development mode:

```bash
$ pnpm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

## API Documentation

If Swagger is enabled, you can access the API documentation at:

```text
http://localhost:3000/api/docs
```

## Available Scripts

```bash
# Development
pnpm run start:dev

# Production
pnpm run start:prod

# Build project
pnpm run build

# Run migrations
pnpm run migration:run

# Generate migration
pnpm run migration:generate
```

## License

This project is licensed under the MIT License.
