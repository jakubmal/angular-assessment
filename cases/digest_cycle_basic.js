(function () {

var EXPECTED_VALUE = 'expected_value' + Math.random();

var app = angular.module('digest_cycle_basic', []);
app.directive('myDirective', function () {
  return {
    template: '<span>{{value}}</span>',
    link: function (scope, element, attrs, controller, transcludeFn) {
      setTimeout(function () {
        // EDITABLE BLOCK START
        scope.value = EXPECTED_VALUE;
        scope.$apply();
        // EDITABLE BLOCK END
      }, 0);
    }
  };
});

describe("digest_cycle_basic", function() {
  var $compile;
  var $scope;

  beforeEach(module('digest_cycle_basic'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new(true);
  }));

  it("contains expected value", function(done) {
    withDirective('<div my-directive></div>', function (element) {
      setTimeout(function () {
        expect(element.find('span').html()).toContain(EXPECTED_VALUE);
        done();
      }, 1);
    });
  });
});

})();
