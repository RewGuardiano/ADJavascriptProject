import PouchDB from 'pouchdb-browser';

// Local database for the application
const localDB = new PouchDB('local_basketball');

// Remote Cloudant database
const remoteDB = new PouchDB('https://6be2ff1e-6aa5-4784-a0e3-1f87b35cf637-bluemix.cloudantnosqldb.appdomain.cloud/basketball', {
    fetch: function (url, opts) {
        opts.headers.set('Authorization', 'Bearer eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJpYW0tU2VydmljZUlkLTRhZTc2OGQ4LWM3MDItNDc0YS04Yjk4LWVlNTE2ZjExODZlNyIsImlkIjoiaWFtLVNlcnZpY2VJZC00YWU3NjhkOC1jNzAyLTQ3NGEtOGI5OC1lZTUxNmYxMTg2ZTciLCJyZWFsbWlkIjoiaWFtIiwianRpIjoiNWFmZmYwOTUtOTM1ZS00Njg0LThmOTctMTQ5NDlhZjhkOTRlIiwiaWRlbnRpZmllciI6IlNlcnZpY2VJZC00YWU3NjhkOC1jNzAyLTQ3NGEtOGI5OC1lZTUxNmYxMTg2ZTciLCJuYW1lIjoiU2VydmljZS1jcmVkZW50aWFscy0xIiwic3ViIjoiU2VydmljZUlkLTRhZTc2OGQ4LWM3MDItNDc0YS04Yjk4LWVlNTE2ZjExODZlNyIsInN1Yl90eXBlIjoiU2VydmljZUlkIiwiYXV0aG4iOnsic3ViIjoiU2VydmljZUlkLTRhZTc2OGQ4LWM3MDItNDc0YS04Yjk4LWVlNTE2ZjExODZlNyIsImlhbV9pZCI6ImlhbS1TZXJ2aWNlSWQtNGFlNzY4ZDgtYzcwMi00NzRhLThiOTgtZWU1MTZmMTE4NmU3Iiwic3ViX3R5cGUiOiJTZXJ2aWNlSWQiLCJuYW1lIjoiU2VydmljZS1jcmVkZW50aWFscy0xIn0sImFjY291bnQiOnsidmFsaWQiOnRydWUsImJzcyI6ImQ3OTU3Zjc1MjkyYzQyOGY4NDhjZjhkMzZiODQ1NDczIiwiZnJvemVuIjp0cnVlfSwiaWF0IjoxNzI5OTk0NzI3LCJleHAiOjE3Mjk5OTgzMjcsImlzcyI6Imh0dHBzOi8vaWFtLmNsb3VkLmlibS5jb20vaWRlbnRpdHkiLCJncmFudF90eXBlIjoidXJuOmlibTpwYXJhbXM6b2F1dGg6Z3JhbnQtdHlwZTphcGlrZXkiLCJzY29wZSI6ImlibSBvcGVuaWQiLCJjbGllbnRfaWQiOiJkZWZhdWx0IiwiYWNyIjoxLCJhbXIiOlsicHdkIl19.STF_r2dKhKBgEZw_uI_EAVccJXRXAOvVqQ9WU7UinFBuUNxy3W22sqlenRDD9QVHadCsGwvQRgfkuNRc1xpjt4HlScSqvPE3S1Hzk04-AKpgo8XODRwpy3CBEKC9F2PpnN1JSQFNnnQF1D7cBQsyhQjmlRFxRw9rSo51q8nBZfpmCgLYDdZIHEMy2eo6IvHK2X0CGLTOwvfqn_YQfvS06X-66_TSMgIAOvHyk1Fz2jUAvc3DuUG0b05e_guag2v0diLC3sg4Jzb7dccfZPX4djwafPsWMGaj8B3lmVZvVmCzwZlcbko2hyDoHp_scO9rwxpiCV-Xi2Z77ycdW7WuDQ');  // Use Bearer token for authentication
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