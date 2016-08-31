
var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on('all-messages', function(data) {
    console.log(data);
    render(data);
});

socket.on('new-user', function(data) {
    alert('Nuevo usuario conectado: ' + data);
});

// cuando se usa socket.send(data) desde el server
socket.on('message', function(data) {
    console.log("from server.");
    console.log(data);
    document.getElementById('username').value = data.id
});

// data es array
function render_old(data) {
    var html = data.map(function(elem, index){
        return(`<div>
         <strong>${elem.author}</strong>:
         <em>${elem.text}</em>
         </div>`)
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

// data es object
function render (data){
    var html = `<div>
         <strong>${data.author}</strong>:
         <em>${data.text}</em>
         </div>`;
    var elem = document.getElementById('messages');
    elem.insertAdjacentHTML("beforeEnd", html);
}

function addMessage(e) {
    var mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    socket.emit('new-message', mensaje);
    document.getElementById('texto').value = '';
    document.getElementById('texto').focus();
    return false;
}

document.getElementById('texto').focus();
