const Rebase = require('re-base')
const firebase = require('firebase')

const firebaseConfig = {
        apiKey: "AIzaSyCv2Ezl94v8TWfpO_5LSTv3uXKJHeZdxrQ",
        authDomain: "company-react-xablau.firebaseapp.com",
        databaseURL: "https://company-react-xablau.firebaseio.com",
        projectId: "company-react-xablau",
        storageBucket: "company-react-xablau.appspot.com",
        messagingSenderId: "557904165000",
        appId: "1:557904165000:web:9add80f453b42e897d473d",
        measurementId: "G-ELTZKQED1W"
}

const app = firebase.initializeApp(firebaseConfig)
const config = Rebase.createClass(app.database())

export const storage = app.storage()
export const auth = app.auth()

export default config