console.log("loaded boxing");

mySound = new Audio('sound.mp3');
function play_sound(){
  mySound.play();
}

function updateTime(timeLeft){
  document.getElementById('o1').innerHtml=timeLeft;
}

function do_inner(num_more_outer, num_more_inner){
  set_num_rounds(num_more_inner);
  set_current("Boxing");
  console.log("Entering do_inner", num_more_outer, num_more_inner);
  if(! num_more_inner ) { do_long_rest(num_more_outer - 1, num_more_inner); return}
  play_sound();
  set_distance(inner_length);
  setTimeout(function(){
    console.log("invoking callback for do_inner");
    do_short_rest(num_more_outer, num_more_inner - 1)
  }, inner_length * 1000);
}

function do_short_rest(num_more_outer, num_more_inner){
  set_current("Short rest");
  console.log("Entering do_short_rest", num_more_outer, num_more_inner);
  play_sound();
  set_distance(short_rest);
  setTimeout(function() {
    do_inner(num_more_outer, num_more_inner);
  }, short_rest * 1000);
}

function do_long_rest(num_more_outer, num_more_inner){
  set_current("Long rest");
  console.log("Entering do_long_rest", num_more_outer, num_more_inner);
  play_sound();
  set_distance(long_rest * 60); //its in minutes
  setTimeout(function() {
    console.log("invoking do long rest callback", num_more_outer, long_rest);
    do_outer(num_more_outer);
  }, long_rest * 60 * 1000);
}


function do_outer(num_more_outer){
  set_num_cycles(num_more_outer);
  console.log("Entering do_outer", num_more_outer);
  if(! num_more_outer) return;
  do_inner(num_more_outer, num_inner);
}


function display_time(){
  var now = new Date().getTime();
  var distance = get_distance();
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (distance > 1){
    document.getElementById("o1").innerHTML = minutes + "m " + seconds + "s ";
  } else {
    document.getElementById("o1").innerHTML = "You are done!";
  }

  document.getElementById("o2").innerHTML = get_current();
  document.getElementById("ocycles").innerHTML = get_num_cycles();
  document.getElementById("orounds").innerHTML = get_num_rounds();
}

g_distance = NaN;
g_num_cycles = NaN;
g_num_rounds = NaN;
g_current = "loading..";

function set_distance(distance_seconds){
  var now = new Date().getTime();
  g_distance = now + distance_seconds * 1000;
}

function get_distance(){
  var now = new Date().getTime();
  return  g_distance - now;
}

function get_num_rounds(){
  return g_num_rounds;
}

function set_num_rounds(n){
  g_num_rounds = n
}

function get_current(){
  return g_current;
}

function set_current(n){
  g_current = n
}

function get_num_cycles(){
  return g_num_cycles;
}

function set_num_cycles(n){
  g_num_cycles = n
}

num_inner=8;
num_outer=3
inner_length=60;
short_rest=15;
long_rest=3; //minutes

function start(){
  do_outer(num_outer);
  var now = new Date().getTime();
  var x = setInterval(function() {
    var now = new Date().getTime();
    if(get_distance() >  now){
      document.getElementById("o1").innerHTML = "GOOD JOB!";
    }
    display_time(get_distance());
  }, 50)
}
