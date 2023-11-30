// FUNZIONE CHE GENERA UN NUMERO RANDOM
function generateRandomNum(array_bombs) {
    let check_num = false;
    let randomInt;

    while (!check_num) {
        randomInt = Math.floor(Math.random()* 100 +1);
        if(!array_bombs.includes(randomInt)){
            check_num = true;
        }
    }

    return randomInt;
}

// FUNZIONE CHE GENERA L'ARRAY DELLE BOMBE
function generateBombList(num_of_bombs) {
    let bombs = [];

    for (let i = 1; i <= num_of_bombs; i++) {
        let bombs_number = generateRandomNum(bombs);
        bombs.push(bombs_number);
    }

    return bombs;
}

// FUNZIONE CHE GENERA LE CELL
function createCell() {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    return cell;
}

// FUNZIONE CHE GENERA LA GRIGLIA
function createGrid() {
    const bombs = generateBombList(16);
    let gameOver = false;
    let points = 0;

    for (let i = 1; i <= 100; i++) {
        let cell = createCell();
        cell.innerText = i;

        // VERIFICO SE IL GIOCATORE E' ANCORA IN PARTITA O HA SELEZIONATO UNA BOMBA
        cell.addEventListener("click", function () {
            if (!gameOver) {
                if (!bombs.includes(i)) {
                    this.classList.add("bg-success");
                    points++;

                    document.getElementById("points").innerText = `Il tuo punteggio è di ${points}`

                    let totalPoints = 100 - bombs.length;
                    if (points == totalPoints) {
                        document.getElementById("result-text").innerText = "Hai vinto!";
                    }
                }
    
                else{
                    this.classList.add("bg-danger")
                    document.getElementById("result-text").innerText = "Hai perso!"
                    gameOver = true;
                }
            }
        })
    
        grid.appendChild(cell);
    }
}


function createNewGame() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    document.getElementById("result-text").innerText = ""
    document.getElementById("points").innerText = ""
}

// PULSANTE INIZO GIOCO
const button = document.getElementById("startButton");
button.addEventListener("click", function () {
    createNewGame();
    createGrid();
})