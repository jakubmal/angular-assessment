(function () {

var EXPECTED_VALUE = 'expected_value' + Math.random();

var app = angular.module('problem_dependencies', []);

app.service('MyService', function (HelloMessage, Sayer) {
  this.sayHello = function () { return Sayer.say(HelloMessage); };
});

// EDITABLE BLOCK START
app.constant('HelloMessage', EXPECTED_VALUE);
app.factory('Sayer', function () { return { say: function (msg) { return msg; } } });
// EDITABLE BLOCK END


describe("problem_dependencies", function() {
  var MyService;

  beforeEach(module('problem_dependencies'));
  beforeEach(inject(function (_MyService_) {
    MyService = _MyService_;
  }));

  it("returns expected value", function() {
    expect(MyService.sayHello()).toEqual(EXPECTED_VALUE);
  });
});

})();
