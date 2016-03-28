(function () {

var EXPECTED_VALUE = 'expected_value' + Math.random();

var app = angular.module('template_click', []);
app.directive('myDirective', function () {
  // EDITABLE BLOCK START
  var attributes = 'ng-click="updateValue()"';
  // EDITABLE BLOCK END

  return {
    template: '<span ' + attributes + ' >{{value}}</span>',
    replace: false,
    link: function (scope, element, attrs, controller, transcludeFn) {
      scope.updateValue = function () {
        scope.value = EXPECTED_VALUE;
      };
    }
  };
});

describe("template_click", function() {
  beforeEach(module('template_click'));

  it("displays a value after a click", function(done) {
    withDirective('<div my-directive></div>', function (element) {
      expect(element.find('span').html()).not.toContain(EXPECTED_VALUE);

      element.find('span').triggerHandler('click');
      expect(element.find('span').html()).toContain(EXPECTED_VALUE);

      done();
    });
  });
});

})();
