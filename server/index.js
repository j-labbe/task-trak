const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();

connectDB();

app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, console.log(`Server running on port ${port}`));
