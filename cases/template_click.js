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
  var $compile;
  var $scope;

  beforeEach(module('template_click'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new(true);
  }));

  it("displays a value after a click", function() {
    expect(true).toBe(true);

    var element = $compile('<div my-directive></div>')($scope);

    $scope.$digest();
    expect(element.find('span').html()).not.toContain(EXPECTED_VALUE);

    element.find('span').triggerHandler('click');
    expect(element.find('span').html()).toContain(EXPECTED_VALUE);
  });
});

})();
