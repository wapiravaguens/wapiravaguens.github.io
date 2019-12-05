// El primer paso es crear un nuevo objeto "Phaser.Game" y definir su tamaño
var cnv = new Phaser.Game(1680, 720, Phaser.CANVAS, "mapa_interactivo");

var background; // Mapa de fondo
var icons = []; // Iconos del mapa

// Posiciones de los sprites
var pos = [[510, 155],
[500,65], 
[440,0],
[360,110],
[370,210],
[370,325],
[470,290],
[570,275],
[330,445],
[555,370],
[305,660]];

// Nombres de cada lugar
var names = ["Lugares de Corea del Sur",
"Parque Seoraksan",
"N Seoul Tower",
"Templo Jogysa",
"Fortaleza de Hwasong",
"Jeonju Hanok",
"Templo de Haeinsa",
"Templo Bulguksa",
"Museo Nacional de Gwangju",
"Parque Taejongdae",
"Montaña Hallasan"
];

// Descripción de cada lugar
var descriptions = [
"\nLa República de Corea (대한민국) es un país soberano de Asia Oriental, ubicado en la parte sur de la península de Corea, entre los muchos lugares que posee destacan sus templos, parques naturales y museos.\n\nSeleccione los diferentes lugares del mapa haciendo clic con el cursor o el dedo en los iconos rojos, también puede alternar entre imágenes y descripciones con el botón rojo ubicado en la parte inferior derecha.",
"Es un área protegida que está en la lista tentativa del gobierno de Corea del Sur, como Patrimonio de la Humanidad de la UNESCO. El gobierno coreano designó el área como una reserva natural en 1965 y la UNESCO designó el área como Reserva de la Biosfera en 1982. También fue el primer parque nacional de Corea en ser designado en virtud de la Ley de Parques Nacionales en 1970. Situado en el este y el centro de la península de Corea, la reserva abarca Injegun, Yanyanggun y Sokchosi. Es una de las atracciones más populares para los turistas y los amantes de la naturaleza en Corea. La Reserva Natural de Soraksan es valiosa por su belleza natural y la flora y la fauna.",
"Es una torre de comunicaciones ubicada en el parque de Namsan, en el centro de Seúl, Corea del Sur. Construida en 1969, fue abierta al público en 1980, la torre ha devenido un símbolo de Seúl. Tiene una altura de 236,7 m. (a partir de la base) y se encuentra a 479,7 m. sobre el nivel del mar. También se le ha conocido como la Torre Namsan o la Torre de Seúl. Después de que el propietario inicial de la torre se fusionara con CJ Corporation, fue rebautizada con el nombre de la N Seoul Tower (nombre oficial CJ Seoul Tower).\n\nLa mayoría de los visitantes toman el Teleférico de Namsan hasta la cima de la montaña y, a continuación, a pie hasta la torre. La torre cuenta con una tienda de regalos y restaurantes en la planta baja.",
"El templo Jogyesa es el núcleo del budismo zen en Corea, en él se encuentran la oficina principal de administración del budismo coreano y la sala en donde se realiza la asamblea general, entre otras instalaciones.\n\nFue construido hacia finales del siglo XIV (época de Goryeo) en el interior del actual parque Susong, pero fue destruido (en un período indeterminado) debido a un incendio, y fue reconstruido en el año 1910. A lo largo de su historia ha tomado varios nombres, hasta que recibió la denominación de Jogyesa en el año 1954. El nombre deriva de la montaña Jogyesan, la cual fue el lugar en donde meditó el monje Hyeneungdaesa. Fue uno de los monjes más respetados, por lo cual sus enseñanzas y su vida han sido objeto de estudio a lo largo de la historia.",
"Es una fortaleza en la ciudad de Suwon la capital provincial de Gyeonggi-do, Corea del Sur. Fue construida de 1794 a 1796. El rey Jeongjo de la Dinastía Chosŏn construyó la fortaleza para honrar y albergar los restos mortales de su padre el príncipe Sado. Este príncipe había sido condenado a morir encerrado dentro de un cofre de arroz por su propio padre, el rey Yeongjo, al no obedecer el mandato de suicidarse. Situado a 30 kilómetros al sur de Seúl y encerrando gran parte del centro de Suwon, la Fortaleza incluye el palacio Haenggung del Rey Jeongjo.",
"Visitar la villa tradicional de Jeonju “Jeonju Hanok Village” es retroceder en el tiempo y al mismo tiempo estar en el siglo XXI. Ubicada en la ciudad de Jeonju, capital de la provincia de Jeollabuk-do, conserva en su interior una de las colecciones más grandes de las casas tradicionales coreanas conocidas como hanok. Dichas casas fueron por primera vez diseñadas y construidas durante la dinastía de Joseon en el siglo XIV y en Jeonju alrededor de 800 están organizadas dentro de una red de calles adoquinadas. La mayoría de ellas han sido transformadas en coffee shops, boutiques y guesthouses con todas las comodidades de nuestra era convirtiendo a esta villa en una atractiva escapada para el fin de semana.",
"Haeinsa es un templo budista construido en el año 802 en Gyeongsang del Sur, en Corea del Sur. En el Changgyong P'ango, está guardado la Tripitaka Coreana, la más completa colección de textos budistas, grabada en 80.000 bloques de madera. El templo incluye también varios tesoros nacionales de Corea del Sur, como interesantes pinturas budistas, pagodas de piedra y linternas.\n\nHaeinsa es uno de los Tres Templos de la Joya de Corea, y representa el Dharma o las enseñanzas del Buda. Sigue siendo un centro activo de la práctica de Seon (선, 禪) en los tiempos modernos, y era el templo casero del influyente reverendo Seongcheol (성철, 性 徹), que murió en 1993.",
"El Bulguksa es un templo budista en Gyeongju, en Corea del Sur, antigua capital del reino de Silla. En este templo se encuentran siete tesoros nacionales de Corea, incluidas las pagodas de Dabotap y Seokgatap, el Cheongun-gyo (puente de la Nube Azul) y dos estatuas de buda de bronce bañado en oro. El templo está considerado una obra maestra del apogeo del budismo en el Reino de Silla. El templo de Bulguska, junto a la gruta de Seokguram, fue declarado Patrimonio de la Humanidad por la Unesco en el año 1995.\n\nEl templo es considerado como una obra maestra de la edad de oro del arte budista en el reino de Silla. Actualmente el templo principal del 11mo distrito de la Orden de Jogye del Budismo coreano.",
"El Museo Nacional de Gwangju fue abierto el 6 de diciembre de 1978 con la finalidad de impulsar la apropiación consciente de patrimonios de la comunidad fortaleciendo las raíces históricas y culturales, así como la identidad local y regional.\n\nEl museo fue construido según las especificaciones de un edificio tradicional y consta de 6 pisos en total, con numerosas salas de exhibiciones espaciosas y un jardín al aire libre que también sirve para presentar diferentes obras y objetos del museo. Con la remodelación realizada en diciembre de 1996 se agregó una sala de arte budista y una sala de exhibiciones especiales.",
"Es un parque natural de Busan, Corea del Sur, con magníficos acantilados frente al mar abierto en el extremo sur de la isla de Yeongdo-gu. Es una atracción turística representativa de Busan, donde hay densos árboles de hoja perenne y varias instalaciones para turistas, como un observatorio, un parque de diversiones, una casa de luces y un terminal de cruceros. Se dice que su nombre lo tomó del rey Taejong Muyeol (604-661), el 29 ° rey del Reino de Silla, a quien le gustaba practicar tiro con arco en el lugar después de la unificación de los Tres Reinos de Corea. Taejongdae es designado como el monumento 28 Busan, junto con la isla Oryukdo.",
"Es un volcán en escudo en la Isla de Jeju en el país asiático de Corea del Sur. Hallasan es la montaña más alta de Corea del Sur. El área alrededor de la montaña fue declarada Parque Nacional, con la denominación de \"Parque Nacional Hallasan\" (Hallasan Gungnip Gongwon/한라산국립공원/漢拏山國立公園). Hallasan es comúnmente considerado como una de las tres principales montañas de Corea del Sur, siendo Jirisan y Seoraksan las otros dos. Hallasan es un volcán en escudo masivo que forma la mayor parte de la isla de Jeju y es considerado a menudo como si representara la propia isla. Hay un dicho local, que afirma que \"la isla de Jeju es Hallasan, y es Hallasan de Jeju\"."
]

