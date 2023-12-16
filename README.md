## Kapitsa's Pendulum

## Description

This is a Django web application project designed to run within a Docker environment. This project implements a computer model of the kapitsa pendulum, with its help you can study the operation of this pendulum by changing its parameters in real time.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Contributing](#contributing)

## Installation

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed on your system:

- Docker
- Docker Compose
- Nginx

### Clone the Repository

```bash
git clone https://github.com/your-username/django-docker-project.git
cd django-docker-project
```

### Build and Run Docker Containers for develop

```bash
docker-compose up --build 
```
### Build and Run Docker Containers for prod

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

This command will build the Docker images and start the containers. You can access the Django application at `http://localhost:8000`.


## Configuration

You can change the environment variables, they are located in .env

## Contributing

If you would like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Description of changes'`.
4. Push your changes to the branch: `git push origin feature-name`.
5. Open a pull request.


This project is licensed under the [License Name] - see the [LICENSE.md](LICENSE.md) file for details.


## Contact

If you have any questions or issues, please contact Timur at [tmyaldzin13@gmail.com].

