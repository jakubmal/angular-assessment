(function () {

var EXPECTED_VALUE = 'expected_value' + Math.random();

var app = angular.module('template_basic', []);
app.directive('myDirective', function () {
  return {
    template: '<span>{{value}}</span>',
    replace: false,
    link: function (scope, element, attrs, controller, transcludeFn) {
      // EDITABLE BLOCK START
      scope.value = EXPECTED_VALUE;
      // EDITABLE BLOCK END
    }
  };
});

describe("template_basic", function() {
  beforeEach(module('template_basic'));

  it("contains expected value", function(done) {
    withDirective('<div my-directive></div>', function (element) {
      expect(element.find('span').html()).toContain(EXPECTED_VALUE);

      done();
    });
  });
});

})();
