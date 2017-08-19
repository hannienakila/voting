
var app = angular.module('App', ["ngRoute","ngStorage"]);


    app.config(function($routeProvider){
      $routeProvider
      .when("/",{
        templateUrl : "home.html",
        controller : "voteCtrl"
      })
      .when("/log",{
        templateUrl : "log.html",
        controller: "myCtrl"
      })
      .when("/register",{
        templateUrl : "register.html",
        controller : "regCtrl"
      })
      .when('/in', {
        templateUrl : "in.html",
        controller : "voteCtrl"
      })
      .when('/reg', {
        templateUrl : "register.html",
        controller: "myCtrl"
      })
      .when('/admin', {
        templateUrl : "logAdmin.html",
      })
      .when('/adminpage', {
        templateUrl: "admin.html"
      })
      .when('/regAdmin', {
        templateUrl: "adminReg.html"
      })
      .when('/AddCan', {
        templateUrl: "candidates.html"
      })
      .when('/ViewVote', {
        templateUrl: "votersView.html"
      })
      .when('/CanView', {
        templateUrl: "canView.html"
      });
    });

app.controller("voteCtrl", [ 'serviceVote', '$scope', '$location', '$localStorage', function (serviceVote, $scope,$location,$localStorage){

 //     if(!$localStorage.loginvoters)
 //      $localStorage.loginvoters = false;

 //      if($localStorage.loginvoters == true){
 //       $location.path('/in');
 // }

         $scope.logout = function(){
        $localStorage.loginvoters = false;
        $localStorage.whologin = false;
         $location.path ("/")

      };
      $scope.subvotes = function()
      {
        serviceVote.vote($scope.post, $scope.canfirst, $scope.canmiddle, $scope.canlast);
      };
          $scope.dis = $localStorage.Position;
      console.log($scope.dis);
  }]);


    
//admin Register Service
app.service('serviceAdminReg', ['$localStorage', function ($localStorage){
  this.AdminReg = function (adminUser, adminPass, adminConpass){
    if (adminPass == adminConpass){
    var admn = {
      adminuser: adminUser,
      adminpass: adminPass,
      adminconpass: adminConpass

    }

    console.log($localStorage.AdminReg);
    if(adminUser != null && adminPass != null){
    if ($localStorage.AdminReg.findIndex(admn => admn.adminuser === adminUser) == -1 && 
      $localStorage.AdminReg.findIndex(admn => admn.adminpass === adminPass) == -1) {
      $localStorage.AdminReg.push(admn);
  }else{
    alert("Exixting user");
  }
}
}else{
  alert("Password Don't Match");
}
}
}]);

//admin Login service
app.service('serviceAdminLog', ['$localStorage', 'serviceAdminReg', '$location', function ($localStorage, serviceAdminReg, $location){
this.adminlog = function(adminUser, adminPass){
  var admn = {
    adminuser: adminUser,
    adminpass: adminPass
  }
  if ($localStorage.AdminReg.findIndex(obj => obj.adminuser === adminUser) == -1){
    alert ("please register");
  }else{
    var i = $localStorage.AdminReg.findIndex( admn => admn.adminuser == adminUser);
    var adminpassword = $localStorage.AdminReg[i].adminpass;
    if (adminpassword == adminPass){
      $location.path('/adminpage')
    }else{
      alert ("invalid password");
    }
  }
}

}]);

//voters Register Service
app.service('serviceReg', ['$localStorage', function ($localStorage){
  this.register = function(fname, lname, user, pass, conpass){
    if (pass == conpass) {
    var obj = {
      name: fname,
      last: lname,
      username: user,
      password: pass,
      confirmpass : conpass
    }
    console.log($localStorage.register);
    if(user != null && pass != null){
    if($localStorage.register.findIndex(obj => obj.username === user) == -1 &&
      $localStorage.register.findIndex(obj => obj.password === pass) == -1){
      $localStorage.register.push(obj);
    }else{
      alert("Existing User");
    }
    }
    }else{
      alert("password don't match");
    }
  
};
}]);


//voters Login Service
app.service('serviceLog', ['$localStorage', 'serviceReg', '$location', function ($localStorage, serviceReg, $location){

$localStorage.loginvoters = false;
this.login = function(user, pass){
  var obj = {
    username: user,
    password: pass

  }
if($localStorage.register.findIndex(obj => obj.username === user) == -1){
  alert("please register");
}else{
  var i = $localStorage.register.findIndex(obj => obj.username === user);
  var passwords = $localStorage.register[i].password;
  var name = $localStorage.register[i].name;
  if (passwords == pass){
    $localStorage.loginvoters = true;
    $localStorage.whologin = true;
    $location.path("/in");
  }else{
    alert("invalid password");
  }
}
}

}]);

//VOTING
app.service('serviceVote', ['$localStorage', '$location', 'serviceAddCan', function($localStorage, $location,serviceAddCan){
 this.vote = function (positions, canfname, canmname, canlname){
  var can ={
    post : positions,
    canfirst : canfname,
    canmiddle : canmname,
    canlast : canlname
  }
  var pres = document.querySelection('input[name="pres"]:checked').value;
  if ( pres != ''){
 alert('Select Candidate');

  }else{
    var i = $localStorage.Position.findIndex(can => can.canfirst === canfname);
    var middle = $localStorage.Position[i].canmiddle;
    var last = $localStorage.Position[i].canlast;
    alert('i + " " + canmiddle + " " + canlast ');
  }

    // var pres = document.querySelection('input[name="pres"]:checked').value;
    // if (vice != "&& pres !="){
    //   var pres = document.querySelection('input[name="pres"]:checked').value;
    //   var vice = document.querySelection('input[name="vice"]:checked').value;
    //   alert (pres + " " + vice);
    // }else{
    //   alert ('swdsadsad');
    // }
 }
}]);

