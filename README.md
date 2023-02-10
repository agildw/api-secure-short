# api-secure-short
This repository contains the backend code for the secure-short application. The secure-short application is a tool for generating short links that can be password protected or not.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Before you begin, make sure you have the following software installed on your computer:
- Git
- Node.js
- npm

### Installation
Follow these steps to set up the project on your local machine:
1. Clone the repository to your local machine:

```
git clone https://github.com/<your_username>/api-secure-short.git
```

2. Change into the repository directory:

```
cd api-secure-short
```

3. Install the required packages:
```
npm install
```

4. Start the development server:
```
npm start
```

The backend should now be running on `http://localhost:3000`.

## API Endpoints
The following endpoints are available in the API:
- `GET /links`: Retrieve a list of all links generated by the application.
- `POST /links`: Create a new link. The request body should contain the following parameters:
  - `url`: The original URL that the short link should redirect to.
  - `password` (optional): A password that should be required to access the short link.
- `GET /links/:id`: Retrieve information about a specific link, specified by its `id`.
- `PUT /links/:id`: Update a specific link, specified by its `id`. The request body should contain the parameters that should be updated.
- `DELETE /links/:id`: Delete a specific link, specified by its `id`.

## Built With
- [Node.js](https://nodejs.org/) - The backend framework used.
- [Express.js](https://expressjs.com/) - The web framework used for building the API.
- [MongoDB](https://www.mongodb.com/) - The database used for storing the links.

## Contributing
If you're interested in contributing to the project, please follow these guidelines:
1. Fork the repository.
2. Create a new branch for your changes.
3. Make the changes and commits.
4. Push the changes to your fork.
5. Submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
