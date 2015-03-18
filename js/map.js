/**
 * Created by Ross on 17/02/2015.
 */
document.getElementById('btn1').style.visibility = 'hidden';
document.getElementById('btn2').style.visibility = 'hidden';
$(window).load(function() {



    // Sets the width and height of the canvas
    var $width = document.getElementById('map').clientWidth;
    // var $height = document.getElementById('content').clientHeight - 14;
    var $height = document.getElementById('map').clientHeight;

    var json;
    var json2;

    $.ajax({
        url: "php/get.php",

        type: "POST",

        data: {action: 'getmap'},



        success: function (data) {
            json = JSON.parse(data);
            //edit = json.edit;


            json = JSON.parse(json.json2);
            //json2 = JSON.parse(json.json);
            //console.log(json);

            if (json == null){
                bootbox.dialog({
                    message: "<div class='jumbotron'>\
                    <h1>Welcome!</h1>\
                    <p>To create a new map please click New Map</p>\
                    <p>Or if you've already created your map, place your sensors by click Sensors</p>\
                    </div>",

                    onEscape: function() {},

                    show: true,


                    closeButton: true,

                    animate: true,

                    className: "my-modal",

                    buttons: {

                        "Sensors": {
                            className: "btn-primary",
                            callback: function() {
                                window.location.href = "sensors.php";
                            }
                        },

                        success: {

                            label: "New Map!",

                            className: "btn-success",

                            callback: function() {
                                window.location.href = "build.php";
                            }
                        }


                    }
                });
            }



            json = JSON.stringify(json);

            var stage = Konva.Node.create(json, 'map');
            var circles = stage.find('Circle');

            circles.each(function (circle) {
                circle.draggable(false);
            });

            var text = stage.find('Text');

            text.each(function (text){
                text.draggable(false);
            });

            var group = stage.find('Group');

            group.each(function (group) {
                group.draggable(false);
            });

            var topLeft = stage.get('.topLeft');

            topLeft.each(function (anchor){
               anchor.hide();
            });

            var topRight = stage.get('.topRight');

            topRight.each(function (anchor){
                anchor.hide();
            });

            var bottomRight = stage.get('.bottomRight');

            bottomRight.each(function (anchor){
                anchor.hide();
            });

            var bottomLeft = stage.get('.bottomLeft');

            bottomLeft.each(function (anchor){
                anchor.hide();
            });

            var triangle = stage.find('RegularPolygon');

            triangle.each(function (triangle) {
                triangle.draggable(false);
            });

            var images = stage.find('Image');
            //var x = -1;
            var bed = 0;
            var bath = 0;
            var cutlery = 0;
            var wash = 0;
            var screen = 0;
            var couch = 0;
            var open = 0;
            var s1 = 0;
            var s2 = 0;
            var s3 = 0;
            var s4 = 0;
            var s5 = 0;
            var s6 =0;
            images.each(function (image) {

                if (image.attrs['id'] == "bed") {

                    var imageObj = new Image();

                    //console.log(stage.get('.bed'));

                    imageObj.onload = function () {


                        stage.get('.bed')[bed].image(imageObj);
                        stage.get('.bed')[bed].draggable(false);
                        stage.draw();
                        bed++;
                    };

                    imageObj.src = 'images/sleeping.png';


                }

                else if (image.attrs['id'] == "bathroom") {
                    var bathroom = new Image();
                    bathroom.onload = function () {

                        stage.get('.bathroom')[bath].image(bathroom);
                        stage.get('.bathroom')[bath].draggable(false);
                        stage.draw();
                        bath++;
                    };

                    // sensor2.setAttribute('draggable', 'false');
                    bathroom.src = 'images/bathroom24.png';
                }

                else if (image.attrs['id'] == "kitchen") {

                    var kitchen = new Image();

                    kitchen.onload = function () {

                        stage.get('.kitchen')[cutlery].image(kitchen);
                        stage.get('.kitchen')[cutlery].draggable(false);
                        stage.draw();
                        cutlery++;
                    };

                    // sensor2.setAttribute('draggable', 'false');
                    kitchen.src = 'images/cutlery22.png';
                }

                else if (image.attrs['id'] == "washer") {

                    var washer = new Image();

                    washer.onload = function () {

                        stage.get('.washer')[wash].image(washer);
                        stage.get('.washer')[wash].draggable(false);
                        stage.draw();
                        wash++;
                    };

                    // sensor2.setAttribute('draggable', 'false');
                    washer.src = 'images/washer.png';
                }

                else if (image.attrs['id'] == "tv") {

                    var tv = new Image();

                    tv.onload = function () {

                        stage.get('.tv')[screen].image(tv);
                        stage.get('.tv')[screen].draggable(false);
                        stage.draw();
                        screen++;
                    };

                    // sensor2.setAttribute('draggable', 'false');
                    tv.src = 'images/screen54.png';
                }

                else if (image.attrs['id'] == "sofa") {

                    var sofa = new Image();

                    sofa.onload = function () {

                        stage.get('.sofa')[couch].image(sofa);
                        stage.get('.sofa')[couch].draggable(false);
                        stage.draw();
                        couch++;
                    };

                    // sensor2.setAttribute('draggable', 'false');
                    sofa.src = 'images/sofa12.png';
                }

                else if (image.attrs['id'] == "door") {

                    var door = new Image();

                    door.onload = function () {

                        stage.get('.door')[open].image(door);
                        stage.get('.door')[open].draggable(false);
                        stage.draw();
                        open++;
                    };

                    // sensor2.setAttribute('draggable', 'false');
                    door.src = 'images/open129.png';
                }

                else if (image.attrs['id'] == "sensor1") {

                    var sens1 = new Image();

                    sens1.onload = function () {

                        stage.get('.sensor1')[s1].image(sens1);
                        stage.get('.sensor1')[s1].draggable(false);
                        stage.get('.sensor1')[s1].on('mouseover mouseout', function() {
                            document.body.style.cursor = 'pointer';
                            });
                        stage.get('.sensor1')[s1].on('mouseout', function() {
                            document.body.style.cursor = 'default';
                        });
                        stage.get('.sensor1')[s1].on('click tap', function(){
                            document.getElementById("btn1").value = "sensor1";
                            document.getElementById("btn2").value = "1";
                            console.log( document.getElementById("btn1").value + " " + document.getElementById("btn2").value);
                            document.getElementById("fetch").click();
                            $('#basicModal').modal('toggle');
                        });
                        stage.draw();
                        s1++;
                    };
                    sens1.src = 'images/sensor1.png';
                }

                else if (image.attrs['id'] == "sensor2") {

                    var sens2 = new Image();

                    sens2.onload = function () {

                        stage.get('.sensor2')[s2].image(sens2);
                        stage.get('.sensor2')[s2].draggable(false);
                        stage.get('.sensor2')[s2].on('mouseover mouseout', function() {
                            document.body.style.cursor = 'pointer';
                        });
                        stage.get('.sensor2')[s2].on('mouseout', function() {
                            document.body.style.cursor = 'default';
                        });
                        stage.get('.sensor2')[s2].on('click tap', function(){
                            document.getElementById("btn1").value = "sensor2";
                            document.getElementById("btn2").value = "1";
                            document.getElementById("fetch").click();
                            $('#basicModal').modal('toggle');
                        });
                        stage.draw();
                        s2++;
                    };
                    sens2.src = 'images/sensor2.png';
                }

                else if (image.attrs['id'] == "sensor3") {

                    var sens3 = new Image();

                    sens3.onload = function () {

                        stage.get('.sensor3')[s3].image(sens3);
                        stage.get('.sensor3')[s3].draggable(false);
                        stage.get('.sensor3')[s3].on('mouseover mouseout', function() {
                            document.body.style.cursor = 'pointer';
                        });
                        stage.get('.sensor3')[s3].on('mouseout', function() {
                            document.body.style.cursor = 'default';
                        });
                        stage.get('.sensor3')[s3].on('click tap', function(){
                            document.getElementById("btn1").value = "sensor3";
                            document.getElementById("btn2").value = "1";
                            console.log( document.getElementById("btn1").value + " " + document.getElementById("btn2").value);
                            document.getElementById("fetch").click();
                            $('#basicModal').modal('toggle');
                        });
                        stage.draw();
                        s3++;
                    };
                    sens3.src = 'images/sensor3.png';
                }

                else if (image.attrs['id'] == "sensor4") {

                    var sens4 = new Image();

                    sens4.onload = function () {

                        stage.get('.sensor4')[s4].image(sens4);
                        stage.get('.sensor4')[s4].draggable(false);
                        stage.get('.sensor4')[s4].on('mouseover mouseout', function() {
                            document.body.style.cursor = 'pointer';
                        });
                        stage.get('.sensor4')[s4].on('mouseout', function() {
                            document.body.style.cursor = 'default';
                        });
                        stage.get('.sensor4')[s4].on('click tap', function(){
                            document.getElementById("btn1").value = "sensor4";
                            document.getElementById("btn2").value = "1";
                            console.log( document.getElementById("btn1").value + " " + document.getElementById("btn2").value);
                            document.getElementById("fetch").click();
                            $('#basicModal').modal('toggle');
                        });
                        stage.draw();
                        s4++;
                    };
                    sens4.src = 'images/sensor4.png';
                }

                else if (image.attrs['id'] == "sensor5") {

                    var sens5 = new Image();

                    sens5.onload = function () {

                        stage.get('.sensor5')[s5].image(sens5);
                        stage.get('.sensor5')[s5].draggable(false);
                        stage.get('.sensor5')[s5].on('mouseover mouseout', function() {
                            document.body.style.cursor = 'pointer';
                        });
                        stage.get('.sensor5')[s5].on('mouseout', function() {
                            document.body.style.cursor = 'default';
                        });
                        stage.get('.sensor5')[s5].on('click tap', function(){
                            document.getElementById("btn1").value = "sensor5";
                            document.getElementById("btn2").value = "1";
                            console.log( document.getElementById("btn1").value + " " + document.getElementById("btn2").value);
                            document.getElementById("fetch").click();
                            $('#basicModal').modal('toggle');
                        });
                        stage.draw();
                        s5++;
                    };
                    sens5.src = 'images/sensor5.png';
                }

                else if (image.attrs['id'] == "sensor6") {

                    var sens6 = new Image();

                    sens6.onload = function () {

                        stage.get('.sensor6')[s6].image(sens6);
                        stage.get('.sensor6')[s6].draggable(false);
                        stage.get('.sensor6')[s6].on('mouseover mouseout', function() {
                            document.body.style.cursor = 'pointer';
                        });
                        stage.get('.sensor6')[s6].on('mouseout', function() {
                            document.body.style.cursor = 'default';
                        });
                        stage.get('.sensor6')[s6].on('click tap', function(){
                            document.getElementById("btn1").value = "sensor6";
                            document.getElementById("btn2").value = "1";
                            console.log( document.getElementById("btn1").value + " " + document.getElementById("btn2").value);
                            document.getElementById("fetch").click();
                            $('#basicModal').modal('toggle');
                        });
                        stage.draw();
                        s6++;
                    };
                    sens6.src = 'images/sensor6.png';
                }

            });



            stage.draw();
        },

        complete: function() {
            console.log("Map loading completed");
        }
    });
});
