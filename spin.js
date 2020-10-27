//Made by Rishabh Jain as a project submission to coding Blocks

var config={
  type: Phaser.CANVAS,
  width:800,
  height:600,
  backgroundColor:  "#0023F1" ,
  scene:{
    preload:preload,
    create:create,
    update:update,
  }
};

var prizes = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}


var game=new Phaser.Game(config);

function preload(){
    console.log(this);
    //loading images
    this.load.image('bg','data/back.jpg'); 
    this.load.image('wheel','data/wheel.png');
    this.load.image('stand','data/stand.png');
    this.load.image('pin','data/pin.png');
    //button and audio 
    this.load.image('button' , 'data/button.png');
    this.load.image('replay','data/replay.png');
    this.load.audio('spin', 'data/escape.mp3' );
    
}

function create(){
    //global width and heigth
    W= game.config.width;
    H= game.config.height;
    // here order matters or you have to use depth property
    var background = this.add.sprite(W/2,H/2,'bg');
    background.setScale(0.20);
    
    var stand=this.add.sprite(W/2,H/2 + 250,'stand');
    stand.setScale(0.25);
    
    var pin =this.add.sprite(W/2,H/2 - 250,'pin');
    pin.setScale(0.25)
    pin.depth=1;
    
    //making eheel an object of scene
    this.wheel = this.add.sprite(W/2,H/2,'wheel');
    this.wheel.setScale(0.25);
    
    //button
    this.button=this.add.sprite(W-100,H-100,'button');
    this.button.setScale(0.10);
    this.button.setInteractive({
        cursor: 'pointer'
    });
    
    this.replay=this.add.sprite(W-100,H-100,'replay').setScale(0.25).setInteractive({
        cursor: 'pointer'
    });
    this.replay.visible=false;
    
    //text object
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color : "blue",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);
    
    //event listener for mouse click
//    this.input.on("pointerdown",spinwheel,this);
    //event listener for mouse click-> button click :: input->button
    this.button.on('pointerdown', spinwheel, this);
    this.spin = this.sound.add('spin');
}

function update(){
  console.log("wfiegfgqeuifgyqeg");
}

function spinwheel(){
    //using button as an event listener
    this.button.visible = false;
    this.sound.play('spin');
    
    //spinning random logic
    var circles = Phaser.Math.Between(2,5);
    //so that only land at point 
    var degrees = Phaser.Math.Between(0,11)*30;
    var total = circles*360 + degrees;
    //prize index = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    var idx = 11 - Math.floor(degrees/30);
    
    
    // tweens for animations
    var tween = this.tweens.add({
        targets: this.wheel,
        angle: total,
         //method to slowly stop wheel not a sudden stop 
        ease: "Cubic.easeOut",
        duration: 6000,
        //for text 
        callbackScope:this,
        onComplete:function(){
            this.game_text.setText("You won :) " + prizes.prize_names[idx]);
//            setTimeout(12000);
//            this.scene.restart();
        },
    });
    
    // "()=>{}" Here, passing "this" inside the new fxn, So, that it could be used.
    setTimeout(()=>{
        console.log("Hello"),
        this.replay.visible=true;
        this.replay.on("pointerdown",restart,this);           
    }, 6050);
    
}

function restart() {
    this.scene.restart();
}
