/**
 * Created by Kire on 27.03.2015.
 */

function buttonFlip(front, back, val)
{
    var self = this;

    this.frontSprite = new PIXI.Sprite(front);
    this.backSprite = new PIXI.Sprite(back);

    this.isAnimating = false;
    this.isRevealed = false;
    this.isLocked = false;
    this.value = val;
    this.id = -1;
    this.posX = 0;
    this.posY = 0;

    // Set some properties on the sprite
    this.frontSprite.buttonMode = this.backSprite.buttonMode = true;
    this.frontSprite.interactive = this.backSprite.interactive = true;
    this.frontSprite.anchor.x = this.backSprite.anchor.x = 0.5;
    this.frontSprite.anchor.y = this.backSprite.anchor.y = 0.5;
    //this.frontSprite.filters = [ this.ga];

    // Set the mousedown and touchstart callback
    this.frontSprite.mousedown = this.frontSprite.touchstart =
    this.backSprite.mousedown = this.backSprite.touchstart = function(data)
    {
        if (self.isAnimating)
            return;
        this.isdown = true;
        this.scale.x = this.scale.y = 0.9;
    }

    // Set the mouseup and touchend callback
    this.frontSprite.mouseup = this.frontSprite.touchend = this.frontSprite.mouseupoutside = this.frontSprite.touchendoutside =
    this.backSprite.mouseup = this.backSprite.touchend = this.backSprite.mouseupoutside = this.backSprite.touchendoutside = function(data)
    {
        if (self.isAnimating)
            return;
        this.isdown = false;
        this.scale.x = this.scale.y = 1.0;
    };

    // Set the click callbacks
    this.frontSprite.click = this.frontSprite.touchend = function(data)
    {
        self.unreveal();
        theGame.lvlMoves++;
    }

    this.backSprite.click = this.backSprite.touchend = function(data)
    {
        self.reveal();
        theGame.lvlMoves++;
    }
}

/*
buttonFlip.prototype.getSprite = function()
{
    return this.isRevealed  ?  this.frontSprite : this.backSprite;
}
*/

buttonFlip.prototype.showUp = function(stage)
{
    var self = this;

    this.stage = stage;
    this.isAnimating = true;
    this.stage.addChild(this.backSprite);
    this.backSprite.position.x = this.posX;
    this.backSprite.position.y = this.posY;
    this.backSprite.scale.x = 0.01;
    this.backSprite.scale.y = 0.01;
    this.backSprite.position.x = 400;
    this.backSprite.position.y = 300;
    this.backSprite.rotation =  10.0*Math.random() - 5.0;

    var tl = new TimelineMax({ onComplete:function(){ self.isAnimating = false; } });
    tl.add(new TweenMax(this.backSprite.scale, 0.4, { x:1, y:1, ease:Linear.easeNone }), 0);
    tl.add(new TweenMax(this.backSprite.position, 0.5, { x:this.posX, y:this.posY, ease:Linear.easeOut}), 0);
    tl.add(new TweenMax(this.backSprite, 0.7, { rotation:0, ease:Elastic.easeOut }), (0.1 + 0.1*Math.random()));
}


buttonFlip.prototype.reveal = function()
{
    if (this.isAnimating)
        return;

    var self = this;
    this.isAnimating = true;
    this.frontSprite.scale.x = 0;
    this.frontSprite.scale.y = 1;
    this.frontSprite.position.x = self.posX;
    this.frontSprite.position.y = self.posY;
    this.frontSprite.isdown = false;

    function swapSprites()
    {
        self.stage.removeChild(self.backSprite);
        self.stage.addChild(self.frontSprite);
    }

    var tl = new TimelineMax({ onComplete:function(){ self.isAnimating = false; self.isRevealed = true; theGame.onBtnRevealed(self.value, self.id); } });
    tl.append( new TweenMax(this.backSprite.scale, 0.1, {x:0, y:1, ease:Linear.easeOut, onComplete:function(){ swapSprites(); }}) );
    tl.append( new TweenMax(this.frontSprite.scale, 0.1, {x:1, ease:Linear.easeIn}) );
    tl.resume();
}


buttonFlip.prototype.unreveal = function()
{
    if (this.isAnimating)
        return;

    var self = this;
    this.isAnimating = true;
    this.backSprite.scale.x = 0;
    this.backSprite.scale.y = 1;
    this.backSprite.position.x = self.posX;
    this.backSprite.position.y = self.posY;
    this.backSprite.isdown = false;

    function swapSprites()
    {
        self.stage.removeChild(self.frontSprite);
        self.stage.addChild(self.backSprite);
    }

    var tl = new TimelineMax({ onComplete:function(){ self.isAnimating = false; self.isRevealed = false; } });
    tl.append( new TweenMax(this.frontSprite.scale, 0.1, {x:0, y:1, ease:Linear.easeOut, onComplete:function(){ swapSprites(); }}) );
    tl.append( new TweenMax(this.backSprite.scale, 0.1, {x:1, ease:Linear.easeIn}) );
    tl.resume();
}


buttonFlip.prototype.lock = function()
{
    this.isLocked = true;
    this.isAnimating = true;
    var grayF = new PIXI.GrayFilter();
    var blurF = new PIXI.BlurFilter();
    blurF.blurX = 5;
    blurF.blurY = 5;
    this.frontSprite.filters = [ grayF, blurF ];
    this.frontSprite.scale.x = 0.75;
    this.frontSprite.scale.y = 0.75;
    this.frontSprite.buttonMode = false;
}


buttonFlip.prototype.destroy = function()
{
    this.stage.removeChild(this.frontSprite);
    this.stage.removeChild(this.backSprite);
}
