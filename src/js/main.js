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
		if (!container) return;
		cWidth = container.width();
		cHeight = container.height();

		document.querySelector(".map__item").addEventListener(
			"click",

			function(e) {
				if (e && e.target && e.target.tagName !== "path") return;
				dot.css({ display: "block" });

				var rect = e.currentTarget.getBoundingClientRect(),
					mouseX = e.clientX - rect.left,
					mouseY = e.clientY - rect.top;

				indexW = mouseX / cWidth;
				indexH = mouseY / cHeight;

				var top = indexH * cHeight;
				var left = indexW * cWidth;
				dot.css({ top, left });
			},
			false
		);
		window.addEventListener("resize", function() {
			if (!indexH && !indexW) return;
			cWidth = container.width();
			cHeight = container.height();

			var top = indexH * cHeight;
			var left = indexW * cWidth;
			dot.css({ top, left });
		});
	})();
});
