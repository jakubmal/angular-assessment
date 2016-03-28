(function () {

var EXPECTED_VALUE = 'expected_value' + Math.random();

var app = angular.module('template_conditional', []);
app.directive('myDirective', function () {
  // EDITABLE BLOCK START
  var attributes = 'ng-if="!hideValue"';
  // EDITABLE BLOCK END

  return {
    template: '<span ' + attributes + ' >{{value}}</span>',
    replace: false,
    link: function (scope, element, attrs, controller, transcludeFn) {
      scope.value = EXPECTED_VALUE;
    }
  };
});

describe("template_conditional", function() {
  beforeEach(module('template_conditional'));

  it("conditionally displays a value", function(done) {
    withDirective('<div my-directive></div>', function (element, scope, refreshScope) {
      expect(element.find('span').html()).toContain(EXPECTED_VALUE);

      scope.hideValue = true;
      refreshScope();
      expect(element.find('span').html()).not.toContain(EXPECTED_VALUE);

      done();
    });
  });
});

})();
