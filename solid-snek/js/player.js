class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        // gameScreen HTML element
        this.gameScreen = gameScreen;

        // Position values
        this.left = left;
        this.top = top;

        // PLayer Dimension Values
        this.width = width;
        this.height = height;

        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.position = "absolute";

        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.directionX = 0;
        this.directionY = 0;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.left += this.directionX;
        this.top += this.directionY;
        

        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

    didCollideWithWalls(){
        if (this.left + this.width > this.gameScreen.offsetWidth) {
            this.left = this.gameScreen.offsetWidth - this.width - 100;
            return true;      
        }

        // Handle the left side of the screen : car stops in the left border of the game screen
        else if (this.left < 0) {
            this.left = 0 + 100;
            return true;
        }
        // Handle the bottom side of the screen : car stops in the bottom border of the game screen
        else if (this.top + this.height > this.gameScreen.offsetHeight) {
            this.top = this.gameScreen.offsetHeight - this.height - 100;
            return true;
        }
        // Handle the top side of the screen : car stops in the top border of the game screen
        else if (this.top < 0) {
            this.top = 0 + 100;
           return true;
        }

        return false; 
         
    }
    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        // if part of my bluecar is inside the redcar, then i have a collision
        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            return true;
        } else {
            return false;
        }
    }
}
