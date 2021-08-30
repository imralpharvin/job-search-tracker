
$(document).ready(function () {
    console.log("*****HOME.JS*****");
  
    loadTracker();
  
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
  

    function loadTracker(){

        $.ajax({
          type: 'GET',
          dataType: 'json',
          url: '/loadTracker',
          async: 'false',
          success: function (data) {
            console.log("Tracker object: " +data);
    
            let applications = data;
    
            let tableContainer = document.getElementById('tableContainer');
            let trackerTable = document.getElementById('trackerTable');
            trackerTable.innerHTML = "";
    
            if(applications.length == 0)  {
              tableContainer.style.display="none";
            } else{
              tableContainer.style.display="block";
              let row = trackerTable.insertRow(-1);
              for (let i = 0; i < 7; i++) {
                let headerCell = document.createElement("TH");
                row.appendChild(headerCell);
              }

    
              row.cells[0].innerHTML = "Company Name";
              row.cells[1].innerHTML = "Position Title";
              row.cells[2].innerHTML = "Job Pay";
              row.cells[3].innerHTML = "Date Applied";
              row.cells[4].innerHTML = "Status";

    
              console.log("No. of Applications: " + applications.length);
    
              for (let i = 1; i <= applications.length; i++) {
                row = trackerTable.insertRow(-1);
                //$(row).attr('id', departments[i - 1]["Key"]);
                for (let j = 0; j < 7; j++) {
                  let cell = row.insertCell(-1);
                }
                console.log(applications[i - 1]);
                let application = applications[i - 1];
                console.log(application);
                trackerTable.rows[i].cells[0].innerHTML = application["companyName"];
                trackerTable.rows[i].cells[1].innerHTML = application["jobTitle"];
                trackerTable.rows[i].cells[2].innerHTML = application["jobPay"];
                trackerTable.rows[i].cells[3].innerHTML = application["dateApplied"];
                trackerTable.rows[i].cells[4].innerHTML = application["status"];
                trackerTable.rows[i].cells[5].innerHTML = '<button type="button" class="btn btn-light">Edit</button>';
                trackerTable.rows[i].cells[6].innerHTML = '<button type="button" class="btn btn-danger">Delete</button>';
                }
    
              }
            },
    
          fail: function (error) {
            // Non-200 return, do something with error
            console.log(error);
          }
        });
    
      } 
});
