//Obteniendo elementos de HTML.
var cellContainer = document.getElementById("cell-container");
var pieceContainer = document.getElementById("piece-container");
var dialogElement = document.getElementById("dialog");
var selectedPiece = null;

document.onkeypress = keypress;

createBoard();
createPieces();

//Creating cells
function createBoard() {
    var width = cellContainer.offsetWidth;
    var height = cellContainer.offsetHeight;

    //dividir grid en 4 x 4
    width = width / 4;
    height = height / 4;

    for(var i = 0;i < 4;i++) {
        for(var j = 0;j < 4;j++){
            let cellElement = createCell(width, height, i+","+j);
            addCell(cellElement);
        }
        
    }
}

function createCell(width, height, position) {
    cellElement = document.createElement("div");
    cellElement.style.width = width;
    cellElement.style.height = height;
    cellElement.style.border = "1px solid black";
    cellElement.style.backgroungColor = "yellow";
    cellElement.onclick = clickCell;
    cellElement.dataset.position = position;
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

    for(var i = 0;i < 16; i++){
            let pieceElement = createPiece(width, height, pieces[i]); 
            addPiece(pieceElement); 
    }

}

function generatePieceData() {
    //Generamos una lista de piezas con su path y posición.
    var pieces = [];

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            let piece = {
                image: "img/" + "arnold" + (i+1) + (j+1) + ".jpg",
                position: i+","+j
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

    cellElement.dataset.position = piece.position;
    //Configurando la pieza dentro del contenedor peizas
    pieceElement.width = width;
    pieceElement.height = height;
    pieceElement.style.border = "1px solid black";
    pieceElement.src = piece.image;
    pieceElement.dataset.position = piece.position;
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

function keypress(ke){
    //console.log("Tecla presionada");
    if(ke.keyCode == 101 || ke.keyCode == 69){
        console.log("Tecla e presionada");
        let result = evaluateBoard();
        showDialog(result);
    }

    if(ke.keyCode == 97){
        returnPieces();
    }
}

function showDialog(result){
    var imgElement = dialogElement.children[0];
    var textContent = dialogElement.children[1];    
    if(result){
        //ganaste
        //imgElement.src = "img/arnold12.jpg";
        textContent.innerText = "Ganaste";
        console.log("Ganaste!");
    }else{
        //perdiste
        //imgElement.scr = "img/arnold13.jpg"
        textContent.innerText = "Perdiste";
        console.log("Perdiste");
    }
    dialogElement.style.display = "block";
}

function evaluateBoard(){
    var cells = cellContainer.children;
    for(cell of cells){
        let piece = cell.children[0];
        if(piece.dataset.position != cell.dataset.position){
            console.log("retornando falso");
            return false;
        }
    }
    console.log("Retornando false");
    return true;
}

function returnPieces(){
    let cells = cellContainer.children;
    let cellPieces = pieceContainer.children;
    var i = 0;
    //mis position esta en formato i,j así que se tiene que ller de esa manera para el appendChild
    for(cell of cells){
        //let position = cell.dataset.position;
        let piece = cell.children[0];
        cellPieces[i].appendChild(piece);
        i++
    }
}