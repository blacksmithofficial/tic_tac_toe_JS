// TIC TAC TOE ( JAVASCRIPT )

// [ Variables ] : ( Setup / Menu ) Phase 1
const start_menu = document.getElementById("start_menu");
const mode_select = document.getElementById("mode_select");
const set_username = document.getElementById("set_username");
const shape_select = document.getElementById("shape_select");

// [ Variables ] : ( Setup / Menu ) Phase 2
const start_button = document.getElementById("start_button");
const continue_button = document.getElementById("continue_button");
const username = document.getElementById("username");
const circle_option = document.getElementById("circle_option");
const cross_option = document.getElementById("cross_option");

// [ Variables ] : ( Game Window )
const game_board = document.getElementById("game_board");
const player_display = document.getElementById("player_display");
const player_username_display = document.getElementById("player_username_display");
const player_shapebox = document.getElementById("player_shapebox");
const cpu_shapebox = document.getElementById("cpu_shapebox");
const grid = document.getElementById("grid");
const game_display = document.getElementById("game_display");
const grid_boxes = document.querySelectorAll(".grid_box");
const endgame_display = document.getElementById("victory_display");

// [ Variables ] : ( Game-Start )
const shapes = ['O', "X"];
let player_username, player_shape, cpu_shape;
let game_count = 0;
let player_turn, cpu_turn;

// [ Variables ] : Grid ( 3x3 ) 
let box_count = 9;
let space_count = 9;
let grid_full = false;
let reference_list = ['', '', '', '', '', '', '', '', ''];
let cpu_boxes = [];
let player_boxes = [];


// [ System ] :  ( Start Menu EventListeners )
start_button.addEventListener("click", () => {
    game_count++;
    mode_select.style.display = "none";
    set_username.style.display = "block"; 
})
continue_button.addEventListener("click", () => {
    player_username = username.value;
    console.log(`Player Username : ${player_username}`);
    set_username.style.display = "none";
    shape_select.style.display = "block";
    player_username_display.innerHTML = player_username;
})
circle_option.addEventListener("click", () => {
    player_shape = shapes[0];
    cpu_shape = shapes[1];
    start_menu.style.display = "none";
    game_board.style.display = "block";
    player_shapebox.innerHTML = player_shape;
    cpu_shapebox.innerHTML = cpu_shape;
    game_display.innerHTML = `Game ${game_count}`;
    
    console.log(`Player Shape : ${player_shape}`);

})
cross_option.addEventListener("click", () => {
    player_shape = shapes[1];
    cpu_shape = shapes[0];
    start_menu.style.display = "none";
    game_board.style.display = "block";
    player_shapebox.innerHTML = player_shape;
    cpu_shapebox.innerHTML = cpu_shape;
    game_display.innerHTML = `Game ${game_count}`;

    console.log(`Player Shape : ${player_shape}`);
})

// [ System ] : ( Game Board EventListeners )
grid_boxes.forEach((grid_box) => {
    grid_box.addEventListener("click", () => {
        if(space_count > 0 && grid_box.innerHTML === ''){
            grid_box.innerHTML = player_shape;
            reference_list[grid_box.id] = player_shape;
            player_boxes.push(grid_box.id);
            space_count--;
            cpuAttempt();
            streakCheck(player_boxes, cpu_boxes);

            if (space_count < 1){
                window.alert("Game Over");
            }

            // [ Debug ]
            // console.log(`reference_list : ${reference_list}`);
            // console.log(`${grid_box.id}`);
            // console.log(`space_count : ${space_count}`);
            // console.log(`player attempts : ${player_boxes}`)
        }
    })
})

// [ Functions ] : ( Grid ) 
function cpuAttempt(){
    // [ Variables ]
    let cpu_attempt = Math.floor(Math.random() * 9);

    // [ Conditionals ]
    if(reference_list[cpu_attempt] !== '' && space_count > 0){
        cpuAttempt();
    } else if (reference_list[cpu_attempt] === '' && space_count > 0){
        reference_list[cpu_attempt] = cpu_shape;
        cpu_boxes.push(cpu_attempt);
        space_count--;

        // [ Update Grid ]
        grid_boxes[cpu_attempt].innerHTML = cpu_shape;
    } else {
        return;     // Exit Function
    }

    // [ Debug ]
    // console.log(`cpu attempts : ${cpu_boxes}`);
    // console.log(`player attempts : ${player_boxes}`);


}

function streakCheck(arrayA, arrayB){
    // consecutive count x
    // consecutive count o
    /** need 3 in a row */
    /** increments when consecutive repeats */

    // [ row ] [ column ] [ diagonal ]
    // 3 rows
    // 3 columns
    // 2 diagonals

    // [ Arrays ] : Strings (Sequences) 3!
    rows = ["012","021","102","120","210","201", 
            "345","354","435","453","534","543", 
            "678","687","768","786","867","876"];
    columns = ["036","063","306","360","603","630",
                "147","174","417","471","714","741",
                "258","285","528","582","825","852"];
    diagonals = ["048","084","408","480","804","840",
                 "246","264","426","462","624","642"];

    // [ Arrays ] : Convert
    let subArrayA = arrayA.toString().split(",");
    let subArrayB = arrayB.toString().split(",");

    let allocatorA = "";
    let allocatorB = "";

    // [ Loop ] : Allocate subArrays
    for(let i = 0; i < subArrayA.length; i++){
        allocatorA += subArrayA[i];
    }
    for(let i = 0; i < subArrayB.length; i++){
        allocatorB += subArrayB[i];
    }

    // [ Loop ] : Rows
    for(let i = 0; i < rows.length; i++){
        if(allocatorA.includes(rows[i]) || allocatorB.includes(rows[i])){
            window.alert("STREAK DETECTED");
            console.log("STREAK DETECTED");

            endgame_display.innerHTML = "GAME OVER";
            endgame_display.style.display = "flex";
        }
    }
    // [ Loop ] : Columns
    for(let i = 0; i < columns.length; i++){
        if(allocatorA.includes(columns[i]) || allocatorB.includes(columns[i])){
            window.alert("STREAK DETECTED");
            console.log("STREAK DETECTED");

            endgame_display.innerHTML = "GAME OVER";
            endgame_display.style.display = "flex";
        }
    }
    // [ Loop ] : Diagonals
    for(let i = 0; i < diagonals.length; i++){
        if(allocatorA.includes(diagonals[i]) || allocatorB.includes(diagonals[i])){
            window.alert("STREAK DETECTED");
            console.log("STREAK DETECTED");

            endgame_display.innerHTML = "GAME OVER";
            endgame_display.style.display = "flex";
        }
    }

    // [ Debug ]
    // console.log(`subArray A : ${subArrayA}`);
    // console.log(`subArray B : ${subArrayB}`);
    // console.log(subArrayA);
    // console.log(subArrayB);
    console.log(allocatorA);
    console.log(allocatorB);
}