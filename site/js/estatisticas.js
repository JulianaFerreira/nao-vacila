var estatisticasData = new Array();
var bairros = new Array();

//GET JSON ESTATISTICAS
/*$.getJSON( "https://webserver-nao-vacila.herokuapp.com/estatisticas/", function( data ) {
    estatisticasData = data;
	bairrosOcorrencias();
})*/

window.onload = function () {
	var chartMes = new CanvasJS.Chart("chartContainerMes",
        {

          title:{
          text: "Ocorrencias - por mês"
          },
           data: [
          {
            type: "line",

            dataPoints: [
            { x: new Date(2011, 11, 31), y: 450 },
            { x: new Date(2012, 11, 31), y: 414 },
            { x: new Date(2013, 11, 31), y: 520 },
            { x: new Date(2014, 11, 31), y: 460 },
            { x: new Date(2015, 11, 31), y: 450 },
            { x: new Date(2016, 11, 31), y: 500 },
            { x: new Date(2017, 11, 31), y: 480 }
            ]
          }
          ]
        });

        chartMes.render();
	
	var chartTipo = new CanvasJS.Chart("chartContainerTipo",
        {
            theme: "theme2",
            title:{
                text: "Tipos de ocorrências"
            },
            data: [
            {
                type: "pie",
                showInLegend: true,
                toolTipContent: "{y} - #percent %",
                yValueFormatString: "#0.#,,. Million",
                legendText: "{indexLabel}",
                dataPoints: [
                    {  y: 4181563, indexLabel: "Roubo" },
                    {  y: 2175498, indexLabel: "Furto" },
                    {  y: 3125844, indexLabel: "Sequestro" },
                    {  y: 1176121, indexLabel: "Arrombamento"},
                    {  y: 1727161, indexLabel: "Tiroteio" },
                    {  y: 4303364, indexLabel: "Homicídios"},
                    {  y: 1717786, indexLabel: "Tráfico"}
                ]
            }
            ]
        });
        chartTipo.render();
}

function bairrosOcorrencias() {//adicionar a var "bairros" os 5 bairros com mais ocorrencias FALTA CORRIGIR
	var countBairros = 0;
	var maior = 0;
	for (var i = 0; i < estatisticasData.length; i++){
		if(estatisticasData[i] >= maior){
			bairros[countBairros] = estatisticasData[i];
		   	maior = estatisticasData[i];
			countBairros++;
		}
   }
	criarTabela();
}

function criarTabela() {
	for(var i = 0; i < bairros.length; i++){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var bairro = document.createTextNode(bairros[i]);
		tr.appendChild(td).appendChild(bairro);
		document.getElementById('bairros').appendChild(tr);
	}
}