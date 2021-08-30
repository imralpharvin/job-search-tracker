
$(document).ready(function () {
    console.log("*****HOME.JS*****");
  
    loadProfile();
  
    document.getElementById('trackerPage').onclick = function () {
      console.log("***** Tracker Page Clicked*****");
      window.location.href = '/tracker';
    };
  
    document.getElementById('profilePage').onclick = function () {
      console.log("***** Profile Page Clicked*****");
      window.location.href = '/profile';
    };
  
    //Log Out
    document.getElementById('logOut').onclick = function () {
      console.log("*****Log Out Button Clicked*****");
      window.location.href = '/';
    };
  
  
    //Load Account Detaisl
    function loadProfile(){
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/loadProfile',
        async: 'false',
        success: function (data) {
          console.log(data);
  
          let user = data;
          console.log(user);
          let firstname = document.getElementById('firstnameInfo');
          let lastname = document.getElementById('lastnameInfo');
          let username = document.getElementById('usernameInfo');
  
          firstname.innerHTML = user["firstname"];
          lastname.innerHTML = user["lastname"];
          username.innerHTML = user["username"];
  
        },
        fail: function (error) {
          // Non-200 return, do something with error
          console.log(error);
        }
      });
    }
  });