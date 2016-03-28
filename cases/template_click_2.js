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
  var $compile;
  var $scope;

  beforeEach(module('template_click_2'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new(true);
  }));

  it("displays a value after a click", function() {
    expect(true).toBe(true);

    var element = $compile('<div my-directive></div>')($scope);

    $scope.$digest();
    expect(element.find('span').html()).not.toContain(EXPECTED_VALUE);

    element.find('span').triggerHandler({type: 'click', customParam: EXPECTED_VALUE});
    expect(element.find('span').html()).toContain(EXPECTED_VALUE);
  });
});

})();
