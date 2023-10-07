import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {getDatabase,ref,set,push,onChildAdded,remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
var firebaseConfig = {
  apiKey: "AIzaSyAqBIe8ZFxjNbVF22YWGMi6my6m1UJoJXo",
    authDomain: "todo-first-project-app.firebaseapp.com",
    projectId: "todo-first-project-app",
    storageBucket: "todo-first-project-app.appspot.com",
    messagingSenderId: "1031608587251",
    appId: "1:1031608587251:web:91f4ac8284f0273ca43886",
    measurementId: "G-BLQGQD816C"
};
var app = initializeApp(firebaseConfig);
var auth = getAuth(app);
var database = getDatabase(app);
var name1 = document.getElementById("name1");
var email1 = document.getElementById("email1");
var password1 = document.getElementById("password1");
var singup = document.getElementById("singup");
var login = document.getElementById("login");
var quize = document.getElementById("quize");
var email2 = document.getElementById("email2");
var password2 = document.getElementById("password2");
var listinp = document.getElementById("listinp");


window.singupbtn = function(){
    if(name1.value == ""){
        swal({
            title: "Note!",
            text: "Please fill the Name",
            timer: 2000
          });
    return false;
}else if (email1.value == ""){
    swal({
        title: "Note!",
        text: "Please fill the Email",
        timer: 2000
      });
    return false;
}else if (password1.value == ""){
    swal({
        title: "Note!",
        text: "Please fill the Password Atlest 7 Letter ",
        timer: 2000
      });
    return false;
}

createUserWithEmailAndPassword (auth,email1.value,password1.value).then(function(sucess){
    console.log(sucess);
    swal({
        title: "Congratulations",
        text: "Your Singup is Complete",
        timer: 2000
      });
    var singupdata = {
        Name:name1.value,
        Email:email1.value,
        Password:password1.value,
        }
var referId = ref(database)
var ID = push(referId).key
singupdata.id = ID
var reference = ref(database,`Sing up User/${singupdata.id}`)
set(reference,singupdata)
singup.style.display = "none";
login.style.display = "inline-block";
})
.catch(function(error){
console.log(error)
swal({
    title: "Sorry!",
    text: "Some thing went wrong plz try Again",
    timer: 2000
  });
})
}
window.loginhere = function(){
    login.style.display = "inline-block";
singup.style.display = "none";
}


window.loginbtn = function(){
    if (email2.value == ""){
        swal({
            title: "Note!",
            text: "Please fill the Email",
            timer: 2000
          });
        return false;
    }else if (password2.value == ""){
        swal({
            title: "Note!",
            text: "Please fill the Password",
            timer: 2000
          });
        return false;
    }else if (password2.value < 6){
        alert("write pass greater then 6 word")
        return false;
    }
    signInWithEmailAndPassword(auth,email2.value,password2.value).then(
       function(success){
           console.log(success)
           swal({
            title: "Congratulations",
            text: "Login Sucessfuly",
            timer: 2000
          });
           login.style.display = "none";
           quize.style.display = "block"
       }).catch(
       function(error){
           console.log(error)
           swal({
            title: "Sorry!",
            text: "Some thing went wrong plz try Again",
            timer: 2000
          });
       })
}
var getlist = document.getElementById("getlist");
var studentList = []
window.addlist = function () {
    if (listinp.value == "") {
        swal({
            title: "Note!",
            text: "Please fill the Input",
            timer: 2000
        });
        return false;
    }
    var todoList = {
                Items:listinp.value,
                }
        var refered = ref(database)
        var todoID = push(refered).key
        todoList.id = todoID
        var reference = ref(database,`Todo list/${todoList.id}`)
        set(reference,todoList)
        listinp.value = ""
}
function getDataFromDatabase(){
    var referenced = ref(database,'Todo list')
    onChildAdded(referenced,function(data){
      // console.log(data.val());
      render(data.val())
    })
  }
  
  function render(data){
    // console.log(data);
    if(data){
      studentList.push(data)
    }
    // console.log(studentList);
   getlist.innerHTML=''
    for(var i=0;i<studentList.length;i++){
    getlist.innerHTML +=`<div class="getlist  mt-3" >
     <div class="mt-1 ms-3  mt-2"><p class="para">${studentList[i].Items}</p></div>
      <div class="me-3"><button class="delbtn mt-1 " onclick="del(${i})"><i class="fa-solid fa-trash"></i></button></div>
      </div> `  
    }
  }
  window.del = function(index){
    console.log(index,studentList[index].id);
   var id = studentList[index].id
    studentList.splice(index,1)
    var refer = ref(database,`Todo list/${id}`)
    remove(refer)
  render()
  
  }
  window.onload = getDataFromDatabase()