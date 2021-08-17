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
- For the Client, we use node 14.14.* and react 17.*.
- For run the server application, it's need have docker installed
- Docker
- Docker-compose
- Support to Makefile


Initial Installation
------------
First you have clone the repository:

    `git clone https://github.com/georgericardo26/Minesweeper`


For Linux, make sure you already has docker and docker-compose installed.

    `apt  install docker.io`

    `apt install docker-compose`


Backend Installation
------------
Create a `.env` file inside the `server/` and add those fields
```yaml

DJANGO_SECURITY_KEY="INSERT_YOUR_KEY_HERE"  # Django key sent for email
SETTINGS_ENV=minesweeper.settings.dev       # To use in case of deploying in stage env
DJANGO_SU_NAME=admin
DJANGO_SU_EMAIL=admin@admin.com
DJANGO_SU_PASSWORD=admin
```
and now,
`make up-backend-local`

Access `http://localhost/api/v1/swagger` to see the dynamic documentation working.


Frontend Installation
------------
Access `http://localhost/admin/`, put username as `admin` and password as `admin`;

Create a new application 
![](https://minesweeper1.s3.us-east-2.amazonaws.com/screenshot1.jpg)
![](https://minesweeper1.s3.us-east-2.amazonaws.com/screenshot2.jpg)


Mark `Client Type` as `public`;
Mark `Authorization Grant Type` as Resouce Owner password-based
Fill the field `Name` as the application name
Click on Save button;

Click on the application created and copy `client_id` and `client_secret`;

Create a new .env file on `client/` and add these lines:
```yaml
REACT_APP_MINESWEEPER_API_CLIENT_ID=YOUR_CLIENT_ID
REACT_APP_MINESWEEPER_CLIENT_SECRET=YOUR_CLIENT_SECRET
REACT_APP_HOST=localhost
```
Next, init the frontend application
`make up-frontend-local`

Test your application accessing `http://localhot:3000`
