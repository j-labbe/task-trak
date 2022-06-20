const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const connectDB = require("./config/db");
const cors = require("cors");
const port = process.env.PORT || 3000;
const updateEmail = require("./api/updateEmail");
const updateName = require("./api/updateName");
const log = require("./utils/logger");
const avatar = require("./api/uploadAvatar");
const createUser = require("./api/createUser");
const deleteUser = require("./api/deleteUser");

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// TODO: jwks authentication
app.post("/api/users/updateEmail", updateEmail);
app.post("/api/users/updateName", updateName);
app.post("/api/users/uploadAvatar", avatar);
app.post("/api/users/createUser", createUser);
app.post("/api/users/deleteUser", deleteUser);

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, log(`Server running on port ${port}`));
