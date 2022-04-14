# Minesweeper

![](https://minesweeper1.s3.us-east-2.amazonaws.com/minesweeper_playing_game.gif)

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

Clone and access the Project
------------
    `git clone https://github.com/georgericardo26/Minesweeper`

    or 

    `gh repo clone georgericardo26/Minesweeper`

    `cd Minesweeper/`

Setup and Run Server
------------
Access the server folder
`cd server/`

Make sure you already has docker and docker-compose installed.

    `apt  install docker.io`

    `apt install docker-compose`

Before proceed to up the application, we need insert the env vars, for this 
open the env file in `/envs/local.env` and add:
```
DJANGO_SECURITY_KEY=django-insecure-d78p_i#m679#_c5mq*!uyikc1h80f$-_b(q3(1*azwzl=0d9z_
SETTINGS_ENV=minesweeper.settings.base
DJANGO_DEFAULT_USERNAME=admin
DJANGO_DEFAULT_EMAIL=admin@admin.com
DJANGO_DEFAULT_PASSWORD=admin
POSTGRES_USER=minesweeper
POSTGRES_NAME=minesweeper
POSTGRES_PASSWORD=minesweeper
POSTGRES_HOST=db_postgres
```

Once you already have the docker installed and and the `local.env` file filled, you can init the services performing:

    `make up`

Now, check your backend application running on http://localhost

For stop the containers, you shold use:

    `make down`


Once you already have your application running locally, you need create the `client_id` and `client_secret` for your client application.

Access http://localhost/admin and signin using the credential:

email: `admin@admin.com` 
password: `admin`
 
Now follow the video below:
![](https://minesweeper1.s3.us-east-2.amazonaws.com/minesweeper_djang_admin.gif)


Setup and Run Client
------------
Access the client folder:

`cd client/`

Inside the client root folder, you need create a `.env` file with the follow:

```
REACT_APP_MINESWEEPER_API_CLIENT_ID={PASTE_YOUR_CLIENT_ID_YOU_CREATED}
REACT_APP_MINESWEEPER_CLIENT_SECRET={PASTE_YOUR_CLIENT_SECRET_YOU_CREATED}
REACT_APP_HOST=localhost

```

Now, install and run your application

`npm install`

`npm start`

Check your frontend application running on http://localhost:3000

![](https://minesweeper1.s3.us-east-2.amazonaws.com/minesweeper_playing_game.gif)


Any questions, send me an email for `georgericardo26@gmail.com`