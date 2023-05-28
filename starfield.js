(function () {
    var canvas = document.createElement('canvas');
    canvas.id = 'starfield';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    var stars = [];

    function createStar() {
        var star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            speed: Math.random() + 0.1
        };
        stars.push(star);
    }

    function createStars() {
        for (var i = 0; i < 200; i++) {
            createStar();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ffffff';
        for (var i = 0; i < stars.length; i++) {
            var star = stars[i];
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
            ctx.fill();

            star.x -= star.speed;
            if (star.x < 0) {
                star.x = canvas.width;
            }
        }

        requestAnimationFrame(animate);
    }

    createStars();
    animate();

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createStars();
    });
})();
