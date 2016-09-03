var express = require('express');
var router = express.Router();
var passport = require('passport');
require( './db.js' );
require('./auth');
var mongoose = require('mongoose');
var name;
var User = mongoose.model('User');
var Forum = mongoose.model('Forum');
var Thread = mongoose.model('Thread');
var Post = mongoose.model('Post');

function errResult(result, error){
	this.result = result;
	this.error = error;
}

router.get('/', function(req,res){
	Forum.find({}, function(err, varToStoreResult, count){
		res.render('index', {forum :varToStoreResult});
	})
});

router.get('/listThreads', function(req,res){
	Thread.find({}, function(err, varToStore, count){
		res.render('listThreads', {thread: varToStore, notPassed: true});
	})
});

router.post('/api/thread/make', function(req,res){
	console.log(req.body.threadTitle)
	var tTitle = req.body.threadTitle;
	//tTitle = tTitle.replace(/_/g," ");
	var link = tTitle.replace(/ /g,"_");
	var initial = [];
	if(tTitle){
	var newThread = new Thread({
		title: tTitle,
		urlTitle: link,
		listOfPosts: initial
	});
	console.log('hello')
	console.log(newThread);
	newThread.save(function(err, savedPost,count){
		if(err){
			var jsonRet = Object.create(errResult);
			jsonRet.result = undefined;
			jsonRet.error = true;
			res.json(jsonRet);

		}
		else{
			var jsonRet = Object.create(errResult);
			jsonRet.result = count;
			jsonRet.error = false;
			res.json(jsonRet);
		}
	})
}
else{
	res.json({error:false});
}
});

router.get('/make-thread', function(req,res){
	res.render('make-thread');
});


router.get('/findThread', function(req,res){
	res.render('findThread');
})


router.post('/findThread', function(req,res){
	Thread.findOne({title: req.body.threadTitle}, function(err, varToStore, count){
		res.render('findThread', {thread: varToStore, passed: true});
	})
});


router.get('/threadPage/:slug', function(req,res){
	//console.log(req.user);
	var newTitle = req.params.slug.replace(/_/g," ");
	Thread.findOne({title: newTitle}, function(err, threadFind, count){
		if(!err){
			res.render('listThreads', {thread: threadFind, passed: true});
		}
		else{
			res.send(err);
		}
	})
})

router.post('/threadPage/:slug', function(req,res){
	var newTitle = req.params.slug.replace(/_/g," ");
	Thread.findOne({title: newTitle}, function(err, threadFind, count){
		var newPost;
		if(name){
		newPost = new Post({
		poster: name,
		content: req.body.contents
	});
	}
	else{
		if(req.body.contents){
		newPost = new Post({
		poster: req.body.username,
		content: req.body.contents
	});
		}
		else{
			res.json({error: true});
		}
	}
		threadFind.listOfPosts.push(newPost);
	threadFind.save(function(err, savedPost, count){
		if(!err){
			res.render('listThreads', {thread: threadFind, passed: true});
			//res.redirect('/threadPage/'+req.params.slug);

		}

		else{
			res.send(err);
		}
	})
	})
})



//User Authenication

router.get('/', function(req, res) {
  res.render('index', { user: req.user });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req,res,next) {

  passport.authenticate('local', function(err,user) {
    if(user) {
    	name = user.username;
      req.logIn(user, function(err) {
        res.redirect('/listThreads');
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);

});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
	name = req.body.username;
  User.register(new User({username:req.body.username}), 
      req.body.password, function(err, user){
    if (err) {
      
      res.render('register',{message:'Your username or password is already taken'});
    } else {
    
      passport.authenticate('local')(req, res, function() {
        res.redirect('/listThreads');
      });
    }
  });   
});



module.exports = router;