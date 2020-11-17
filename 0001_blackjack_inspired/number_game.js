/*jslint node: true*/
/*eslint no-console: ["error", { allow: ["log"] }] */
/*global document*/
"use strict";

var numCardsPulled = 0;
var todo_time_dur = 15; // unit is in seconds and default is 15 seconds

var player = {
        score: 0,
        money: 0,
        bet_amount: 0,
        first_number: 0
    };
var dealer = {
    score: 0
};

var audio = new Audio("ring.wav");

document.getElementById("player-money").innerHTML = "Your Points: " + player.money;
document.getElementById("bet").innerHTML = "Bet: " + player.bet_amount;
document.getElementById("bet-button").disabled = true;
document.getElementById("hit-button").disabled = true;
document.getElementById("double-button").disabled = true;
document.getElementById("stand-button").disabled = true;
document.getElementById("reward-button").disabled = true;

function todo_timer(option) {
  if (option == 1){
    var bet_empty = true;
    while (bet_empty == true){
      player.bet_amount = prompt("Enter your bet.");
      if (player.bet_amount > 0){
        bet_empty = false;
      }
      else{
        alert("Please enter your bet (natural number).")
        bet_empty = true;
      }
    }
    player.money = player.money - player.bet_amount;
    document.getElementById("player-money").innerHTML = "Your Points: " + player.money;
    document.getElementById("bet").innerHTML = "Bet: " + player.bet_amount;
  }
  else {
    var todo_entered = false;
    while (todo_entered == false){
        var todo_initial = prompt("What is your task?");
        if (todo_initial == null || todo_initial == ""){
          todo_entered = false;
          alert("Enter your task!");
        }
        else{
          todo_entered = true;
        }
    }
    setTimeout(function(){
      audio.play();
      alert("ToDo Timer is done.");

      if (option == 2) {
        player.score = player.score + Math.floor(Math.random()*10+1);
        document.getElementById("player-score").innerHTML = "Player Score: " + player.score;

        if (player.first_number == 0){
          document.getElementById("bet-button").disabled = true;
          document.getElementById("hit-button").disabled = false;
          document.getElementById("double-button").disabled = false;
          document.getElementById("stand-button").disabled = false;
          document.getElementById("reward-button").disabled = true;
          document.getElementById("message-board").innerHTML = "";
          document.getElementById("win_loss").innerHTML = "";

          player.first_number = 1;
        }
        else {
          document.getElementById("bet-button").disabled = true;
          document.getElementById("hit-button").disabled = false;
          document.getElementById("double-button").disabled = true;
          document.getElementById("stand-button").disabled = false;
          document.getElementById("reward-button").disabled = true;
          document.getElementById("message-board").innerHTML = "";
          document.getElementById("win_loss").innerHTML = "";

        }
        if (player.score > 10) {
            endGame();
        }
      }
      else if (option == 3){
        player.money = Number(player.money) - Number(player.bet_amount);
        player.bet_amount = 2*Number(player.bet_amount);
        player.score = player.score + Math.floor(Math.random()*10+1);
        document.getElementById("player-score").innerHTML = "Player Score: " + player.score;
        document.getElementById("player-money").innerHTML = "Your Points: " + player.money;
        document.getElementById("bet").innerHTML = "Bet: " + player.bet_amount;

        document.getElementById("bet-button").disabled = true;
        document.getElementById("hit-button").disabled = true;
        document.getElementById("double-button").disabled = true;
        document.getElementById("stand-button").disabled = false;
        document.getElementById("reward-button").disabled = true;
        document.getElementById("message-board").innerHTML = "";
        document.getElementById("win_loss").innerHTML = "";

        if (player.score > 10) {
            endGame();
        }
      }
      else if (option == 4){
        while (dealer.score < 7) {
          dealerDraw();
        }
        endGame();
      }
    }, 1000*todo_time_dur); // todo_time_dur in seconds
  }
}

function change_timer_dur() {
  var try_complete = false;
  while (try_complete == false){
    todo_time_dur = prompt("Enter ToDo timer duration in seconds (it should longer than 15 seconds).");
    try_complete = true;
    if (todo_time_dur < 15){
        alert("Enter ToDo timer duration greater or equal to 15 seconds.");
        try_complete = false;
    }
    else {
      document.getElementById("change-time-button").value = 'Adjust Timer (' + todo_time_dur + ' sec)'
    }
  }
}

