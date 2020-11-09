function play(e) {
  let audio = document.getElementById(e);
  if (audio.paused) {
    audio.play();
  } else {
    audio.currentTime = 0;
  }    
}

$(".power").click( () => {
  play('power-sound');
  $(".power").toggleClass('on');
  $("#display").html('');
  $("#QQ").toggleClass('drum-pad-blue');
  $("#WW").toggleClass('drum-pad-blue');
  $("#EE").toggleClass('drum-pad-blue');
  $("#AA").toggleClass('drum-pad-blue');
  $("#SS").toggleClass('drum-pad-orange');
  $("#DD").toggleClass('drum-pad-green');
  $("#ZZ").toggleClass('drum-pad-purple');
  $("#XX").toggleClass('drum-pad-purple');
  $("#CC").toggleClass('drum-pad-green');
});

$(".drum-pad").click(function(e) {
  if ($(".power").hasClass('on')) {
    switch (e.target.id) {
      case 'QQ':
        $("#display").html(e.target.value);
        play('Q');
        break;
      case 'WW':
        $("#display").html(e.target.value);
        play('W');
        break;
      case 'EE':
        $("#display").html(e.target.value);
        play('E');
        break;
      case 'AA':
        $("#display").html(e.target.value);
        play('A');
        break;
      case 'SS':
        $("#display").html(e.target.value);
        play('S');
        break;
      case 'DD':
        $("#display").html(e.target.value);
        play('D');
        break;
      case 'ZZ':
        $("#display").html(e.target.value);
        play('Z');
        break;
      case 'XX':
        $("#display").html(e.target.value);
        play('X');
        break;
      case 'CC':
        $("#display").html(e.target.value);
        play('C');
        break;
      default:
        $("#display").html('No audio');
        break;
    }
  }
});

$("body").keypress(function(e){
  if ($(".power").hasClass('on')) {
    switch (e.key) {
      case 'q':
      case 'Q':
        $("#QQ").click();
        $("#QQ").addClass('drum-pad-hover-blue');
        break;
      case 'w':
      case 'W':
        $("#WW").click();
        $("#WW").addClass('drum-pad-hover-blue');
        break;
      case 'e':
      case 'E':
        $("#EE").click();
        $("#EE").addClass('drum-pad-hover-blue');
        break;
      case 'a':
      case 'A':
        $("#AA").click();
        $("#AA").addClass('drum-pad-hover-blue');
        break;
      case 's':
      case 'S':
        $("#SS").click();
        $("#SS").addClass('drum-pad-hover-orange');
        break;
      case 'd':
      case 'D':
        $("#DD").click();
        $("#DD").addClass('drum-pad-hover-green');
        break;
      case 'z':
      case 'Z':
        $("#ZZ").click();
        $("#ZZ").addClass('drum-pad-hover-purple');
        break;
      case 'x':
      case 'X':
        $("#XX").click();
        $("#XX").addClass('drum-pad-hover-purple');
        break;
      case 'c':
      case 'C':
        $("#CC").click();
        $("#CC").addClass('drum-pad-hover-green');
        break;
      default:
        $("#display").html('No audio');
        break;
    }
  }
});

$("body").keyup(function(e){
  if ($(".power").hasClass('on')) {
      switch (e.key) {
       case 'q':
       case 'Q':
        $("#QQ").removeClass('drum-pad-hover-blue');
        break;
      case 'w':
      case 'W':
        $("#WW").removeClass('drum-pad-hover-blue');
        break;
      case 'e':
      case 'E':
        $("#EE").removeClass('drum-pad-hover-blue');
        break;
      case 'a':
      case 'A':
        $("#AA").removeClass('drum-pad-hover-blue');
        break;
      case 's':
      case 'S':
        $("#SS").removeClass('drum-pad-hover-orange');
        break;
      case 'd':
      case 'D':
        $("#DD").removeClass('drum-pad-hover-green');
        break;
      case 'z':
      case 'Z':
        $("#ZZ").removeClass('drum-pad-hover-purple');
        break;
      case 'x':
      case 'X':
        $("#XX").removeClass('drum-pad-hover-purple');
        break;
      case 'c':
      case 'C':
        $("#CC").removeClass('drum-pad-hover-green');
        break;
      default:
        $("#display").html('No audio');
    }
  }
});