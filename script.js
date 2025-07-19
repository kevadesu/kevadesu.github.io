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
        document.getElementById("music-artist-name").textContent = artistName;
        document.getElementById("music-track-name").textContent = trackName;
        document.getElementById("album-cover").src = mediumImage;
    } catch (error) {
        console.error(error.message);
    }
}

getFMData();

setInterval(getFMData, intervalInSeconds * 1000)