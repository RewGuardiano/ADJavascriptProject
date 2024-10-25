
import PouchDB from 'pouchdb';

const localDB = new PouchDB('my_local_db');
const remoteDB = new PouchDB('http://admin:mtu12345@localhost:5984/basketball');

localDB.sync(remoteDB, {
    live: true,  
    retry: true  
  });
  
  export default localDB;