# WP-INIT

## Installation

Install WordPlate:

```
composer create-project --prefer-dist vinkla/wordplate example-app
```

Degit this repository:

```
degit wearemarketinglt/wp-init example-app --force
```

Init the project with the desired theme name:

```
chmod +x init.sh
```
```
./init.sh example-theme
```

Instal dependencies:

```
composer update
npm install
```

Update the database credentials and set projects local url in the .env file:

```
DB_NAME=database
DB_USER=username
DB_PASSWORD=password

WP_HOME=http://localhost/example-app/public_html
```

## Developing

Run the developement server:

```
npm run start
```
## Building

Create a production version:

```
npm run build
```
