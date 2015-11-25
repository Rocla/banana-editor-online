(function() {
	"use strict";
	window.onload = function() {
		dimensioner();

		ace.require("ace/ext/language_tools");

		live_updater.banana_html_content_editor = ace.edit("banana_html_content");
		live_updater.banana_html_content_editor.setTheme("ace/theme/tomorrow_night_eighties");
		live_updater.banana_html_content_editor.session.setMode("ace/mode/html");
		live_updater.banana_html_content_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_html_content_editor.setOption("maxLines", 30);
		live_updater.banana_html_content_editor.setOption("minLines", 5);

		live_updater.banana_css_content_editor = ace.edit("banana_css_content");
		live_updater.banana_css_content_editor.setTheme("ace/theme/tomorrow");
		live_updater.banana_css_content_editor.session.setMode("ace/mode/css");
		live_updater.banana_css_content_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_css_content_editor.setOption("maxLines", 30);
		live_updater.banana_css_content_editor.setOption("minLines", 5);

		live_updater.banana_js_content_editor = ace.edit("banana_js_content");
		live_updater.banana_js_content_editor.setTheme("ace/theme/tomorrow_night_blue");
		live_updater.banana_js_content_editor.session.setMode("ace/mode/javascript");
		live_updater.banana_js_content_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_js_content_editor.setOption("maxLines", 30);
		live_updater.banana_js_content_editor.setOption("minLines", 5);

		live_updater.banana_vertex_content_editor = ace.edit("banana_vertex_content");
		live_updater.banana_vertex_content_editor.setTheme("ace/theme/terminal");
		live_updater.banana_vertex_content_editor.session.setMode("ace/mode/glsl");
		live_updater.banana_vertex_content_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_vertex_content_editor.setOption("maxLines", 30);
		live_updater.banana_vertex_content_editor.setOption("minLines", 5);

		live_updater.banana_fragment_content_editor = ace.edit("banana_fragment_content");
		live_updater.banana_fragment_content_editor.setTheme("ace/theme/cobalt");
		live_updater.banana_fragment_content_editor.session.setMode("ace/mode/glsl");
		live_updater.banana_fragment_content_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_fragment_content_editor.setOption("maxLines", 30);
		live_updater.banana_fragment_content_editor.setOption("minLines", 5);


		//caching required DOM references
		live_updater.result = document.getElementsByTagName('iframe')[0].contentWindow.document;
		live_updater.result_head = (live_updater.result).getElementsByTagName('head')[0];
		live_updater.result_body = (live_updater.result).getElementsByTagName('body')[0];

		//append style tag to hold custom styles
		live_updater.result_style = (live_updater.result_head).appendChild((live_updater.result).createElement('style'));

		//append jQuery
		var jquery_script = (live_updater.result).createElement('script');
		jquery_script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js";

		//append commonFunctions
		var externalCommonFunctions = (live_updater.result).createElement('script');
		externalCommonFunctions.src = "/js/commonFunctions.js";

		//append gl-matrix-min
		var externalGLMatrixMin = (live_updater.result).createElement('script');
		externalGLMatrixMin.src = "/js/gl-matrix-min.js";

		//append webglTools
		var externalWebGLTools = (live_updater.result).createElement('script');
		externalWebGLTools.src = "/js/webglTools.js";

		(live_updater.result_head).appendChild(jquery_script);
		(live_updater.result_head).appendChild(externalCommonFunctions);
		(live_updater.result_head).appendChild(externalGLMatrixMin);
		(live_updater.result_head).appendChild(externalWebGLTools);

		//append script tag to hold custom javascript code
		live_updater.result_script = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));

		//append script tag to hold custom vertex shader code
		live_updater.result_vertex = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));
		(live_updater.result_vertex).setAttribute("id","shader-vs");
		(live_updater.result_vertex).setAttribute("type","x-shader/x-vertex");

		//append script tag to hold custom fragment shader code
		live_updater.result_fragment = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));
		(live_updater.result_fragment).setAttribute("id","shader-fs");
		(live_updater.result_fragment).setAttribute("type","x-shader/x-fragment");

		// $('textarea').keyup(function(e) {
		// 	//console.log("keypress: " + e.keyCode);
		// 	if(!(e.keyCode >= 9 && e.keyCode <= 12) && !(e.keyCode >= 14 && e.keyCode <= 45) && !(e.keyCode >= 112 && e.keyCode <= 145)) {
		// 		live_updater($(this));
		// 	}
		// });
		// $('textarea').keydown(function(e) {
		// 	if(e.keyCode == 9) { //tab pressed
		// 		e.preventDefault(); // stops its action
		// 	}
		// });

		live_updater();
		

	};

	function dimensioner() {
		var dim_height = document.getElementById('banana_container').offsetHeight,
			dim_width = document.getElementById('banana_container').offsetWidth;
		// console.log("Height: " + dim_height + " Width:" + dim_width);
		$('.3boxes').css({
			'width': ((dim_width - 6) / 3) + "px"
		});
		$('.2boxes').css({
			'width': ((dim_width - 6) / 2) + "px"
		});
		$('.1box').css({
			'width': ((dim_width - 6)) + "px"
		});
		$('#banana_output_frame').css({
			'width': ((dim_width)) + "px"
		});
	}

	window.onresize = function(event) {
		dimensioner();
	};

	function live_updater() {
		//console.log(live_updater.banana_html_content_editor.getValue());
		var css_content = $('#banana_css_content').val(),
			js_content = $('#banana_js_content').val(),
			vertex_content = $('#banana_vertex_content').val(),
			fragment_content = $('#banana_fragment_content').val();
			//code_type = codeType.data('code');
			//console.log(code_type);

		live_updater.banana_html_content_editor.getSession().on("change", function () {

			//append html
			(live_updater.result_body).innerHTML = live_updater.banana_html_content_editor.getSession().getValue();

    	});

    	live_updater.banana_js_content_editor.getSession().on("change", function () {

    		//append html
			(live_updater.result_body).innerHTML = live_updater.banana_html_content_editor.getSession().getValue();
			
			//append custom javascript
			(live_updater.result_head).removeChild(live_updater.result_script);
			live_updater.result_script = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));

			(live_updater.result_script).textContent = '//<![CDATA['+"\n"+live_updater.banana_js_content_editor.getSession().getValue()+"\n"+'//]]>';

    	});

		// if(code_type === "html" || code_type === "js"){

		// 	//append html
		// 	(live_updater.result_body).innerHTML = html_content;

		// 	//append custom javascript
		// 	(live_updater.result_head).removeChild(live_updater.result_script);
		// 	live_updater.result_script = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));

		// 	(live_updater.result_script).textContent = '//<![CDATA['+"\n"+js_content+"\n"+'//]]>';

		// } else if(code_type === "css"){

		// 	//append css content
		// 	(live_updater.result_style).textContent = css_content;

		// } else if(code_type === "vertex"){

		// 	//append custom vertex shader
		// 	(live_updater.result_head).removeChild(live_updater.result_vertex);
		// 	live_updater.result_vertex = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));
		// 	(live_updater.result_vertex).setAttribute("id","shader-vs");
		// 	(live_updater.result_vertex).setAttribute("type","x-shader/x-vertex");

		// 	(live_updater.result_vertex).textContent = '//<![CDATA['+"\n"+vertex_content+"\n"+'//]]>';

		// } else if(code_type === "fragment"){

		// 	//append custom fragment shader
		// 	(live_updater.result_head).removeChild(live_updater.result_fragment);
		// 	live_updater.result_fragment = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));
		// 	(live_updater.result_fragment).setAttribute("id","shader-fs");
		// 	(live_updater.result_fragment).setAttribute("type","x-shader/x-fragment");

		// 	(live_updater.result_fragment).textContent = '//<![CDATA['+"\n"+fragment_content+"\n"+'//]]>';

		// } else if(codeType === "init"){
		// 	//append html
		// 	(live_updater.result_body).innerHTML = html_content;

		// 	//append custom javascript
		// 	(live_updater.result_head).removeChild(live_updater.result_script);
		// 	live_updater.result_script = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));

		// 	(live_updater.result_script).textContent = '//<![CDATA['+"\n"+js_content+"\n"+'//]]>';

		// 	//append css content
		// 	(live_updater.result_style).textContent = css_content;

		// 	//append custom vertex shader
		// 	(live_updater.result_head).removeChild(live_updater.result_vertex);
		// 	live_updater.result_vertex = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));
		// 	(live_updater.result_vertex).setAttribute("id","shader-vs");
		// 	(live_updater.result_vertex).setAttribute("type","x-shader/x-vertex");

		// 	(live_updater.result_vertex).textContent = '//<![CDATA['+"\n"+vertex_content+"\n"+'//]]>';

		// 	//append custom fragment shader
		// 	(live_updater.result_head).removeChild(live_updater.result_fragment);
		// 	live_updater.result_fragment = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));
		// 	(live_updater.result_fragment).setAttribute("id","shader-fs");
		// 	(live_updater.result_fragment).setAttribute("type","x-shader/x-fragment");

		// 	(live_updater.result_fragment).textContent = '//<![CDATA['+"\n"+fragment_content+"\n"+'//]]>';
		// }
	}

})();