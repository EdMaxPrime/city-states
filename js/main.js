var canvas;
var textSizes = [14, 28];
var colors = {
    background : "#393645",
    textNormal : "#746F84",
    textLight : "#8A8696",
    textVeryLight : "#B1AEB9",
    textDark : "#635E73",
    buttonNormal : "#19142B",
    buttonHover : "#454054",
    buttonPressed : "#2B2739"
}
/**
@description Holds the parameters for each scene to redirect.
*/
var params = [];

oCanvas.domReady(function() {
    canvas = oCanvas.create({canvas : "#warOfCityStates", background : colors.background});
    registerElements();
    canvas.scenes.create("main", function() {
        canvas.clear(true);
        var title = canvas.display.text({
            font : "normal " + textSizes[1] + "px molot",
            text : "War of City-States",
            fill : colors.textLight,
            x : ofWidth("1/2"),
            y : ofHeight("1/3"),
            origin : { x : "center", y : "bottom" }
        });
        var play = canvas.display.button({
            text : "Play",
            action : function(source) { canvas.scenes.load("/modes", true); },
            y : ofHeight("1/2"),
            x : ofWidth("1/4"),
            width : ofWidth("1/2"),
        });
        var help = canvas.display.button({
            text : "Instructions",
            action : function(source) { console.log("Redirect?"); },
            y : ofHeight("15/26"),
            x : ofWidth("1/4"),
            width : ofWidth("1/2")
        });
        var credits = canvas.display.button({
            text : "Credits",
            action : function(source) { console.log("Redirect?"); },
            y : ofHeight("17/26"),
            x : ofWidth("1/4"),
            width : ofWidth("1/2"),
        });
        this.add(title);
        this.add(play);
        this.add(help);
        this.add(credits);
    });
    canvas.scenes.create("/modes", function() {
        canvas.clear(true);
        var back = canvas.display.arrow({
            x : 0,
            y : 0,
            action : function(elem) { canvas.scenes.load("main", true); }
        });
        var title = canvas.display.text({
            font : "normal " + textSizes[1] + "px molot",
            text : "Select Mode",
            fill : colors.textLight,
            x : ofWidth("1/2"),
            y : ofHeight("1/3"),
            origin : { x : "center", y : "bottom" }
        });
        var infinite = canvas.display.button({
            text : "Infinite",
            action : function(source) { console.log("Redirect?"); },
            y : ofHeight("1/2"),
            x : ofWidth("1/4"),
            width : ofWidth("1/2"),
        });
        var campaign = canvas.display.button({
            text : "Campaign",
            action : function(source) { console.log("Redirect?"); },
            y : ofHeight("15/26"),
            x : ofWidth("1/4"),
            width : ofWidth("1/2"),
        });
        var grow = canvas.display.button({
            text : "Growth",
            action : function(source) { console.log("Redirect?"); },
            y : ofHeight("17/26"),
            x : ofWidth("1/4"),
            width : ofWidth("1/2"),
        });
        var survival = canvas.display.button({
            text : "Survival",
            action : function(source) { console.log("Redirect?"); },
            y : ofHeight("19/26"),
            x : ofWidth("1/4"),
            width : ofWidth("1/2"),
        });
        var rebellion = canvas.display.button({
            text : "Rebellion",
            action : function(source) { console.log("Redirect?"); },
            y : ofHeight("21/26"),
            x : ofWidth("1/4"),
            width : ofWidth("1/2"),
        });
        this.add(back);
        this.add(title);
        this.add(infinite);
        this.add(campaign);
        this.add(grow);
        this.add(survival);
        this.add(rebellion);
    });
    canvas.scenes.load("main");
    canvas.redraw();
});