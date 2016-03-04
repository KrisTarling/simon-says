// annotations are as much for myself as anybody else. I'm still learning - maybe somebody else will learn from my madness, also.

var b = ["#green", "#red", "#blue", "#yellow"]; // our button IDs

$("[name='switch']").bootstrapSwitch(); // on-off switch using http://bootstrap-switch.org
$('input[name="switch"]').on('switchChange.bootstrapSwitch', function(event, state) {
  p = state; // power is a global variable linked to power button state
  if (p) { // if power turned on
    $("#number").addClass("on").html("---"); // turn on display and add dashes
    uSay = sSays = []; // empty user/Simon arrays
    str = 0; // strict mode is global and off by default
  } else if (!p) { // if power turned off
    $("#number").html("888"); // display LCD off effect
    t = 0; // prevent user from playing when off
    $("#strictlight,#number").removeClass("on"); // turn display & strict light off
  }
});

$("#strict").click(function() { //strict on/off
  if (str) { // if strict is on
    str = 0; // turn it off
    $("#strictlight").removeClass("on"); // turn off strict light
  } else if (p) { // if strict is off but power is on
    str = 1; // turn it on
    $("#strictlight").addClass("on"); // turn on strict light
  }
});


// our sounds, added using Buzz.js -  are rough approximations of the originals
// sounds were made by me using http://www.bfxr.net/
// most mobile devices will only load sounds when user presses button - simon can't play them until the user has
var green = new buzz.sound("http://kristarling.com/publicassets/A.wav");
var red = new buzz.sound("http://kristarling.com/publicassets/C.wav");
var blue = new buzz.sound("http://kristarling.com/publicassets/D.wav");
var yellow = new buzz.sound("http://kristarling.com/publicassets/E.wav");
var failSound = new buzz.sound("http://kristarling.com/publicassets/fail.wav");



clrLight = function() { // clear all lights/sounds
  $(b.join(", ")).removeClass("active"); // turn off all button lights
  buzz.all().stop(); // stop all sounds
};

var simonTurn = function() { //simon's turn
  t = 0; // block user from pressing buttons
  clrLight(); // stop any active lights/sounds
  uSay = []; // clear user presses

  if (nR || sSays.length === 0) { // add random button to sequence
    sSays.push(Math.floor((Math.random() * 4))); // generate random number and add to Simon's sequence
  }
  var gS = 450; //set game speed
  var gSx = 1.8; //speed multiplier for game

  if (sSays.length > 9) { //very fast when user reaches level 10
    gSx = 1.15; // * 500
    $("#number").html(sSays.length); // put number on display
  } else if (sSays.length < 10)
    $("#number").html("0" + sSays.length); // add a 0 in front on display
  if (sSays.length > 4) { //faster when user reaches level 5
    gSx = 1.25; // * 500
  }

  setTimeout(function() { // when Simon's turn is over
    t = 1; // let the user play
  }, sSays.length * (gSx * gS) - 50); // calculated by length of Simon's sequence times the current game speed - minus a little in case user is eager

  for (var i in sSays) { // for length of Simon's sequence
    sPlay(i); // play a note
  }

  function sPlay(i) { // Simon plays a note in the tune
    setTimeout(function() { // put some time Between Simon's notes*

      if (p) { // if power is still on

        $(b[sSays[i]]).addClass("active"); // light up the relevant button
        var color = (b[sSays[i]].substring(1)); // get the color of button
        eval(color).play(); // play the note for that color button
        setTimeout(clrLight, gS); // then stop playing note after delay

      }
    }, i * (gSx * gS)); // time between notes
   };
  };

$("#start").click(function() { // Start a game
  clrLight(); // turn off button light/sounds
  uSay = sSays = []; // empty user/Simon arrays
  nR = 1; // start a new round

  if (p) { // but only if the game is turned on
    blink(); // time 800
    setTimeout(simonTurn, 1000); // Simon starts the game
  }
});

$(b.join(", ")).mousedown(function() { // when user presses button
  if (t && p) { //only work if the power is on & users turn
    uSay.push(b.indexOf("#" + this.id)); // log pressed button to uSay array
    $(this).addClass("active"); // light up pressed button
    var place = uSay.length; // store user array length for use below
    if (uSay[place - 1]^sSays[place - 1]) { // if mistake
      $("#number").html("!!!"); // display exclamation marks
      failSound.play(); // play fail sound
      blink(); // blink the display
      t = nR = 0; // end user turn & do not continue to next round
      setTimeout(clrLight, 1000); // clear buttons
      if (str) { //if mistake while strict mode is enabled
        uSay = sSays = []; // empty user/Simon arrays
      }

      setTimeout(simonTurn, 2800); // longer delay on failure

    } else if (place === 20) { // if user completes level 20
      $(b.join(", ")).addClass("active"); // turn on all the button lights
      $("#number").html("WIN"); //write 'WIN' on display
      blink(); //blink the display
      setTimeout(blink, 800); // blink it again
      sSays = []; // clear tune ready to start again
      t = 0; // end user turn
      setTimeout(simonTurn, 3800); // extra long delay so user can bask in glory

    } else { // correct
      eval(this.id).play(); // play the sound of button

      if (place === sSays.length) { // & if the sequence is complete
        t = 0; // end user turn
        blink(); // blink display to let user know they've got it right
        setTimeout(clrLight, 1000); // clear buttons
        nR = 1; // proceed to next level
        setTimeout(simonTurn, 1500); // after short delay
      }
    }
  }
}).mouseup(function() { //stop sound/light when user lets go of button
  if (t) { // but don't interrupt Simon
    setTimeout(clrLight, 300); //add short delay to simulate real button
  }
});

blink = function() { //blink display for start/win/lose events
  var b = 200; // display blink speed
  $("#number").fadeOut(b).fadeIn(b).fadeOut(b).fadeIn(b); // display off on off on
};