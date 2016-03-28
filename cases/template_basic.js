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
  var $compile;
  var $scope;

  beforeEach(module('template_basic'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new(true);
  }));

  it("contains expected value", function() {
    expect(true).toBe(true);

    var element = $compile('<div my-directive></div>')($scope);
    $scope.$digest();

    expect(element.find('span').html()).toContain(EXPECTED_VALUE);
  });
});

})();
