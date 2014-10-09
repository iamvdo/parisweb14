/**
* Navigation plugin 0.1 for Reveal.js
* Vincent De Oliveira
*/
var Nav = (function() {

	var menu = document.createElement('div');
	menu.className = 'vdoMenu';

	document.body.appendChild(menu);

	var sections = document.querySelectorAll('.slides > section');
	var size = 100 / sections.length;
	var classSpan = '';
	var txt = '<ul>';
	for(var i = 0; i < sections.length; i++){
		var titre = sections[i].querySelector('h1') || sections[i].querySelector('h2') || sections[i].querySelector('.questions-titre') || document.createElement('h1');
		var dataState = sections[i].getAttribute('data-state') || '';

		if(i > sections.length/2){
			classSpan = 'sup';
		}
		txt += '<li class="' + dataState + '" style="width:' + size + '%"><a href="#/' + i + '/">' + i + '<span class="' + classSpan + '">' + titre.textContent + '</span></a></li>';

	}
	txt += '</ul>';

	menu.innerHTML = txt;

})();