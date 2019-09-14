twClickOutside.$inject = ['$window', '$parse']
function twClickOutside ($window, $parse) {
  return {
    link: function(scope, el, attr) {
      if (!attr.twClickOutside) {
        return;
      }

      var ignore;
      if (attr.ignoreIf) {
        ignore = $parse(attr.ignoreIf);
      }

      var nakedEl = el[0];
      var fn = $parse(attr.twClickOutside);

      var handler = function(e) {
        if (nakedEl === e.target || nakedEl.contains(e.target) || (ignore && ignore(scope))) {
            return;
        }
        scope.$applyAsync(fn);
      };

      var handler2 = function(e) {
        if (e.keyCode !== 27) {
          return;
        }
        scope.$applyAsync(fn);
      };

      $window.addEventListener('click', handler, true);
      $window.addEventListener('keydown', handler2, true);
      scope.$on('$destroy', function(e) {
        $window.removeEventListener('click', handler);
      });
    }
  };
}

angular.module('tw.directives.clickOutside', []).directive('twClickOutside', twClickOutside);
