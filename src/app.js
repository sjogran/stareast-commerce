const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const routes = require("./routes");

const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());
app.use("/api", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
