var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var	URLSlugs = require('mongoose-url-slugs');
var User = new mongoose.Schema({

	//username and password provided by plugin

});

var Post = new mongoose.Schema({
	//poster: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	poster: String,
	content: String
	//content: {type: String, required: true}

});


var Thread = new mongoose.Schema({
	title: String,
	urlTitle: String,
	listOfPosts: [Post]

});

var Forum = new mongoose.Schema({
	listOfThreads: [Thread]

});





Thread.plugin(URLSlugs('title'));
User.plugin(passportLocalMongoose);
mongoose.model('User', User);
mongoose.model('Forum', Forum);
mongoose.model('Thread', Thread);
mongoose.model('Post', Post);

mongoose.connect('mongodb://localhost/finalproj');