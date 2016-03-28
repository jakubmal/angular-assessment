(function () {

var EXPECTED_VALUE = 'expected_value' + Math.random();

var app = angular.module('module_provider_2', []);

app.provider('MyService', function () {
  var self = this;
  this.hello = 'my kind of hello';

  this.$get = function () {
    return {
      returnHello: function () {
        return self.hello;
      }
    };
  };
});


// EDITABLE BLOCK START
app.config(function (MyServiceProvider) {
  MyServiceProvider.hello = EXPECTED_VALUE;
});
// EDITABLE BLOCK END


describe("module_provider_2", function() {
  var MyService;

  beforeEach(module('module_provider_2'));
  beforeEach(inject(function (_MyService_) {
    MyService = _MyService_;
  }));

  it("returns expected value", function() {
    expect(MyService.returnHello()).toEqual(EXPECTED_VALUE);
  });
});

})();
