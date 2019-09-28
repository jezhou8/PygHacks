import app from 'firebase/app';
import 'firebase/firestore';
import config from './firebaseCred';


class Firebase {
	constructor() {
		app.initializeApp(config);
		this.db = app.firestore();
	}

	getDB = () => this.db;
}



export default Firebase;