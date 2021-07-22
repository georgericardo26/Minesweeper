# Minesweeper API

The back-end was made by [George Ricardo](https://github.com/georgericardo26).

Tools
------------
- Python
- Django
- Django Rest Framework
- DRF_yasg
- Open API Documentation
- Oauth2 Authentication
- PostgreSQL
- Docker
- Docker-compose
- RDS (AWS)
- EC2 (AWS)
- Javascript
- ReactJS
- UWSGI

Dependencies
------------
- Python 3.6+
- Django 3.2.5
- For the Server, Django REST Framework 3.7+ is required.
- For the Client, we use node 14.14.* and react 17.0.1.
- For run the server application, it's need have docker installed

Setup and Run Server
------------
First you have to do a download of the docker image:

    `git clone https://github.com/georgericardo26/Minesweeper`

Make sure you already has docker and docker-compose installed.

    `apt  install docker.io`
 
    `apt install docker-compose`

After, you will init the container service:

    `docker-compose -f docker-compose.yml -f server/docker-compose.local.yml up`

Check your backend application running on http://localhost 

Setup and Run Client
------------

    `cd client`
    `npm install`
    `npm start`

Check your frontend application running on http://localhost:3000



