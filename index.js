// TIC TAC TOE ( JAVASCRIPT )

// [ Variables ] : ( Setup / Menu )
const start_menu = document.getElementById("start_menu");
const mode_select = document.getElementById("mode_select");
const set_username = document.getElementById("set_username");
const shape_select = document.getElementById("shape_select");

const start_button = document.getElementById("start_button");
const continue_button = document.getElementById("continue_button");
const username = document.getElementById("username");
const circle_option = document.getElementById("circle_option");
const cross_option = document.getElementById("cross_option");

const game_board = document.getElementById("game_board");
const player_display = document.getElementById("player_display");
const player_username_display = document.getElementById("player_username_display");
const player_shapebox = document.getElementById("player_shapebox");
const cpu_shapebox = document.getElementById("cpu_shapebox");
const grid = document.getElementById("grid");
const game_display = document.getElementById("game_display");
const grid_boxes = document.querySelectorAll(".grid_box");

const turn_display = document.getElementById("turn_display");



// [ Variables ] : ( Game-Start )
const shapes = ['O', "X"];
let player_username, player_shape, cpu_shape;
let game_count = 0;
let player_turn, cpu_turn;


// [ Variables ] : Grid ( 3x3 ) 
let box_count = 9;
let space_count = 9;
let marked_count = 0;
let grid_full = false;
let reference_list = ['', '', '', '', '', '', '', '', ''];
let cpu_boxes = [];





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
        if(space_count > 0){
            grid_box.innerHTML = player_shape;
            reference_list[grid_box.id] = player_shape;
            space_count--;
            cpuAttempt();

            // Debug
            console.log(`reference_list : ${reference_list}`);
            console.log(`${grid_box.id}`);
            console.log(`space_count : ${space_count}`);
        }
    })
})


// [ Functions ] : ( Grid ) 
function cpuAttempt(){
    // Random Number Generator
    //      - random num [0 - 8]
    //      - tracker list (attempts) : prevents repeat numbers
    //      - tracker list (player attempts) : prevents overwrites

    // [ Condition ] : Duplicate
    let cpu_attempt = Math.floor(Math.random() * 9);

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
    // reference_list[cpu_attempt] = cpu_shape;

    // // Grid Scan
    // for(let i = 0; i < reference_list.length; i++){
    //     if(cpu_attempt === i){
    //         cpu_attempt = Math.floor(Math.random() * 9);
    //     }
    // }


    
    // [ Debug ]
    console.log(`cpu attempts : ${cpu_boxes}`);


}
function gridCheck(){
    if(space_count === 0){
        grid_boxes.forEach((grid_box) => {
            grid_box.disabled = true;
        })
    }
}



/**
 *     [ Objects ] : System
 * 
 *      - [ Player ]
 *          a. wins
 *          b. losses
 *          c. shape
 *          d. boxes        [ array / list : of squares player marked ]
 *          e. streak       ( boolean : r )
 * 
 *      - [ Grid ] 
 *          a. box_count
 *          b. full         ( boolean : r )
 *          c. empty_count  ( r )
 *          e. marked_count ( r )
 *          
 *      - [ Box ]
 *          a. marked       ( boolean : r )
 *          b. shape        ( r )
 *          
 *
 * 
 *      [ Objects ] : Components
 * 
 *        - [ Start Menu ]
 *        - [ Grid ]
 *        - [ Display ]
 *        - [ Turn Alert ]
 *        - [ Victory Alert ]
 *        - [ End Menu ]
 * 
 * 
 *      [ Methods ]
 *          
 *        - [ Shape Select ] : determines CPU shape based on Player shape select
 *        - [ Streak Check ] : active board check scanning for XXX or OOO
 *        - [  ]
 */