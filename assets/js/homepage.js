var quotes = [
	"When you have a dream, you've got to grab it and never let go."
]

var authors = [
	" Carol Burnett"
]

var funnyquotes = [
	"Most people are shocked when they find out how incompetent I am as an electrician."
]


function showquote(){
	var q = quotes.length;
	var whichquote = Math.round(Math.random()*(q-1));
	document.getElementById("randomquote").innerText = quotes[whichquote];
	document.getElementById("author").innerText = "---- " + authors[whichquote];
}

function showfunnyquote(){
	var fq = funnyquotes.length;
	var whichfunnyquote = Math.round(Math.random()*(fq-1));
	document.getElementById("funnyquote").innerText = funnyquotes[whichfunnyquote];
}

showquote();
showfunnyquote();

document.getElementById("quoteGen").addEventListener("click", showquote);
document.getElementById("funnyGen").addEventListener("click", showfunnyquote);