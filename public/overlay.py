from moviepy.editor import *

backclip = VideoFileClip('resources/experiment.mp4')
forwardclip = VideoFileClip('Results/20170501-230427/timelapse.mp4').set_opacity(0.5)
finalclip = CompositeVideoClip([backclip, forwardclip])
finalclip.write_videofile("composite.mp4", codec = "mpeg4", audio = False, fps = 30)
