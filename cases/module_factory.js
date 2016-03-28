(function () {

var EXPECTED_VALUE = 'expected_value' + Math.random();

var app = angular.module('module_factory', []);

app.factory('MyService', function () {
// EDITABLE BLOCK START
  return {
    returnHello: function () {
      return EXPECTED_VALUE;
    }
  };
// EDITABLE BLOCK END
});


describe("module_factory", function() {
  var MyService;

  beforeEach(module('module_factory'));
  beforeEach(inject(function (_MyService_) {
    MyService = _MyService_;
  }));

  it("returns expected value", function() {
    expect(MyService.returnHello()).toEqual(EXPECTED_VALUE);
  });
});

})();
