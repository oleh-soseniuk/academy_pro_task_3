var socket = io.connect('http://localhost:3000');

var partialText = document.getElementById('partial');
var resultText = document.getElementById('result');

socket.on('update', function (data) {
        partialText.innerHTML =  data.fibonacci;
});


fetch('/math').then(function(response){
	if(response.ok) {
		return response.json();
	} 
}).then(function(data){
    resultText.innerHTML =  data.fibonacci;
});