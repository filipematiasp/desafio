require('dotenv').config();
const express = require('express');
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swagger.js')

const router = require('./routes/router.js');

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use('/', router);

app.listen(port || 8080, () => {
    console.log(`Listening on port ${port}`);
});
