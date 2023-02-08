var u = 50 / 2;

var chessboard = [];

var offsetX, offsetY;
var mouseX, mouseY;

var indexX, indexY;

var startX, startY;     // TO SEND AS START POS
var currentX, currentY; // TO SEND AS FINAL POS

var activePiece, markedPiece;

var warnCases = [];

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
        markedPiece.style.boxShadow = 'inset 0 0 0 3px #94d678';
        // call function get moves
    }
}
function warnCase(event) {
    if (event.which == 3) {
        let target = event.target;
        if (event.target.tagName == 'DIV')
            target = target.parentElement;

        let targetIndex = Array.prototype.indexOf.call(warnCases, target);
        if (targetIndex >= 0) {
            warnCases.splice(targetIndex, 1);
            target.style.background = ''
        }
        else {
            target.style.background = '#db4e2c'

            let X = Array.prototype.indexOf.call(target.parentNode.children, target) - 1;
            let Y = Math.abs(Array.prototype.indexOf.call(target.parentNode.parentNode.children, target.parentNode) + 9) - 9;
            
            if (X % 2 == Y % 2) 
            target.style.background = '#f06948'
                    
            warnCases.push(target);
        }
    }
}

window.onmouseup = () => { 
    if (activePiece) {
        activePiece.style.position = `initial`
    }

    // verification
    if ((true) && activePiece) {
        if ((currentX != startX || currentY != startY) && (chessboard.length - currentY - 1 < chessboard.length && chessboard.length - currentY - 1 >= 0) && (currentX < chessboard[chessboard.length - currentY - 1].length && currentX >= 0)) {
            activePiece.parentElement.removeChild(activePiece);
            chessboard[chessboard.length - currentY - 1][currentX].innerHTML = ''
            chessboard[chessboard.length - currentY - 1][currentX].appendChild(activePiece);

            if (markedPiece)
                markedPiece.style.boxShadow =  '';

            // delete marker
            while (warnCases.length > 0) {
                warnCases[0].style.background = ''
                warnCases.shift()
            }

            move = !move
        }
    }

    activePiece = null; 
    [currentY, currentX, startY, startX] = [0, 0, 0, 0]
}

window.onresize = (event) => {
    if (window.innerWidth <= 500) 
        u = (window.innerWidth - 50) / 18;
    else 
        u = 50 / 2
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
    if (window.innerWidth <= 500) 
        u = (window.innerWidth - 50) / 18;
    else 
        u = 50 / 2

    // init 
    let chessboardtable = document.querySelector('tbody');
    let pieces = chessboardtable.querySelectorAll('div');

    chessboardtable.querySelectorAll('th').forEach(e => {
        e.addEventListener('mousedown', (event) => { if (event.preventDefault) event.preventDefault() })
    })
    chessboardtable.querySelectorAll('td').forEach(e => {
        e.addEventListener('mousedown', (event) => { if (event.preventDefault) event.preventDefault() })
    })

    for (let i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener('mousedown', (event) => { focusPiece(event) })
    }

    for (let i = 0; i < chessboardtable.children.length - 1; i++) {
        chessboard.push([]);
        for (let j = 1; j < chessboardtable.children[i].children.length; j++) {
            chessboard[chessboard.length - 1].push(chessboardtable.children[i].children[j])
            chessboardtable.children[i].children[j].addEventListener('contextmenu', (event) => { event.preventDefault(); warnCase(event) })
        }
    }

    chessboard = chessboard.reverse()
}

// change theme

function changeTheme() {
    let e = document.getElementById('chess-board');
    e.getAttribute('data-theme') == 'default' ? e.setAttribute('data-theme', 'gotham') : e.setAttribute('data-theme', 'default')
}
