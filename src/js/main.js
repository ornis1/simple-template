/*
 * Custom
 */
//= partials/component1.js
// <div class="map__dot"></div>
$(document).ready(function() {
  (function() {
    var el, mouseX, mouseY, indexWidth, indexHeight;

    var cb = function(e) {
      if (e && e.target && e.target.tagName !== "path") return;
      mouseX = event.offsetX;
      mouseY = event.offsetY;

      var dot = $(".map__dot");
      dot.css({ display: "block" });
      dot.css({ top: mouseY, left: mouseX });
    };

    if ($(".map").length) {
      $(".map").click(cb);
    }
  })();
});

// $(document).ready(function() {
// 	(function() {
// 		var el;
// 		var cb = function(e) {
// 			console.log(e.target);

// 			if (e && e.target && e.target.tagName !== "path") return;
// 			if (e && e.target) {
// 				el = $(e.target);
// 				e.stopPropagation();
// 				e.preventDefault();
// 			}

// 			var dot = $(".map__dot").css({ display: "block" });

// 			var left = Math.floor(el.width() / 2);
// 			var top = Math.floor(el.height() / 2);

// 			var parentTop = el.position().top;
// 			var parentLeft = el.position().left;
// 			dot.css({ top: top + parentTop, left: left + parentLeft });
// 		};
// 		if ($(".map").length) {
// 			$(".map").on("click", cb);
// 			window.addEventListener("resize", cb());
// 		}
// 	})();
// });
