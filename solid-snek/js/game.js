// code to be added
class Game {
    // Get all Game Screens
    // gameScreen and gameEndScreen are initialy not displayed
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");

        // I am going to create a player in the future. For this momento of the code-along, i'll leave it to null.
        this.player = new Player(this.gameScreen, 200, 500, 30, 30, "./images/snake-body.png");

        // Style for the Game Board
        this.height = 600;
        this.width = 600;

        //Obstacles
        this.obstacles = [];

        //Score
        this.score = 0;
        this.lives = 3;


        // Variable to check if im in the process of creating an obstacle
        this.isPushingObstacle = false;

        //Variable to check if the game is over
        this.gameIsOver = false;

        


    }

    start() {
        //Sets the height and width of the game screen.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        //Hides the start screen.
        this.startScreen.style.display = "none";
        //Shows the game screen.
        this.gameScreen.style.display = "block";
        //Starts the game loop 
        this.gameLoop();
    }

    gameLoop() {
        if (this.gameIsOver) {
            return;
        }
        this.update();
        window.requestAnimationFrame(() => this.gameLoop());
    }
    update() {
        /* Score, lives scoreboard*/
        let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        /* Every Frame of the game, i want to check if the car is moving*/
        this.player.move();

        if(this.player.didCollideWithWalls()){
            this.lives --
        }


        // Iterate over the obstacles array and make them move
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();

                this.obstacles.splice(i, 1);

                this.score++;

            }

            else if (obstacle.top > this.height) {
                this.lives--;

                // Remove the obstacle HTML element from the HTML 
                obstacle.element.remove();

                // Remove the obstacle from the game class obstacles array
                this.obstacles.splice(i, 1);
            }
        }

        if (this.lives === 0) {
            this.endGame();
        }

        // If there are no obstacles, push a new one afer 1second and a half.
        else if (!this.obstacles.length && !this.isPushingObstacle) {
            this.isPushingObstacle = true;
            setTimeout(() => {
                this.obstacles.push(new Obstacle(this.gameScreen));
                this.isPushingObstacle = false;
            }, 1500)
        }

        score.innerHTML = this.score;
        lives.innerHTML = this.lives;
    }
    endGame() {
        // Change the gameIsOver status. If its true, remember that this is going to break the animation loop.
        this.gameIsOver = true;
        // Remove my player from the HTML
        this.player.element.remove();
        // Remove all obstacles
        this.obstacles.forEach((obstacle, index) => {
            // Remove the obstacle from JS
            this.obstacles.splice(index, 1);
            // Remove the obstacle from HTML
            obstacle.element.remove();
        });
        // Hide the current game screen...
        this.gameScreen.style.display = "none";
        // In order, to display the game end screen
        this.gameEndScreen.style.display = "block";
    }
}