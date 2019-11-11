function StartSearch()
{
	$.get("https://api.ipdata.co/?api-key=test", function (response) {
    var MyLocation = response.city+","+response.region+","+response.country_name;
	alert(MyLocation)
	alert(MyQuery)
	StartTheSearch(MyQuery,MyLocation);}, "jsonp");
	var MyQuery = $('#txt_name').val();
}

function StartTheSearch(MyQuery,MyLocation)
{
try{
$.getJSON("https://api.serpwow.com/live/search?api_key=73D73940A035467494C0EEC178D341E3&q="+MyQuery+"&location="+MyLocation+"&hl=en", function(data)
{
	if((data.search_parameters.q.toString()).toLowerCase().includes("synonym") || (data.search_parameters.q.toString()).toLowerCase().includes("antonym"))
	{
		related_Questions(data)
	}
	else if(data.answer_box)
	{
		if(data.answer_box.answers)
		{
			if(data.answer_box.answers[0].conversion_type)
			{
				alert(data.answer_box.answers[0].original.value +" "+data.answer_box.answers[0].original.unit +"is equal to "+data.answer_box.answers[0].converted.value+" "+data.answer_box.answers[0].converted.unit)
			}
			else if(data.answer_box.answers[0].type)
			{
				if(data.answer_box.answers[0].type == "calculator")
				{
				alert(data.answer_box.answers[0].formula +"  "+data.answer_box.answers[0].answer)
				}
				if(data.answer_box.answers[0].type == "translation")
				{
				alert(data.answer_box.answers[0].original.text +" is written in "+data.answer_box.answers[0].converted.language +" as "+data.answer_box.answers[0].converted.text)
				}
				if(data.answer_box.answers[0].type == "list")
				{
					if(data.answer_box.answers[0].rows)
					{
						if(data.answer_box.answers[0].source)
						{
							alert("Source = "+data.answer_box.answers[0].source.title)
							alert("link = "+data.answer_box.answers[0].source.link)
						}
						alert(data.answer_box.answers[0].rows)
					}
					
				}
				if(data.answer_box.answers[0].type == "table")
				{
					if(data.answer_box.answers[0].source)
					{
						//alert("Came here")
						alert("Source = "+data.answer_box.answers[0].source.title)
						alert("link = "+data.answer_box.answers[0].source.link)
					}
						//alert("Came here")
						alert(data.answer_box.answers[0].rows)
				}
				if(data.answer_box.answers[0].type == "route")
				{
					alert("it's "+data.answer_box.answers[0].routes[0].distance + " and will take "+data.answer_box.answers[0].routes[0].time + " "+data.answer_box.answers[0].routes[0].name)
					
				}
			}
			else if(data.answer_box.answers[0].answer == "Lyrics")
			{
				alert("Title = "+data.organic_results[0].title)
				alert("Link = "+data.organic_results[0].link)
				related_Searches(data)
			}
			else if (data.answer_box.answers[0].classification)
			{
				if((data.answer_box.answers[0].classification.toString()).includes("title") || (data.answer_box.answers[0].classification.toString()).includes("recording_cluster"))
				{
					alert("Title = "+data.organic_results[0].title)
					alert("Link = "+data.organic_results[0].link)
					related_Searches(data)
				}					
				else
				{
					if(data.answer_box.answers[0].category)
					{
					alert(data.answer_box.answers[0].category + " is ")
					}
					alert(data.answer_box.answers[0].answer)
					alert("Image = "+data.answer_box.answers[0].images[0])
				}
			}
			else
			{
				alert(data.answer_box.answers[0].answer)
				alert("images "+data.answer_box.answers[0].images[0])
				if(data.answer_box.answers[0].source)
				{
					alert("Source = "+data.answer_box.answers[0].source.link)
				}
			}
		}
		
	}
	else if(data.weather_box)
	{
		alert("The weather in "+data.weather_box.location+" is "+data.weather_box.summary)
		if(data.weather_box.current)
		{
			alert("Image ="+data.weather_box.current.image)
			alert("there is a "+data.weather_box.current.precipitation.value +" Percent Chance of Rain today")
			alert("humidity is "+data.weather_box.current.humidity.value +" Percent")
			alert("temperature is "+data.weather_box.current.temperature[1].value +" degree "+data.weather_box.current.temperature[1].unit +" Right now")
		}
	}
	else if(data.local_map)
	{
		alert("Link = "+data.local_map.link)
		console.log("Link = "+data.local_map.link)
	}
	else if(data.knowledge_graph)
	{
		if(data.knowledge_graph.description)
		{
			alert(data.knowledge_graph.description)
		}
		if(data.knowledge_graph.images)
		{
			alert("Image = "+data.knowledge_graph.images[0])
		}
		if(data.knowledge_graph.source)
		{
			alert("Source = "+data.knowledge_graph.source.name)
			alert("link = "+data.knowledge_graph.source.link)
		}
		if(data.knowledge_graph.known_attributes)
		{
			alert(data.knowledge_graph.known_attributes[0].name + " = "+data.knowledge_graph.known_attributes[0].value)
		}
		related_Questions(data)
	}
	else
	{
		organic_Result(data)
	}

});
function organic_Result(data)
{
	alert(data.organic_results[0].snippet)
	alert("Link = " +data.organic_results[0].link)
	if(data.organic_results[0].rich_snippet)
	{
		alert(data.organic_results[0].rich_snippet.top.extensions)
	}
	alert("Alternate Result :-")
	alert(data.organic_results[1].snippet)
	alert("Link = " +data.organic_results[1].link)
	related_Questions(data)
}
function related_Searches(data)
{
	if(data.related_searches)
	{
	alert("Related Searches 1")
	alert("Query = "+data.related_searches[0].query)
	alert("Answer = "+data.related_searches[0].link)
	alert("Related Searches 2")
	alert("Query = "+data.related_searches[1].query)
	alert("Answer = "+data.related_searches[1].link)
	related_Questions(data)
	}
}
function related_Questions(data)
{
	if(data.related_questions)
	{
	alert("Related Questions 1")
	alert("question = "+data.related_questions[0].question)
	alert("Answer = "+data.related_questions[0].answer)
	alert("Related Questions 2")
	alert("question = "+data.related_questions[1].question)
	alert("Answer = "+data.related_questions[1].answer)
	}
}

}
catch(e){

}
}