var skill;
var time;
var bait;
var baited;
var fishSize;
var minFishSize = 1;
var maxFishSize = 20;
var luck;
var caughtMeter;
var caughtThreshold;
var amountCaught;
var alreadySetUp = false;
var position;

function say(Id, what){
	document.getElementById(Id).innerHTML = what;	
}
function getRand(low, high){
	var decimal;
	var number;
	var answer;
	
	while(true)
	{
		
		decimal = Math.random();
		number = decimal * (high + 1);
		
		if (number > low)
		{		
			answer = Math.floor(number);
			return answer;
		}
	}
}

function initialize(){
	time = 60;
	bait = 0;
	skill = 1	;
	amountCaught = 0;
	
	showHighScores();
	
	var set = localStorage.getItem("alreadySetUp");
	
	
	if (set === false)
	{
		setHighScores();
	}
	
	takesTime(0);
	resetStory();
	
	say ("skill", "Skill: " + skill);
	say ("bait", "Bait: " + bait);
	say ("amountCaught", "Amount of fish caught: " + amountCaught + " lbs");
	
	switchToCasting();
}
function disappear(target){
    var x = document.getElementById(target);
   
        x.style.display = "none";
   
}
function reappear(target) {
    var x = document.getElementById(target);
   
        x.style.display = "inline";
   
}
function resetStory(){
	say ("story", "You have " + time + " minutes to fish. What do you do?");
	
	if (time < 1){
		highScores();
	}
}
function fish(){
	
		takesTime(1);
		
		if (time < 1)
		{
			highScores();
		}
	
		caughtMeter = 10 + (skill * 5);
		
		baited = false;
	
		if (bait > 0){
			bait--;
			baited = true;
			
			say ("bait", "Bait: " + bait);
		}
		
		fishSize = getFishSize();
		
		luck = getRand(1,15);
		if (time > 0){
			if (baited === true)
			{
				luck = luck + 5;
			}
		
			if (luck > getRand(1,15))//------------------
			{
				say("story", "You've got a bite!");
			
				switchToHooked();			
			}
			else
			{
				say("story", 'Not even a nibble...');
			}
		}
		else
		{
			highScores();
		}
}
function getBait(){
		takesTime(1);
		
		bait = bait + 1;
		say ("bait", "Bait: " + bait);
		
		if (time < 1)
		{
			say ("getBait", "Bait: " + bait);
			highScores();
		}
	
		resetStory();
		
		
}
function getFishSize(){ //this function is currently tied to fish sizes being between 1 and 20 pounds!
	var Num1 = getRand(1,5);
	var Num2 = getRand(1,5);
	
	if (Num1 == 5)
	{
		Num1 = Num1 + getRand(1,5);
	}
	if (Num2 == 5)
	{
		Num2 = Num2 + getRand(1,5);
	}
	
	if ((Num1 == 4)&&(Num2 == 1))
	{
		return 2;
	}
	else if ((Num1 == 4)&&(Num2 == 3))
	{
		return 1;
	}
	else
	{
		return (Num1 + Num2);
	}
	
	
}
function switchToHooked(){
	disappear("cast");
	disappear("getBait");
	reappear("cutLine");
	reappear("jerk");
	reappear("reelIn");
	disappear("again");
	disappear("submitForm");
	disappear("submitButton");
	disappear("restart");
}
function switchToCasting(){
	resetStory();
	
	reappear("cast");
	reappear("getBait");
	disappear("cutLine");
	disappear("jerk");
	disappear("reelIn");
	disappear("again");
	disappear("submitForm");
	disappear("submitButton");
	disappear("restart");
}
function switchToAgain(){
	disappear("cast");
	disappear("getBait");
	disappear("cutLine");
	disappear("jerk");
	disappear("reelIn");
	reappear("again");
	disappear("submitForm");
	disappear("submitButton");
	disappear("restart");
}
function switchToAskForName(){
	say ("story", "Congratulations, you made the High Score list! Enter your name:");
	
	disappear("cast");
	disappear("getBait");
	disappear("cutLine");
	disappear("jerk");
	disappear("reelIn");
	disappear("again");
	reappear("submitForm");
	reappear("submitButton");
	disappear("restart");
}
function switchToRestart(){
	disappear("cast");
	disappear("getBait");
	disappear("cutLine");
	disappear("jerk");
	disappear("reelIn");
	disappear("again");
	disappear("submitForm");
	disappear("submitButton");
	reappear("restart");
}
function jerk(){//check for end of game here
	takesTime(1);
	
	if (time < 1)
		{
			highScores();
		}
	
	if (getRand(1,2)==1)
	{
		caughtMeter = (caughtMeter + 5) * 2;	
		say ("story", "You feel a tug on the line!");
	}
	else
	{
		caughtMeter = caughtMeter - 35;
		say ("story", "The line gets a little looser.");
	}
	
	testCaughtMeter();
}
function reelIn(){//and here
	takesTime(2);
	
	if (time < 1)
		{
			highScores();
		}
	
	var a = (caughtMeter + (skill * 2)) - fishSize;
	
	if (a > caughtMeter){
		say ("story", "You pull the fish a little closer.");
	}
	else if (a == caughtMeter){
		say ("story", "The fish doesn't seem to be getting closer.");
	}
	else
	{
		say ("story", "This must be a big fish - it's pulling your line out!");
	}
	
	caughtMeter = a;
	testCaughtMeter();
}
function cutLine(){
	
	if (time < 1)
		{
			highScores();
		}
	
	caughtMeter = 0;
	testCaughtMeter();
}
function testCaughtMeter(){//figure out how to get the end-of-game signal to stop the game instead of waiting for the next click.
	var a = getRand(fishSize*10, fishSize*20);
	var b = getRand(fishSize*10, fishSize*20);
	var c = ((a * b) / (fishSize * 15));
	caughtThreshold = Math.floor(c);
	
	if(caughtMeter > caughtThreshold)
	{
		say("story", "You caught a " + fishSize + "-pound fish!");
		
		var increase = Math.ceil(fishSize / 4);
		skill = skill + increase;
		say ("skill", "Skill " + skill);
		amountCaught = amountCaught + fishSize;
		say ("amountCaught", "Amount of fish caught: " + amountCaught + " pounds");
		
		if (time > 0){
			switchToAgain();
		}
		else
		{
			
			highScores();
		}
	}
	else if (caughtMeter < 5)
	{
		say("story", "The line goes slack.");
		
		if (time > 0){
			switchToAgain();
		}
		else
		{
			
			highScores();
		}
	}
	else
	{
		if (time < 1)
		{
				say ("story", "You ran out of time. :(");
		}
	}
}
function takesTime (minutes){
	if (time > 0){
	time = time - minutes;
	say("timeLeft", "Time left:<br /> " + time + " minutes");
	}
	else
	{
	highScores();
	}
}
function highScores(){//getting called here twice occasionally. First 0, then 11. When caught at last moment. Does this when it's 0. Or always.
	
	say("story", "You caught " + amountCaught + " pounds of fish.");

	if (typeof(Storage) !== "undefined"){//this needs to be carried around to others if this website goes up!

		//compare amountCaught with numbers in there. Moves everything down from the place, then sticks it in there. 
		var item;
		
		for (var b = 0; b < 10; b++){
			
			var fromFile = localStorage.getItem("high" + b);
			//parse fromFile out
			var scoreGross = fromFile.slice(0, 3);
			//takes the -s off the end.
			var slicePlace = scoreGross.indexOf("x");
			score = scoreGross.slice(0, slicePlace);
				
			if (amountCaught > score)
			{
				position = b;
				switchToAskForName();
				break;	
			}
			if (b === 9)
			{
				switchToRestart();
			}
				
		}
	}
	else
	{
		say("story", "Storage isn't available.");
	}
	
	//can I automatically move the page to the high scores, using the html trick?
}
function showHighScores(){
	var item;
	var fL;
	//k. All of this needs to be changed to split the string into the score and the name, then written to the scoreboard.
	for (var a = 0; a < 10; a++){
		//do everything in here, set the final value to a string in 'item'.
		var fromFile = localStorage.getItem("high" + a);
		//parse fromFile out
		var scoreGross = fromFile.slice(0, 3);
		//takes the -s off the end.
		var slicePlace = scoreGross.indexOf("x");
		score = scoreGross.slice(0, slicePlace);
				
		//set the rest of fromFile into name.
		fL = fromFile.length;
		var name = fromFile.slice(3, fL);
		 
		item = name + ": " + score + " pounds";
		
		//write the name to the scoreboard
		say ("high" + a, item);
		//can I highlight the score that was just put in?
	}
}
function setHighScores(){
	
	localStorage.setItem("alreadySetUp", true);
	
	var temp;
	for (var b = 0; b < 10; b++)
	{
		temp = 9 - b;
		localStorage.setItem("high" + b, temp + "xxMightyMan");
	}
window.alert(localStorage.getItem("high6"));
}
function submitName(){

  var name = document.getElementById("submitForm").elements[0].value; 
  //put their name and score into a string to be written.
  var numInput = amountCaught.toString();
  var numLength = numInput.length;
 

  while (numLength < 3){
	numInput = numInput + "x";
	numLength++;
  }
  //numlength should be 3 at this point. Good :)  
  
  //concatenate the strings
  var writeMe = numInput.concat(name);
  
  //write writeMe to local storage in the right position! This is one of the last issues, I think. :)
	for (var c = 9; c > position; c--)
	{
		item = localStorage.getItem("high" + (c -1));
		localStorage.setItem("high" + c, item);
	}
	
	localStorage.setItem("high" + position, writeMe);
	showHighScores();
	switchToRestart();
}