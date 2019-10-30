/*
[IMPORTANT]
You are free to create any number of helper function you want.
We know the problem could be seached online, and we are aware of those solutions.
So please sight sources if you took help from any online resource.
*/



//IDs for all the table elements. You get the cell element just by using document.getElementById("A1")
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];

/*
An integer array of length 9.
Usaged: This is to store the state to the tictactoe board.
When a move is made
(Example player 1 (who is X) move at Cell 'A1' --- The board_state[0] will be made 1 )
Similarly, A move by player 2(who is O) at Cell 'A3' --- The board_state[2] will be made 0 )
We store the move of player 1 as '1' and player 2 as '0'. So after the above two moves the state should look like
[1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1];


// A flag to keep track of the status of the game, false means the game is not started. The default value is set to false
var started = false;

/*
A variable to keep track of each players turn. Since the game always starts with player 1 - The default value is set to '1'
1 means player_1
0 means player_0
*/
var turn = 1;

/*
 @Return boolean
 @Param _str - A string variable - Note the type is not checked in the implementation
 The methods @Returns true is the _str is null or it has a length of 0, otherwise, the methods returns false
*/
function isEmpty(_str) {
	return (!_str || 0 === _str.length)
}

/*
@Return int This return the turn variable. Please note that
turn = 1 is for player_1 and
turn = 0 is for player_2
@Param - No param
*/
function whose_move(){
	return this.turn
}

/*
@Return void
@Param
This methods toggles the 'turn' variable.
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
Also updates displayed turn in HTML
*/
function toggle_move() {
	this.turn = !this.turn
	if(whose_move() == 1)
		document.getElementById("turn_info").innerHTML = "player_1";
	else
		document.getElementById("turn_info").innerHTML = "player_2";
}

/*
@Return boolean
@Param: none
The method returns the value of the 'started' flag.
true means the game has started
false means the game has not started
When the game has not started the flag is set to false. As soon as the game starts the flag must be set to true.
Once the game has finished or user has clicked on reset_play the flag must be set to false.
*/
function game_started(){
	return this.started
}



/*
@Return void
@Param none
This method is called when the Begin Play button is clicked. The method will:
1. Verify if the player names are empty or not. Raise an alert if they are empty.
2. If the field are empty don't start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
3. If all verification is successful, disable the name fields and update the player moves as shown in the image.
4. If all verification is successful, update the turn information on the page. (See the source code and image). And set the started flag to true.(this will help you track at any instant if the game is in start state or not.)
5. Once game has started, Handle multiple clicks on begin play.
*/


function begin_play(){
	if (game_started())
		return;
	if( isEmpty(document.getElementById("player1_id").value) || isEmpty(document.getElementById("player2_id").value) ){
		alert("Player names can't be empty!");
		return;
	}
	document.getElementById("player1_id").disabled=true;
	document.getElementById("player2_id").disabled=true;
	document.getElementById("turn_info").innerHTML = "player_1";
	this.started=true;

}




/*
@Return void
@Param none
This method is called when the Reset Play button is clicked. It will:
1. Reset the whole game.(At any time when reset is clicked - All the three text boxes should be cleared and Turn should be set to the default message.)
2. The text boxes for entering name should be enablled back.
3. The Tic Tac Toe Grid should be set to its default entries.
4. Clicking reset play again and again shall have the same effect.(or no effect when clicked multiple times)
5. Set the strated flag as false

*/
function reset_play(){
	if(!game_started())
		return;
	document.getElementById("player1_id").disabled=false;
	document.getElementById("player1_id").value = "";
	document.getElementById("player2_id").disabled=false;
	document.getElementById("player2_id").value = "";
	board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
	this.turn=1;
	document.getElementById("turn_info").innerHTML = "Game has not begun.";
	for(var i = 0; i < 9; i++){
		document.getElementById(table_ids[i]).innerHTML = table_ids[i]
	}
	this.started = false;
}




/* 
@Parameters: input
@Output: Index if valid, else -1
Check validity of move input.
Return -1 if not valid
*/

function valid(input){
	for(var i in table_ids){
		if (table_ids[i] === input){
			if(board_state[i] == -1)
				return i;
		}
	}
	alert("Please make valid input");
	return -1;
}




/*
@Parameters: Valid move, index of move
@Return:Void
Method called each time a valid move is intered
Update board_state structure with a 1 for player 1, or a 0 for player 2
*/
function update_board(move, index){
	if(whose_move()){ /* player 1 */
		document.getElementById(move).innerHTML = "X";
		board_state[index] = 1;
	}
	else{ /* player 2 */
		document.getElementById(move).innerHTML = "O";
		board_state[index] = 0;
	}
	return;
}





/* 
@Parameters: none
@Return: void
Method is called each move. Method will:
Check win conditions, reset_play() if winner found
1. Check Columns
2. Check Rows
3. Check Diagnols
*/
	
function check_state(){
/* Check rows */
	for(var i = 0; i < 9; i+=3){
		if(board_state[i] == board_state[i+1] == board_state[i+2]){
			if (board_state[i] == 1){
				alert("Winner is X (Row)");
				reset_play();
				return;
			}
			else if (board_state[i] == 0){
				alert("Winner is O (Row)");
				reset_play();
				return;
			}
		}
	}

/* Columns */
	for(i = 0; i < 3; i+=1){
		if(board_state[i] == board_state[i+3] == board_state[i+6]){
			if (board_state[i] == 1){
				alert("Winner is X (Column)");
				reset_play();
				return;
			}
			else if(board_state[i] == 0){
				alert("Winner is O (Column)");
				reset_play();
				return;
			}
		}
	}

/* Diagnols */
	if(board_state[0] == board_state[4] == board_state[8]){
		if (board_state[0] == 1){
			alert("Winner is X (Diagnol)");
			reset_play();
			return;
		}
		else if(board_state[0] == 0){
			alert("Winner is O (Diagnol)");
			reset_play();
			return;
		}
	}

	if(board_state[2] == board_state[4] == board_state[6]){
		if (board_state[2] == 1){
			alert("Winner is X  (Diagnol)");
			reset_play();
			return;
		}
		else if(board_state[2] == 0){
			alert("Winner is O  (Diagnol)");
			reset_play();
			return;
		}
	}
}





/* 
Debugging function 
Print out whole board_state in console
*/
function display_state(){
	for(var i = 0; i < 9; i+=3){
		console.log(board_state[i], board_state[i+1], board_state[i+2]);
	}
}




/*
@Parameters: Node
@Return: Void
Method calles when play button is clicked. Method will:
1. The moves should be validated can only be these ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
2. Invalid moves should be reported by an alert message.
3. If the move is a valid move, the grid should be updated with the correct move (Player 1 is always - 'X', and Player 2 is always 'O' (This is not zero!)) - The turn information should also be updated
4. A move should always be a valid move. (Example: If say a move was made in already filled cell, it should be invalidated with an alert.)
5. If game has not started, give an alert "The game has not started."
6. After any move, the state of the table should be validated.
   If the there is winner - Show it in an alert message - 
7. The game should reset itself once a winner is determined.

*/

function play() {
	if(!game_started())
		alert("Game has not started!.");
	var move = document.getElementById("move_text_id").value;
	index = valid(move);
	if(index != -1){
		update_board(move, index);
		display_state();
		check_state();
		toggle_move();
	}
}




/*
For enter
*/
function moveEnter(event) {		
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}

}