var title; // Titulo de la sección de infórmación
var description; // Descripción de la sección de infórmación
var picture; // Imagen de la sección de infórmación
var selected = 0; // Indice del lugar seleccionado
var showImage = false; // Booleando de mostrar o no la imagen
var button_text; // Texto del boton

// El estado del mapa con tres métodos básicos: preload, create y update
var state = {
  preload: function() { // primero carga todas las imágenes
    //Escalar el canvas para que se vea siempre completo
    cnv.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Cargar imagenes
    cnv.load.image("map", "img/map/background.png");
    for (var i = 0; i <= 10 ; i++) {
      cnv.load.image("icon" + i.toString(), "img/map/icon" + i.toString() + ".png");
      cnv.load.image("img_" + i.toString(), "img/map/img_" + i.toString() + ".jpg");
    }
    cnv.load.spritesheet('button', 'img/map/button_sprite_sheet.png', 193, 71);
  },
  
  create: function() { // crea los actores y muestra las imágenes
    background = cnv.add.tileSprite(0, 0, 1680, 720, "map"); // Agregar el mapa de fondo al canvas
    for (var i = 0; i <= 10; i++) { 
      icons[i] = cnv.add.sprite(pos[i][0], pos[i][1], "icon" + (i).toString()); // Agregar los iconos del mapa al canvas
      icons[i].setScaleMinMax(0.425); // Ajustar el tamaño de los sprites
      icons[i].inputEnabled = true; // Habilitar selección 
      icons[i].input.useHandCursor = true;
      icons[i].events.onInputDown.add(this.iconPressed, {id: i}); // Manejo de click sobre los iconos
    }

    // Cuadro de información
    var info_rect = cnv.add.graphics(100, 100);
    info_rect.beginFill(0x006c9d, 1);
    info_rect.drawRoundedRect(825, 30 , 700, 500);

    // Titulo del lugar
    title = cnv.add.text(1275, 145, names[selected], {fill: "#ffffff", font: "50px Roboto-Regular", wordWrap: true, wordWrapWidth: 660});
    title.anchor.setTo(0.5, 0);

    // Descripción del lugar
    description = cnv.add.text(950, 205, descriptions[selected], {fill: "#ffffff", font: "20px Roboto-Regular", wordWrap: true, wordWrapWidth: 660});

    // Imagen del lugar
    picture = cnv.add.image(1275, 375, "img_" + selected.toString());
    picture.anchor.setTo(0.5);
    picture.scale.setTo(0.7);

    // Boton para cambiar entre imagen y descripción
    var button = cnv.add.button(1425, 560, 'button', this.buttonPressed, this, 2, 1, 0);
    button.scale.setTo(1, 0.8);
    button_text = cnv.add.text(1520, 567, "Imagen", {fill: "#ffffff", font: "30px Roboto-Regular", wordWrap: true, wordWrapWidth: 660});
    button_text.anchor.setTo(0.5, 0);
  },
  
  update: function(){ // ejecuta de manera reiterativa
    for (var i = 0; i < icons.length; i++) {
      icons[i].setScaleMinMax(0.425); // Reescalar los sprite a tamaño normal
      if (icons[i].input.pointerOver()){
        icons[i].setScaleMinMax(0.48); // Se incrementa la escala del sprite con el cursos encima
      }
    }

    icons[selected].setScaleMinMax(0.48); // Se incrementa la escala del sprite seleccionado
    title.text = names[selected]; // Actualiza titulo del lugar seleccionado
    description.text = descriptions[selected]; // Actualiza descripción del lugar seleccionado
    picture.loadTexture("img_" + selected.toString()); // Actualiza la imagen segun el lugar seleccionado

    if (showImage) {
      // Quitar la descripción, luego mostrar la imagen
      description.text = ""; 
      picture.visible = true;
    } else {
      // Quitar la imagen, luego mostrar la descripción
      picture.visible = false;
      description.text = descriptions[selected];
    }
  },

  buttonPressed: function(){
    showImage = !showImage;
    button_text.text = showImage ? "Descripción" : "Imagen";
  },

  iconPressed: function(){
    selected = this.id;  // Actualiza el indice del lugar seleccionado
  }
}

cnv.state.add("map", state); // define a "map" como un estado
cnv.state.start("map"); // inicia con el estado "map"