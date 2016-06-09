angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, $http) {

    var method =  'GET';
    var url =     'http://api.yelp.com/v2/search';
    var params = {
      callback:                 'angular.callbacks._0',
      location:                 '30030',
      oauth_consumer_key:       '', // consumer key
      oauth_token:              '', //Token
      oauth_signature_method:   'HMAC-SHA1',
      oauth_timestamp:          new Date().getTime(),
      oauth_nonce:              randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      term:                     'ramen'
    }; // end params
    var consumerSecret =        ''; //Consumer Secret
    var tokenSecret =           ''; //Token Secret
    var signature =
      oauthSignature.generate(
        method,
        url,
        params,
        consumerSecret,
        tokenSecret,
        { encodeSignature: false }
      );
      // end signature
    params['oauth_signature'] = signature;

    $http(url, { params : params })
      .then(function(response) {
        $scope.myResponse = response.data
      });
    };

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
