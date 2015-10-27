

/**
 * Show different alerts in different cases
 * three alert types are: success, danger and info 
 * 
 * @param string $alertType
 * @param string $alertMsg
 * @return string
 */

function alertCustom(alertType, alertMsg) {
	
	return $("#alertMessage").html('<div class="alert alert-block ' + alertType + '"><button data-dismiss="alert" class="close" type="button"><i class="glyphicon glyphicon-off"></i></button>'+ alertMsg +'</div>').show();
}


function bubbleChartTemplate(jsonData) {
	var data = google.visualization.arrayToDataTable(jQuery.parseJSON(jsonData));

    // Id = lable
    // followers = haxis
    // following = vaxis
    // Location = no effect
    // Tweets = Radious (big ball)
    var options = {
  		title: 'User Profile stats',
	        hAxis: {title: 'Followers'},
	        vAxis: {title: 'Followings'},
	        bubble: {textStyle: {fontSize: 11}},
	        explorer: {
	        	keepInBounds: true
	        	// axis: 'horizontal'
          },
	        'width':'100%',
	        'height':500
	        // ,animation: {startup: true, duration: 1000}
    };

    
    var chart = new google.visualization.BubbleChart(document.getElementById('profilesBubbleContainer'));
    
    // to enable explorer
    google.visualization.events.addOneTimeListener(chart,'animationfinish',function(){
        delete options.animation;
        chart.draw(data, options); 
     });
    chart.draw(data, options);
}


function topHashTagsPieTemplate(jsonData) {

	var data = google.visualization.arrayToDataTable(jQuery.parseJSON(jsonData));

	// Set chart options
    var options = {'title':'Top Hashtags',
    			   'legend':'left',
    			   'is3D':true,
                   'width':'50%',
                   'height':500};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('topHashTagsPieContainer'));
 	
    chart.draw(data, options); // options are optional
  }


function coHashTagsPieTemplate(jsonData) {
	
	var data = google.visualization.arrayToDataTable(jQuery.parseJSON(jsonData));
    // Set chart options
    var options = {'title':'Co Hashtags',
    			   'legend':'left',
    			   'is3D':true,
                   'width':'50%',
                   'height':500};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('coHashTagsPieContainer'));
 	
    chart.draw(data, options); // options are optional
}

function tweetsTimelineAnnotationTemplate(jsonData) {
	
var data = new google.visualization.DataTable(JSON.parse(jsonData));
    
var chart = new google.visualization.AnnotationChart(document.getElementById('tweetsTimelineAnnotationContainer'));

    var options = {
      displayAnnotations: false, // sidebar
      // displayAnnotationsFilter: true,
      'title':'Time Line',
      'width':'40%',
      'height':500
    };

    chart.draw(data, options);
}


function tweetsTimelineAnnotationTemplateChapLL(jsonData) { 
	
var data = new google.visualization.DataTable(JSON.parse(jsonData));


	var options = {
			"width":  "100%",
            "height": "300px",
            "style": "dot", // box
            "animate": false,
            "animateZoom": false,
            "cluster": true,
    };

	var chart = new links.Timeline(document.getElementById('tweetsTimelineAnnotationContainer'), options);

    chart.draw(data);
}



function chartGenerator(max_id, loopCounter, totalTweets, totalHashtagsFound, topHashTagsData, coHashTagsData, tweetsTimelineData) {
    
	topHashTagsData = topHashTagsData || "no";
	coHashTagsData = coHashTagsData || "no";
	tweetsTimelineData = tweetsTimelineData || "no";

	// init next call vars
	var respStatusFalse = false,
		respMaxId, 
	    respLoopCounter, 
	    respTotalTweets,
	    respTotalHashtagsFound,
	    respTophashTagsData,
	    respCoHashTagsData,
	    respTweetsTimelineData;
	
	
	var phrase = $("#phrase").val();
	if (phrase.length < 1 ) {
		
		alertCustom("alert-danger", "Please enter any search term.");
		$("#phrase").focus();
		return false;
	}
	
	$("#alertMessage").hide();
	
	$.ajax({  		   
		type: "POST",  
		url:"ajax_scripts/twitter_search_tweets.php",  
		data: "max_id=" + max_id + 
			  "&loopCounter=" + loopCounter +
			  "&totalTweets=" + totalTweets +
			  "&totalHashtagsFound=" + totalHashtagsFound +
			  "&phrase=" + phrase + 
			  "&topHashTagsData=" + topHashTagsData +
			  "&tweetsTimelineData=" + tweetsTimelineData +
			  "&coHashTagsData=" + coHashTagsData,
			  
		dataType:"json",	
			
		beforeSend: function()
		{	
			$("#ajax-loader-gif").show();
		},
		success: function(resp)
		{
		
			if(resp.status == "f")
			{
				respStatusFalse = true;
				alertCustom("alert-danger", resp.error);
				$("#ajax-loader-gif").hide();
			}
			else
			{
				if(resp.max_id_status == "yes")
				{
					$("#tweetsCount").html("Total tweets: " + resp.totalTweets).show();

					// tweets Timeline Annotation
					tweetsTimelineAnnotationTemplate(resp.tweetsTimelineData);
					
					
					// User Profile stats
					bubbleChartTemplate(resp.profilesData);

					// Top Hashtags
					if (resp.tophashTagsData != "no") {
						topHashTagsPieTemplate(resp.tophashTagsData);
					}
					
					// Co Hashtags
					if (resp.coHashTagsData != "no") {
						coHashTagsPieTemplate(resp.coHashTagsData);
					}
				    // show tweets
					var tweetList = jQuery.parseJSON(resp.tweetsData);
					$("#tweets_wraper").html(tweetList);
					
					

					respMaxId = resp.max_id; 
					respLoopCounter = resp.loopCounter; 
					respTotalTweets = resp.totalTweets;
					respTotalHashtagsFound = resp.totalHashtagsFound;
					respTophashTagsData = encodeURIComponent(resp.tophashTagsData);
					respTweetsTimelineData = encodeURIComponent(resp.tweetsTimelineData);
					respCoHashTagsData = encodeURIComponent(resp.coHashTagsData);
				}
			}	
		}, 
 
	
		complete: function()
		{
			// $("#ajax-loader-gif").hide();
			
			if (! respStatusFalse) {
				setTimeout(function(){
				
				chartGenerator(respMaxId, 
						   respLoopCounter, 
						   respTotalTweets,
						   respTotalHashtagsFound,
						   respTophashTagsData,
						   respCoHashTagsData,
						   respTweetsTimelineData); // 
	
				}, 2000);
			}
		},
	
		error: function(e)
		{  
			// alert('Error: ' + e);  
		}  
	
   }); //end Ajax	
    
}



