
var jsApp = {

	/**
	 * Initialize the application
	 */
	 onload: function() {
		// init the video
		if (!me.video.init('jsapp', 640, 480)) {
			alert("Sorry but your browser does not support html 5 canvas. Please try with another one!");
			return;
		}
		
		// set all ressources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all ressources to be loaded
		me.loader.preload([{name: "atascii", type:"image",	src: "atascii_8px.png"}]);
		
		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
	},
	
	/**
	 * callback when everything is loaded
	 */
	loaded: function () {
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
		// switch to PLAY state
		me.state.change(me.state.PLAY);
	}
	
}; // jsApp

/* game initialization */
var PlayScreen = me.ScreenObject.extend( {
	// constructor
	init: function() {
		// pass true to the parent constructor
		// as we draw our progress bar in the draw function
		this.parent(true);
		// arial font 
		this.font = new me.Font('Arial', 8, 'white');
		// bitmap font
		this.bFont = new me.BitmapFont("atascii", {x:8});
    },
    
	
	// draw function
	draw : function(context) {
		// clear the screen
		me.video.clearSurface (context, "black");
		
		var y_pos = 0;
		
		// font size test
		this.bFont.textAlign = "left";
		for (var i = 8;i<56;i+=8) {
			this.font.set('Arial', i, 'white');
			this.font.draw(context, "Arial Text " +i + "px !" , 5 , y_pos );
			y_pos+=this.font.measureText(context, "DUMMY").height;
		}

		// bFont size test		
		y_pos = 0;
		this.bFont.textAlign = "right";
		for (var i = 1;i<5;i++) {
			this.bFont.resize(i);
			this.bFont.draw(context, "BITMAP TEST" , me.video.getWidth() , y_pos );
			y_pos+=this.bFont.measureText("DUMMY").height;
			
		}

		
		// font baseline test
		this.font.set('Arial', 14, 'white');
		var baseline = 200;

		// Draw the baseline
		context.beginPath();
		context.moveTo(0, baseline + 0.5);
		context.lineTo(me.video.getWidth(), baseline + 0.5);
		context.strokeStyle = "red";
		context.stroke();

		var baselines = [
			"bottom", "ideographic", "alphabetic", "middle", "hanging", "top"
		];

		var x_pos = 0;

		// font baseline test
		for (var i = 0;i<baselines.length;i++) {
			var text = "Arial " + baselines[i];
			this.font.textBaseline = baselines[i];
			this.font.draw(context, text, x_pos, baseline);
			x_pos+=this.font.measureText(context, text + "   ").width;
		}
		
	}

});

//bootstrap :)
window.onReady(function() {
	jsApp.onload();
});
