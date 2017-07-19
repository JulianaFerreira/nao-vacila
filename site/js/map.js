var map;
var infoWindow;

// A variável markersData guarda a informação necessária a cada marcador
// Para utilizar este código basta alterar a informação contida nesta variável
var markersData = [
   {
        "id": 1,
        "id_tipo": "1",
        "descricao": "",
        "latitude": -8.0264688,
        "titulo": "Fui asaltado ao subir no onibus",
        "data": "2017-06-29",
        "endereco": "R. Padre Lemos, 30 - Casa Amarela, Recife - PE, Brasil",
        "longitude": -34.917722,
        "id_usuario": null,
        "hora": "20:00:00"
    },
    {
        "id": 2,
        "id_tipo": "1",
        "descricao": "Saindo da academia yes fit setubal, entrei no meu carro civic cinza ano 2008 KKP2501 dois elementos me abordaram e levaram meu carro junto com meus pertences",
        "latitude": -8.1368627,
        "titulo": "fui assaltado saindo da academia",
        "data": "2017-06-29",
        "endereco": "R. Copacabana, 388 - Boa Viagem, Recife - PE, 51030-590, Brasil",
        "longitude": -34.9115769,
        "id_usuario": null,
        "hora": "21:30:00"
    },
    {
        "id": 3,
        "id_tipo": "1",
        "descricao": "",
        "latitude": -8.0601883,
        "titulo": "Assaltado voltando da faculdade",
        "data": "2017-06-28",
        "endereco": "R. Sete de Setembro, 287-341 - Boa Vista, Recife - PE, Brasil",
        "longitude": -34.8828425,
        "id_usuario": null,
        "hora": "22:15:00"
    }
];


function initialize() {
   var mapOptions = {
      center: new google.maps.LatLng(-8.017655, -34.944377),
      zoom: 9,
      mapTypeId: 'roadmap',
   };

   map = new google.maps.Map(document.getElementById('map'), mapOptions);

   // cria a nova Info Window com referência à variável infowindow
   // o conteúdo da Info Window será atribuído mais tarde
   infoWindow = new google.maps.InfoWindow();

   // evento que fecha a infoWindow com click no mapa
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Chamada para a função que vai percorrer a informação
   // contida na variável markersData e criar os marcadores a mostrar no mapa
   displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);

// Esta função vai percorrer a informação contida na variável markersData
// e cria os marcadores através da função createMarker
function displayMarkers(){

   // esta variável vai definir a área de mapa a abranger e o nível do zoom
   // de acordo com as posições dos marcadores
   var bounds = new google.maps.LatLngBounds();
   
   // Loop que vai estruturar a informação contida em markersData
   // para que a função createMarker possa criar os marcadores 
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].latitude, markersData[i].longitude);
      var titulo = markersData[i].titulo;
      var data = markersData[i].data;
      var endereco = markersData[i].endereco;
      var codPostal = markersData[i].codPostal;

      createMarker(latlng, titulo, data, endereco);

      // Os valores de latitude e longitude do marcador são adicionados à
      // variável bounds
      bounds.extend(latlng);  
   }

   // Depois de criados todos os marcadores
   // a API através da sua função fitBounds vai redefinir o nível do zoom
   // e consequentemente a área do mapa abrangida.
   map.fitBounds(bounds);
}

// Função que cria os marcadores e define o conteúdo de cada Info Window.
function createMarker(latlng, titulo, data, endereco){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: titulo
   });

   // Evento que dá instrução à API para estar alerta ao click no marcador.
   // Define o conteúdo e abre a Info Window.
   google.maps.event.addListener(marker, 'click', function() {
      
      // Variável que define a estrutura do HTML a inserir na Info Window.
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + titulo + '</div>' +
         '<div class="iw_content">' + data + '<br />' +
         endereco + '<br />' + '</div></div>';
      
      // O conteúdo da variável iwContent é inserido na Info Window.
      infoWindow.setContent(iwContent);

      // A Info Window é aberta.
      infoWindow.open(map, marker);
   });
}