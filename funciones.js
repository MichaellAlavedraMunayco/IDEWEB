var obj = { a: 0, get b() { return this.a; }, set c(x) { this.a = x; }};

function onMouseUp(div) {
    var selection;  
    if (window.getSelection()) selection = window.getSelection(); else return;
    if(selection.toString()!==''){
        var arraytext = selection.toString().split('\n'), cont = 1;
        for (var i = 0; i < arraytext.length; i++)
            if(arraytext[i].trim().length == 0) cont++;
        obj.c = arraytext.length - cont;
    }
}

function onKeyDown(div){
    if(obj.b > 0){
        var lines = document.getElementById("numero_lineas_codigo");
        for (var i = 0; i < obj.b; i++) lines.removeChild(lines.lastElementChild);
        obj.c = 0;
    }
    if(event.keyCode === 8) dropLine();
    if(event.keyCode === 9) insertTab();
}

function onKeyUp(div) {
    if(event.keyCode === 13) updateColorCode(div); 
    updateLine();
}

function updateColorCode(div){
    var codigo = div.innerText,arraylines = codigo.split('\n'), codigodiv = '';
    for (var i = 0; i < arraylines.length; i++) {
        if(arraylines[i] == '') continue;
        var line = '', arraywords = arraylines[i].split(' '), comentario = 0, doble = 0, simple = 0;
        for(var j = 0; j < arraywords.length; j++){
            var arraychar = arraywords[j].split('');
            for(var k = 0; k < arraychar.length; k++){
                if(arraychar[k] == '\"') {
                    doble++; if(doble==2) doble = 0;
                }
                if(arraychar[k] == '\'') {
                    simple++; if(simple==2) simple = 0;
                }
                if(arraychar[k] == '#') comentario = 1;
                line += evaluarChar(arraychar[k], doble, simple, comentario);
            } line += ' ';
        }
        comentario = 0;
        line = evaluarWord(line);
        codigodiv += "<div class='linea_codigo'>" + line + "</div>"; 
    }
    document.getElementById("codeinput").innerHTML = codigodiv+"<div>";
    espaciado(div);
}

function evaluarWord(linea){
    var reser = ["esquema", "importa", 
                 "clase", "si", "sino", "publica", "publico", "privado", "privada", "protegido", "protegida",
                 "global", "indefinido", "evalua", "sies", "termina", "ninguno", "usa", "desde" , "hasta", "incrementa", "disminuye", 
                 "continua", "realiza", "mientrasque", "capturaerroren", "sihayerror", "reporta", "porultimo",
                 "metodo", "constructor", "retorna",
                 "variable", "var", "constante", "entero", "decimal", "texto", "caracter", "cuestion",
                 "local", "padre",
                 "hereda", "implementa", "modelo",
                 "vacia", "cierto", "falso"];
    var color;
    for(var i = 0; i < reser.length; i++){
        if(i == 0){ color = "naranja";} if(i == 2){ color = "rosa";}
        if(i == 29){ color = "verde";}  if(i == 32){ color = "celeste";}
        if(i == 40){ color = "azul";}   if(i == 42){ color = "moradooscuro";} if(i == 44){ color = "moradoclaro";}
        if(linea.toLowerCase().includes(reser[i])){
            var regexp = new RegExp(reser[i]+' ',"gi");
            linea = linea.replace(regexp, "<span class='"+color+"'>"+reser[i]+"</span> ");
        }
    }
    return linea;
}

function evaluarChar(caracter, doble, simple, comentario){
    switch(caracter){
        case ';': case '*': case '+': case '-': case '*': case '/': case '%': case '<': case '>': 
        case '=': case '!': case '?': case ':': case '.': case ';': case '&': case '|':
            if(comentario==1)return "<span class='verdeceleste'>"+caracter+"</span>"; 
            if(doble==1||simple==1)return "<span class='verdeoscuro'>"+caracter+"</span>"; 
            return "<span class='rojo'>"+caracter+"</span>"; 
        break;
        case '{': case '}': case '(': case ')': case '{': case '}': case '[': case ']': case ',': 
            if(comentario==1)return "<span class='verdeceleste'>"+caracter+"</span>";
            if(doble==1||simple==1)return "<span class='verdeoscuro'>"+caracter+"</span>";
            return "<span class='plomoclaro'>"+caracter+"</span>";
        break;
        case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
            if(comentario==1)return "<span class='verdeceleste'>"+caracter+"</span>"; 
            if(doble==1||simple==1)return "<span class='verdeoscuro'>"+caracter+"</span>"; 
            return "<span class='moradoclaro'>"+caracter+"</span>"; 
        break;
        case '\"': case '\'': 
            if(comentario==1)return "<span class='verdeceleste'>"+caracter+"</span>";
            return "<span class='verdeoscuro'>"+caracter+"</span>" 
        break;
        case '#':
            return "<span class='verdeceleste'>"+caracter+"</span>" 
        break;
        default:
            if(comentario==1) return "<span class='verdeceleste'>"+caracter+"</span>" 
            if(doble==1||simple==1) return "<span class='verdeoscuro'>"+caracter+"</span>" 
            return caracter;
        break;
    }
}

function insertTab(){
    event.preventDefault(); 
    var sel = window.getSelection(), range = sel.getRangeAt(0), tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
    range.insertNode(tabNode);
    range.setStartAfter(tabNode);
    range.setEndAfter(tabNode);
    sel.removeAllRanges();
    sel.addRange(range);
}

