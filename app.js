const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://poll-user-admin:Arrow123!@cluster0-tdxml.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'RealTimePolling';

const client = new MongoClient(url, { useNewUrlParser: true });

const getOptions = async function getOptions() {
	try {
		await client.connect();
		const db = client.db(dbName);
		const col = db.collection('options');
		const docs = await col.find({}).toArray();
        client.close();
		return docs;
	} catch (err) {
        console.log(err.stack);
        client.close();
		return err.stack;
	}
};

module.exports.getOptions = getOptions;
