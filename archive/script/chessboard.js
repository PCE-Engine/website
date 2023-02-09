var u = 75 / 2;

var chessboard = [];

var offsetX, offsetY;
var mouseX, mouseY;

var indexX, indexY;

var startX, startY;     // TO SEND AS START POS
var currentX, currentY; // TO SEND AS FINAL POS

var lastMoveX = -1, lastMoveY = -1;

var activePiece, markedPiece;

var warnCases = [];

var move = true;

function focusPiece(event) {
    if (
    ((move && (Array.prototype.indexOf.call(event.target.classList, 'wr') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wn') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wb') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wq') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wk') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wp') >= 0))
    || 
    (!move && !(Array.prototype.indexOf.call(event.target.classList, 'wr') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wn') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wb') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wq') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wk') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wp') >= 0)))
    && event.which == 1
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
function mobileFocusPiece(event) {
    if (
        ((move && (Array.prototype.indexOf.call(event.target.classList, 'wr') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wn') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wb') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wq') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wk') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wp') >= 0))
        || 
        (!move && !(Array.prototype.indexOf.call(event.target.classList, 'wr') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wn') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wb') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wq') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wk') >= 0 || Array.prototype.indexOf.call(event.target.classList, 'wp') >= 0)))
        ) {
            if (markedPiece)
                markedPiece.style.boxShadow =  '';
    
            activePiece = event.target;
    
            mouseX = event.touches[0].clientX;
            mouseY = event.touches[0].clientY;

            let rect = event.target.getBoundingClientRect()
            offsetX = (event.touches[0].clientX - window.pageXOffset - rect.left)
            offsetY = (event.touches[0].clientY - window.pageYOffset - rect.top)
            
    
            activePiece.style.position = 'absolute'
            activePiece.style.left = `${mouseX - u}px` 
            activePiece.style.top =`${mouseY - u}px`
    
            markedPiece = event.target.parentElement;
            markedPiece.style.boxShadow = 'inset 0 0 0 3px #94d678';
            // call function get moves
        }
}

// warn cases
function warnCase(event) {
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
function stopWarn(event) {
    if (event.target.children.length == 0 && event.target.tagName != 'DIV') {
        // delete marker
        while (warnCases.length > 0) {
            warnCases[0].style.background = ''
            warnCases.shift()
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
    chessboard[chessboard.length - lastMoveY - 1][lastMoveX].style.boxShadow = '';
    [currentY, currentX, startY, startX, lastMoveY, lastMoveX] = [0, 0, 0, 0, 0, 0]
}
window.ontouchend = () => {
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
    chessboard[chessboard.length - lastMoveY - 1][lastMoveX].style.boxShadow = '';
    [currentY, currentX, startY, startX, lastMoveY, lastMoveX] = [0, 0, 0, 0, 0, 0]
}

window.onresize = (event) => {
    if (window.innerWidth <= 750) 
        u = (window.innerWidth - 75) / 18;
    else 
        u = 75 / 2
}

window.ontouchmove = (event) => {
    if (activePiece != null) {
        activePiece.style.left = `${event.touches[0].clientX - u}px` 
        activePiece.style.top =`${event.touches[0].clientY - u}px`

        indexX = (mouseX - event.touches[0].clientX - offsetX) / (u * 2)
        if (indexX > 0)
            indexX++;
        indexY = (mouseY - event.touches[0].clientY - offsetY) / (u * 2)
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

        if (lastMoveX != -1 && lastMoveY != -1) {
            if (chessboard.length - lastMoveY - 1 >= 0 && chessboard.length - lastMoveY - 1 < chessboard.length)
                if (lastMoveX >= 0 && lastMoveX < chessboard[chessboard.length - lastMoveY - 1].length)
                    chessboard[chessboard.length - lastMoveY - 1][lastMoveX].style.boxShadow = '';
            if (chessboard.length - currentY - 1 >= 0 && chessboard.length - currentY - 1 < chessboard.length)
                if (currentX >= 0 && currentX < chessboard[chessboard.length - currentY - 1].length)
                    chessboard[chessboard.length - currentY - 1][currentX].style.boxShadow = 'inset 0 0 0 3px #78acd6';
            markedPiece.style.boxShadow = 'inset 0 0 0 3px #94d678';
        }

        lastMoveX = currentX;
        lastMoveY = currentY;

    }
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

        if (lastMoveX != -1 && lastMoveY != -1) {
            if (chessboard.length - lastMoveY - 1 >= 0 && chessboard.length - lastMoveY - 1 < chessboard.length)
                if (lastMoveX >= 0 && lastMoveX < chessboard[chessboard.length - lastMoveY - 1].length)
                    chessboard[chessboard.length - lastMoveY - 1][lastMoveX].style.boxShadow = '';
            if (chessboard.length - currentY - 1 >= 0 && chessboard.length - currentY - 1 < chessboard.length)
                if (currentX >= 0 && currentX < chessboard[chessboard.length - currentY - 1].length)
                    chessboard[chessboard.length - currentY - 1][currentX].style.boxShadow = 'inset 0 0 0 3px #78acd6';
            markedPiece.style.boxShadow = 'inset 0 0 0 3px #94d678';
        }

        lastMoveX = currentX;
        lastMoveY = currentY;

        // LOG IN CASE OF PROBLEMS
        //console.log(startX, startY)
        //console.log(currentX, currentY)
    }
}

window.onload = () => {
    if (window.innerWidth <= 750) 
        u = (window.innerWidth - 75) / 18;
    else 
        u = 75 / 2

    // init 
    let chessboardtable = document.querySelector('tbody');
    let pieces = chessboardtable.querySelectorAll('div');

    chessboardtable.querySelectorAll('th').forEach(e => {
        e.addEventListener('mousedown', (event) => { if (event.preventDefault) event.preventDefault() })
        e.addEventListener('touchstart', (event) => { if (event.preventDefault) event.preventDefault() })
    })
    chessboardtable.querySelectorAll('td').forEach(e => {
        e.addEventListener('mousedown', (event) => { if (event.preventDefault) event.preventDefault() })
        e.addEventListener('touchstart', (event) => { if (event.preventDefault) event.preventDefault() })
    })

    for (let i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener('mousedown', (event) => { focusPiece(event) })
        pieces[i].addEventListener('touchstart', (event) => { mobileFocusPiece(event) })
    }

    for (let i = 0; i < chessboardtable.children.length - 1; i++) {
        chessboard.push([]);
        for (let j = 1; j < chessboardtable.children[i].children.length; j++) {
            chessboard[chessboard.length - 1].push(chessboardtable.children[i].children[j])
            chessboardtable.children[i].children[j].addEventListener('contextmenu', (event) => { event.preventDefault(); warnCase(event) })
            chessboardtable.children[i].children[j].addEventListener('click', (event) => { stopWarn(event) })
        }
    }

    chessboard = chessboard.reverse()
}

// change theme

function changeTheme() {
    let e = document.getElementById('chess-board');
    e.getAttribute('data-theme') == 'default' ? e.setAttribute('data-theme', 'gotham') : e.setAttribute('data-theme', 'default')
}