function reward_timer() {
  player.money = Number(player.money) - 10;
  document.getElementById("player-money").innerHTML = "Your Points: " + player.money;
  document.getElementById("bet-button").disabled = true;
  document.getElementById("hit-button").disabled = true;
  document.getElementById("double-button").disabled = true;
  document.getElementById("stand-button").disabled = true;
  document.getElementById("reward-button").disabled = true;
  document.getElementById("message-board").innerHTML = "";
  document.getElementById("win_loss").innerHTML = "";

  alert("Start Reward");

  setTimeout(function(){
    audio.play();

    alert("Reward Timer is done")

    document.getElementById("bet-button").disabled = false;
    document.getElementById("hit-button").disabled = true;
    document.getElementById("double-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    document.getElementById("reward-button").disabled = false;

  }, 1000*60); // Timer = 60 seconds
}

function resetGame() {
    player.score = 0;
    dealer.score = 0;
    player.bet_amount = 0;
    player.first_number = 0;

    document.getElementById("bet").innerHTML = "Bet: " + player.bet_amount;
    document.getElementById("player-score").innerHTML = "Player Score: " + player.score;
    document.getElementById("dealer-score").innerHTML = "Dealer Score: " + dealer.score;

    document.getElementById("bet-button").disabled = false;
    document.getElementById("hit-button").disabled = true;
    document.getElementById("double-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    document.getElementById("reward-button").disabled = false;
}

function endGame() {
    if (player.score > dealer.score && player.score > 0 && player.score < 11) {
        player.money = Number(player.money) + Number(player.bet_amount) * 2;
        document.getElementById("message-board").innerHTML = "The Player wins. (P:" + player.score + " > D:" + dealer.score + ")";
        document.getElementById("player-money").innerHTML = "Your Points: " + player.money;
        document.getElementById("win_loss").innerHTML = "You won " + Number(player.bet_amount) * 2;
        resetGame();
    }
    if (player.score < dealer.score && player.score > 0 && dealer.score < 11 && dealer.score > 6) {
        document.getElementById("message-board").innerHTML = "You lost. Dealer had the higher score. (P:" + player.score + " < D:" + dealer.score + ")";
        document.getElementById("player-money").innerHTML = "Your Points: " + player.money;
        document.getElementById("win_loss").innerHTML = "You lost your bet = " + player.bet_amount;
        resetGame();
    }
    if (player.score == dealer.score && player.score > 0 && dealer.score < 11 && dealer.score > 6) {
        document.getElementById("message-board").innerHTML = "Draw. (P:" + player.score + " == D:" + dealer.score + ")";
        player.money = Number(player.money) + Number(player.bet_amount);
        document.getElementById("player-money").innerHTML = "Your Points: " + player.money;
        document.getElementById("win_loss").innerHTML = "You didn't win points";
        resetGame();
    }
    if (player.score > 10) {
        document.getElementById("message-board").innerHTML = "Player Busted. (P:" + player.score + ")";
        document.getElementById("player-money").innerHTML = "Your Points: " + player.money;
        document.getElementById("win_loss").innerHTML = "You lost your bet = " + player.bet_amount;
        resetGame();
    }
    if (dealer.score > 10) {
        document.getElementById("message-board").innerHTML = "Dealer Busted. (D:" + dealer.score + ")";
        player.money = Number(player.money) + Number(player.bet_amount) * 2;
        document.getElementById("player-money").innerHTML = "Your Points: " + player.money;
        document.getElementById("win_loss").innerHTML = "You won " + Number(player.bet_amount) * 2;
        resetGame();
    }
    if (player.money === 0 || player.money < 0) {
        alert("You have no points!")
        document.getElementById("new-game-button").disabled = false;
        document.getElementById("bet-button").disabled = true;
        document.getElementById("hit-button").disabled = true;
        document.getElementById("double-button").disabled = true;
        document.getElementById("stand-button").disabled = true;
        document.getElementById("reward-button").disabled = true;
    }
}

function dealerDraw() {
    dealer.score = dealer.score + Math.floor(Math.random()*10+1);
    document.getElementById("dealer-score").innerHTML = "Dealer Score: " + dealer.score;
}

function newGame() {
    var entered = false;
    while (entered == false){
      var reward_minute = prompt("Enter reward minute(s) to convert to points.");
      entered = true;
      if (reward_minute < 3){
        alert("Enter more than 3 reward minutes")
        entered = false;
      }
      else{
        var points_to_start = Number(reward_minute)*10*0.75; // converted with 1:10 then deducted 25%
      }
    }
    todo_time_dur = prompt("Enter ToDo timer duration in seconds (it should longer than 15 seconds).");
    while (todo_time_dur < 15){
      alert("Enter ToDo timer duration greater or equal to 15 seconds.");
      todo_time_dur = prompt("Enter ToDo timer duration in seconds (it should longer than 15 seconds).");
    }
    player.money = points_to_start;
    document.getElementById("player-money").innerHTML = "Your Points: " + player.money;
    document.getElementById("new-game-button").disabled = true;
    document.getElementById("bet-button").disabled = false;
    document.getElementById("reward-button").disabled = false;
    document.getElementById("message-board").innerHTML = "";
    document.getElementById("win_loss").innerHTML = "";
    endGame();
}

function bet_todo() {
  todo_timer(1);
  document.getElementById("bet-button").disabled = true;
  document.getElementById("hit-button").disabled = false;
  document.getElementById("double-button").disabled = true;
  document.getElementById("stand-button").disabled = true;
  document.getElementById("reward-button").disabled = true;
  document.getElementById("message-board").innerHTML = "";
  document.getElementById("win_loss").innerHTML = "";
}

function hit() {
    todo_timer(2);
    document.getElementById("bet-button").disabled = true;
    document.getElementById("hit-button").disabled = true;
    document.getElementById("double-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    document.getElementById("reward-button").disabled = true;
    document.getElementById("message-board").innerHTML = "";
    document.getElementById("win_loss").innerHTML = "";
}

function double() {
    todo_timer(3);
    document.getElementById("bet-button").disabled = true;
    document.getElementById("hit-button").disabled = true;
    document.getElementById("double-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    document.getElementById("reward-button").disabled = true;
    document.getElementById("message-board").innerHTML = "";
    document.getElementById("win_loss").innerHTML = "";
}

function stand() {
    todo_timer(4);
    document.getElementById("bet-button").disabled = true;
    document.getElementById("hit-button").disabled = true;
    document.getElementById("double-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    document.getElementById("reward-button").disabled = true;
    document.getElementById("message-board").innerHTML = "";
    document.getElementById("win_loss").innerHTML = "";
}
