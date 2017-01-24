/*global angular*/

angular.module("starter")
  .controller("BagoazBaloratzea", ["$rootScope", "$scope", "$location", "$http", function ($rootScope, $scope, $location, $http) {
    "use strict";
    $scope.zorionak=null;
    $scope.ebazpen=null;
    $scope.progress=0;
    var parameters = $location.path().split('/');
    var level = parameters.pop()-1;
    var ariketak = [];
    $rootScope.ariketak[level].forEach(function (elem) {
      ariketak.push(elem);
    });
    ariketak = ariketak.sort(function() {return Math.random() - 0.5}); //unsorting the array.
    var orain = ariketak.pop();
    var total =  ariketak.length;
    $scope.percentageStyle = {width : $scope.progress + '%'};


    if(orain.euskara){
      $scope.orainAriketa = orain.euskara;
      $scope.orainAudio = null;
    }else{
      $scope.orainAriketa = null;
      $scope.orainAudio = "https://raw.githubusercontent.com/litospayaso/bagoaz-ionic/master/www/database/audios/"+ orain.audio +".mp3";
      var html='<audio controls="controls"><source src="' + $scope.orainAudio + '" type="audio/mpeg"></audio>';
      $('#htmlAudio').html(html);
      $http.get($scope.orainAudio).error(function () {
        $scope.jarraitu();
      });
    }

    $scope.zuzendu = function(){
      if($scope.erantzun===undefined || $scope.erantzun===null){
        return 0;
      }
      if($scope.compareStrings($scope.erantzun,orain.erantzun)){//if correct
        $scope.barClass = "bar bar-balanced";
        $scope.ebazpen = ["Oso ondo! ","Zuzen! ","Egoki! "].sort(function() {return Math.random() - 0.5}).pop();
        $scope.progress = (total - ariketak.length) * 100 / total === 0 ? 5 : (total - ariketak.length) * 100 / total;
        $scope.percentageStyle = {width : $scope.progress + '%'};

      }else{//if mistakecd
        $scope.barClass = "bar bar-assertive";
        $scope.ebazpen = "Akats:\t" + orain.erantzun;
        ariketak.push(orain);
        ariketak = ariketak[0].erantzun === ariketak.sort(function(a,b) {return Math.random() - 0.5})[0].erantzun ? ariketak.sort() : ariketak.sort(function(a,b) {return Math.random() - 0.5}); //unsorting the array.
      }
    };

    $scope.jarraitu = function(){
      $scope.ebazpen = null;
      $scope.erantzun = "";

      if(ariketak.length==0){
        $scope.zorionak="Zorionak!!! Has completado correctamente la lección.";

        var cookie = [];
        if (JSON.parse(localStorage.getItem("cookie"))){
          cookie = JSON.parse(localStorage.getItem("cookie"));
        }
        cookie.push(level+1);
        localStorage.setItem("cookie", JSON.stringify(cookie));
        return 0;
      }
      orain = ariketak.pop();
      if(orain.euskara){
        $scope.orainAriketa = orain.euskara;
        $scope.orainAudio = null;
      }else{
        $scope.orainAriketa = null;
        $scope.orainAudio = "https://raw.githubusercontent.com/litospayaso/bagoaz-ionic/master/www/database/audios/"+ orain.audio +".mp3";
        var html='<audio id="audioTag" autoplay><source src="' + $scope.orainAudio + '" type="audio/mpeg"></audio>';
        $('#htmlAudio').html(html);
        $http.get($scope.orainAudio).error(function () {
          $scope.jarraitu();
        });
      }
    };

    $scope.play = function () {
      (document.getElementById('audioTag').paused && document.getElementById('audioTag').currentTime > 0) ? document.getElementById('audioTag').play() :document.getElementById('audioTag').pause();
    };

    $scope.compareStrings = function (str1, str2) {
      var answer = str1,
        solution = str2;
      if (answer === solution){
        return true;
      }//removing punctuation marks:
      answer = answer.replace(/[?=]|[¿=]|[!=]|[¡=]/gi,"").replace(/[, ]|[. ]/gi, " ").replace(/[,]|[.]/gi, " ").replace(/^(\s*)|(\s*)$/g, '').replace(/\s+/g, ' ');
      solution = solution.replace(/[?=]|[¿=]|[!=]|[¡=]/gi,"").replace(/[, ]|[. ]/gi, " ").replace(/[,]|[.]/gi, " ").replace(/^(\s*)|(\s*)$/g, '').replace(/\s+/g, ' ');
      if (answer === solution){
        return true;
      }//removing capital letters:
      answer = answer.toLowerCase();
      solution = solution.toLowerCase();
      if (answer === solution){
        return true;
      }//removing accent mark
      answer = answer.replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
      solution = solution.replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
      if (answer === solution){
        return true;
      }//removing white spaces at the beginning and at the end:
      answer = answer.trim();
      solution = solution.trim();
      if (answer === solution){
        return true;
      }//the answer is wrong
      return false;
    };

  }]);
