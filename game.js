let { init, initKeys, Sprite, Text, collides, keyPressed, load, setImagePath, imageAssets, GameLoop, randInt } = kontra
let { canvas, context } = init();

initKeys();

let overlay = document.querySelector(".overlay");
let scoreBoard = document.querySelector(".scoreBoard");
let gameOver = document.querySelector(".gameOver");

setImagePath('assets');
document.querySelector(".playBtn").addEventListener('click', playGame)
document.querySelector(".playAgain").addEventListener('click', () => location.reload())

function playGame(){

    load('rock.png', 'gold.png', 'left.png', 'right.png').then(function() {

    overlay.style.display = "none"
    gameOver.style.display = "none"
    scoreBoard.style.display = "block"


    zzfxV=.3 
    zzfx= 
    (p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0)=>{let
    M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g=0,H=0,a=0,n=1,I=0
    ,J=0,f=0,x,h;e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+
    r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1)
    ,-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:
    -1)*M.abs(f)**D*p*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/
    2+(c>a?0:(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin(a)
    +1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n=n||1);p=zzfxX.createBuffer(1,h,R);p.
    getChannelData(0).set(k);b=zzfxX.createBufferSource();b.buffer=p;b.connect(zzfxX.destination
    );b.start();return b};zzfxX=new(window.AudioContext||webkitAudioContext) // audio context

    let sprites = [];
    let lives = 3;
    let explosives = 40;
    let allowBullet = true;
    const bulletDelay = 750;
    let rightFocus;
    let leftFocus;
    let score = 0;
    let myCanvas = document.getElementById("canvas");

    let textForm = (type, text, font, x, y, dy, dx, ttl) => {
        return Text({
            type,
            text,
            font,
            color: "white",
            x,
            y,
            dy,
            dx,
            ttl
        });
    }

    function createRock(id, x, y){
        return Sprite({
            id,
            type: "rock",
            x,
            y,
            dy: 1,
            image: imageAssets['rock']
        })
    }

    let player = Sprite({
        type: "player",
        x: 150,
        y: 125,
        image: imageAssets['left']
    })

    sprites.push(createRock(1, randInt(2, 45), 0))
    sprites.push(createRock(2, randInt(50, 70), -50))
    sprites.push(createRock(3, randInt(100, 130), -20))
    sprites.push(createRock(4, randInt(140, 180), -35))
    sprites.push(createRock(5, randInt(200, 240), -20))
    sprites.push(createRock(6, randInt(250, 280), -10))
    sprites.push(player); 

    function myUpdate() {

       let enableRightKey = true;
       let enableLeftKey = true;

       sprites.forEach((sprite) => {
           sprite.update();
       });

       score += 0.01;
       document.getElementById("score").innerText = Math.ceil(score);

       for(value of sprites){
           if(value.y > 123 && value.y < 125 && value.type === "rock"){
               zzfx(...[1.05,,993,.02,.18,.48,4,1.77,1,,,,.12,.9,,.2,,.47,.08,.49]); 
               myCanvas.style.animation = "shake 0.5s 1"
               setTimeout(() => {
                   myCanvas.style.animation = ""
               }, 500);
           }

           if(value.y >= 125){               
               value.dy = 0;

               if(value.x < player.x && ((player.x - value.x) <= 25) && value.type === "rock"){

                   enableLeftKey = false;

               }else if(value.x > player.x && ((value.x - player.x) <= 15) && value.type === "rock"){

                   enableRightKey = false;

               }else if(value.x > player.x && ((value.x - player.x) <= 15) ||
                       value.x < player.x && ((player.x - value.x) <= 15) &&
                       value.type === "gold")
                       {

                   value.ttl = 0;
                   zzfx(...[1.25,,201,,.07,.17,1,.74,,,169,.08,,,,,,.72,,.07]); 
                   score += 5;
               }

           }
       }

       if(player.x <= 3){
           player.x = 3;
       }else if(player.x >= (canvas.width - 28)){
           player.x = (canvas.width - 28);
       }

       if(enableRightKey){
           if(keyPressed('arrowright')) {
               player.image = imageAssets['right'];
               player.x += 1;
               player.y = randInt(120, 125)
               rightFocus = true;
               leftFocus = false;
           }
       }
       if(enableLeftKey){
           if (keyPressed('arrowleft')){
               player.image = imageAssets['left'];
               player.x -= 1;
               player.y = randInt(120, 125)
               leftFocus = true;
               rightFocus = false;
           }
       }

       if(explosives > 0){
           if (keyPressed("space") && allowBullet && rightFocus) {

               allowBullet = false;
               setTimeout(() => (allowBullet = true), bulletDelay);       
               sprites.push(textForm("bullet", "🧨", "10px Arial", player.x + 20, player.y + 3, 0, 2, 1200));
               explosives -= 1;
               zzfx(...[1.02,,429,.01,.09,.06,1,.24,-5.9,,,,.09,.9,,.1,,.86,.09,.23]); 
           
           }else if(keyPressed("space") && allowBullet && leftFocus) {

               allowBullet = false;
               setTimeout(() => (allowBullet = true), bulletDelay);      
               sprites.push(textForm("bullet", "🧨", "10px Arial", player.x - 5, player.y + 3, 0, -2, 1200));
               explosives -= 1;
               zzfx(...[1.02,,429,.01,.09,.06,1,.24,-5.9,,,,.09,.9,,.1,,.86,.09,.23]); 
               
           }
       }

       for(let value of sprites){
           if(value.type === "rock"){
               if(collides(player, value)){
                   value.ttl = 0;
                   lives -= 1;
                   zzfx(...[,,499,.01,.09,.2,,1.78,1.8,,,,.08,,15,,,.56,.05]);
                   myCanvas.style.height = "56vh"
                   myCanvas.style.width = "760px"
                   setTimeout(() => {
                       myCanvas.style.height = "530px"
                       myCanvas.style.width = "900px"
                   }, 100);
               }
           }
           if(value.type === "life"){
               if(collides(player, value)){
                   value.ttl = 0;
                   lives += 1;
                   zzfx(...[1.07,,459,.09,.27,.27,,1.62,,1.7,-153,.04,.05,,,,,.53,.14,.3]);
                   score += 20;
               } 
           }
           if(value.type === "explosive"){
               if(collides(player, value)){
                   value.ttl = 0;
                   explosives += 10;
                   zzfx(...[,,594,.06,.11,.47,,1.61,,6.4,-65,.11,.01,,,,,.67,.14,.13]); 
                   score += 10;
               } 
           }
       }

       for (const value of sprites) {
           if(value.type === "bullet"){
               let myB = value;
   
               for(value2 of sprites){

                   if(value2.type === "rock"){
                       if(collides(myB, value2)){
                           zzfx(...[1.01,,756,.02,.27,.58,2,3.46,.7,,,,.09,1.4,,.7,,.34,.15]);
                       }
                   }

                   if(value2.type === "rock" || value2.type === "gold"){
                       if(collides(myB, value2)){
                            value2.type = "gold"
                            value2.image = imageAssets['gold']
                            myB.ttl = 0;
                       }
                   }

               }

           }

       }

       sprites = sprites.filter((sprite) => sprite.isAlive());

       if(lives <= 0){    
           zzfx(...[1.03,,308,.08,.13,.48,,1.71,,.6,-8,.03,.11,,,,,.66,.27,.02]); // Powerup 295 
           loop.stop()
           loop2.stop()
           scoreBoard.style.display = "none"
           gameOver.style.display = "block"
           document.getElementById("finalScore").innerText = Math.ceil(score);
       }

       if(explosives <= 0 && lives > 1){
           lives -= 1;
           explosives += 15;
           zzfx(...[1.87,,189,.04,.27,.29,1,.61,-9.5,,-5,.18,.19,,,,.13,.74,.24,.36]); // Powerup 203
       }else if(explosives <= 0 && lives <= 1){
           setTimeout(() => {
               lives = 0;
               document.getElementById("extraInfo").innerText = "You had no explosives for too long"
           }, 6000);
       }

       document.getElementById("lives").innerText = lives;
       document.getElementById("explosives").innerText = explosives;

   }

   function myRender() {
    sprites.forEach((sprite) => sprite.render());
   }

    var loop2Started; 

    var loop = kontra.GameLoop({

        update: function (){
            myUpdate()
        },

        fps: 60,

        render: function (){
            myRender()
        }
    }) 
    loop.start()

    var loop2 = kontra.GameLoop({

        update: function (){
            myUpdate()
            loop2Started = true;
        },

        fps: 80,

        render: function (){
            myRender()
        }
    }) 

    window.addEventListener('blur', () => {
        if(!loop2Started){
            loop.stop()
        }
        if(loop2Started){
            loop2.stop()
        }
    });

    setTimeout(() => {
        loop.stop()
        loop2.start()

        setInterval(() => {
            if(!loop.isStopped || !loop2.isStopped){
            sprites.push(createRock(7, randInt(2, 90), -10))
            }
        },3000);

        setInterval(() => {
            if(!loop.isStopped || !loop2.isStopped){
            sprites.push(createRock(8, randInt(95, 190), -35))
            }
        }, 3133);

        setInterval(() => {
            if(!loop.isStopped || !loop2.isStopped){
                sprites.push(createRock(9, randInt(200, 280), 0))
                }
        }, 3899);

 
        setInterval(() => {
            if(!loop.isStopped || !loop2.isStopped){
                sprites.push(textForm("explosive", "💣", "10px Arial", randInt(10, 290), 0, 1, 0, 1200))
            }
        }, 13000); 


    }, 180000);

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
        sprites.push(textForm("life", "💖", "10px Arial", randInt(10, 290), 0, 1, 0, 1200))
        }
    }, 60000);  

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
            sprites.push(textForm("explosive", "💣", "10px Arial", randInt(10, 290), 0, 1, 0, 1200))
        }
    }, 15000);  

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
            sprites.push(createRock(1, randInt(2, 45), 0))
            }
    }, 6899);

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
        sprites.push(createRock(2, randInt(50, 85), -50))
        }
    }, 6111);

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
        sprites.push(createRock(3, randInt(100, 130), -20))
        }
    }, 6989);

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
        sprites.push(createRock(4, randInt(140, 180), -35))
        }
    }, 6133);

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
            sprites.push(createRock(5, randInt(200, 240), -20))
        }
    }, 5773);

    setInterval(() => {
        if(!loop.isStopped || !loop2.isStopped){
        sprites.push(createRock(6, randInt(250, 280), -10))
        }
    },6000);

    window.addEventListener('focus', () => {
        if(!loop2Started){
            loop.start()
        }
        if(loop2Started){
            loop2.start()
        }
    });

})
   
}





