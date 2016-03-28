window.withDirective = function (template, callback) {
  inject(function ($compile, $rootScope) {
    var scope = $rootScope.$new();
    var refreshFn = function () { scope.$digest(); };

    var element = $compile(template)(scope);
    refreshFn();

    callback(element, scope, refreshFn);
  });
};
