
import PouchDB from 'pouchdb';
import './cloudantdb';

const localDB = new PouchDB('my_local_db');
const remoteDB = new PouchDB('http://admin:mtu12345@127.0.0.1:5984/basketball');

// Set up sync
localDB.sync(remoteDB, {
    live: true,
    retry: true
});

export default localDB;