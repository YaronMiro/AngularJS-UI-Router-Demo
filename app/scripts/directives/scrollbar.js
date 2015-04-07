'use strict';
angular.module('myApp')
  .directive('scrollbar', function () {

    return {
      restrict: 'EA',
      scope: { maxHeight: '@' },

      link: function(scope, element) {

        // Adding scrollbar js library.
        element.mCustomScrollbar({
          setHeight: scope.maxHeight,
          theme: 'light-thick',
          scrollButtons: {enable: true}
        });
      }
    };
  });
