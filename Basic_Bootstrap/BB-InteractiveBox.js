$("#button1").on("click", function() {
	$("#box").animate({height:"+=35px", width:"+=35px"}, "fast");
})


$("#button2").on("click", function() {
	$("#box").css("background-color", "blue")
})

$("#button4").on("click", function() {
	$("#box").css("background-color", "orange")
})

$("#button5").on("click", function() {
    $("#box").animate({height:"-=35px", width:"-=35px"}, "fast");
})