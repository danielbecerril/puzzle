//Obteniendo elementos de HTML.
var cellContainer = document.getElementById("cell-container");
var pieceContainer = document.getElementById("piece-container");
var selectedPiece = null;

createBoard();
createPieces();
//Creating cells
function createBoard() {
    var width = cellContainer.offsetWidth;
    var height = cellContainer.offsetHeight;

    //dividir grid en 4 x 4
    width = width / 4;
    height = height / 4;

    for(var i = 0;i < 16;i++) {
        let cellElement = createCell(width, height);
        addCell(cellElement);
    }
}

function createCell(width, height) {
    cellElement = document.createElement("div");
    cellElement.style.width = width;
    cellElement.style.height = height;
    cellElement.style.border = "1px solid black";
    cellElement.style.backgroungColor = "yellow";
    cellElement.onclick = clickCell;

    return cellElement;
}

function addCell(element) {
    cellContainer.appendChild(element);
}
//Creating pieces
function createPieces() {
    var width = pieceContainer.offsetWidth;
    var height = pieceContainer.offsetHeight;
    width /= 4;
    height /= 4;
    var pieces = generatePieceData();

    for(let i = 0;i < 16; i++){
            let pieceElement = createPiece(width, height, pieces[i]);  
            addPiece(pieceElement);
    }

}

function generatePieceData() {
    //Generamos una lista de piezas con su path y posición.
    var pieces = [];

    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            let piece = {
                image: "img/" + "arnold" + i + j + ".jpg",
                position: [i]
            };
            pieces.push(piece);
        }
    }
    return pieces;
}

function createPiece(width, height, piece) {

    var cellElement = document.createElement("div");
    var pieceElement = document.createElement("img");
    //Configutando la celda para la pieza
    cellElement.style.width = width;
    cellElement.style.height = height;


    //Configurando la pieza dentro del contenedor peizas
    pieceElement.width = width;
    pieceElement.height = height;
    pieceElement.style.border = "1px solid black";
    pieceElement.src = piece.image;
    pieceElement.onclick = clickPiece;
    //Mandar la pieza dentro de la celda
    cellElement.appendChild(pieceElement);

    //Retornando el cellElement
    return cellElement;
}

function addPiece(element) {
    pieceContainer.appendChild(element);
}


//Pieces event
function clickPiece(e) {
    var piece = e.target;
    selectedPiece = piece;
}   

//Cell event
function clickCell(e) {
    if(selectedPiece) {
        let cell = e.target;
        cell.appendChild(selectedPiece);
    }else {
        console.log("Seleccione una pieza.");
    }
}