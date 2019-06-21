const app = require('express')();
const MongoClient = require('mongodb').MongoClient;

const port = 3000;
const url = 'mongodb+srv://poll-user-admin:Arrow123!@cluster0-tdxml.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'RealTimePolling';

const client = new MongoClient(url, { useNewUrlParser: true });

async function getOptions() {
	try {
		await client.connect();
		const db = client.db(dbName);
		const col = db.collection('options');
		const docs = await col.find({}).toArray();
		console.log('=========  docs  =========');
		console.log(docs);
        console.log('=====  End of docs>  =====');
        client.close();
		return docs;
	} catch (err) {
        console.log(err.stack);
        client.close();
		return err.stack;
	}
}

getOptions().then(solution => console.log('solution', solution));

app.listen(port, () => {
	console.log(`App running in port ${port}`);
})
