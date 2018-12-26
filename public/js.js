$('#start').on('click', function () {

    $(this).hide();
    $('#body').removeClass('hide');

    setTimeout(function () {
        $('#santa').animate({
            left: '-768px'
        }, 3000);
    }, 2000);

    setTimeout(function () {
        $('.hideTitle').slideDown(1000);
        setTimeout(function () {
            $('.hideTitle').slideUp();
        }, 10000);
    }, 5000);

    var audio = $('<audio src="v_lesu_rodilas_elochka-minus.mp3" autoplay></audio>');

    //$('body').append(audio);

    var t = setInterval(
        function(){

            var documentHeight 		= $(document).height();
            var startPositionLeft 	= Math.random() * $(document).width() - 100;
            var startOpacity		= 0.5 + Math.random();
            var sizeFlake			= 10 + Math.random() * 20;
            var endPositionTop		= documentHeight - 40;
            var endPositionLeft		= startPositionLeft - 100 + Math.random() * 200;
            var durationFall		= documentHeight * 10 + Math.random() * 5000;
            $('#flake')
                .clone()
                .appendTo('body')
                .css(
                    {
                        left: startPositionLeft,
                        opacity: startOpacity,
                        'font-size': sizeFlake
                    }
                )
                .animate(
                    {
                        top: endPositionTop,
                        left: endPositionLeft,
                        opacity: 0.2
                    },
                    durationFall,
                    'linear',
                    function() {
                        $(this).remove()
                    }
                );
        }, 500);

    var snow = {};
    var snowflex = {};

    snowflex.create  = function(){
        var flex = document.createElement('div');
        flex.innerHTML		 	= "&#10052;";
        flex.style.fontSize 	= 10 + Math.random() * 20 + 'px';
        flex.style.top 			= - 50 + Math.random() * 20 + 'px';
        flex.style.left 		= Math.random() * 1500 + 'px';
        flex.style.position 	= "absolute";
        flex.style.color 		= "#F3F3F3";
        flex.style.opacity		= Math.random();
        document.getElementsByTagName('body')[0].appendChild(flex);
        return flex;
    };


    snow.snowflex = function(){
        var flex = snowflex.create();
        var x = -1 + Math.random() * 2;
        var t = setInterval(
            function(){
                flex.style.top 	= parseInt(flex.style.top) +  5 + 'px';
                flex.style.left = parseInt(flex.style.left) +  x + 'px';
                if (parseInt(flex.style.top) > 1500) {
                    clearInterval(t);
                    document.getElementsByTagName('body')[0].removeChild(flex);
                }
            }, 45 + Math.random() * 20);
    };

    snow.storm = function(){
        var t	= setInterval(
            function(){
                snow.snowflex();
            }, 500);
    };

    //snow.storm();

    var fog = {};

    fog.draw = function(ctx, x, y){

        ctx.fillStyle = "rgba( 255, 255, 255, " + Math.random() + " )";
        ctx.arc( x, y, 10,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fill();

    };


    fog.start = function(){
        var ctx = document.getElementById('canvas').getContext("2d");
        var x = 0;
        var y = 0;
        var t = setInterval(
            function(){

                x = 300 + 300*Math.sin(x);
                y = 300 + 300* -Math.cos(x);

                x += 2;
                fog.draw(ctx, x, y);

            }, 100);

    };

    //fog.start();
});


function fireworks(startY) {
    var canvas = $('#canvas')[0];
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    var ctx = canvas.getContext('2d');
// init
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
// objects
    var listFire = [];
    var listFirework = [];
    var fireNumber = 8;
    var center = {
        x: canvas.width / 2,
        y: canvas.height / startY
    };
    var range = 100;
    for (var i = 0; i < fireNumber; i++) {
        var fire = {
            x: Math.random() * range / 2 - range / 4 + center.x,
            y: Math.random() * range * 2 + canvas.height,
            size: Math.random() + 5.5,
            fill: '#fd1',
            vx: Math.random() - 0.5,
            vy: -(Math.random() + 4),
            ax: Math.random() * 0.02 - 0.01,
            far: Math.random() * range + (center.y - range)
        };
        fire.base = {
            x: fire.x,
            y: fire.y,
            vx: fire.vx
        };
//
        listFire.push(fire);
    }

    function randColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var color = 'rgb($r, $g, $b)';
        color = color.replace('$r', r);
        color = color.replace('$g', g);
        color = color.replace('$b', b);
        return color;
    }
    (function loop() {
        requestAnimationFrame(loop);
        update();
        draw();
    })();

    function update() {
        for (var i = 0; i < listFire.length; i++) {
            var fire = listFire[i];
//
            if (fire.y <= fire.far) {
// case add firework
                var color = randColor();
                for (var i = 0; i < fireNumber * 5; i++) {
                    var firework = {
                        x: fire.x,
                        y: fire.y,
                        size: Math.random() + 5.5,
                        fill: color,
                        vx: Math.random() * 5 - 2.5,
                        vy: Math.random() * -5 + 1.5,
                        ay: 0.05,
                        alpha: 1,
                        life: Math.round(Math.random() * range / 2) + range / 2
                    };
                    firework.base = {
                        life: firework.life,
                        size: firework.size
                    };
                    listFirework.push(firework);
                }
// reset
                fire.y = fire.base.y;
                fire.x = fire.base.x;
                fire.vx = fire.base.vx;
                fire.ax = Math.random() * 0.02 - 0.01;
            }
//
            fire.x += fire.vx;
            fire.y += fire.vy;
            fire.vx += fire.ax;
        }
        for (var i = listFirework.length - 1; i >= 0; i--) {
            var firework = listFirework[i];
            if (firework) {
                firework.x += firework.vx;
                firework.y += firework.vy;
                firework.vy += firework.ay;
                firework.alpha = firework.life / firework.base.life;
                firework.size = firework.alpha * firework.base.size;
                firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
//
                firework.life--;
                if (firework.life <= 0) {
                    listFirework.splice(i, 1);
                }
            }
        }
    }

    function draw() {
// clear
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
// re-draw
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 1;
        for (var i = 0; i < listFire.length; i++) {
            var fire = listFire[i];
            ctx.beginPath();
            ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = fire.fill;
            ctx.fill();
        }
        for (var i = 0; i < listFirework.length; i++) {
            var firework = listFirework[i];
            ctx.globalAlpha = firework.alpha;
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = firework.fill;
            ctx.fill();
        }
    }
}

fireworks(2);
setTimeout(function () {
    fireworks(3)
},1000);

