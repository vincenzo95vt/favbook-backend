
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition:{
        openapi:'3.0.0',
        info: {
            title:"FAVBOOK",
            version: "1.0.0",
            description: "Descripcopn de la api",
        },
        Server: {
            url:"http://localhost:4000",
            description: "Servidor local",
        },
    },
    apis:['./routers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;