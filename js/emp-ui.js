function registerElements() {
    canvas.display.register("tooltip", {
            shapetype : "rectangular",
            text : "",
            pointAt : 0,
            pointerSide : "left",
            show : false,
            initRun : false,
            onInit : function(object) {
                
            }
        }, function(_canvas) {
            if (this.initRun == false) {
                this.onInit();
                this.initRun = true;
            }
            if (this.show == true && this.text !== "") {
                _canvas.beginPath();
                _canvas.fillStyle = colors.textVeryLight;
                _canvas.
                _canvas.closePath();
            }
        }
    );
    canvas.display.register("button", {
        shapeType : "rectangular",
        action : function(source) {},
        buttonState : "normal",
        initRun : false,
        width : ofWidth("1/6"),
        height : ofHeight("1/13"),
        text : "",
        children : [canvas.display.tooltip({})],
        onInit : function() {
            this.action = this.action || function(source) {};
            this.buttonState = "normal";
            this.bind("mouseenter touchenter", function(evt) {
                this.buttonState = "hover";
                this.children[0].pointAt = (this.abs_y - this.getOrigin().y) + this.height/2;
                this.children[0].show = true;
                canvas.redraw();
            });
            this.bind("mouseleave touchleave", function(evt) { this.buttonState = "normal"; this.children[0].show = false; canvas.redraw(); });
            this.bind("mousedown touchstart", function(evt) { this.buttonState = "pressed"; canvas.redraw(); });
            this.bind("click tap", function() { this.buttonState = "hover"; canvas.redraw(); this.action(this); });
        }
        }, function(_canvas) {
            if (this.initRun == false) {
                this.onInit();
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
            _canvas.font = textSizes[0] + "px raleway";
            _canvas.fillStyle = "white";
            var m = _canvas.measureText(this.text);
            _canvas.fillText(this.text, x + (width - m.width)/2, y + height - (textSizes[0] + 4)/2);
            _canvas.closePath();
        }, "onInit"
    );
    canvas.display.register("arrow", {
            shapeType : "rectangular",
            action : function() {},
            direction : "right",
            width : ofHeight("1/6"),
            height : ofHeight("1/9"),
            arrowState : "normal",
            initRun : false,
            onInit : function() {
                this.action = this.action || function(source) {};
                this.arrowState = "normal";
                this.bind("mouseenter touchenter", function() {
                    this.arrowState = "hover";
                    canvas.redraw();
                });
                this.bind("mouseleave touchleave", function(evt) { this.arrowState = "normal"; canvas.redraw(); });
                this.bind("mousedown touchstart", function(evt) { this.arrowState = "pressed"; canvas.redraw(); });
                this.bind("click tap", function(evt) { this.arrowState = "hover"; canvas.redraw(); this.action(this); });
            }
        }, function(_canvas) {
            if (this.initRun == false) {
                this.onInit();
                this.initRun = true;
            }
            var origin = this.getOrigin(),
                x = this.abs_x - origin.x,
                y = this.abs_y - origin.y,
                width = this.width,
                height = this.height;
            _canvas.beginPath();
            _canvas.lineWidth = 5;
            if (this.arrowState === "pressed") {
                _canvas.strokeStyle = colors.textDark;
            } else if (this.arrowState === "hover") {
                _canvas.strokeStyle = colors.textVeryLight;
                _canvas.fillStyle = "rgba(255, 255, 255, 0.1)";
                _canvas.fillRect(x - 5, y - 5, width + 10, height + 10);
            } else { //normal
                _canvas.strokeStyle = colors.textNormal;
            }
            _canvas.moveTo(x + ofWidth("1/3", width), y);
            _canvas.lineTo(x, y + ofHeight("1/2", height));
            _canvas.lineTo(x + ofWidth("1/3", width), y + height);
            _canvas.moveTo(x, y + ofHeight("1/2", height));
            _canvas.lineTo(x + width, y + ofHeight("1/2", height));
            _canvas.stroke();
        }, "onInit"
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

function ofWidth(fraction, width) {
    width = width || canvas.width;
    var numerator = parseInt(fraction.split("/")[0]);
    var denominator = parseInt(fraction.split("/")[1]);
    return Math.round(numerator * (width/denominator));
}
function ofHeight(fraction, height) {
    height = height || canvas.height;
    var numerator = parseInt(fraction.split("/")[0]);
    var denominator = parseInt(fraction.split("/")[1]);
    return Math.round(numerator * (height/denominator));
}
function fancyText(ctx, text) {
    var buffer = text.splitTokens("<>");
    var justTheText = text.split(/<[^<>]*?>/g).join("");
}