/*
 * Custom
 */
//= partials/component1.js
// <div class="map__dot"></div>
$(document).ready(function() {
	var dot = $(".map__dot");
	var container = $(".map__item");
	var cWidth, cHeight, indexW, indexH, mouseX, mouseY;
	(function() {
		cWidth = container.width();
		cHeight = container.height();

		container.click(function(e) {
			if (e && e.target && e.target.tagName !== "path") return;

			dot.css({ display: "block" });

			mouseX = e.offsetX;
			mouseY = e.offsetY;

			indexW = mouseX / cWidth;
			indexH = mouseY / cHeight;

			console.log(indexW, indexH);
			var top = indexH * cHeight;
			var left = indexW * cWidth;
			dot.css({ top, left });
		});
		window.addEventListener("resize", function() {
			if (!indexH && !indexW) return;
			cWidth = container.width();
			cHeight = container.height();
			console.log(cHeight);
			var top = indexH * cHeight;
			var left = indexW * cWidth;
			dot.css({ top, left });
		});
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