function cantidadLineasCodigo(){
    var code = document.getElementById("codeinput");
    var codediv = code.children;
    var cantdiv = 0;
    for(var i = 0; i < codediv.length; i++){
        if(codediv[i].tagName == 'DIV'){
            cantdiv++;
        }
    }
    return cantdiv; 
}

function dropLine(){
    var lines = document.getElementById("numero_lineas_codigo");
    var code = document.getElementById("codeinput");
    var lastcodeline = code.lastElementChild.innerText;
    var numLines = cantidadLineasCodigo();
    if(lastcodeline.length == 0 && numLines > 1){
        lines.removeChild(lines.lastElementChild);
    }
    if(lastcodeline.length == 0 && numLines == 1){
        var newdiv = document.createElement("DIV");
        code.replaceChild(newdiv, code.childNodes[0]);
    }
}

function updateLine(){
    var lines = document.getElementById("numero_lineas_codigo");
    var codelines = document.getElementById("codeinput").children;
    while(lines.lastElementChild) {
        if(lines.lastElementChild.innerText == 1) break;
        lines.removeChild(lines.lastElementChild);
    }
    for (var j = 2; j <= codelines.length; j++) {// <br>
        lines.innerHTML += "<div>"+j+"</div>";
    }
}

function espaciado(elem){
    var range = document.createRange(), sel = window.getSelection();
    range.setStartAfter(elem.children[elem.children.length - 1]);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

function cambioTema(input) {
    if(input.checked){
        document.getElementById("columna_botones").classList.remove("col_buttons");
        document.getElementById("columna_botones").classList.add("col_buttons_oscuro");
        var colbutton = document.getElementById("columna_botones").children;
        for(var i = 0; i < colbutton.length; i++){
            if(colbutton[i].tagName == 'A'){
                colbutton[i].classList.remove("button");
                colbutton[i].classList.add("button_oscuro");
            }
        }
        document.getElementById("col_code_editor").classList.remove("columna_codigo_claro");
        document.getElementById("col_code_editor").classList.add("columna_codigo_oscuro");
        document.getElementById("numero_lineas_codigo").classList.remove("numero_linea_codigo_claro");
        document.getElementById("numero_lineas_codigo").classList.add("numero_linea_codigo_oscuro");
        document.getElementById("codeinput").classList.remove("area_codigo_claro");
        document.getElementById("codeinput").classList.add("area_codigo_oscuro");
        var code = document.getElementById("codeinput").children;
        for(var i = 0; i < code.length; i++){
            if(code[i].tagName == 'DIV'){
                code[i].classList.remove("linea_codigo");
                code[i].classList.add("linea_codigo_oscuro");
            }
        }
        document.getElementById("archivos").classList.remove("area_archivos_proyecto_claro");
        document.getElementById("archivos").classList.add("area_archivos_proyecto_oscuro");
        document.getElementById("compilacion").classList.remove("area_compilacion_claro");
        document.getElementById("compilacion").classList.add("area_compilacion_oscuro");
        document.getElementById("herramientas").classList.remove("barra_inferior_claro");
        document.getElementById("herramientas").classList.add("barra_inferior_oscuro");
    }else{
        document.getElementById("columna_botones").classList.remove("col_buttons_oscuro");
        document.getElementById("columna_botones").classList.add("col_buttons");
        var colbutton = document.getElementById("columna_botones").children;
        for(var i = 0; i < colbutton.length; i++){
            if(colbutton[i].tagName == 'A'){
                colbutton[i].classList.remove("button_oscuro");
                colbutton[i].classList.add("button");
            }
        }
        document.getElementById("col_code_editor").classList.remove("columna_codigo_oscuro");
        document.getElementById("col_code_editor").classList.add("columna_codigo_claro");
        document.getElementById("numero_lineas_codigo").classList.remove("numero_linea_codigo_oscuro");
        document.getElementById("numero_lineas_codigo").classList.add("numero_linea_codigo_claro");
        document.getElementById("codeinput").classList.remove("area_codigo_oscuro");
        document.getElementById("codeinput").classList.add("area_codigo_claro");
        var code = document.getElementById("codeinput").children;
        for(var i = 0; i < code.length; i++){
            if(code[i].tagName == 'DIV'){
                code[i].classList.remove("linea_codigo_oscuro");
                code[i].classList.add("linea_codigo");
            }
        }
        document.getElementById("archivos").classList.remove("area_archivos_proyecto_oscuro");
        document.getElementById("archivos").classList.add("area_archivos_proyecto_claro");
        document.getElementById("compilacion").classList.remove("area_compilacion_oscuro");
        document.getElementById("compilacion").classList.add("area_compilacion_claro");
        document.getElementById("herramientas").classList.remove("barra_inferior_oscuro");
        document.getElementById("herramientas").classList.add("barra_inferior_claro");
    }
}

function descargarArchivo(){
    var codigo = document.getElementById("codeinput").innerText;
    var codigoblob = new Blob([codigo], {type:'text/bg'});
    var nombrearchivo = prompt("Nombre del archivo");
    var link = document.createElement('A');
    link.download = nombrearchivo;
    link.innerHTML = "Descarga archivo";
    if(window.URL != null){
        link.href = window.URL.createObjectURL(codigoblob);
    }else{
        link.href = window.URL.createObjectURL(codigoblob);
        link.onclick = function destroy(e){ document.body.removeChild(e.target);}
        link.style.display = "none";
        document.body.appendChild(link);
    }
    link.click();
}