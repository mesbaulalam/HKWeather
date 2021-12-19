![Mongoose](https://img.shields.io/badge/MongoDB-6.1.2-fcba03)
![Express](https://img.shields.io/badge/Express-^4.17.2-green)
![NodeJS](https://img.shields.io/badge/NodeJS-17.0.0-red)

## Running the application:

1. Clone the repository
2. npm install
3. npm run devStart
4. The server will run at port 3000. Go to postman to test the requests.
5. First, we need to authenticate. Go to localhost:3000/login and send a POST request with the following body:

```
{
    username: AppIt
}
```

Any valid username will work for the authentication 6. Copy the received Token and paste it in the Bearer Authentication header of your consequent requests. You do not need to type Bearer in front of the token. Just pasting the token will suffice. 7. Make a GET request to localhost:3000/weather. You will either see a response from the API, or data being pulled from the database incase the API is down.
