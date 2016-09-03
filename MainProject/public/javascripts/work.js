console.log("out dom");
document.addEventListener("DOMContentLoaded", function(){
	var ele = document.createElement('h1');
	var text = document.createTextNode("Some inputs are missing!");
	ele.appendChild(text);
	ele.style.color = "white";
				

	//var newName = document.createElement('td');
	var threadName;
	console.log("in dom");
	var req = new XMLHttpRequest();
	var threads = document.getElementById("threadList");
	console.log(threads);

	var button = document.getElementById("makeBtn");
	var erButton = document.getElementsByClassName("closeButton");
	var error = document.getElementById("error-message");
	error.appendChild(ele);
	erButton[0].addEventListener('click', function(){
  						error.style.display = 'none';			
	});
	console.log(button);

	
	//var addBtn = document.getElementById("btn1");
	button.addEventListener("click", function(event){
		event.preventDefault();
		req.open('POST', '/api/thread/make', true);
		//var data = JSON.parse(req.responseText);
			threadName = document.getElementById("fieldX").value;
			console.log(threadName);
			if(!threadName){
				error.style.display = 'block';
				req.send();
			}
			//var userName1 = document.getElementById('usersName');
			//console.log(userName1);
			//var contents = document.getElementById("fieldY").value;
			
		req.addEventListener('load', function(){
			var under = threadName.replace(/ /g,"_");
			var list = [];
			var a = document.createElement('a');
			a.href = "/threadPage/"+under ;
			//var kids = threads.children;
			var tr = document.createElement('tr');
			//var newName = document.createElement('td');
			var th1 = document.createElement('th');
			var th2 = document.createElement('th');
			var users = document.createTextNode('This thread is empty. Contribute to it!');
			//var comments = document.createTextNode('Comment');


        	var textName = document.createTextNode(threadName);
        	var body = document.createElement('tbody');
        	var newThread = document.createElement('thread');
        	var newTable = document.createElement('table');
        	//newTable.style.border = '1px';
        	//var textCon = document.createTextNode(contents);
        	newThread.appendChild(users);
        	//newThread.appendChild(comments);
        	//newThread.style.border = '1px';

        	a.appendChild(textName);
        	//newCon.appendChild(textCon);
        	//tr.appendChild(newName);
        	//tr.appendChild(newCon);
        	body.appendChild(a);
        	list.push(body);
        	list.push(newThread);
        	list.forEach(function(entry){
        		newTable.appendChild(entry);
        	})
        	//newTable.appendChild(body);
        	//newTable.appendChild(newThread);
        	
        	threads.appendChild(newTable);
        	
		})
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req.send('threadTitle='+threadName);
	})
});
/*
document.addEventListener("DOMContentLoaded", main()}
var threads = document.getElementById("threadList");
function main(){
	console.log("hello");
	var button = document.getElementById("field3");
	button.addEventListener("click", handleMakePost());
}

function handleMakePost(event){
	event.preventDefault();
	/*
	var req = new XMLHttpRequest();
	req.open('GET', '/api/findThread');
	req.addEventListener('load', function(){
		var data = JSON.parse(req.responseText);
		var text = document.getElementById("field3").value;
		if(data[i].title !== text){
			threads.children[i].style.display = 'none';
		}
	});

	res.send();
	
*/
