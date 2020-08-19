/* jshint esversion: 8 */
let express = require('express');
let firebase = require('firebase')
let firebaseConfig = {
    apiKey: "AIzaSyBw_IQD3e9D_YmfNAgLwg6ky8O87TKv6cA",
    authDomain: "nodejs-test-9e44f.firebaseapp.com",
    databaseURL: "https://nodejs-test-9e44f.firebaseio.com",
    projectId: "nodejs-test-9e44f",
    storageBucket: "nodejs-test-9e44f.appspot.com",
    messagingSenderId: "1021821736753",
    appId: "1:1021821736753:web:c80cae393406a15bcf8210"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.get('/', async (req, res) => {
    //let data = await db.collection('classA').get();
    //let userArr = []
    // data.forEach((doc) => {
    //     console.log(doc.data().name)
    //     userArr.push(doc.data().name);
    // })

    // res.render('default', {
    res.render('home', {
        title: '台大資訊訓練班332期node.js課期末作業--Alex',
        // users: ['Alex', 'Marrianne', 'Rebecca', 'Thomas', 'Asing']
        routes: ['/', 'alex', 'firebase-test', '/who/:name', '/API/addMember', '/API/deleteMember']
        //users: userArr
    });
});


app.get("/alex", (req, res) => {
    res.send("<h1>Hey, I am Alex.</h1>")
})

app.get("/firebase-test", async (req, res) => {
    let html = '';
    let data = await db.collection('classA').get();
    data.forEach(doc => {
        console.log(doc.data());
        html += `<div>${doc.id}: name = ${doc.data().name} age = ${doc.data().age}</div>`;
    });
    res.send(html)
})

app.get("/classA_backend", async (req, res) => {
    let data = await db.collection('classA').get();
    userArr = []
    data.forEach((doc) => {
        userArr.push({
            id: doc.id,
            name: doc.data().name,
            age: doc.data().age,
            gender: doc.data().gender
        })
    })
    res.render('classA', {
        users: userArr
    })
})

app.get("/classA_frontend", (req, res) => {
    let options = {
        root: __dirname + "/public",
        dotfiles: 'ignore'
    }
    console.log(__dirname + "/public");
    res.sendFile("/classA.html", options);
})

app.get('/who/:name', (req, res) => {
    let name = req.params.name;
    res.send(`This is ${name}`);
});

app.get('/API/deleteMember', (req, res) => {
    db.collection('classA').doc(req.query.id).delete();
    // console.log(req.query.id);
    // res.send(`delete Member id = ${req.query.id}!`)
    let prompt = `Member id: ${req.query.id} deleted.`;
    // console.log(prompt);
    console.log(`log: ${prompt}`);
    res.send(`${prompt}`);
})

app.get('/API/addMember', (req, res) => {
    let thisMember = {
        name: req.query.name,
        gender: req.query.age,
        age: req.query.gender
    }
    db.collection('classA').add({
        thisMember
    });
    console.log(`log: Member ${thisMember.name} successfully added.`);
    res.send(`Member ${thisMember.name} successfully added.`);
})

app.get('*', (req, res) => {
    res.send('No Content');
});

let port = process.env.PORT || 9876;

app.listen(port, () => {
    console.log(`Hey, I am listening on port ${port}.`);
});