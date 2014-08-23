var invoker = {};

(function() {
	commands = {
		action1: function(message) {
			return message + " from action1";
		},
		action2: function(message) {
			return message + " from action2";
		}
	};

	invoker.execute = function(actionName) { 
		if (commands[actionName] != undefined) {
			var message = commands[actionName].apply(commands, [].slice.call(arguments, 1));
			return message;
		}
	};

})(invoker);