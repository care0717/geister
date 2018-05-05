$("#whatText").css("display", "none");
$("#what").on("click", function() {
  $("#whatText").toggle("slow");
  $(this).toggleClass("active");
});

$("#victoryConditionText").css("display", "none");
$("#victoryCondition").on("click", function() {
  $("#victoryConditionText").toggle("slow");
  $(this).toggleClass("active");
});

$("#howToText").css("display", "none");
$("#howToToggle").on("click", function() {
  $("#howToText").toggle("slow");
  $(this).toggleClass("active");
});
