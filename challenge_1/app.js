var turnXorO = "X",
    moves = 0,
    score = {
        "X": 0,
        "O": 0,
    },
    EMPTY = "&nbsp;",
    boxes = [];


function init() {
    let board = document.createElement('table');//HTML
    board.setAttribute("border", 1);//CSS
    board.setAttribute("cellspacing", 0);//CSS

    let identifier = 1;
    for (let i = 0; i < 3; i++) {
        let row = document.createElement('tr');//HTML
        board.appendChild(row);//HTML

        for (let j = 0; j < 3; j++) {
            let cell = document.createElement('td');//HTML
            cell.setAttribute('height', 120);//CSS
            cell.setAttribute('width', 120);//CSS
            cell.setAttribute('align', 'center');//CSS
            cell.setAttribute('valign', 'center');//CSS

            cell.classList.add('col' + j, 'row' + i);//HTML
            if (i === j) {
                cell.classList.add('diagonal0');//HTML
            }
            if (j === 3 - i - 1) {
                cell.classList.add('diagonal1');//HTML
            }
            cell.identifier = identifier;
            cell.addEventListener("click", setBox);//HTML
            row.appendChild(cell);//HTML
            boxes.push(cell);
            identifier += identifier;
        }
    }

    document.getElementById("tictactoe").appendChild(board);//HTML
    startNewGame();
    // console.log(`boxes is ${boxes}`);
}

function startNewGame() {
    score = {
        "X": 0,
        "O": 0,
    };
    moves = 0;
    turnXorO = "X";
    boxes.forEach(tile => tile.innerHTML = EMPTY);//HTML
}

function win(clicked) {
    // Get all cell classes
    var memberOf = clicked.className.split(/\s+/);
    //makes array from all classes of element
    // where clicked can be array-like list of nodes of one or more of:
    //   .diagonal0, .diagonal1, col0, row0, col1, etc.

    // console.log(`memberOf Array is: ${memberOf}`);
    for (let i = 0; i < memberOf.length; i++) {
        var testClass = '.' + memberOf[i];
        // where testClass can be one of:
        //   .diagonal0, .diagonal1, col0, row0, col1, etc.
        var items = linearGroupOfTiles('#tictactoe ' + testClass, turnXorO);
        // console.log("it's an array? ", Array.isArray(items), items[0], items[1], items[2], items.length);
        // winning condition: turnXorO === 3
        console.log(`items length is ${items.length}`);
        if (items.length === 3) {
            return true;
        }
    }
    return false;
}


function linearGroupOfTiles(selectorTile, textIsEitherXorO) {
    var elements = document.querySelectorAll(selectorTile);
    //above sets elements to be array-like list of elements of tileNodes
    //where selectorTile is "#tictactoe .nameOfClass"
    // where .nameOfClass can be one of:
    //   .diagonal0, .diagonal1, col0, row0, col1, etc.
    console.log('nodetype is: ', JSON.stringify(elements));
    return [].filter.call(elements, tileNodeElement => RegExp(textIsEitherXorO).test(tileNodeElement.textContent));
    // include in array if text is in the node's text
    // RegExp("x").test("xx"); // true
}

function setBox() {
    console.log('setBox called!');
    if (this.innerHTML !== EMPTY) {
        return;
    }
    this.innerHTML = turnXorO;
    moves += 1;
    score[turnXorO] += this.identifier;
    if (win(this)) {
        alert('Player ' + turnXorO + ' wins!');
        startNewGame();
    } else if (moves === 3 * 3) {
        alert("Draw");
        startNewGame();
    } else {
        // console.log('got here!', moves);
        turnXorO = turnXorO === "X" ? "O" : "X"; //toggles turnXorO
    }
}

console.log("hello");
init();

