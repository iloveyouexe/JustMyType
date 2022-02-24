$(document).ready(function () {
  // a lot of coffee, a lot of google.
  let $sentences = [
    "ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate",
  ];
  let $sentenceNumber = 0;
  let $sentence = $sentences[$sentenceNumber];
  let $charNumber = 0;
  let $letter = $sentence.substring($charNumber, $charNumber + 1);
  let $mistakes = 0;
  let $isTimeCounting = false;
  let $startDate;
  let $startTime;
  let $highlight = $("#yellow-block");
  let $highlightPosition = 0;
  $(document).one("keypress", function () {
    startTime = Date.now();
  });

  $("#keyboard-upper-container").toggle();
  // functions for upper/lower case
  $(document).keydown(function (e) {
    if (e.key == "Shift") {
      $("#keyboard-upper-container").show();
      $("#keyboard-lower-container").hide();
    }
  });
  $(document).keyup(function (e) {
    if (e.key == "Shift") {
      $("#keyboard-upper-container").hide();
      $("#keyboard-lower-container").show();
    }
  });

  // function for highlighting keypress
  $(document).keydown(function (e) {
    $("#" + e.key.charCodeAt(0)).css("background-color", "#0dd");
  });
  $(document).keyup(function (e) {
    $("#" + e.key.charCodeAt(0)).css("background-color", "#f5f5f5");
  });

  $("#sentence").text($sentence);

  $("#target-letter").text($letter);

  $(document).keypress(function (e) {
    if ($isTimeCounting === false) {
      $startDate = new Date();
      $startTime = $startDate.getTime();
      $isTimeCounting = true;
    }

    if (e.which == $sentences[$sentenceNumber].charCodeAt($charNumber)) {
      let $right = $("<span>✔</span>");
      $($right).addClass("green");
      $($right).appendTo("#feedback");

      $highlightPosition += 16;
      $($highlight).css("margin-left", $highlightPosition + "px");

      $charNumber++;
      $letter = $sentence.substring($charNumber, $charNumber + 1);
      $("#target-letter").text($letter);

      if ($charNumber === $sentence.length) {
        $sentenceNumber++;

        if ($sentenceNumber === $sentences.length) {
          let $endDate = new Date();
          let $endTime = $endDate.getTime();
          let $minutes = ($endTime - $startTime) / 60000;

          $wpm = Math.round(54 / $minutes - 2 * $mistakes);

          var r = confirm(
            "You type " +
              $wpm +
              " words per minute. Would you like to try again?"
          );

          if (r == true) {
            location.reload();
          }
        } else {
          $sentence = $sentences[$sentenceNumber];
          $("#sentence").text($sentence);

          $charNumber = 0;
          $letter = $sentence.substring($charNumber, $charNumber + 1);
          $("#target-letter").text($letter);

          $highlightPosition = 0;
          $($highlight).css("margin-left", $highlightPosition + "px");
          $("#feedback").text("");
        }
      }
    } else {
      let $wrong = $("<span>✗</span>");
      $($wrong).addClass("red");
      $($wrong).appendTo("#feedback");

      $mistakes++;
    }
  });
});
