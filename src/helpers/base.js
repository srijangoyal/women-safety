import Rebase from "re-base";
import firebase from "firebase/app";
import database from "firebase/database";
const app = firebase.initializeApp({
    apiKey: "AIzaSyCtekfEsNZYbqu7f0eBTPiOqveGwbBHUkA",
    authDomain: "saferoute-69f04.firebaseapp.com",
    databaseURL: "https://saferoute-69f04.firebaseio.com",
});
const db = firebase.database(app);
export default Rebase.createClass(db);