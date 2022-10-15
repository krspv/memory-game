/**
 * Created by Kire on 27.03.2015.
 */

function Game()
{
    self = this;

    // Properties
    this.stage = new PIXI.Stage(0x000000);
    this.renderer = PIXI.autoDetectRenderer(800, 600);
    this.arrLevels = [
        {w:2, h:2},
        {w:3, h:2},
        {w:4, h:2},
        {w:4, h:3},
        {w:4, h:4},
        {w:5, h:4}
    ];
    this.curLevel = 0;

    // Start button
    this.btnStart = new buttonStart();
    this.btnStart.sprite.click = this.btnStart.sprite.touchend = function(data)
    {
        self.stage.removeChild(self.btnStart.sprite);
        self.prepareLevel();
    }
    this.stage.addChild(this.btnStart.sprite);

    // Textures
    this.arrFrontTex = [];
    for (i = 1; i < 11; ++i)
        this.arrFrontTex.push( PIXI.Texture.fromImage("images/FTex" + ((i < 10)  ?  "0" : "") + i + ".jpg") );
    this.backTex = PIXI.Texture.fromImage("images/Back.jpg");

    // Results form
    this.formResults = new resultsForm();
}


Game.prototype.prepareLevel = function()
{
    console.log("PREPARE LEVEL " + this.curLevel);

    this.lvlTime = new Date().getTime();
    this.lvlMoves = 0;

    // Initialize the level buttons
    var lvl = this.arrLevels[this.curLevel];
    var val = 0;
    this.levelButtons = [];
    for (col = 0; col < lvl.w; ++col)
    for (row = 0; row < lvl.h; ++row)
    {
        var v1 = Math.floor(val++/2);
        var btn = new buttonFlip(this.arrFrontTex[v1], this.backTex, v1);
        this.levelButtons.push(btn);
    }
    this.unrevealedTotal = lvl.w * lvl.h;

    // Shuffle the buttons
    var i = this.levelButtons.length, temp;
    var distX = 140, distY = 150;
    while (--i > 0)
    {
        var j = Math.floor(Math.random() * (i+1));
        temp = this.levelButtons[j];
        this.levelButtons[j] = this.levelButtons[i];
        this.levelButtons[i] = temp;

        var row = Math.floor(i / lvl.w);
        var col = i % lvl.w;
        this.levelButtons[i].posX = (800 - distX*(lvl.w - 1))/2 + col*distX;
        this.levelButtons[i].posY = (600 - distY*(lvl.h - 1))/2 + row*distY;
        this.levelButtons[i].id = i;
    }
    this.levelButtons[0].posX = (800 - distX*(lvl.w - 1))/2;
    this.levelButtons[0].posY = (600 - distY*(lvl.h - 1))/2;
    this.levelButtons[0].id = 0;

    // Show the buttons
    for (idx in this.levelButtons)
        this.levelButtons[idx].showUp(this.stage);
}


Game.prototype.onBtnRevealed = function(value, id)
{
    var arr = [];
    for (idx in this.levelButtons)
        if ((idx != id) && !this.levelButtons[idx].isLocked && this.levelButtons[idx].isRevealed)
            arr.push(this.levelButtons[idx]);

    if (arr.length == 2)
    {
        arr[0].unreveal();
        arr[1].unreveal();
    }
    else if ((arr.length == 1) && (arr[0].value == value))
    {
        arr[0].lock();
        this.levelButtons[id].lock();
        this.unrevealedTotal -= 2;
        if (this.unrevealedTotal == 0)
        {
            var secs = ((new Date().getTime()) - this.lvlTime) * 0.001;
            this.stage.addChild(this.formResults.sprBack);
            this.formResults.showUp(this.curLevel != this.arrLevels.length-1, secs, this.lvlMoves);
        }
    }
}


Game.prototype.OnHome = function()
{
    this.stage.removeChild(this.formResults.sprBack);
    for (idx in this.levelButtons)
        this.levelButtons[idx].destroy();
    this.stage.addChild(this.btnStart.sprite);
    this.curLevel = 0;
}


Game.prototype.OnNext = function()
{
    this.stage.removeChild(this.formResults.sprBack);
    for (idx in this.levelButtons)
        this.levelButtons[idx].destroy();
    this.curLevel++;
    this.prepareLevel();
}


Game.prototype.update = function()
{
    this.renderer.render(this.stage);
}
