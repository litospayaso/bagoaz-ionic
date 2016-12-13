/*global angular*/

angular.module("starter")
  .controller("BagoazBaloratzea", ["$rootScope", "$scope", "$location", "$http", function ($rootScope, $scope, $location, $http) {
    "use strict";
    $scope.zorionak=null;
    $scope.ebazpen=null;
    var parameters = $location.path().split('/');
    var level = parameters.pop()-1;
    var ariketak = $rootScope.ariketak[level];
    ariketak = ariketak.sort(function() {return Math.random() - 0.5}); //unsorting the array.
    var orain = ariketak.pop();

    if(orain.euskara){
      $scope.orainAriketa = orain.euskara;
      $scope.orainAudio = null;
    }else{
      $scope.orainAriketa = null;
      $scope.orainAudio = "/database/audios/"+ orain.audio +".mp3";
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
      }else{//if mistake
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
        $scope.orainAudio = "/database/audios/"+ orain.audio +".mp3";
        $http.get($scope.orainAudio).error(function () {
          $scope.jarraitu();
        });
      }
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
