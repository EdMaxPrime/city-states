function registerElements() {
    canvas.display.register("button", {
        shapeType : "rectangular",
        action : function(source) {},
        buttonState : "normal",
        initRun : false,
        init : function() {
            this.action = this.action || function(source) {};
            this.buttonState = "normal";
            this.bind("mouseenter touchenter", function() { this.buttonState = "hover"; canvas.redraw(); });
            this.bind("mouseleave touchleave", function() { this.buttonState = "normal"; canvas.redraw(); });
            this.bind("mousedown touchstart", function() { this.buttonState = "pressed"; canvas.redraw(); });
            this.bind("click tap", function() { this.buttonState = "hover"; canvas.redraw(); this.action(this); });
        }
        }, function(_canvas) {
            if (this.initRun == false) {
                this.bind("mouseenter", function() { this.buttonState = "hover"; canvas.redraw(); });
                this.bind("mouseleave", function() { this.buttonState = "normal"; canvas.redraw(); });
                this.bind("mousedown", function() { this.buttonState = "pressed"; canvas.redraw(); })
                this.bind("click", function() { this.action(this); });
                this.bind("mouseup", function() { this.buttonState = "hover"; canvas.redraw(); });
                this.initRun = true;
            }
            var origin = this.getOrigin(),
                x = this.abs_x - origin.x,
                y = this.abs_y - origin.y,
                width = this.width,
                height = this.height;
            _canvas.beginPath();
            _canvas.fillStyle = colors.buttonNormal;
            if (this.buttonState === "hover") _canvas.fillStyle = colors.buttonHover;
            else if (this.buttonState === "pressed") _canvas.fillStyle = colors.buttonPressed; 
            _canvas.strokeWidth = 1;
            _canvas.strokeStyle = colors.buttonNormal;
            _canvas.strokeRect(x, y, width, height);
            _canvas.fillRect(x, y, width, height);
            _canvas.font = textSizes[0] + "px sans-serif";
            _canvas.fillStyle = "white";
            var m = _canvas.measureText(this.text);
            _canvas.fillText(this.text, x + (width - m.width)/2, y + height - (textSizes[0] + 4)/2);
            _canvas.closePath();
        }, "init"
    );
}

function extend(original, extender) {
    for(var key in original) {
        if (extender.hasOwnProperty(key) == true) {
            original[key] = extender[key];
        }
    }
    return original;
}