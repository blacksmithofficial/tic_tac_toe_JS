// TIC TAC TOE ( JAVASCRIPT )

// [ Variables ] : ( Setup / Menu ) Phase 1
const start_menu = document.getElementById("start_menu");
const mode_select = document.getElementById("mode_select");
const set_username = document.getElementById("set_username");
const shape_select = document.getElementById("shape_select");
const end_menu = document.getElementById("end_menu");
const yes = document.getElementById("yes");
const no = document.getElementById("no");

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
const endgame_display = document.getElementById("endgame_display");

// [ Variables ] : ( Game-Start )
const shapes = ['O', "X"];
let player_username, player_shape, cpu_shape;
let game_count = 1;
let player_turn, cpu_turn;

// [ Variables ] : Grid ( 3x3 ) 
let box_count = 9;
let space_count = 9;
let grid_full = false;
let streak_detected = false;
let reference_list = ['', '', '', '', '', '', '', '', ''];
let cpu_boxes = [];
let player_boxes = [];


// [ System ] :  ( Start Menu EventListeners )
// console.log(`game_count : ${game_count}`);
start_button.addEventListener("click", () => {
    mode_select.style.display = "none";
    set_username.style.display = "block"; 

    console.log(`game_count : ${game_count}`);
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
    // game_count++;
    
    console.log(`Player Shape : ${player_shape}`);

})
cross_option.addEventListener("click", () => {
    player_shape = shapes[1];
    cpu_shape = shapes[0];
    start_menu.style.display = "none";
    game_board.style.display = "block";
    player_shapebox.innerHTML = player_shape;
    cpu_shapebox.innerHTML = cpu_shape;
    // game_count++;

    console.log(`Player Shape : ${player_shape}`);
})
// [ System ] : (End Menu EventListeners )
yes.addEventListener("click", () => {
    // [ Clear Board ]
    clear_board(grid_boxes);
    game_count++;
    end_menu.style.display = "none";
    endgame_display.style.display = "none";

    console.log(game_count);
    game_display.innerHTML = `Game ${game_count}`;
})
no.addEventListener("click", () => {
    // [ Clear Board ]
    clear_board(grid_boxes);
    game_count = 0;

    end_menu.style.display = "none";
    game_board.style.display = "none";
    start_menu.style.display = "block";
    mode_select.style.display = "block";
    set_username.style.display = "none";
    shape_select.style.display = "none";
})


// [ System ] : ( Game Board EventListeners )
game_display.innerHTML = `Game ${game_count}`;
console.log(`game_count : ${game_count}`);
grid_boxes.forEach((grid_box) => update_grid(grid_box));

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
}
function streakCheck(){
    // ( Consecutive Counter Check )                                [ SECOND IMPLEMENTATION ]
    let first_column = [], second_column = [], third_column = [];
    let first_row = [], second_row = [], third_row = [];
    let first_diagonal = [], second_diagonal = [];

    // [ Document ] : Actively Record Current Grid Changes
    // [ Loop ] : ( Record Column Changes)
    populate(first_column, 0, 9, 3);
    populate(second_column, 1, 9, 3);
    populate(third_column, 2, 9, 3);
    // [ Loop ] : ( Record Row Changes )
    populate(first_row, 0, 3, 1);
    populate(second_row, 3, 6, 1);
    populate(third_row, 6, 9, 1);
    // [ Loop ] : ( Record Diagonal Changes )
    populate(first_diagonal, 0, 9, 4);
    populate(second_diagonal, 2, 7, 2);

    // [ Compare ] : Find Streak ( End Game Condition )
    let cross_streak = "XXX";
    let circle_streak = "OOO";
    let sequences = [ first_column, second_column, third_column,
                      first_row, second_row, third_row,
                      first_diagonal, second_diagonal ];
    sequences.forEach((sequence) => {
        sequence = convert(sequence);
        // [ Condition ] : Streak Match
        if(sequence === cross_streak || sequence === circle_streak){
            console.log(" !! Streak Detected !! ");
            streak_detected = true;

            endgame_display.style.display = "flex";
            endgame_display.innerHTML = "GAME OVER";
            reset();
        }
    });
}

// [ Functions ] : Support 
function populate(array, start, stop, amount){
    for (let i = start; i < stop; i+=amount){
        array.push(reference_list[i]);
    }
}
function convert(array){
    let temp = array.toString().split(",").join("");
    return temp;
}
function clear_board(collection){
    collection.forEach((grid_box) => {
        grid_box.innerHTML = '';
    })
    grid_full = false;
    streak_detected = false;
    reference_list = ['', '', '', '', '', '', '', '', ''];
    cpu_boxes = [];
    player_boxes = [];
    space_count = 9;
}

// [ Functions ] : 
function reset(){
    // [ Trigger ] : Prompt
    end_menu.style.display = "block";
    end_menu.style.position = "absolute";

    // [ Condition ] : Continue

    // [ Condition ] : Exit
}
function update_grid(grid_box){
    grid_box.addEventListener("click", () => {
        if (!streak_detected){
            mark_grid(grid_box);
        }
    })
}
function mark_grid(grid_box){
    if((space_count > 0 && grid_box.innerHTML === '')){
        grid_box.innerHTML = player_shape;
        reference_list[grid_box.id] = player_shape;
        player_boxes.push(grid_box.id);
        space_count--;
        cpuAttempt();
        streakCheck();
    } else {
        return;
    }
}
