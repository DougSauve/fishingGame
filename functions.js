function pic1 () {
  
    document.getElementById("mugshots").src = "./IMG_1096.jpg";
	document.getElementById("mugshots").style.display = "inline";
   }
   function pic2 () {
  
    document.getElementById("mugshots").src = "./IMG_1008.jpg";
	document.getElementById("mugshots").style.display = "block";
	document.getElementById("words").innerHTML = "<h1>Farter sighted!</h1>";
   }
   function disappear ()
   {
    document.getElementById("mugshots").style.display = "none";
   }