/* jshint esversion: 8 */
let express = require('express')
let app = express();
app.set('view engine', 'ejs');
app.get('/', async (req, res) => {
    // res.render("default", {
    //     users: ["Alice", "Bob", "Fisheep", "Fiona"],
    //     title: "This is root page!"
    let data = await db.collection('classA').get();
    let userArr = [];
    data.docs.forEach((doc) => {
        userArr.push(doc.data().name);
    })
    res.render("default", {
        users: userArr,
        title: "This is Alex's root page."
    });
})
app.listen(3000, () => {
    console.log("render_test server is running at http://127.0.0.1:3000")
})