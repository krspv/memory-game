/**
 * Created by Kire on 27.03.2015.
 */

function buttonStart()
{
    var tex = PIXI.Texture.fromImage("images/StartButton.png");
    this.sprite = new PIXI.Sprite(tex);

    // Set some properties on the sprite
    this.sprite.buttonMode = true;
    this.sprite.interactive = true;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.position.x = 400;
    this.sprite.position.y = 300;

    // Set the mousedown and touchstart callback
    this.sprite.mousedown = this.sprite.touchstart = function(data)
    {
        this.isdown = true;
        this.scale.x = this.scale.y = 0.9;
    };

    // Set the mouseup and touchend callback
    this.sprite.mouseup = this.sprite.touchend = this.sprite.mouseupoutside = this.sprite.touchendoutside = function(data)
    {
        this.isdown = false;
        this.scale.x = this.scale.y = 1.0;
    };
}
