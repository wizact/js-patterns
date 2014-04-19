var pubsubContainer = {};

(function(q) {

	var topics = {}, subId = -1;

	var topicList = new CollectionList();

	q.trigger = function( topic, data ) {
		
		if (!topicExist(topic)) {
			console.warn("topic " + topic + " does not exist");
			return false;
		}

		var subscribers = getTopic(topic); 
		len = subscribers[1] ? subscribers[1].length : 0;

		while (len--) {
			subscribers[1][len].fn(topic, data);
		}
	};

	q.on = function( topic, fn ) {
		
		if (!topicExist(topic)) {
			console.log("creating topic" + topic);
			createTopic(topic);
		}

		var token = (++subId).toString();

		registerToTopic(topic, token, fn);

		return token;
	};

	q.off = function ( token ) {

		for (var i=0; i < topicList.Count(); i++ ) {
			var topicItem = topicList.Item(i);
			if (topicItem) {
				topicSubs = topicItem[1];
				if (topicSubs) {
					for(var j = 0; j < topicSubs.length; j++) {
						if (topicSubs[j].token === token) {
							topicSubs.splice( j, 1);
							console.log("unsubscribed #" + token + " from " + topicItem[0])
							return token;
						}
					}
				}
			}
		}

		return -1;
	};

	var getTopic = function (topic) {
		for (var i = 0; i < topicList.Count(); i++) {
			if (topicList.Item(i)) {
				if (topicList.Item(i)[0] == topic) {
					return topicList.Item(i);
				}
			}
		}
		return null;
	}

	var topicExist = function( topic ) {
		var exist = false;
		for (var i = 0; i < topicList.Count(); i++) {
			if (topicList.Item(i)) {
				if (topicList.Item(i)[0] == topic) {
					exist = true;
				}
			}
		}
		return exist;
	}

	var createTopic = function ( topic ) {
		topicList.Add([topic, []]);
	};

	var registerToTopic = function ( topic, token, fn ) {
		for(var i = 0; i < topicList.Count(); i++) {
			var topicItem = topicList.Item(i);
			if (topicItem) {
				if (topicItem[0] === topic) {
					topicItem[1].push({ token : token, fn : fn });
				} 
			}
		}
		console.log("Topic #" + token + " registered to " + topic);
	};

})(pubsubContainer);