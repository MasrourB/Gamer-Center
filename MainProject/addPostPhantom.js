var page = new WebPage(), system = require('system'), address

if(system.args.length < 2){
	console.log("Need 2 args")
	phantom.exit();
}
else{
	address = system.args[1];
	page.open(address, function(status){
		if(status === "success"){
			page.evaluate(function(){
				document.getElementById("field1").value = "PhantomBot";
				document.getElementById("field2").value = "As a phantom, I like ghost stuff!";
				document.getElementById("frm").submit();
			});
			setTimeout(function(){
				phantom.exit();
			}, 200)
		}
	})
	//phantom.exit();
}