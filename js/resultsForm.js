/**
 * Created by Kire on 27.03.2015.
 */

function resultsForm()
{
    var texFrm  = PIXI.Texture.fromImage("images/Form.png");
    var texHome = PIXI.Texture.fromImage("images/HomeButton.png");
    var texNext = PIXI.Texture.fromImage("images/NextButton.png");

    // Background
    this.sprBack = new PIXI.Sprite(texFrm);
    this.sprBack.anchor.x = this.sprBack.anchor.y = 0.5;
    this.sprBack.position.x = 400;
    this.sprBack.position.y = 300;

    // Home button
    this.sprBtnHome = new PIXI.Sprite(texHome);
    this.sprBtnHome.anchor.x = this.sprBtnHome.anchor.y = 0.5;
    this.sprBtnHome.position.x = -150;
    this.sprBtnHome.position.y = 150;
    this.sprBtnHome.buttonMode = true;
    this.sprBtnHome.interactive = true;
    this.sprBack.addChild(this.sprBtnHome);
    // Set the mousedown and touchstart callback
    this.sprBtnHome.mousedown = this.sprBtnHome.touchstart = function(data)
    {
        this.isdown = true;
        this.scale.x = this.scale.y = 0.9;
    };
    // Set the mouseup and touchend callback
    this.sprBtnHome.mouseup = this.sprBtnHome.touchend = this.sprBtnHome.mouseupoutside = this.sprBtnHome.touchendoutside = function(data)
    {
        this.isdown = false;
        this.scale.x = this.scale.y = 1.0;
    };
    // Click callback
    this.sprBtnHome.click = this.sprBtnHome.touchend = function(data)
    {
        theGame.OnHome();
    }

    // Next button
    this.sprBtnNext = new PIXI.Sprite(texNext);
    this.sprBtnNext.anchor.x = this.sprBtnNext.anchor.y = 0.5;
    this.sprBtnNext.position.x = 150;
    this.sprBtnNext.position.y = 135;
    this.sprBtnNext.buttonMode = true;
    this.sprBtnNext.interactive = true;
    this.sprBack.addChild(this.sprBtnNext);
    // Set the mousedown and touchstart callback
    this.sprBtnNext.mousedown = this.sprBtnNext.touchstart = function(data)
    {
        this.isdown = true;
        this.scale.x = this.scale.y = 0.9;
    };
    // Set the mouseup and touchend callback
    this.sprBtnNext.mouseup = this.sprBtnNext.touchend = this.sprBtnNext.mouseupoutside = this.sprBtnNext.touchendoutside = function(data)
    {
        this.isdown = false;
        this.scale.x = this.scale.y = 1.0;
    };
    // Click callback
    this.sprBtnNext.click = this.sprBtnNext.touchend = function(data)
    {
        theGame.OnNext();
    }

    // Time text
    this.timeText = new PIXI.Text("TIME: ", { font: "bold 40px Arvo", fill: "#273392", align: "center", stroke: "#858d3e", strokeThickness: 4 });
    this.timeText.anchor.x = 0;
    this.timeText.anchor.y = 0.5;
    this.timeText.position.x = -170;
    this.timeText.position.y = -100;
    this.sprBack.addChild(this.timeText);

    // Moves text
    this.movesText = new PIXI.Text("MOVES: ", { font: "bold 40px Arvo", fill: "#273392", align: "center", stroke: "#858d3e", strokeThickness: 4 });
    this.movesText.anchor.x = 0;
    this.movesText.anchor.y = 0.5;
    this.movesText.position.x = -170;
    this.movesText.position.y = -25;
    this.sprBack.addChild(this.movesText);
}


resultsForm.prototype.showUp = function(hasNext, secs, mvs)
{
    this.sprBack.scale.x = this.sprBack.scale.y = 0;
    this.sprBtnNext.visible = hasNext;
    this.timeText.setText("TIME: " + secs.toFixed(2) + " sec");
    this.movesText.setText("MOVES: " + mvs);
    new TweenMax(this.sprBack.scale, 1, {x:1, y:1, ease:Elastic.easeOut});
}
