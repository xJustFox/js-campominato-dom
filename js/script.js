
// FUNZIONE CHE GENERA UN NUMERO RANDOM
function generateRandomNum(array_bombs, cells) {
    let check_num = false;
    let randomInt;

    if (cells != 0) {
        while (!check_num) {
            randomInt = Math.floor(Math.random()* cells + 1);
            if(!array_bombs.includes(randomInt)){
                check_num = true;
            }
        }
    }

    return randomInt;
}

// FUNZIONE CHE GENERA L'ARRAY DELLE BOMBE
function generateBombList(num_of_bombs, total_cells) {
    let bombs = [];

    for (let i = 1; i <= num_of_bombs; i++) {
        let bombs_number = generateRandomNum(bombs, total_cells);
        bombs.push(bombs_number);
    }

    return bombs;
}

// FUNZIONE CHE GENERA LE CELL
function createCell(cellForRow, i) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `${i}`;
    cell.style.width = `calc(100% / ${cellForRow})`;
    cell.style.height = cell.style.width;

    return cell;
}

// FUNZIONE CHE MOSTRA TUTTE LE BOMBE QUANDO SI PERDE
function redCell(bombs) {
    for (let i = 0; i < bombs.length; i++) {
        let redBombs = bombs[i];
        let cell = document.getElementById(`${redBombs}`);
        cell.classList.add("bg-danger");
    }
}

// FUNZIONE CHE GENERA LA GRIGLIA
function createGrid(cellNum, cellForRow) {
    const bombs = generateBombList(16, cellNum);   
    let gameOver = false;
    let points = 0;

    for (let i = 1; i <= cellNum; i++) {
        let checkPoints = false;
        let cell = createCell(cellForRow, i);
        cell.innerText = i;
        // VERIFICO SE IL GIOCATORE E' ANCORA IN PARTITA O HA SELEZIONATO UNA BOMBA
        cell.addEventListener("click", function () {
            if (!gameOver) {
                if (!bombs.includes(i)) {
                    this.classList.add("bg-success");
                    
                    if(!checkPoints){
                        points++;
                                                          
                        document.getElementById("points").innerText = `Il tuo punteggio è di ${points}`;
                        checkPoints = true;
                    }

                    let totalPoints = cellNum - bombs.length;
                    if (points == totalPoints) {
                        document.getElementById("result-text").innerText = "Hai vinto!";
                        redCell(bombs);
                    }
                }
                
                else{
                    this.classList.add("bg-danger");
                    document.getElementById("result-text").innerText = "Hai perso!";
                    gameOver = true;
                    redCell(bombs);
                }
            }
        })

        grid.appendChild(cell);
    }    
}

// FUNZIONE CHE GESTISCE LA DIFFICOLTà DI GIOCO
function createNewGame() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    document.getElementById("result-text").innerText = ""
    document.getElementById("points").innerText = ""

    const difficulty = document.getElementById("difficulty");
    let level = parseInt(difficulty.value);

    let cellNum;
    let cellForRow;
    
    switch (level) {
        case 1:
            cellNum = 100;
            break;
        case 2:
            cellNum = 81;
            break;
        case 3:
            cellNum = 49;
            break;
        default:
            cellNum = 0;
            alert("Inserisci una difficoltà")
            break;
    }

    cellForRow = Math.sqrt(cellNum);

    createGrid(cellNum, cellForRow);
}

// PULSANTE INIZO GIOCO
const button = document.getElementById("startButton");
button.addEventListener("click", function () {
    createNewGame();
})