const cross = document.querySelectorAll('#cross-family')
const form = document.querySelector("#add-students-form");
for (let i = 0; i < cross.length; i++) {
    cross[i].addEventListener('click', async (test) => {
        test.stopPropagation();
        let id = cross[i].getAttribute('cross-id');
        console.log(id);
        let apiUrl = `http://127.0.0.1:9876/API/deleteMember?id=${id}`
        let res = await fetch(apiUrl, {
            method: 'GET'
        });
        let text = await res.text();
        console.log(text);
        console.log("in the cross, id = ", id);
        // call delete api
        location.reload();
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
    let apiUrl = `http://127.0.0.1:9876/API/addMember?name=${name}&gender=${gender}&age=${age}`
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