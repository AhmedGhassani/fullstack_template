# App Name

## About

Basic info about project here

### Tech Stack

- Next App (Typescript)
- Express JS (Typescript)
- ORM TBD
- MailHog (SMTP Server - Local Testing Only)
- PostgreSQL
- NGINX
- Docker

## Setup

### Requirements

- Docker
- Docker Compose

### Local / Development Environment

1. Install packages for intellisense

```bash
cd services/api
npm install
cd ../web
npm install
```

2. Create SSL Certificates

To generate an SSL certificate for local development, you can use the following command:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ./services/nginx/certs/nginx-selfsigned.key \
  -out ./services/nginx/certs/nginx-selfsigned.crt \
  -subj "/CN=localhost"
```

3. Populate the `.env` file

Copy the `.env.example` file to `.env` and update the values as needed.

```bash
cp .env.example .env
```

4. Start the containers

```bash
docker-compose up -d
```

5. Access the application

Open your browser and navigate to `https://localhost`.

### Production Environment

1. Add SSL Certificates

Add your SSL certificate and private key to the `services/nginx/certs` directory.
You can use a tool like [certbot](https://certbot.eff.org/) to generate and manage your certificates.

2. Populate the `.env` file

Copy the `.env.example` file to `.env` and update the values as needed.

```bash
cp .env.example .env
```

3. Configure nginx config for production

copy local configuration
`cp ./services/nginx/conf.d/default.conf ./services/nginx/production/conf.d/default.conf`

Replace `server_name localhost` with `server_name YOUR_DOMAIN_NAME` in `default.conf`

4. Start the containers

```bash
docker-compose up -d
```

5. Access the application

Open your browser and navigate to `https://localhost`.
