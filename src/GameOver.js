var GameOver = cc.LayerColor.extend({
 
    _won:false,
 
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.LayerColor );
    },
 
    onEnter:function () {
 
        this._super();
 
        var director = cc.Director.getInstance();
        var winSize = director.getWinSize();
        var centerPos = cc.p( winSize.width/2, winSize.height/2 );

        var message;
        if (this._won) {
            message = "You Won!";
        } else {
            message = "You Lose :[";
        }
 
        var label = cc.LabelTTF.create(message, "Segoe UI", 32);
        label.setColor(cc.c3b(255, 255, 255));
        label.setPosition(winSize.width/2, winSize.height/2);
        this.addChild(label);
        label.setOpacity(0);
        var fadeIn = cc.FadeIn.create(4);
        label.runAction(fadeIn);
 
        this.runAction(cc.Sequence.create(
            cc.DelayTime.create(10),
            cc.CallFunc.create(function(node) {
                var scene = GameLayer.scene();
                var gameTransition = cc.TransitionFade.create(1.0, scene);
                cc.Director.getInstance().replaceScene(gameTransition);
            }, this)
        ));
 
    }
});
 
GameOver.create = function (won) {
    var sg = new GameOver();
    sg._won = won;
    if (sg && sg.init(cc.c4b(0, 0, 0, 0))) {
        return sg;
    }
    return null;
};
 
GameOver.scene = function (won) {
    var scene = cc.Scene.create();
    var layer = GameOver.create(won);
    scene.addChild(layer);
    return scene;
};