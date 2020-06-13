var coll = document.getElementsByClassName("collapsible");
var i;
for(i=0; i < coll.length; i++){
	coll[i].addEventListener("click", function(){
	var content = this.nextElementSibling;
	console.log("Hello");
	if(content.style.height){
		content.style.height = null;
	}else{
		content.style.height = content.scrollHeight + "px";
	}
});
}