// import {redirectHome, getUserEntries, getNumEntries, getName} from '/actions/get';
// import {postLogin, postRegister} from '/actions/post';
// import {} from '/actions/put';
// import {} from '/actions/delete';

/*** Index.html Functions ***/

// login post
function login(){
  const username = document.getElementById('login_user').value;
  const password = document.getElementById('login_password').value;
  const message = [username, password];
  postLogin(message);
}

// register post
function register(){
  const username = document.getElementsByName('username').value;
  const password = document.getElementsByName('name').value;
  const name = document.getElementsByName('password').value;
  const message = [username, password, name];
  postRegister(message);
}


// /*** diary.html Functions ***/
//
function defautlToggle(){
  document.getElementById('editB').textContent = 'Edit';
  document.getElementById('entry_title').readOnly = true;
  document.getElementById('textarea').readOnly = true;
}
function toggleView(){
  const editB = document.getElementById('editB');
  const title = document.getElementById('entry_title');
  const textarea = document.getElementById('textarea');
  if(editB.textContent == 'Edit'){
    editB.textContent = 'View';
    title.readOnly = false;
    textarea.readOnly = false;
  } else {
    editB.textContent = 'Edit';
    title.readOnly = true;
    textarea.readOnly = true;
  }
}
// // Load page info // Get all entries // Get number of entries // Get name
// function loadPage(){
//   // This gets all entries
//   getUserEntries();
//
//   // This gets the number of entries
//   getNumEntries();
//
//   // This gets the users name
//   getName();
// }
