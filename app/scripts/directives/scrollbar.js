'use strict';
angular.module('myApp')
  .directive('scrollbar', function () {

    return {
      restrict: 'EA',

      link: function(scope, element) {

        // Adding scrollbar js library.
        element.mCustomScrollbar({
          setHeight: 75,
          theme: 'light-thick'
        });
      }
    };
  });
