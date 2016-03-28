(function () {

var EXPECTED_VALUE_1 = 'expected_value_1_' + Math.random();
var EXPECTED_VALUE_2 = 'expected_value_2_' + Math.random();
var EXPECTED_VALUE_3 = 'expected_value_3_' + Math.random();
var EXPECTED_VALUE_4 = 'expected_value_4_' + Math.random();

var fakeAjaxCall = function (callback) {
  return {
    finish: function () { callback(); }
  };
};

var ajaxCall;

var app = angular.module('digest_cycle_interrupted', []);
app.directive('myDirective', function () {
  return {
    template: '<span>' +
      '<a ng-click="changeSomeSettings(newSetting)"></a>' +
      '<input type="text" ng-model="text" />' +
      '{{value}}' +
      '</span>',

    link: function (scope, element, attrs, controller, transcludeFn) {
      // what is not working and why?
      // discuss possible solutions
      // discuss best practices
      // this is an open ended question

      // TODO: mangle $apply

      scope.newSetting = EXPECTED_VALUE_4;
      scope.text = EXPECTED_VALUE_1;

      var externalValue = null;
      var otherComputationResult = function () {
        return externalValue;
      };

      var recalculateValue = function (newTextValue) {
        scope.value = otherComputationResult() || newTextValue || scope.text;
      };
      scope.$watch('text', recalculateValue);

      scope.changeSomeSettings = function (setting) {
        externalValue = setting || EXPECTED_VALUE_3;
        recalculateValue();
      };

      ajaxCall = fakeAjaxCall(function () {
        scope.changeSomeSettings();
        scope.$apply();
      });
    }
  };
});

describe("digest_cycle_interrupted", function() {
  var $compile;
  var $scope;

  beforeEach(module('digest_cycle_interrupted'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new(true);
  }));

  it("contains expected value", function(done) {
    withDirective('<div my-directive></div>', function (element, scope, refreshScope) {
      expect(element.find('span').html()).toContain(EXPECTED_VALUE_1);

      scope.text = EXPECTED_VALUE_2;
      refreshScope();
      expect(element.find('span').html()).toContain(EXPECTED_VALUE_2);

      ajaxCall.finish();
      expect(element.find('span').html()).toContain(EXPECTED_VALUE_3);

      element.find('a').triggerHandler('click');
      expect(element.find('span').html()).toContain(EXPECTED_VALUE_4);

      done();
    });
  });
});

})();
