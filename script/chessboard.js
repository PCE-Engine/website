var chessboard = [];
var mouseX, mouseY;

var activePiece;

function focusPiece(event) {
    activePiece = event.target;
    mouseX = event.clientX;
    mouseY = event.clientY;
}

window.onmouseup = () => { 
    activePiece.style.transform = `translate(0px, 0px)`
    activePiece = null; 
}

window.onmousemove = (event) => {
    if (activePiece != null) {
        activePiece.style.transform = `translate(${event.clientX - mouseX}px, ${event.clientY - mouseY}px)`
    }
}

window.onload = () => {
    // init 
    let chessboardtable = document.querySelector('tbody');
    let pieces = chessboardtable.querySelectorAll('div');

    for (let i = 0; i < pieces.length; i++)
        pieces[i].addEventListener('mousedown', (event) => { focusPiece(event) })

    for (let i = 0; i < chessboardtable.children.length - 1; i++) {
        chessboard.push([]);
        for (let j = 1; j < chessboardtable.children[i].children.length; j++) {
            chessboard[chessboard.length - 1].push(chessboardtable.children[i].children[j])
        }
    }

    chessboard = chessboard.reverse()
}

function changeTheme() {
    let e = document.getElementById('chess-board');
    e.getAttribute('data-theme') == 'default' ? e.setAttribute('data-theme', 'gotham') : e.setAttribute('data-theme', 'default')
}