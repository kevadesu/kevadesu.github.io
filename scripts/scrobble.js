        // This code has been written by a human, with the
       // assistance of MDN docs and W3Schools. There is
      // only a very tiny part of the code where a bit
     // of AI assistance came to power.
    //////////////////////////////
   // -kevadesu. The entire    //
  // site is under the Z6XdL  //
 // license.                 //
//////////////////////////////
const intervalInSeconds = 5;

async function getFMData() {
    const url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=kevadesu&api_key=8109695410d24509adae2ef3b3affa57&format=json&limit=1";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
//      console.log(json);
        const artistName = json.recenttracks.track[0].artist["#text"]
        const trackName = json.recenttracks.track[0].name
        const trackImages = json.recenttracks.track[0].image
        const mediumImage = json.recenttracks.track[0].image[1]["#text"]
        const trackURL = json.recenttracks.track[0].url
        var playingState = "playing"
        if (json.recenttracks.track[0]["@attr"].nowplaying == "true") {
            playingState = "↑ PLAYING";
        } else {
            playingState = "↓ NOT PLAYING";
        }
        document.getElementById("music-playing-state").textContent = playingState;
        document.getElementById("music-artist-name").textContent = artistName;
        document.getElementById("music-track-name").textContent = trackName;
        document.getElementById("album-cover").src = mediumImage;
        document.getElementById("music-track-link").setAttribute("href", trackURL)
    } catch (error) {
        console.error(error.message);
    }
}

getFMData();

setInterval(getFMData, intervalInSeconds * 1000)