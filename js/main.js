var canvas;
var textSizes = [14, 28];
var colors = {
    background : "#393645",
    textNormal : "#746F84",
    textLight : "#8A8696",
    textDark : "#635E73",
    buttonNormal : "#19142B",
    buttonHover : "#454054",
    buttonPressed : "#1E1A2B"
}

oCanvas.domReady(function() {
    canvas = oCanvas.create({canvas : "#warOfCityStates", background : colors.background});
    registerElements();
    canvas.scenes.create("main", function() {
        
    });
    canvas.scenes.load("main");
    canvas.redraw();
});