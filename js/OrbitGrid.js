;(function(document, window, undefined){

	var

	timeoutId = undefined,

	elements = [],

	breakpoints = [
		{bp: 0, name: 'xs'},
		{bp: 376, name: 'sm'},
		{bp: 780, name: 'md'},
		{bp: 980, name: 'lg'},
		{bp: 1200, name: 'xl'},
		{bp: 1600, name: 'xxl'}
	],

	breakpointsSorter = function(a, b){
		return a.bp - b.bp;
	},

	init = function(customBreakpoints){

		initBreakpoints(customBreakpoints);

		if(document.readyState === 'complete') initElements();
		else{
			if(window.addEventListener) window.addEventListener('load', initElements);
			else window.attachEvent('onload', initElements);
		} 

	},

	initBreakpoints = function(customBreakpoints){
		if(!!customBreakpoints){
			breakpoints = [];
			for(var bp in customBreakpoints){
				breakpoints.push({
					bp: bp,
					name: customBreakpoints[bp]
				});
			}
			breakpoints.sort(breakpointsSorter);
		}
	},

	initElements = function(){

		elements = [];
		var els = document.querySelectorAll('[data-grid-bp]');

		for(var i = 0; i < els.length; i++){
			elements.push(els[i]);
			setElementBreakpoints(els[i]);
		}
	},

	setElementBreakpoints = function(element){
		if(!element) return;

		var attrs = [];
		var width = element.clientWidth;
		for(var q = 0; q < breakpoints.length; q++){
			if(width >= breakpoints[q].bp) attrs.push(breakpoints[q].name);
		}
		element.setAttribute('data-grid-bp', attrs.join(' '));
	},

	updateExistingElements = function(){

		for(var i = 0; i < elements.length; i++){
			setElementBreakpoints(elements[i]);
		}

	},

	updateBreakpoints = function(){
		updateExistingElements();
	},

	updateDOM = function(newElements){

		if(newElements.nodeType === 1) elements.push(newElements);
		else if(newElements.constructor === Array) elements = elements.concat(newElements);
		else initElements();

	},

	onWindowResize = function(){
		if(!!timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(updateBreakpoints, 50);	
	};

	if(window.addEventListener) window.addEventListener('resize', onWindowResize);
	else window.attachEvent('onresize', onWindowResize);

	window.OrbitGrid = {
		initialize: init,
		update: updateBreakpoints,
		DOMChanged: updateDOM
	}

})(document, window);