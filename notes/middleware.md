# Express.js Middleware

Middleware is a function in Express.js that has access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. It can perform a variety of tasks, such as executing code, modifying the request and response objects, ending the request-response cycle, and calling the next middleware in the stack.

## Types of Middleware

1. **Application-Level Middleware**
2. **Router-Level Middleware**
3. **Built-In Middleware**
4. **Third-Party Middleware**
5. **Error-Handling Middleware**

### 1. Application-Level Middleware

This middleware is bound to an instance of the `express` application. It can be used to execute code, modify the request and response objects, and end the request-response cycle.

```javascript
const express = require('express');
const app = express();

// Example of application-level middleware
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next(); // Pass control to the next middleware
});
```


### 2.Router-Level Middleware

Similar to application-level middleware, but this middleware is bound to an instance of express.Router().

``` javascript
const express = require('express');
const router = express.Router();

// Example of router-level middleware
router.use((req, res, next) => {
    console.log(`Router Middleware: ${req.method} ${req.url}`);
    next();
});

// Define routes here
router.get('/example', (req, res) => {
    res.send('This is an example route.');
});

app.use('/api', router);
```

### 3. Built-In Middleware
Express comes with several built-in middleware functions. Some common ones include:

   express.json(): Parses incoming JSON requests and puts the parsed data in req.body.
   express.urlencoded(): Parses URL-encoded data (form submissions).

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

### 4. Third-Party Middleware
There are many third-party middleware packages available for Express. Common examples include:

   morgan: HTTP request logger.
   cors: Enable Cross-Origin Resource Sharing.
   body-parser: Parse incoming request bodies.

```bash
 npm install morgan cors

```   

 ```javascript
 const morgan = require('morgan');
 const cors = require('cors');

 app.use(morgan('combined'));
 app.use(cors());
```  

### 5. Error-Handling Middleware
Error-handling middleware is defined similarly to other middleware, but it has four parameters instead of three: (err, req, res, next). It must be defined after all other middleware and routes.

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```
