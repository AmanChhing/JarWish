

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');
//const songpickedhtml = document.querySelector('.song-picked');
var url = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/0a16fe68-ad90-40c3-83c6-e6cc2250831e?verbose=true&timezoneOffset=0&subscription-key=51f106d2672240958a1f931a8d02eae3&q="
var topscoringintent = ""
var songpicked = ""
var youtubeoplist = ""
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;



document.querySelector('button').addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');

  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;
  

  outputYou.textContent = text;
  getjsonfile()
  console.log('Confidence: ' + e.results[0][0].confidence);
});

recognition.addEventListener('speechend', () => {
  recognition.stop();
});

recognition.addEventListener('error', (e) => {
  outputBot.textContent = 'Error: ' + e.error;
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

function getjsonfile() 
{
	$.getJSON(url+outputYou.textContent, function(data) {
    	window.topscoringintent = data.topScoringIntent.intent.toString();
	playsongornot(data)
	});
}

function playsongornot(data)
{
	if(window.topscoringintent.toLowerCase() === "play")
	{

		for(var i = 0; i < data.entities.length ; i++)
		{
			window.songpicked += data["entities"][i].entity.toString() + " "
		}
		if(window.songpicked != "")
		{
			outputBot.textContent = "Sure Sir, Playing the song : " + window.songpicked
			gapi.load('client', playsong)
			
		}
		
	}
}



function playsong()
{
	//gapi.load('466240921973-3ig72n53f5p11fluka1ev4f5el3qm4ca.apps.googleusercontent.com', search)
	var searchTerm = window.songpicked
 	var apiKey = "AIzaSyAymbD4C8RpXxAYNuUMvIl47nQY5hahEg4"
  	gapi.client.init({
    	'apiKey': apiKey, 
    	'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
  	}).then(function() {
    	return gapi.client.youtube.search.list({
      	q: searchTerm,
      	part: 'snippet'
    	});
  	}).then(function(response) {
  	var searchResult = response.result;
    //$('#search-results').append(JSON.stringify(searchResult, null, 4))
  	//console.log(searchResult.items[0])
    	var firstVideo = searchResult.items[0]
	alert(firstVideo.id.videoId)
    	//firstVideo.url = 'https://youtube.com/watch?v=${firstVideo.id.videoId}'
	//alert(firstVideo.url)
    //$('#first-video').text(firstVideo.url).attr('href', firstVideo.url)
    //$('#first-video-title').text(firstVideo.snippet.title)
    //$('#first-video-description').text(firstVideo.snippet.description)
  });

}



