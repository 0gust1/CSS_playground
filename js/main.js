var pp = (function() {

	var august1Utils = {};

	august1Utils.test = function() {
		console.log("test OK");
	};

	august1Utils.wrapCharacters = function(element, className) {
		element.classList.add('wrapped');
		var child = element.firstChild;
		while (child) {
			// have to get a reference before we replace the child node
			var nextSibling = child.nextSibling;

			if (child.nodeType === 1) { // element node
				august1Utils.wrapCharacters(child, className);
			} else if (child.nodeType === 3) { // text node
				var d_ = document.createDocumentFragment();

				for (var i = 0, len = child.nodeValue.length; i < len; i++) {
					var span = document.createElement('span');
					span.classList.add('wrap');
					span.innerHTML = child.nodeValue.charAt(i);
					d_.appendChild(span);
				}
				// document fragments are just awesome
				child.parentNode.replaceChild(d_, child);
			}
			child = nextSibling;
		}
	};

	return august1Utils;

}());

pp.test();
pp.wrapCharacters(document.querySelector('.to-wrap'))

// querySelector, jQuery style
var $ = function(selector) {
	return document.querySelectorAll(selector);
};

var matches;
 
(function(doc) {
   matches =
      doc.matchesSelector ||
      doc.webkitMatchesSelector ||
      doc.mozMatchesSelector ||
      doc.oMatchesSelector ||
      doc.msMatchesSelector;
})(document.documentElement);

var elements = $('.to-wrap');
for (var i = elements.length - 1; i >= 0; i--) {
	elements[i].addEventListener("mouseover", function(e) {
		if ( matches.call(e.target,'.to-wrap .wrap') ) {
     	 e.target.classList.add("rotated");
   		}
		
	}, false);

	// elements[i].addEventListener("mouseout", function(e) {
	// 	if ( matches.call(e.target,'.to-wrap .wrap') ) {
 //     	 e.target.classList.remove("rotated");
 //   		}
		
	// }, false);

};