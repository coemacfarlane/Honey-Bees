// set an elements x,y position
function elmtPos(x, y) {
  this.x = x;
  this.y = y;
}

// get, size, and adjust position for the cursor bee element
var mousePos = new elmtPos(0, 0);
var bee = document.getElementById("bee");
var wings = document.getElementById("boisWings");
var body = document.getElementsByTagName("BODY")[0];
var BEE_SIZE = bee.getBoundingClientRect().width;
bee.style.transform = "translateX(-" + BEE_SIZE / 2 + "px)";

// wait for user to click the bee
// then replace cursor with bee
bee.addEventListener(
  "click",
  function(event) {
    body.style.cursor = "none";
    wings.style.filter = "blur(1px)";
    wings.style.animation = "flutter1 0.02s linear reverse infinite";

    document.addEventListener(
      "mousemove",
      function(event) {
        mousePos.x = event.clientX - BEE_SIZE / 2;
        mousePos.y = event.clientY - BEE_SIZE / 2;

        bee.style.top = mousePos.y + "px";
        bee.style.left = mousePos.x + "px";
      },
      false
    );
  },
  false
);

// get hexagon and header elements
var hex = document.getElementsByClassName("hexagon")[0];
var outline = document.getElementById("hexOutline");
var txt1 = document.getElementsByClassName("txt1");
var txt2 = document.getElementsByClassName("txt2");
outline.addEventListener("click", hexagonInteract, false);

// fade to 2 different colors, honey for first click, grey for second
var fill = true;
var cap = true;
function hexagonInteract() {
  if (fill) {
    console.log(fill + ", " + cap);
    hex.style.animation = "fillCell 2s ease-out 0s 1 normal forwards";
    for (var i = 0; i < txt2.length; i++) {
      var temp = txt2[i];
      console.log(temp);
      temp.style.animation = "fillCell 2s ease-out 0s 1 normal forwards";

      temp = txt1[i];
      console.log(temp);
      temp.style.display = "none";
    }
    fill = false;
  } else if (cap) {
    console.log(fill, cap);
    hex.classList.toggle("cap");
    for (var i = 0; i < txt2.length; i++) {
      var temp = txt2[i];
      console.log(temp);
      temp.style.display = "none";
    }
    var txt3 = document.getElementsByClassName("txt3")[0];
    txt3.style.display = "block";
    txt3.style.animation = "fillCell 2s ease-out 0s 1 normal forwards";
    cap = false;
  }
}

// BEE CHART     BEE CHART     BEE CHART     BEE CHART     BEE CHART     BEE CHART
google.charts.load("current", {
  packages: ["bar"]
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Quarter", "Diseases", "Pesticides", "Other", "Unknown"],
    ["January-March", 7, 8.9, 7.2, 7.4],
    ["April-June", 4.6, 12.3, 7, 4.9],
    ["July-September", 4.8, 10.9, 1.6, 4.9],
    ["October-December", 9.4, 15, 11.1, 7.6]
  ]);

  var options = {
    chart: {
      title: "US Colony Health Stressors",
      subtitle:
        "Percentage Affected Farms with Five or More Colonies by Quarter - 2017"
    },
    backgroundColor: { fill: "transparent" },
    colors: ["#FFE533", "#FFA83D", "#E8692C", "#FF4733"]
  };

  var chart = new google.charts.Bar(
    document.getElementById("columnchart_material")
  );

  chart.draw(data, google.charts.Bar.convertOptions(options));
}
