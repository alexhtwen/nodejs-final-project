const cross = document.querySelectorAll('#delete-me')
const form = document.querySelector("#add-students-form");
for (let i = 0; i < cross.length; i++) {
    cross[i].addEventListener('click', async (test) => {
        test.stopPropagation();
        let id = cross[i].getAttribute('cross-id');
        console.log(id);
        // local
        // let apiUrl = `http://127.0.0.1:9876/API/deleteStudent?id=${id}`
        // heroku
        let apiUrl = `https://nodejs-final-project-alex.herokuapp.com/API/deleteStudent?id=${id}`
        // 以下這列是clone自其他同學的code，經核對和我的相同，但這位同學可以新增刪除，我卻不行。原因不詳。
        // let apiUrl = `https://nodejs-practice2020.herokuapp.com/API/deleteMember?id=${id}`

        let res = await fetch(apiUrl, {
            method: 'GET'
        });
        let text = await res.text();
        console.log(text);
        console.log(`id:${id} being deleted...`);
        // call delete api
        // location.reload(true);
        res.redirect('back');
    });
}
// add data
form.addEventListener('submit', async (e) => {
    // e.preventDefault();
    // call add api
    // alert('New student adding...')
    name = form.name.value;
    gender = form.gender.value;
    age = form.age.value;
    // local
    // let apiUrl = `http://127.0.0.1:9876/API/addStudent?name=${name}&gender=${gender}&age=${age}`
    // heroku
    let apiUrl = `https://nodejs-final-project-alex.herokuapp.com/API/addStudent?name=${name}&gender=${gender}&age=${age}`

    let res = await fetch(apiUrl, {
        method: 'GET'
    });
    let text = await res.text();
    console.log(text);
    form.name.value = '';
    form.gender.value = '';
    form.age.value = '';

    // 重新render畫面。
    // window.location.reload(true);

});