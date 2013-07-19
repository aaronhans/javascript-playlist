javascript-playlist
===================

Collaborate to create playlist from youtube videos


## /client

A Chrome plugin frontend where users can view the current playlist, search for new stuff to add, submit socket request to add it

## /playback

A separate simple webpage which shows the playlist as well and plays the whole thing back, runs from nodeserver.js in root, separated from /client because youtube vids need large screen area to play back and used popcorn to move to next track when one was finished.

## /server

A node socket server which receives playlist activity and sends it out to all clients
