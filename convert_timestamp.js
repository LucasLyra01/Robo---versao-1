var horario_abertura = 1614901200;

var date = new Date(horario_abertura * 1000);
date = date.toLocaleTimeString();
// var date = date.toLocaleDateStringString();

console.log(date);