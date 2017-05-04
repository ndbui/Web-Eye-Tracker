# Web-Eye-Tracker
Experiment to test the capabilities of a webcam eye-tracker using WebGazer.js by generating a heatmap of the users gaze coordinates while they watch a video.

The python programs used were run on Anaconda 2.7

#Running the experiment:

1.) Install Node

2.) Run "pip install bottle"

3.) Navigate into the Web-Eye-Tracker folder and run "npm install express"

4.) Navigate into the public folder

5.) Run "python timelapse_server.py" to start the bottle server

6.) Run "npm start". (You may need to do this in a separate terminal)

7.) Visit localhost:3000 and follow the instructions on the webpage

8.) A folder will be created in the Results folder containing all of the heatmap images as well as the heatmaps in mp4 format under timelapse.mp4.

9.) You can uncomment out the code at the bottom of maketimelapse_server.py in order to automatically create an overlay of the heatmaps over the experiment video once the heatmaps have been created but the process takes a bit of time to complete.