function chartGenerator2(max_id, loopCounter, totalTweets, totalHashtagsFound, topHashTagsData, coHashTagsData, tweetsTimelineDataChapLL) {
    
	topHashTagsData = topHashTagsData || "no";
	coHashTagsData = coHashTagsData || "no";
	tweetsTimelineDataChapLL = tweetsTimelineDataChapLL || "no"

	// init next call vars
	var respStatusFalse = false,
		respMaxId, 
	    respLoopCounter, 
	    respTotalTweets,
	    respTotalHashtagsFound,
	    respTophashTagsData,
	    respCoHashTagsData,
	    respTweetsTimelineDataChapLL;
	
	
	var phrase = $("#phrase").val();
	if (phrase.length < 1 ) {
		
		alertCustom("alert-danger", "Please enter any search term.");
		$("#phrase").focus();
		return false;
	}
	
	$("#alertMessage").hide();
	
	$.ajax({  		   
		type: "POST",  
		url:"ajax_scripts/twitter_search_tweets2.php",  
		data: "max_id=" + max_id + 
			  "&loopCounter=" + loopCounter +
			  "&totalTweets=" + totalTweets +
			  "&totalHashtagsFound=" + totalHashtagsFound +
			  "&phrase=" + phrase + 
			  "&topHashTagsData=" + topHashTagsData +
			  "&tweetsTimelineDataChapLL=" + tweetsTimelineDataChapLL +
			  "&coHashTagsData=" + coHashTagsData,
			  
		dataType:"json",	
			
		beforeSend: function()
		{	
			$("#ajax-loader-gif").show();
		},
		success: function(resp)
		{
		
			if(resp.status == "f")
			{
				respStatusFalse = true;
				alertCustom("alert-danger", resp.error);
				$("#ajax-loader-gif").hide();
			}
			else
			{
				if(resp.max_id_status == "yes")
				{
					$("#tweetsCount").html("Total tweets: " + resp.totalTweets).show();

					
					// tweets Timeline ChapLL
					tweetsTimelineAnnotationTemplateChapLL(resp.tweetsTimelineDataChapLL);
					
					
					// User Profile stats
					bubbleChartTemplate(resp.profilesData);

					// Top Hashtags
					if (resp.tophashTagsData != "no") {
						topHashTagsPieTemplate(resp.tophashTagsData);
					}
					
					// Co Hashtags
					if (resp.coHashTagsData != "no") {
						coHashTagsPieTemplate(resp.coHashTagsData);
					}
				    // show tweets
					var tweetList = jQuery.parseJSON(resp.tweetsData);
					$("#tweets_wraper").html(tweetList);
					
					

					respMaxId = resp.max_id; 
					respLoopCounter = resp.loopCounter; 
					respTotalTweets = resp.totalTweets;
					respTotalHashtagsFound = resp.totalHashtagsFound;
					respTophashTagsData = encodeURIComponent(resp.tophashTagsData);
					respCoHashTagsData = encodeURIComponent(resp.coHashTagsData);
					respTweetsTimelineDataChapLL = encodeURIComponent(resp.tweetsTimelineDataChapLL);
				}
			}	
		}, 
 
	
		complete: function()
		{
			// $("#ajax-loader-gif").hide();
			
			if (! respStatusFalse) {
				setTimeout(function(){
				
				chartGenerator2(respMaxId, 
						   respLoopCounter, 
						   respTotalTweets,
						   respTotalHashtagsFound,
						   respTophashTagsData,
						   respCoHashTagsData,
						   respTweetsTimelineDataChapLL); // 
	
				}, 2000);
			}
		},
	
		error: function(e)
		{  
			// alert('Error: ' + e);  
		}  
	
   }); //end Ajax	
    
}