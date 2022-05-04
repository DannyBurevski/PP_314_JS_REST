// Основные переменные
const url = "http://localhost:8080/api/users/";
const usersList = document.querySelector('#allUsersTable tbody');
const userData = document.querySelector('#userTable tbody');
let output = '';
const addUserForm = document.querySelector('#addNewUserForm');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const editModalForm = document.querySelector('#editModalForm');
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
const deleteModalForm = document.querySelector('#deleteModalForm');


// Функция вывода юзеров
const showUsers = (users) => {
    users.forEach(user => {
        output += `
            <tr id=${'row'+user.id}>
                <td>${user.id}</td>
                <td id=${'name'+user.id}>${user.name}</td>
                <td id=${'lastName'+user.id}>${user.lastName}</td>
                <td id=${'age'+user.id}>${user.age}</td>
                <td id=${'email'+user.id}>${user.email}</td>
                <td>
                    <div id=${'roles'+user.id}>
                        ${user.roles.map(role => role.name).join(" ")}
                    </div>
                </td>
                <td class="text-white"><a class="btnEdit btn btn-info">Edit</a></td>
                <td class="text-white"><a class="btnDelete btn btn-danger">Delete</a></td>
            </tr>
            `;
    });
    usersList.innerHTML = output;
}

// Передача данных из GET запроса в функцию вывода юзеров в таблицу
fetch(url)
    .then(response => response.json())
    .then(data => showUsers(data))
    .catch(error => console.log(error))


// Добавление нового юзера
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let addNewUserForm = $('#addNewUserForm')
    let firstName = addNewUserForm.find('#addName').val().trim();
    let lastName = addNewUserForm.find('#addLastName').val().trim();
    let age = addNewUserForm.find('#addAge').val().trim();
    let email = addNewUserForm.find('#addUsername').val().trim();
    let password = addNewUserForm.find('#addPassword').val().trim();
    let roles = addNewUserForm.find('#addRoles').val();
    let newUserData = {
        name: firstName,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
        strRoles: roles
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData)
    })
        .then(response => response.json())
        .then(data => {
            const newUser = []
            newUser.push(data)
            showUsers(newUser)
        });
    addNewUserForm[0].reset();
    $('.nav-tabs a[href="#nav-home"]').tab('show');
})


// Функция работы модалок
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

// Edit - открытие и заполнение модалки
let idEditForm = 0
on(document, 'click', '.btnEdit', e => {
    const rowToEdit = e.target.parentNode.parentNode
    idEditForm = rowToEdit.children[0].innerHTML
    const nameEditForm = rowToEdit.children[1].innerHTML
    const lastNameEditForm = rowToEdit.children[2].innerHTML
    const ageEditForm = rowToEdit.children[3].innerHTML
    const emailEditForm = rowToEdit.children[4].innerHTML
    const rolesEditForm = rowToEdit.children[5].children[0].innerHTML.trim().split(" ")
    // console.log(rolesEditForm)
    $('#idEdit').val(idEditForm);
    $('#nameEdit').val(nameEditForm);
    $('#lastNameEdit').val(lastNameEditForm);
    $('#ageEdit').val(ageEditForm);
    $('#emailEdit').val(emailEditForm);
    $('#rolesListEdit').val(rolesEditForm);
    editModal.show()
})

// Поведение кнопки у модалки Edit
editModalForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let editedUser = {
        name: $('#nameEdit').val(),
        lastName: $('#lastNameEdit').val(),
        age: $('#ageEdit').val(),
        email: $('#emailEdit').val(),
        password: $('#passwordEdit').val(),
        strRoles: $('#rolesListEdit').val()
    }
    await fetch(url+idEditForm, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUser)
    })
    let response = await fetch(url+idEditForm);
    let data = await response.json();
    document.getElementById('name' + idEditForm).innerHTML = data.name;
    document.getElementById('lastName' + idEditForm).innerHTML = data.lastName;
    document.getElementById('age' + idEditForm).innerHTML = data.age;
    document.getElementById('email' + idEditForm).innerHTML = data.username;
    document.getElementById('roles' + idEditForm).innerHTML = data.roles
        .map(role => role.name).join(" ");
    editModal.hide()
})

// Delete - открытие и заполнение модалки
let idDeleteForm = 0
on(document, 'click', '.btnDelete', e => {
    const rowToDelete = e.target.parentNode.parentNode
    idDeleteForm = rowToDelete.children[0].innerHTML
    const nameDeleteForm = rowToDelete.children[1].innerHTML
    const lastNameDeleteForm = rowToDelete.children[2].innerHTML
    const ageDeleteForm = rowToDelete.children[3].innerHTML
    const usernameDeleteForm = rowToDelete.children[4].innerHTML
    const rolesDeleteForm = rowToDelete.children[5].children[0].innerHTML.trim().split(" ")
    $('#idDelete').val(idDeleteForm);
    $('#nameDelete').val(nameDeleteForm);
    $('#lastNameDelete').val(lastNameDeleteForm);
    $('#ageDelete').val(ageDeleteForm);
    $('#usernameDelete').val(usernameDeleteForm);
    $('#rolesListDelete').val(rolesDeleteForm);
    deleteModal.show()
})

// Поведение кнопки у модалки Delete
deleteModalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await fetch(url+idDeleteForm, {
        method: 'DELETE'
    })
    document.getElementById('row' + idDeleteForm).remove();
    deleteModal.hide()
})


// Функция вывода юзера в таблицу вклакди User
const showOneUser = (user_admin) => {
    userData.innerHTML = `
            <tr id=${'row' + user_admin.id}>
                <td>${user_admin.id}</td>
                <td>${user_admin.name}</td>
                <td>${user_admin.lastName}</td>
                <td>${user_admin.age}</td>
                <td>${user_admin.email}</td>
                <td>
                    <div>
                        ${user_admin.roles.map(role => role.name).join(" ")}
                    </div>
                </td>
            </tr>
            `;
};

fetch(url + 'user_admin')
    .then(response => response.json())
    .then(data => showOneUser(data))
    .catch(error => console.log(error))




