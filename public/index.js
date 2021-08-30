$(document).ready(function () {

    let password = document.getElementById("addPassword")
    let confirmPassword = document.getElementById("confirmPassword");
  
    function validatePassword(){
      if(password.value != confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords Don't Match");
      } else {
        confirmPassword.setCustomValidity('');
      }
    }
  
  password.onchange = validatePassword;
  confirmPassword.onkeyup = validatePassword;
    //Register User Function
    $('#registerUser').submit(function (event) {
      event.preventDefault();
  
      console.log("*****Register User Event Clicked*****");
  
      let firstname = document.getElementById('addFirstName').value;
      let lastname = document.getElementById('addLastName').value;
      let username = document.getElementById('addUsername').value;
      let password = document.getElementById('addPassword').value;
  
      console.log("*****User Details*****")
      
      console.log("First Name: " + firstname);
      console.log("Last Name: " + lastname);
      console.log("Username: " + username);
   
      let user = {};
      user["firstname"] = firstname;
      user["lastname"] = lastname;
      user["username"] = username;
      user["password"] = password;
  
      $.ajax(
        {
          type: "POST",
          url: "./registerUser",
          data: JSON.stringify(user),
          dataType: 'text',
          contentType: "application/json",
          async: false,
          success: function (data, no, yes) {
            console.log("*****SUCCESS: Register User POST request*****");
            let registrationMessage = document.getElementById("registrationMessage");
            registrationMessage.innerHTML = 'User succesfully registered.';
  
  
          },
          fail: function (error) {
            console.log("*****FAILURE: Register User POST request*****");
            console.log(error);
          }
        });
  
    });
  
  
    $('#logIn').submit(function (event) {
      event.preventDefault();
  
      console.log("*****Log In Event Clicked*****");
  
      let credentials = {};
      credentials["username"] = document.getElementById('getUsername').value;
      credentials["password"]= document.getElementById('getPassword').value;
  
      console.log("Username: " + credentials["username"]);
  
      $.ajax({
        type: "POST",
        url: "./logIn",
        data: JSON.stringify(credentials),
        dataType: 'text',
        contentType: "application/json",
        async: false,
        success: function (data) {
          console.log("*****SUCCESS: Log In User GET request*****");
          console.log(JSON.stringify(data));
          window.location.href = '/profile';
  
        },
        error: function (error) {
          console.log("*****FAILURE: Log In User GET request*****");
          let logInError = document.getElementById('logInError');
          logInError.innerHTML = 'Incorrect Log In. Please try again';
          console.log(error);
  
        }
      });
  
    });
  
  });