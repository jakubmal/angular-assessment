var EXPECTED_VALUE = 'expected_value' + Math.random();

var app = angular.module('template_conditional', []);
app.directive('myDirective', function () {
  // EDITABLE BLOCK START
  // var attributes = 'ng-if="!hideValue"';
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
  var $compile;
  var $scope;

  beforeEach(module('template_conditional'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new(true);
  }));

  it("conditionally displays a value", function() {
    expect(true).toBe(true);

    var element = $compile('<div my-directive></div>')($scope);

    $scope.$digest();
    expect(element.find('span').html()).toContain(EXPECTED_VALUE);

    $scope.hideValue = true;
    $scope.$digest();
    expect(element.find('span').html()).not.toContain(EXPECTED_VALUE);
  });
});
