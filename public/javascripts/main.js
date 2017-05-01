$(document).ready(function() {

    document.getElementById("startCalibrate").addEventListener('click',calibrateStart,false);
    document.getElementById("startExperiment").addEventListener('click',experimentStart,false);
    document.getElementById("myVideo").addEventListener('ended',mediaEndHandler,false);

    //Unguided calibration
    // webgazer.setRegression('ridge') /* currently must set regression and tracker */
    //     .setTracker('clmtrackr')
    //     .begin()
    //     .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

    var csvData = [[$(window).width(),$(window).height(),0]];


    function download_csv() {
        var csv = 'X,Y,Time\n';
        csvData.forEach(function(row) {
                var args = Array.prototype.slice.call(row);
                csv += args.join(',');
                csv += "\n";
        });

        console.log("Creating csv");
        console.log(csv);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'ExperimentData.csv';
        hiddenElement.click();
    }

    function calibrateStart(){
      myVideo = document.getElementById("myVideo");
      //Lock the start calibration button, set the source of the video tag to the calibration video, play calibration video
      $("#startCalibrate").addClass("button-clicked");
      $("#myVideo").removeClass("hidden");
      $("#myVideo").addClass("calibration-video-start");
      myVideo.src = "resources/calibration.ogv"
      myVideo.type = "video/ogg"
      myVideo.load();
      myVideo.play();

      //Start the webgazer eye tracker and start calibrating
      webgazer.setRegression('ridge') /* currently must set regression and tracker */
          .setTracker('clmtrackr')
          .begin()
          //.showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */
    }

    function experimentStart(){
      myVideo = document.getElementById("myVideo");

      //Lock the start experiment button, set the source of the video tag to the experiment video, play calibration video
      $("#startExperiment").addClass("button-clicked");
      $("#myVideo").removeClass("hidden");
      $("#myVideo").addClass("calibration-video-start");
      myVideo.src = "resources/experiment.ogv"
      myVideo.type = "video/ogg"
      myVideo.load();
      myVideo.play();

      //Start taking in data points from the webcam eye tracker and outputing them into a csv
      webgazer.setGazeListener(function(data, clock) {
          if(data){
            csvData.push([data.x,data.y,clock]);
          }

          //If the webcam eye tracker does not have a prediction for where the eyes are insert 0,0,0
          else{
            csvData.push([0,0,0]);
          }
      });
    }

    function mediaEndHandler(e) {
      myVideo = document.getElementById("myVideo");

      //Determine the source of the video tag when it ends
      source = myVideo.src.split("/");
      source = source[source.length-1];

      //If it was the calibration video start the experiment process
      if(source == "calibration.ogv"){
        $("#startCalibrate").addClass("hidden");
        $("#myVideo").removeClass("calibration-video-start");
        $("#myVideo").addClass("hidden");
        $("#startExperiment").removeClass("hidden");
      }
      else{
        webgazer.pause();
        download_csv();
      }
    }

});
