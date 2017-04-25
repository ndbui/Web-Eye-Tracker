$(document).ready(function() {

    // $("#startCalibrate").click(function(){
    //   myVideo = document.getElementById("myVideo");
    //   $("#startCalibrate").addClass("button-clicked");
    //   $("#myVideo").removeClass("hidden");
    //   $("#myVideo").addClass("calibration-video-start");
    //   myVideo.src = "resources/calibration.ogv"
    //   myVideo.type = "video/ogg"
    //   myVideo.load();
    //   myVideo.play();
    //   // webgazer.setRegression('ridge') /* currently must set regression and tracker */
    //   //     .setTracker('clmtrackr')
    //   //     // .setGazeListener(function(data, clock) {
    //   //     //     console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
    //   //     //     console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
    //   //     // })
    //   //     .begin()
    //   //     .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */
    // });

    document.getElementById("startCalibrate").addEventListener('click',calibrateStart,false);
    document.getElementById("myVideo").addEventListener('ended',mediaEndHandler,false);

    function calibrateStart(){
      myVideo = document.getElementById("myVideo");
      $("#startCalibrate").addClass("button-clicked");
      $("#myVideo").removeClass("hidden");
      $("#myVideo").addClass("calibration-video-start");
      myVideo.src = "resources/calibration.ogv"
      myVideo.type = "video/ogg"
      myVideo.load();
      myVideo.play();
      // webgazer.setRegression('ridge') /* currently must set regression and tracker */
      //     .setTracker('clmtrackr')
      //     // .setGazeListener(function(data, clock) {
      //     //     console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
      //     //     console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
      //     // })
      //     .begin()
      //     .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */
    }

    function mediaEndHandler(e) {
      myVideo = document.getElementById("myVideo");
      source = myVideo.src.split("/");
      source = source[source.length-1];
      if(source == "calibration.ogv"){
        alert("cali end")
        $("#startCalibrate").addClass("hidden");
        $("#myVideo").removeClass("calibration-video-start");
        $("#myVideo").addClass("hidden");
        $("#startExperiment").removeClass("hidden");
      }
      else{
        alert("Done!")
      }
    }

});
