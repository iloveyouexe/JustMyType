$(document).ready(function () {
  // sentence and sentence accessories
  let sentenceArray = [
    "ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate",
  ];
  let sentenceIndex = 0;
  let letterIndex = 0;

  $("#sentence").append(sentenceArray);
  $("#target-letter").text(sentenceArray[sentenceIndex][letterIndex]);

  // keyboard things

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
});
