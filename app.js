const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const connectDB = require('./config/db');
const isAuth = require('./middleware/is-auth');


const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
    '/graphql',
    graphqlHttp({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true
    })
  );


// Database Connection
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

