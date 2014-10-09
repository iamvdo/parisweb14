var Vdo = (function(){

	function init(){
		
		addMenu();
		setCanvas();   
	}
		
	function addMenu(){
		var menu = document.createElement('div');
		menu.className = 'vdoMenu';

		document.body.appendChild(menu);
			
		var titles = document.querySelectorAll('.slides h1, .slides h2');

		var len = titles.length;
		var size = 100 / len;
		
		var txt = '<ul>';
		var classSpan = '';

		for(var i = 0; i < titles.length; i++){

			var state = '';
			var attr = titles[i].parentElement.attributes.getNamedItem('data-state');
			if( attr != null ){
				state = attr.nodeValue;
			}

			if(i > len/2){
				classSpan = 'sup';
			}

			txt += '<li class="' + state + '" style="width:' + size + '%"><a href="#/' + i + '/">' + i + '<span class="' + classSpan + '">' + titles[i].textContent + '</span></a></li>';
		
		}
		txt += '</ul>';
		
		menu.innerHTML = txt;
	}
		
	return init();
   
})();



