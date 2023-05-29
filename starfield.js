(function () {
    var canvas = document.getElementById('starfield');
    var ctx = canvas.getContext('2d');

    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    var stars = [];

    function createStar() {
        var star = {
            x: Math.random() * width,
            y: Math.random() * height,
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
        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = '#ffffff';
        for (var i = 0; i < stars.length; i++) {
            var star = stars[i];
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
            ctx.fill();

            // Update the star's position
            star.y -= star.speed;
            if (star.y < 0) {
                star.y = height;
                star.x = Math.random() * width;
            }
        }

        requestAnimationFrame(animate);
    }

    createStars();
    animate();

    window.addEventListener('resize', function () {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        createStars();
    });
})();


const textBlock = document.getElementById("center-text");
const textBlockOriginalText = textBlock.textContent

var cursorOrienatation = 0;
var textBoundingBox = textBlock.getBoundingClientRect()

function updateCursor(event) {
    var cursor = document.getElementById('cursor');
    var rocketRect = cursor.getBoundingClientRect();

    var rocketX = rocketRect.left + rocketRect.width / 2;
    var rocketY = rocketRect.top + rocketRect.height / 2;

    var mouseX = event.clientX;
    var mouseY = event.clientY;

    var angle = Math.atan2(mouseY - rocketY, mouseX - rocketX);
    var rotationDegrees = angle * (180 / Math.PI) + 90;
    // rotationDegrees = 65;
    var dist = Math.sqrt(Math.pow(mouseX - rocketX, 2) + Math.pow(mouseY - rocketY, 2))

    if(dist < 1){
        rotationDegrees = cursorOrienatation
    }

    cursor.style.left = `${mouseX}px`
    cursor.style.top = `${mouseY}px`
    cursor.style.transform = 'translate(-50%, -50%) rotate(' + rotationDegrees + 'deg)';
    cursorOrienatation = rotationDegrees;

    updateTextBox(rocketX, rocketY);

    // console.log(cursorOrienatation)
};

function updateTextBox(rocketX, rocketY){

    if (rocketX > textBoundingBox.left && rocketX < textBoundingBox.right && rocketY > textBoundingBox.top && rocketY < textBoundingBox.bottom){
        textBlock.textContent = 'yes.';
    } else {
        textBlock.textContent = textBlockOriginalText;
        textBoundingBox = textBlock.getBoundingClientRect();        
    }
}

window.addEventListener('mousemove', function (event) {
    updateCursor(event);
});

document.addEventListener('touchstart', function(event) {
    event.preventDefault(); // Prevents the default touch behavior
    var touch = event.touches[0];
    updateCursor(touch);
  });
  
document.addEventListener('touchmove', function(event) {
    event.preventDefault(); // Prevents the default touch behavior
    var touch = event.touches[0];
    updateCursor(touch);
});

// textBlock.addEventListener('mouseover', function() {
//   textBlock.textContent = 'yes.';
// });

// textBlock.addEventListener('mouseout', function() {
//   textBlock.textContent = textBlockOriginalText;
// });