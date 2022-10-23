# JWT Key for REST API Token verification

## Generate Key Pair

The key pair to be used should be using algo "RS256". To generate it, use this command:

```shell
# Generate a private key
openssl genpkey -algorithm RSA -out jwt.key -pkeyopt rsa_keygen_bits:4096

# Derive the public key from the private key
openssl rsa -pubout -in jwt.key -out jwt.key.pub
```

## Deploy the Key Pair

The key pair need to be mounted to the Docker container when deploying to production. 

* The private key should be mounted to container at path:

    /app/programs/server/assets/app/jwt_keys/jwt.key

* The public key should be mounted to container at path:

    /app/programs/server/assets/app/jwt_keys/jwt.key.pub

## Generate API Token from Key Pair

Using a simple nodeJS script to generate a token using the private key: (replace '/path/to/jwt.key' with actual value). 

> The script requires nodeJS module: jwt-simple

```javascript
'strict';

const jwt = require('jwt-simple');
const fs = require('fs');
const key = fs.readFileSync('/path/to/jwt.key');

var token = jwt.encode({sub: 'awsUser'}, key.toString(), 'RS256');
console.log(token);
```
