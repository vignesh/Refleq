// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

var app = angular.module('vignesh-todo', ['ionic', 'LocalStorageModule']);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
    .setPrefix('vignesh-todo')
    .setStorageType('localStorage')
    .setNotify(true, true)
  });

app.controller('mainCtrl', function ($scope, $ionicModal, localStorageService, $filter, $state) { 
//store the name in a variable 
var journalData = 'journal';

//initialize the journals with empty array
$scope.journals = [];

//initialize the journal with empty object
$scope.journal = {};

//configure ionic add modal 
$ionicModal.fromTemplateUrl('add-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
}).then(function (modal) {
    $scope.modal = modal;
});

//configure ionic view modal 
$ionicModal.fromTemplateUrl('view-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
}).then(function (modal) {
    $scope.modal2 = modal;
});

//configure ionic edit modal 
$ionicModal.fromTemplateUrl('edit-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
}).then(function (modal) {
    $scope.modal3 = modal;
});

//open modal 
  $scope.openModal = function() {
    $scope.modal.show();
  };

//open modal 
   $scope.openModal2 = function() {
    $scope.modal2.show();
  };

//open modal 
   $scope.openModal3 = function() {
    $scope.modal3.show();
  };

//close modals 
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal2.hide();
    $scope.modal3.hide();
  };

//gets journals from local storage  
$scope.getjournals = function () {
          if (localStorageService.get(journalData)) {
              $scope.journals = localStorageService.get(journalData);
          } 
          else {
              $scope.journals = [];
          }
   }

//create journal entry 
$scope.createjournal = function () {
  //if value is null/undefinged set to empty string 
    if ($scope.journal.title == undefined) {
      $scope.journal.title = "";
    }
    
    //filter to get readable date 
    $scope.journal.date = $filter('date')($scope.journal.date, "MMMM d, y - EEEE");

     if ($scope.journal.date == undefined) {
      $scope.journal.date = "";
    }
    if ($scope.journal.healthContent == undefined) {
      $scope.journal.healthContent = "";
    }
     if ($scope.journal.productContent == undefined) {
      $scope.journal.productContent = "";
    }
     if ($scope.journal.goalContent == undefined) {
      $scope.journal.goalContent = "";
    }
     if ($scope.journal.financeContent == undefined) {
      $scope.journal.financeContent = "";
    }
     if ($scope.journal.growthContent == undefined) {
      $scope.journal.growthContent = "";
    }
    if ($scope.journal.healthRange == undefined) {
      $scope.journal.healthRange = "50";
    }
     if ($scope.journal.productRange == undefined) {
      $scope.journal.productRange= "50";
    }
     if ($scope.journal.goalRange == undefined) {
      $scope.journal.goalRange = "50";
    }
     if ($scope.journal.financeRange == undefined) {
      $scope.journal.financeRange = "50";
    }
    if ($scope.journal.growthRange == undefined) {
      $scope.journal.growthRange = "50";
    }
    
    //calcaution for total daily index 
    $scope.journal.total = (parseInt($scope.journal.healthRange) + parseInt($scope.journal.growthRange)+ 
    parseInt($scope.journal.productRange)+ parseInt($scope.journal.financeRange)
    + parseInt($scope.journal.goalRange))/5;

    //icon changes depending on daily index score 
  if ($scope.journal.total < 20) {
    $scope.journal.sideIcon = 'icon ion-heart-broken assertive'
  }
  else if ($scope.journal.total < 40) {
    $scope.journal.sideIcon = 'icon ion-thumbsdown assertive'
  }
  else if ($scope.journal.total < 60) {
    $scope.journal.sideIcon = 'icon ion-android-checkbox-outline assertive'
  }
  else if ($scope.journal.total < 80) {
    $scope.journal.sideIcon = 'icon ion-thumbsup assertive'
  }
  else {
    $scope.journal.sideIcon = 'icon ion-ribbon-b assertive'
  }
  
  //push journal entry into journals array 
          $scope.journals.push($scope.journal);
          localStorageService.set(journalData, $scope.journals);
  
  //clear value for next journal entry 
          $scope.journal = {};
   }

//remove journal from journals 
$scope.removejournal = function (index) {
          $scope.journals.splice(index, 1);
          localStorageService.set(journalData, $scope.journals);
     }

//get and store index value
$scope.getIndex= function(index) {
    $scope.currentIndex = index;
    //copy journal 
    $scope.currentjournal = angular.copy($scope.journals[index]);
};

//use same method as createjournal() but with copy of journal entry 
$scope.updatejournal= function() {
      $scope.currentjournal.date = $filter('date')($scope.currentjournal.date, "MMMM d, y - EEEE");

       $scope.currentjournal.total = (parseInt($scope.currentjournal.healthRange) + parseInt($scope.currentjournal.growthRange)+ 
    parseInt($scope.currentjournal.productRange)+ parseInt($scope.currentjournal.financeRange)
    + parseInt($scope.currentjournal.goalRange))/5;

    //icon changes depending on daily index score 
  if ($scope.currentjournal.total < 20) {
    $scope.currentjournal.sideIcon = 'icon ion-heart-broken assertive'
  }
  else if ($scope.currentjournal.total < 40) {
    $scope.currentjournal.sideIcon = 'icon ion-thumbsdown assertive'
  }
  else if ($scope.currentjournal.total < 60) {
    $scope.currentjournal.sideIcon = 'icon ion-android-checkbox-outline assertive'
  }
  else if ($scope.currentjournal.total < 80) {
    $scope.currentjournal.sideIcon = 'icon ion-thumbsup assertive'
  }
  else {
    $scope.currentjournal.sideIcon = 'icon ion-ribbon-b assertive'
  }

//remove journal entry and new jounral entry in local storage g
    $scope.journals.splice($scope.currentIndex, 1, $scope.currentjournal);
     localStorageService.set(journalData, $scope.journals);
     /*if ($scope.currentIndex === -1) {
      $scope.journals.push($scope.currentjournal);
      localStorageService.set(journalData, $scope.journals);
    }
    else {
      $scope.journals[$scope.currentIndex] = $scope.currentjournal;
    }
    $scope.currentjournal = {};
    $scope.currentIndex = -1; */
};


})

