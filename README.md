<a id="readme-top"></a>

## About The Project

API for Library Management

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- Node.js
- NestJS
- Sequelize
- SQLite

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features

- Books management
- Members management
- Book check in and check out
- Reports

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- yarn

### Installation

1. Clone the repo
2. Install packages
   ```sh
   yarn install
   ```

### Running

```sh
yarn start
```

### Testing

```sh
yarn test -i ./src/books/books.controller.spec.ts
yarn test -i ./src/books/books.service.spec.ts
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

_Please refer to the Swagger docs generated and available in `http://localhost:3000/docs`_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

### Features

- [ ] Manage book copies
- [ ] Allow multiple authors per book
- [ ] Soft deletes
- [ ] Filters
- [ ] Pagination
- [ ] Wait list
- [ ] Notification (remimders, availability, etc)

### Security

- [ ] Protect endpoints
- [ ] Improve payload validation
- [ ] Expose "public" IDs (UUIDs or similar)
- [ ] Migrate configuration to `.env` files

### Architecture

- [ ] Migrate to another database

### Documentation

- [ ] Map every endpoint and property for Swagger

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
