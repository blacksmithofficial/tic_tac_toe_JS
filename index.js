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


// [ Variables ] : ( Game-Start )
const shapes = ['O', "X"];
let player_username, player_shape, cpu_shape;
let game_count = 0;



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
    // player_shape = circle_option.innerHTML;
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
    // player_shape = cross_option.innerHTML;
    player_shape = shapes[1];
    cpu_shape = shapes[0];
    start_menu.style.display = "none";
    game_board.style.display = "block";
    player_shapebox.innerHTML = player_shape;
    cpu_shapebox.innerHTML = cpu_shape;
    game_display.innerHTML = `Game ${game_count}`;

    console.log(`Player Shape : ${player_shape}`);
})

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