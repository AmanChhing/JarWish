

var outputYou = document.querySelector('.output-you');
var outputBot = document.querySelector('.output-bot');
//const songpickedhtml = document.querySelector('.song-picked');
var url = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/0a16fe68-ad90-40c3-83c6-e6cc2250831e?verbose=true&timezoneOffset=0&subscription-key=51f106d2672240958a1f931a8d02eae3&q="
var topscoringintent = ""
var songpicked = ""
var youtubeoplist = ""
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

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
  var synth = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance();
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
			outputBot.textContent = "Sure, Playing the song : " + window.songpicked
			say("Sure, Playing the song : " + window.songpicked)
			gapi.load('client', playsong)
			
		}
		else
		{
		outputBot.textContent = "I'm sorry, i couldn't hear the song name properly, please repeat again."
		say("I'm sorry, i couldn't hear the song name properly, please repeat again.")
		}
		
	}
	else
	{
	outputBot.textContent = "I'm sorry, for now i can play only music. tell me to play anything and i will do so."
		say("I'm sorry, for now i can play only music. tell me to play anything and i will do so.")
	}
	
}



function playsong()
{
	//gapi.load('466240921973-3ig72n53f5p11fluka1ev4f5el3qm4ca.apps.googleusercontent.com', search)
	var searchTerm = window.songpicked
 	var apiKey = "AIzaSyAymbD4C8RpXxAYNuUMvIl47nQY5hahEg4"
  	gapi.client.init
	({
    		'apiKey': apiKey, 
    		'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
  	}).then(function()
	{
    		return gapi.client.youtube.search.list
		({
      			q: searchTerm,
      			part: 'snippet'
    		});
  	}).then(function(response) 
		{
		
		var searchResult = response.result;
    		var firstVideo = searchResult.items[0]
		var url = "https://www.youtube.com/embed/"+(firstVideo.id.videoId).toString()+"?autoplay=1&enablejsapi=1&list=RD"+(firstVideo.id.videoId).toString()+"&start_radio=1"	
		var iDiv = document.getElementById('block')
		if(!iDiv)
		{
			var iDiv = document.createElement('div');
			iDiv.id = 'block';
			iDiv.className = 'youtube-player';
			$("<style>").text("#block { position: relative; padding-top: 56.25%; left: 16%;  }").appendTo("head");
			document.getElementsByTagName('body')[0].appendChild(iDiv);
		}
		var ifrm = document.createElement("iframe")
        	ifrm.setAttribute("src", url)
		ifrm.setAttribute("id", "target")
		ifrm.className = 'iframeclass';
		ifrm.setAttribute("allow","autoplay")
		ifrm.setAttribute("frameborder","0")
		ifrm.setAttribute('allowFullScreen', '')
		ifrm.setAttribute('picture-in-picture', '')
		$("<style>").text("#target { position: absolute; top: 0px; left: 0px; width: 70%; height: 70%; }").appendTo("head");
		iDiv.appendChild(ifrm);
		var divFirst = document.getElementById("target")
		divFirst.scrollIntoView()
		
		

		
		
		
  			//var searchResult = response.result;
    			//$('#search-results').append(JSON.stringify(searchResult, null, 4))
  			//console.log(searchResult.items[0])
    			//var firstVideo = searchResult.items[0]
			//alert(firstVideo.id.videoId)
			//https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1
			//var url = "https://www.youtube.com/embed/"+(firstVideo.id.videoId).toString()+"?autoplay=1&enablejsapi=1&list=RD"+(firstVideo.id.videoId).toString()+"&start_radio=1"
			//alert(url)
			//var videoid = "HtvwcJLqxE0"
			//var url = "https://www.youtube.com/embed/"+videoid+"?autoplay=1"
			//var ifrm = document.createElement("iframe")
        		//ifrm.setAttribute("src", url)
			//ifrm.setAttribute("allow","autoplay")
			//ifrm.setAttribute("frameborder","0")
			//ifrm.setAttribute('allowFullScreen', '')
			//ifrm.setAttribute('picture-in-picture', '')
			//ifrm.setAttribute("id", "target")
        		//ifrm.style.width = "75%"
        		//ifrm.style.height = "400px"
			//ifrm.style.position = 'relative'
			//ifrm.style.top ='20%'
			//ifrm.style.left='13%'
			//ifrm.style.bottom ='5%'
			//ifrm.style.right='12%'
        		//document.body.appendChild(ifrm)
			//var divFirst = document.getElementById("target")
			//divFirst.scrollIntoView()
			//window.songpicked = ""
    			//firstVideo.url = 'https://youtube.com/watch?v=${firstVideo.id.videoId}'
			//alert(firstVideo.url)
    			//$('#first-video').text(firstVideo.url).attr('href', firstVideo.url)
    			//$('#first-video-title').text(firstVideo.snippet.title)
    			//$('#first-video-description').text(firstVideo.snippet.description)
  		});

}

function removeIFrame() {
	window.songpicked = ""
        var frame = document.getElementById("block");
        //frame.parentNode.removeChild(div);
	frame.removeChild(target);
    }

function say(m) {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  //msg.voice = voices[10];
  msg.voiceURI = "native";
  msg.volume = 1;
  msg.rate = 0.7;
  msg.pitch = 0.8;
  msg.text = m;
  msg.lang = 'en-IN';
  speechSynthesis.speak(msg);
}



