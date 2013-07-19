/* ajax */
function loadStuff(url, callback) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	    callback(xmlhttp.responseText);
	  }
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

/* youtube api */
var youTubeSearchPrefix = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=';
var youTubeSearchSuffix = '&key=AIzaSyAFu7KxMa6lq-9JXaVc8skN_a50Hd9cY7o&maxResults=20';

/* search for videos */
document.querySelector('.searchForm').addEventListener('submit', function(event) {
	event.preventDefault();
	var youTubeSearchUrl = youTubeSearchPrefix + encodeURIComponent(document.querySelector('#searchQuery').value) + youTubeSearchSuffix;
	loadStuff(youTubeSearchUrl, function(responseText) {
		/* update search results */
		html = new EJS({url: 'templates/youtube.ejs'}).render(JSON.parse(responseText))
    document.querySelector('.searchResults').innerHTML = html;

    /* add videos to shared playlist on click */
    var searchResults = document.querySelectorAll('.searchResultThumb');
    for(var i = 0;i<searchResults.length;i++) {
    	searchResults[i].addEventListener('click',function(event) {
				socket.emit('add to playlist', { videoId: this.id, img: this.querySelector('img').src, title: this.querySelector('span.title').innerHTML });
			});
    }

	});
});

/* receive shared playlist from server */
var socket = io.connect('http://playlists-7947.onmodulus.net');
socket.on('full playlist', function (data) {
	console.log('playlist received:')
  console.log(data);

	html = new EJS({url: 'templates/playlist.ejs'}).render(data)
  document.querySelector('#sharedPlaylist').innerHTML = html;
});

