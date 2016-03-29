(function () {

// describe possible solutions, there's more than one
// discuss best practices

var EXPECTED_VALUE_1 = 'expected_value_1_' + Math.random();
var EXPECTED_VALUE_2 = 'expected_value_2_' + Math.random();
var EXPECTED_VALUE_3 = 'expected_value_2_' + Math.random();
var EXPECTED_VALUE_4 = 'expected_value_2_' + Math.random();
var EXPECTED_VALUE_5 = 'expected_value_2_' + Math.random();

var app = angular.module('problem_digest_collection', []);

// EDITABLE BLOCK START
// EDITABLE BLOCK END

app.directive('myDirective', function () {
  // EDITABLE BLOCK START
  var attributes = 'ng-repeat="item in listItems()"';
  // EDITABLE BLOCK END

  return {
    template: '<span ' + attributes + '>{{item.text}}</span>',
    replace: false,
    link: function (scope, element, attrs, controller, transcludeFn) {
      scope.items = [
        {text: EXPECTED_VALUE_1},
        {text: EXPECTED_VALUE_2},
        {text: 'dont-show-me'},
        {text: EXPECTED_VALUE_3},
        {text: EXPECTED_VALUE_4},
        {text: EXPECTED_VALUE_5},
        {text: 'dont-show-me'}
      ];

      // EDITABLE BLOCK START
      scope.listItems = function () {
        // accept if starts with expected_value
        return scope.items.slice().filter(function (item) {
          return item.text.indexOf('expected_value') == 0;
        }).map(function (item) {
          return {
            text: item.text.toUpperCase()
          };
        });
      };
      // EDITABLE BLOCK END
    }
  };
});

xdescribe("problem_digest_collection", function() {
  beforeEach(module('problem_digest_collection'));

  it("conditionally displays a value", function(done) {
    withDirective('<div my-directive></div>', function (element, scope, refreshScope) {
      var spans = Array.prototype.slice.apply(element[0].children).map(function (span) { return span.textContent; });
      expect(spans).not.toContain('dont-show-me'.toUpperCase());
      expect(spans).toContain(EXPECTED_VALUE_1.toUpperCase());
      expect(spans).toContain(EXPECTED_VALUE_2.toUpperCase());
      expect(spans).toContain(EXPECTED_VALUE_3.toUpperCase());
      expect(spans).toContain(EXPECTED_VALUE_4.toUpperCase());
      expect(spans).toContain(EXPECTED_VALUE_5.toUpperCase());

      done();
    });
  });
});

})();
