// Create the starfield effect
(function() {
    // Get the canvas element
    var canvas = document.createElement('canvas');
    canvas.id = 'starfield';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    // Set up the drawing context
    var ctx = canvas.getContext('2d');

    // Array to store the stars
    var stars = [];

    // Create the stars
    for (var i = 0; i < 200; i++) {
        var star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 0.5 + 0.1
        };
        stars.push(star);
    }

    // Function to animate the starfield
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the stars
        ctx.fillStyle = '#ffffff';
        for (var i = 0; i < stars.length; i++) {
            var star = stars[i];
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
            ctx.fill();

            // Update the star's position
            star.x -= star.speed;
            if (star.x < 0) {
                star.x = canvas.width;
            }
        }

        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();

    // Resize the canvas when the window is resized
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
})();
