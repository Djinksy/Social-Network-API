const { connect, connection} = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/socialmediaDB';
// connect local connection
connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// Export connection
module.exports = connection;