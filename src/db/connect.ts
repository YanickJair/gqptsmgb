import { connect } from 'mongoose';

const CONFIG =  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false };

/**
 * @version 1.0
 * @author Yanick Andrade
 * 
 * @description create a new connection to the DB
 * @param dbname name of the Database
 * @param host hos address
 * @param port PORT number
 * @param pwd  user's password
 * @param user username
 */
export async function Connect(dbname: String, host: String, port: number, pwd?: String, user?: String) {
  let uri = `mongodb://${host}:${port}/${dbname}`;
  
  if (user && pwd)
    uri = `mongodb://${user}:${pwd}@${host}:${port}/${dbname}`;

  setTimeout(async () => {
    await connect(uri, CONFIG);
  }, 6000);;
}