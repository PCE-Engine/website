const u = 50 / 2;

var chessboard = [];

var offsetX, offsetY;
var mouseX, mouseY;

var indexX, indexY;

var startX, startY;     // TO SEND AS START POS
var currentX, currentY; // TO SEND AS FINAL POS

var activePiece, markedPiece;

var move = true;

function focusPiece(event) {
    if (
    (move && (Array.prototype.indexOf.call(event.target.classList, 'wr') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wn') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wb') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wq') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wk') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wp') >= 0))
    || 
    (!move && !(Array.prototype.indexOf.call(event.target.classList, 'wr') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wn') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wb') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wq') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wk') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wp') >= 0))
    ) {
        if (markedPiece)
            markedPiece.style.boxShadow =  '';

        activePiece = event.target;

        mouseX = event.clientX;
        mouseY = event.clientY;

        offsetX = event.offsetX;
        offsetY = event.offsetY;

        activePiece.style.position = 'absolute'
        activePiece.style.left = `${event.clientX - u}px` 
        activePiece.style.top =`${event.clientY - u}px`

        markedPiece = event.target.parentElement;
        markedPiece.style.boxShadow = 'inset 0 0 0 3px coral';
        // call function get moves
    }
}

window.onmouseup = () => { 
    if (activePiece) {
        activePiece.style.position = `initial`
    }

    // verification
    if ((true) && activePiece) {
        if (currentX != startX || currentY != startY) {
            activePiece.parentElement.removeChild(activePiece);
            chessboard[chessboard.length - currentY - 1][currentX].appendChild(activePiece);

            if (markedPiece)
                markedPiece.style.boxShadow =  '';

            move = !move
        }
    }

    activePiece = null; 
    [currentY, currentX, startY, startX] = [0, 0, 0, 0]
}

window.onmousemove = (event) => {
    if (activePiece != null) {
        activePiece.style.left = `${event.clientX - u}px` 
        activePiece.style.top =`${event.clientY - u}px`

        indexX = (mouseX - event.clientX - offsetX) / (u * 2)
        if (indexX > 0)
            indexX++;
        indexY = (mouseY - event.clientY - offsetY) / (u * 2)
            if (indexY > 0)
                indexY++;

        indexX = parseInt(indexX);
        indexY = parseInt(indexY);

        let X = Array.prototype.indexOf.call(markedPiece.parentNode.children, markedPiece) - 1;
        let Y = Math.abs(Array.prototype.indexOf.call(markedPiece.parentNode.parentNode.children, markedPiece.parentNode) + 9) - 9;

        
        currentY = Y - indexY;
        currentX = X - indexX;

        startX = X
        startY = Y

        // LOG IN CASE OF PROBLEMS
        //console.log(startX, startY)
        //console.log(currentX, currentY)
    }
}

window.onload = () => {
    // init 
    let chessboardtable = document.querySelector('tbody');
    let pieces = chessboardtable.querySelectorAll('div');

    for (let i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener('mousedown', (event) => { focusPiece(event) })
    }

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
