/**
 * Created by Kire on 27.03.2015.
 */


viewport();

var theGame = new Game();

// Add the renderer view element to the DOM
document.getElementById("GameAreaID").appendChild(theGame.renderer.view);

// Initialize the animation loop
window.requestAnimationFrame(OnUpdate);

function OnUpdate()
{
    theGame.update();
    window.requestAnimationFrame(OnUpdate);
}
