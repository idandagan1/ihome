const firebase = require('firebase');
const serviceAccount = require('./ihome-firebase.json');

const fire = firebase.initializeApp(serviceAccount);

module.exports = fire;
