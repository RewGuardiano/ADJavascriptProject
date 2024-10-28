import PouchDB from 'pouchdb-browser';

// Local database for the application
const localDB = new PouchDB('local_basketball');

// Remote Cloudant database
const remoteDB = new PouchDB('https://apikey-v2-o1192ammkft6x6e634otergxx8rrfqpp83iwkpgyekc:af70ca394e28050210dfc260517cdfb3@c9a22fcd-e3ef-48a3-8811-57e4e50c27fb-bluemix.cloudantnosqldb.appdomain.cloud', {
    fetch: function (url, opts) {
        opts.headers.set('Authorization', 'Bearer eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJpYW0tU2VydmljZUlkLTA2ODczOWFmLTNiYjctNDQ0NS05MjdhLTJhOWFkMzZiNzhmNiIsImlkIjoiaWFtLVNlcnZpY2VJZC0wNjg3MzlhZi0zYmI3LTQ0NDUtOTI3YS0yYTlhZDM2Yjc4ZjYiLCJyZWFsbWlkIjoiaWFtIiwianRpIjoiYTc0MjU3ZjktNmFmNi00ZWZmLWFhYTEtZjJjOWJmNWI1YzkzIiwiaWRlbnRpZmllciI6IlNlcnZpY2VJZC0wNjg3MzlhZi0zYmI3LTQ0NDUtOTI3YS0yYTlhZDM2Yjc4ZjYiLCJuYW1lIjoiU2VydmljZS1jcmVkZW50aWFscy0xIiwic3ViIjoiU2VydmljZUlkLTA2ODczOWFmLTNiYjctNDQ0NS05MjdhLTJhOWFkMzZiNzhmNiIsInN1Yl90eXBlIjoiU2VydmljZUlkIiwiYXV0aG4iOnsic3ViIjoiU2VydmljZUlkLTA2ODczOWFmLTNiYjctNDQ0NS05MjdhLTJhOWFkMzZiNzhmNiIsImlhbV9pZCI6ImlhbS1TZXJ2aWNlSWQtMDY4NzM5YWYtM2JiNy00NDQ1LTkyN2EtMmE5YWQzNmI3OGY2Iiwic3ViX3R5cGUiOiJTZXJ2aWNlSWQiLCJuYW1lIjoiU2VydmljZS1jcmVkZW50aWFscy0xIn0sImFjY291bnQiOnsidmFsaWQiOnRydWUsImJzcyI6ImQ3OTU3Zjc1MjkyYzQyOGY4NDhjZjhkMzZiODQ1NDczIiwiZnJvemVuIjp0cnVlfSwiaWF0IjoxNzMwMDcxMzUzLCJleHAiOjE3MzAwNzQ5NTMsImlzcyI6Imh0dHBzOi8vaWFtLmNsb3VkLmlibS5jb20vaWRlbnRpdHkiLCJncmFudF90eXBlIjoidXJuOmlibTpwYXJhbXM6b2F1dGg6Z3JhbnQtdHlwZTphcGlrZXkiLCJzY29wZSI6ImlibSBvcGVuaWQiLCJjbGllbnRfaWQiOiJkZWZhdWx0IiwiYWNyIjoxLCJhbXIiOlsicHdkIl19.YO07Ck8vsgtFCT1oxPwTnWE07yvG_lOaaXVCprkEE1Qrhu1vQxxFPG67enMxPEvx_PUWc2o2Rx2fiqPaTi8CxFrW632HL3dJdWtAfRgTEB6rjuOAF8PPjzNPbuwwvyvGFJr3j7my7etp_9hceVWilkXl49XO28PxOdUMaBi2cJ8gry8JvnzYe9Pcx8kVSP7VL8XixETRif4xqpuc4zYfusG7umSQDhiec-qpP9fDaPF1EQz8o0SyptF8CzZENJG_hIVU1EeAu9DCbZJj58Uk03FikwzARo6GxR0Nb3L4o1gpV4IwOhmr0R8A5CwjRdNYTqVZbrat_x2qhdaCB-0hWg');  // Use Bearer token for authentication
        return PouchDB.fetch(url, opts);
       
    }
});

// Set up continuous two-way sync
localDB.sync(remoteDB, {
    live: true,
    retry: true
}).on('change', (info) => {
    console.log('Data change detected:', info);
}).on('error', (err) => {
    console.error('Sync error:', err);
});
