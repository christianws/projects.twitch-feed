
getFeeds();


function getFeeds(){
   	
	var channelArr = ["ESL_SC2", "OgamingSC2", "cretetion","terakilobyte", "freecodecamp", "storbeck",  "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];

	for  (var i = 0;  i < channelArr.length; i++){
		ajaxCall(channelArr[i]);
	}

	function ajaxCall(channel){

		var feedUrl = "https://api.twitch.tv/kraken/streams?channel="+channel;

	    $.ajax({
	    dataType: "jsonp",
	    url: feedUrl,
	    success: function(data){
			    	if(data["streams"].length < 1){			    	
				    		processOfflineFeeds(channel);
			    	}else {
				    	processOnlineFeeds(data,channel);
				    }
				},
	    error: function(){
		    	console.log("failure of getFeeds() - (api error)");    	
		    }
	  });

	}
};

function processOnlineFeeds(data,channel){

	//console.log(JSON.stringify(data,null,1));

	if(data["streams"][0]["channel"]["logo"] === null){
		var userThumb = "https://d30y9cdsu7xlg0.cloudfront.net/png/234572-200.png";
	}else{
		var userThumb = data["streams"][0]["channel"]["logo"];
	}

	var htmlContent = 	'<div class="feed-single-con online">' +
							'<div class="left-column">' +
								'<div class="user-thumb_con">' +
									'<div class="user-thumb" style="background-image:url(' + userThumb + ')"></div>' +
								'</div>' +
							'</div>' +
							'<div class="right-column">' +
								'<div class="feed-single_info-con">' +
								'<div class="feed-single_info">' +
									'<div class="channel"><a target="_blank" href="https://www.twitch.tv/' + channel  + '">' + channel +  '</a></div>' +
									'<div class="game">' + data["streams"][0]["game"] + '</div>' +
									'<div class="status">' + data["streams"][0]["channel"]["status"] + '</div>' +
								'</div>' +
								'</div>' +
							'</div>' +
						'</div>' ;
	$( '#feed-con' ).append(htmlContent);
}

function processOfflineFeeds(channel){
	


	$.ajax({
	    dataType: "jsonp",
	    url: "https://api.twitch.tv/kraken/channels/" + channel,
	    success: function(data){

	    		if(data["status"]===422){
						console.log("---------------------------- no account found for channel " + channel + "-----");
						var htmlContent = 	'<div class="feed-single-con offline">' +
												'<div class="left-column">' +
													'<div class="user-thumb_con">' +
														'<div class="user-thumb" style="background-image:url(' +  "https://d30y9cdsu7xlg0.cloudfront.net/png/234572-200.png" + ')"></div>' +
													'</div>' +
												'</div>' +
												'<div class="right-column">' +
													'<div class="feed-single_info-con">' +
													'<div class="feed-single_info">' +
														'<div class="channel"><b>' + channel +  '</b></div>' +
														'<div class="status">' + "user does not exist" + '</div>' +
													'</div>' +
													'</div>' +
												'</div>' +
											'</div>' ;
						$( '#feed-con' ).append(htmlContent);	

						return;
						}
	console.log(JSON.stringify(data,null,1));

	if(data["logo"] === null){
		var userThumb = "https://d30y9cdsu7xlg0.cloudfront.net/png/234572-200.png";
	}else{
		var userThumb = data["logo"];
	}

	var htmlContent = 	'<div class="feed-single-con offline">' +
				'<div class="left-column">' +
					'<div class="user-thumb_con">' +
						'<div class="user-thumb" style="background-image:url(' +  userThumb + ')"></div>' +
					'</div>' +
				'</div>' +
				'<div class="right-column">' +
					'<div class="feed-single_info-con">' +
					'<div class="feed-single_info">' +
						'<div class="channel"><a target="_blank" href="https://www.twitch.tv/' + channel  + '">' + channel +  '</a></div>' +
						'<div class="status">' + "offline" + '</div>' +
					'</div>' +
					'</div>' +
				'</div>' +
			'</div>' ;

	$( '#feed-con' ).append(htmlContent);
	    },
	    error: function(){
		    	console.log("failure of processOfflineFeeds() - (api error)");  	
		    }
	  });
}