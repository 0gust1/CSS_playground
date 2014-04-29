var textSlicer = (function() {

    var textSlicer = {};

    textSlicer.test = function() {
        //console.log("test OK");
    };

    //une fonction qui wrappe les caractères d'une balise par une balise spécifiée

    //une fonction qui wrappe les mots d'une balise par une balise spécifiée

    //une fonction qui wrappe les mots d'une balise par une balise spécifiée et qui wrappe les caractères de ces mots par une autre balise

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
                    textSlicer.wrapCharacters([child],flagClass, wrapperTag, wrapperClass);
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

    // Callback version : use acustom function to generate something with letters
    textSlicer.wrapCharactersFn = function wrapCharactersFn(elements, flagClass, wrapperTag, wrapperClass) {
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
                    textSlicer.wrapCharactersFn(child,flagClass, wrapperTag, wrapperClass);
                } else if (child.nodeType === 3) { // text node
                    var __ret = this.wrapChars(child, wrapperTag, wrapperClass);
                    var d_ = __ret.d_;
                    var i = __ret.i;
                    var len = __ret.len;
                    var char = __ret.char;
                    var span = __ret.span;
                }
                child = child.nextSibling;
            }
        }
    };


	textSlicer.wrapWords = function(elements, flagClass, wrapperTag, wrapperClass){
	//element.classList.add('word-wrapped');
	//element.normalize();
	//var text = element.textContent;
	//var words = //.exec(text);
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
                    textSlicer.wrapWords([child],flagClass, wrapperTag, wrapperClass);
                } else if (child.nodeType === 3) { // text node
                    var d_ = document.createDocumentFragment();
                    //console.log(child.textContent);
                    var words = child.textContent.trim().split(/\s+/);

                    for (var i = 0, len = words.length; i < len; i++) {
                        var word = words[i];

                        var span = document.createElement(wrapperTag);
                        var space = document.createElement(wrapperTag); // put a space afterwards

                        span.innerHTML = word; // put the word
                        span.classList.add(wrapperClass);
                        space.innerHTML=" ";
                        d_.appendChild(span);
                        d_.appendChild(space);

                    }
                    // document fragments are just awesome
                    child.parentNode.replaceChild(d_, child);
                }
                child = nextSibling;
            }
        }


	};

	return textSlicer;

}());


//textSlicer.wrapCharacters(document.querySelectorAll('.to-wrap, .anim-deposer'),'wrapped','span','wrapper');


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

var elements = $('.anim-envol');

for (var i = elements.length - 1; i >= 0; i--) {
	elements[i].addEventListener("mouseover", function(e) {
		if ( matches.call(e.target,'.anim-envol .wrapper') ) {
     	 e.target.classList.add("envol");
   		}
		
	}, false);
}

elements = $(".anim-deposer");

for (i = elements.length - 1; i >= 0; i--) {
    elements[i].addEventListener("mouseover", function(e) {
        if ( matches.call(e.target,'.anim-deposer .wrapper') ) {
            e.target.classList.add("deposer");
        }

    }, false);
}

/**
 *
 * @param containerClass
 * @param wrapperClass
 * @param animClass
 * @param durationMax
 */
function triggerDelayedAnim(containerClass, wrapperClass, animClass, durationMax){
    var elements = document.querySelectorAll('.'+containerClass+' .'+wrapperClass);
   //console.dir(elements);
    for (i = elements.length - 1; i >= 0; i--) {
        (function triggerAnim(el){
            setTimeout(function(){
                el.classList.add(animClass);
            },Math.random()*durationMax);
        })(elements[i]);
    }
}

var btnEnvol = document.getElementById("btn-envol").addEventListener("click",function(){
    triggerDelayedAnim("anim-envol","wrapper","envol",10000);
});


var btnDeposer = document.getElementById("btn-deposer").addEventListener("click",function(){
    triggerDelayedAnim("anim-deposer","wrapper","deposer",10000);
});


