angular.module('myApp').filter('alterCollection', function($window, $filter) {
  return function(collection, params) {
    console.log(params);
    console.log(collection);

    // Exclude self movie and movies from different genres.
    return $filter('filter')(collection, params.config);

    var newCollection = new Array();
    angular.copy(collection, newCollection);
    // Shuffle the collection.
    newCollection = $window.shuffle(newCollection);
//    newCollection = ;

//    var newCollection = ;
    return newCollection
  };
});
