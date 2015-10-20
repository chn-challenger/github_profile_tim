describe('GitUserSearchController', function() {
  beforeEach(module('GitUserSearch'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('GitUserSearchController');
  }));

  // it('initialises with an empty search result and term', function() {
  //   expect(ctrl.searchResult).toBeDefined();
  //   expect(ctrl.searchTerm).toBeUndefined();
  // });

  describe('when searching for a user', function() {
    var items = [
      {
        "login": "tansaku",
        "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
        "html_url": "https://github.com/tansaku"
      },
      {
        "login": "stephenlloyd",
        "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
        "html_url": "https://github.com/stephenlloyd"
      }
    ];

    var apiUrl = 'https://api.github.com/search/users?access_token=' + access_token + '&q=hello'

    var httpBackend;
    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
      httpBackend
        .when("GET", apiUrl)
        .respond(
          { items: items }
        );
    }));

    it('displays search results', function() {
      ctrl.searchTerm = 'hello';
      ctrl.doSearch();
      httpBackend.flush();
      expect(ctrl.searchResult.items).toEqual(items);
    });
  });
});
