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
      header: 'node.js期末作業--Alex',
      title: '本網站可用的routes:',
      // users: ['Alex', 'Marrianne', 'Rebecca', 'Thomas', 'Asing']
      routes: ['/ (本頁)', '/class (node.js班學員資料頁)', '/greet/{name} (向{name}打個招呼)', ' /db-test (列出collection classA所有資料，無GUI介面)', '/search/{name} (列出classA中所有name為{name}的資料)', '/alex (Alex專頁)']
      //users: userArr
   });
});


app.get("/alex", (req, res) => {
   res.send("<br><br><br><h1><center><font color=red>Hey, I am Alex.</font></center></h1><br><br><h2><center><font color=tomato>Welcome to my page.</font></center></h2>")
})

app.get("/db-test", async (req, res) => {
   let html = '';
   let data = await db.collection('classA').get();
   data.forEach(doc => {
      console.log(doc.data());
      // html += `<div><h2>id=${doc.id}, name=${doc.data().name}, gender=${doc.data().gender}, age=${doc.data().age}</h2></div>`;
      html += `<div><h2>id=${doc.id}&nbsp;&nbsp;&nbsp;&nbsp;name=${doc.data().name}&nbsp;&nbsp;&nbsp;&nbsp;gender=${doc.data().gender}&nbsp;&nbsp;&nbsp;&nbsp;age=${doc.data().age}</h2></div>`;
   });
   res.send(html)
})

// app.get("/classA_backend", async (req, res) => {
app.get("/class", async (req, res) => {
   let data = await db.collection('classA').get();
   userArr = []
   data.forEach((doc) => {
      userArr.push({
         id: doc.id,
         name: doc.data().name,
         gender: doc.data().gender,
         age: doc.data().age
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

app.get('/greet/:name', (req, res) => {
   let name = req.params.name;
   res.send(`<h1>How are you doing, ${name}?</h1>`);
});


app.get("/search/:name", async (req, res) => {
   let html = '';
   let name = req.params.name;

   // Alex：以下這列為何不行？
   // let data = db.collection('classA').where("name", "==", name);
   let data = await db.collection('classA').get();

   userArr = []
   data.forEach((doc) => {
      let thisName = doc.data().name
      if (thisName == name) {
         console.log(doc.data());
         // html += `<div><h2>id=${doc.id}, name=${doc.data().name}, gender=${doc.data().gender}, age=${doc.data().age}</h2></div>`;
         html += `<div><h2>id=${doc.id}&nbsp;&nbsp;&nbsp;&nbsp;name=${doc.data().name}&nbsp;&nbsp;&nbsp;&nbsp;gender=${doc.data().gender}&nbsp;&nbsp;&nbsp;&nbsp;age=${doc.data().age}</h2></div>`;
      }
   })
   res.send(html)
});




app.get('/API/deleteStudent', (req, res) => {
   db.collection('classA').doc(req.query.id).delete();
   // console.log(req.query.id);
   // res.send(`delete Student id = ${req.query.id}!`)
   let prompt = `Student id: ${req.query.id} deleted.`;

   // location.reload();
   console.log(`log: ${prompt}`);
   res.send(`${prompt}`);
})

app.get('/API/addStudent', (req, res) => {
   let thisStudent = {
      name: req.query.name,
      gender: req.query.gender,
      age: req.query.age
   }
   db.collection('classA').add(thisStudent);
   console.log(`log: Student ${thisStudent.name} successfully added.`);
   res.send(`Student ${thisStudent.name} successfully added.`);
})


// app.get('/API/addStudent', (req, res) => {
//     db.collection('classA').add({
//         name: req.query.name,
//         gender: req.query.gender,
//         age: req.query.age
//     });
//     console.log("Add student !!");
//     res.send("Add student success!");
// })



app.get('*', (req, res) => {
   res.send('<h1>此參數無效。</h1>');
});

let port = process.env.PORT || 9876;

app.listen(port, () => {
   console.log(`Hey, I am listening on port ${port}.`);
});