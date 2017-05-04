import heatmap
import csv
import os
import time
from moviepy.editor import *

#Generate directory path
timestr = time.strftime("%Y%m%d-%H%M%S")
folderpath = "./Results/" + str(timestr)
if not os.path.exists(folderpath):
    os.makedirs(folderpath)
if not os.path.exists(folderpath+"/imgs"):
    os.makedirs(folderpath+"/imgs")
print "Saving heatmaps to " + folderpath

hm = heatmap.Heatmap()
pts = []
mod = 0
counter = 0
imgno = 0
windowWidth = 1600;
windowHeight = 900;

#Generate heatmaps over time intervals of a second
with open('GJ.csv', 'r') as csvfile:
    freader = csv.reader(csvfile)
    r1 = next(freader)
    r2 = next(freader)
    mysize = [windowWidth,windowHeight]
    mysize = map(int, mysize)
    mysize = tuple(mysize)
    for row in freader:
        counter += 1
        xs = [0, mysize[0]]
        xs.append(int (row[0]))
        xs.sort()
        ys = [0, mysize[1]]
        ys.append(int (row[1]))
        ys.sort()
        #print xs[1], mysize[1]-ys[1]
        pts.append([xs[1],mysize[1]-ys[1]])
        if counter%30==0: #50 for interval of a second, 25 for half second
            imgno += 1
            img = hm.heatmap(pts, size = mysize, area = ((0,0), mysize), dotsize=75) #scale dotsize up?
            img.save(folderpath+ "/imgs/hm" + str(imgno) + ".png")
            pts = []

if len(pts) > 0:
    imgno += 1
    img = hm.heatmap(pts, size = mysize, area = ((0,0), mysize), dotsize=75)
    img.save(folderpath + "/imgs/hm" + str(imgno) + ".png")

#Generate timelapse video
print "Making timelapse..."
image_list = []
for x in xrange(imgno):
    image_list.append(folderpath + "/imgs/hm" + str(x+1)+".png")
my_clip = ImageSequenceClip(image_list, fps=2)
my_clip.write_videofile(folderpath+"/timelapse.mp4", codec = "mpeg4", audio = False)

#Making the overlay
timelapsePath=folderpath+"/timelapse.mp4"
print "Making overlay..."
backclip = VideoFileClip('resources/experiment.mp4')
forwardclip = VideoFileClip(timelapsePath).set_opacity(0.5)
finalclip = CompositeVideoClip([backclip, forwardclip])
finalclip.write_videofile(folderpath+"/composite.mp4", codec = "mpeg4", audio = False, fps = 30)
