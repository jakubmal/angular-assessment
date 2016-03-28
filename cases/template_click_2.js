(function () {

var EXPECTED_VALUE = 'expected_value' + Math.random();

var app = angular.module('template_click_2', []);
app.directive('myDirective', function () {
  // EDITABLE BLOCK START
  var attributes = 'ng-click="updateValue($event.customParam)"';
  // EDITABLE BLOCK END

  return {
    template: '<span ' + attributes + ' >{{value}}</span>',
    replace: false,
    link: function (scope, element, attrs, controller, transcludeFn) {
      scope.updateValue = function (customParam) {
        scope.value = customParam;
      };
    }
  };
});

describe("template_click_2", function() {
  beforeEach(module('template_click_2'));

  it("displays a value after a click", function(done) {
    withDirective('<div my-directive></div>', function (element) {
      expect(element.find('span').html()).not.toContain(EXPECTED_VALUE);

      element.find('span').triggerHandler({type: 'click', customParam: EXPECTED_VALUE});
      expect(element.find('span').html()).toContain(EXPECTED_VALUE);

      done();
    });
  });
});

})();
