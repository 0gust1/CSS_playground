var pp = (function() {

	var textSlicer = {};

	textSlicer.test = function() {
		//console.log("test OK");
	};

    /**
     *
     * @param {NodeList} elements
     * @param {String} flagClass
     * @param {String} wrapperTag
     * @param {String} wrapperClass
     */
	textSlicer.wrapCharacters = function wrapCharacters(elements, flagClass, wrapperTag, wrapperClass) {
        for (var l = 0; l < elements.length; l++) {
            var element = elements[l];
            element.classList.add(flagClass);
            var child = element.firstChild;
            //var child = element;
            //child.normalize();
            while (child) {
                // have to get a reference before we replace the child node
                var nextSibling = child.nextSibling;

                if (child.nodeType === 1) { // element node
                    textSlicer.wrapCharacters(child,flagClass, wrapperTag, wrapperClass);
                } else if (child.nodeType === 3) { // text node
                    var d_ = document.createDocumentFragment();
                    //console.log(child.textContent);

                    for (var i = 0, len = child.textContent.length; i < len; i++) {
                        var char=child.textContent.charAt(i);

                            var span = document.createElement(wrapperTag);
                       if(char!==" "&& char!=="\r" && char!=="\n" && char !=='\t'){//f(char!==" "&& char!=="\r" && char!=="\n" && char !=='\t'){
                            span.classList.add(wrapperClass);
                        }
                        span.innerHTML = char;
                            d_.appendChild(span);

                    }
                    // document fragments are just awesome
                    child.parentNode.replaceChild(d_, child);
                }
                child = nextSibling;
            }
        }
	};

	// textSlicer.wrapWords = function(element, className){
	// 	element.classList.add('word-wrapped');
	// 	element.normalize();
	// 	var text = element.textContent;
	// 	var words = //.exec(text);

	// };

	return textSlicer;

}());

console.log(jQuery('.to-wrap').text());

//pp.test();
pp.wrapCharacters(document.querySelectorAll('.to-wrap'),'wrapped','span','wrapper');

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

// *****

var elements = $('.to-wrap');

for (var i = elements.length - 1; i >= 0; i--) {
	elements[i].addEventListener("mouseover", function(e) {
		if ( matches.call(e.target,'.to-wrap .wrapper') ) {
     	 e.target.classList.add("rotated");
   		}
		
	}, false);

	// elements[i].addEventListener("mouseout", function(e) {
	// 	if ( matches.call(e.target,'.to-wrap .wrap') ) {
 //     	 e.target.classList.remove("rotated");
 //   		}
		
	// }, false);

    console.log(jQuery("body").html());

}