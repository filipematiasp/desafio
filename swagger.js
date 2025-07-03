// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Teste Asksuite',
      version: '1.0.0',
      description: 'Documentação da API com Swagger',
    },
  },
  apis:
    ['./routes/*.js',
      './docs/*.js'
    ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