//ADMIN ADDING CADIDATES
app.service('serviceAddCan', ['$localStorage', function ($localStorage){
  this.Position = function(positions,canfname, canmname, canlname){
    var can = {
      post: positions,
      canfirst: canfname,
      canmiddle: canmname,
      canlast: canlname

    }
    console.log($localStorage.Position);
    if(positions != null){
    if(canlname != null){
    if($localStorage.Position.findIndex(obj => obj.canlast === canlname) == -1){
      $localStorage.Position.push(can);
    }else{
      alert("Existing User");
    }
    }}else{
      alert("Please Select Position!")
    }
   
  
};
}]);


    //controllers
    app.controller('myCtrl', ['serviceReg','serviceLog', 'serviceAdminReg', 'serviceAdminLog' ,
     'serviceAddCan', '$scope' ,'$location', '$localStorage', 
      function(serviceReg,serviceLog,serviceAdminReg,serviceAdminLog , serviceAddCan , $scope, $location, $localStorage){
     // alert('ok');
     //$localStorage.AdminReg = [];
     //$localStorage.register = [];
      //$localStorage.Position = [];
      $('.myCheckbox').click(function(){
        $(this).siblings('input:checkbox').prop('checked', false);
      });

      // $('.selectme input:checkbox').click(function(){
      //   $('.selectme input:checkbox').not(this).prop('checked', false);
      // });

      $scope.qwerty = function()
        {
          serviceReg.register($scope.fname, $scope.lname, $scope.user, $scope.pass, $scope.conpass);
        };

         $scope.log = function()
      {
        serviceLog.login($scope.user, $scope.pass);
      };

      $scope.adminRegg = function()
      {
        serviceAdminReg.AdminReg($scope.adminUser, $scope.adminPass, $scope.adminConpass);
      };
      $scope.adminlogin = function()
      {
        serviceAdminLog.adminlog($scope.adminUser, $scope.adminPass);
      };
      $scope.submit = function()
      {
        serviceAddCan.Position($scope.positions, $scope.canfname, $scope.canmname, $scope.canlname);
      };

   

      $scope.display = $localStorage.register;
      console.log($scope.display);
      
 

      }]);
     

 //   if(!$localStorage.loginvoters)
 // $localStorage.loginvoters = false;

 //  if($localStorage.loginvoters == true){
 //  $location.path('/in');
 //  }

   //  $scope.user = null;
   //  $scope.pass = null;
   //  if(!$localStorage.accounts)
   //    $localStorage.accounts = [];

    // $scope.login = function(){
    //     $scope.accounts= $localStorage.accounts;
    //     let obj = {
    //         username: $scope.user,
    //         password: $scope.pass
    //       }

    //     if ($scope.accounts.findIndex(obj => obj.username === $scope.user) == -1)
    //     {
    //         $scope.display = "Please register";
    //     }else
    //     {      
    //       var i = $scope.accounts.findIndex(obj => obj.username === $scope.user);
    //       var passwords = $scope.accounts[i].password;
    //       var name = $scope.accounts[i].name;
    //       if (passwords == $scope.pass){
    //         $localStorage.loginvoters = true;
    //         $localStorage.whologin = name;
    //         $location.path('/in');
    //       }else{
    //         $scope.display = "invalid password";
    //       }
    //     }    
    //   };

    //   $scope.Bac = function(){

    //     $location.path ("/")
    //   };
      

  




//app.controller("regCtrl", ['$scope', '$localStorage', '$location', function($scope,$localStorage, $location){

//         $scope.Back = function(){
//          $location.path ("/")

//       };

//         $scope.fname = null;
//         $scope.lname = null;
//         $scope.user = null;
//         $scope.pass = null;
//         $scope.conpass = null;
//         $scope.accounts = {};
//         $scope.dis = null;

//         if(!$localStorage.accounts){
//           $localStorage.accounts = [];
//         }

//        $scope.qwerty = function(){
//         $scope.accounts = $localStorage.accounts;
//         if($scope.pass  == $scope.conpass){
//              let obj = {
//             name: $scope.fname,
//             last: $scope.lname,
//             username: $scope.user,
//             password: $scope.pass,
//             confirmpass : $scope.conpass

//           }
//           console.log($scope.accounts);
//           if($scope.user != null && $scope.pass != null){
//             if ($scope.accounts.findIndex(obj => obj.username === $scope.user) == -1 &&
//             $scope.accounts.findIndex(obj => obj.password === $scope.pass) == -1){
//               $scope.accounts.push({
//               name : $scope.fname,
//               last : $scope.lname,
//               username : $scope.user,
//               password : $scope.pass,
//               confirmpass : $scope.conpass
//             });

//             $localStorage.accounts = $scope.accounts;
//             $scope.dis = null;
//             $scope.dis2 = null;
//             $scope.fname = null;
//             $scope.lname = null;
//             $scope.user = null;
//             $scope.pass = null;
//             $scope.conpass = null;
//            }else{
//             $scope.dis = "Existing username";
//            }
//           }
           
//          }else{
//             $scope.dis = "password dont match";
//            }

//         };
   

// }]);    


    
