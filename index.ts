import express, { Application } from 'express'
import { graphqlHTTP } from 'express-graphql';

import { DBNAME, HOST, PORT, PWD, USER } from "./src/db-data";
import { Connect } from "./src/db/connect";
import { Schema } from './src/gql/schema';


//* connect to our DB, if connection success, launch our API
Connect(DBNAME, HOST, PORT).then(
    () => {
        const app: Application = express();

        app.use('/api', graphqlHTTP({
            schema: Schema,
            graphiql: true
        }));
        
        app.listen(9000);
        console.info(`Server running: http://localhost:9000/api`);
    }
  ).catch(
    err => {
        console.log(err)
      throw new Error(err)
    }
  );