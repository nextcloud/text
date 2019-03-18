<?php
script('text', 'type');
style('text', 'style');
?>
<div id="app-content">
	<div id="editor1"></div>
	<div id="editor2"></div>
	<div id="editor3"></div>

	<div style="display: none" id="editor-content">
		<h3>Hello ProseMirror</h3>

		<p>This is editable text. You can focus it and start typing.</p>

		<p>To apply styling, you can select a piece of text and manipulate
			its styling from the menu. The basic schema
			supports <em>emphasis</em>, <strong>strong
				text</strong>, <a href="http://marijnhaverbeke.nl/blog">links</a>, <code>code
				font</code>, and <img src="/img/smiley.png"> images.</p>

		<p>Block-level structure can be manipulated with key bindings (try
			ctrl-shift-2 to create a level 2 heading, or enter in an empty
			textblock to exit the parent block), or through the menu.</p>

		<p>Try using the “list” item in the menu to wrap this paragraph in
			a numbered list.</p>
	</div>

</div>
