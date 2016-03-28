(function () {

var EXPECTED_VALUE = 'expected_value' + Math.random();

var app = angular.module('module_service', []);

app.service('MyService', function () {
// EDITABLE BLOCK START
  this.returnHello = function () {
    return EXPECTED_VALUE;
  };
// EDITABLE BLOCK END
});


describe("module_service", function() {
  var MyService;

  beforeEach(module('module_service'));
  beforeEach(inject(function (_MyService_) {
    MyService = _MyService_;
  }));

  it("returns expected value", function() {
    expect(MyService.returnHello()).toEqual(EXPECTED_VALUE);
  });
});

})();
