var stage;

$(window).load(function() {

    // Sets the width and height of the canvas
    var $width = document.getElementById('map').clientWidth;
    // var $height = document.getElementById('content').clientHeight - 14;
    var $height = 400;

    var json;

    $.ajax({
        url: "php/get.php",


        type: "POST",

        data: {action: 'getmap'},

        success: function (data) {
            json = JSON.parse(data);

            json = JSON.parse(json.json);

            json.attrs[0] = $width;

            json = JSON.stringify(json);

            stage = Konva.Node.create(json, 'map');

            var circles = stage.find('Circle');

            circles.each(function (circle) {
                circle.draggable(false);
            });

            var group = stage.find('Group');

            group.each(function (group) {
                group.draggable(false);
            });

            var topLeft = stage.get('.topLeft');

            topLeft.each(function (anchor) {
                anchor.hide();
            });

            var topRight = stage.get('.topRight');

            topRight.each(function (anchor) {
                anchor.hide();
            });

            var bottomRight = stage.get('.bottomRight');

            bottomRight.each(function (anchor) {
                anchor.hide();
            });

            var bottomLeft = stage.get('.bottomLeft');

            bottomLeft.each(function (anchor) {
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


            });
            dragNdrop(stage);
            stage.draw();
        }
    });
});
function dragNdrop(stage){
    $( document ).ready(function() {

// JqueryUI accordion
        if (document.documentElement.clientWidth < 500) { // For mobile devices
            $("#accordion").accordion({
                heightStyle: "content",
                collapsible: true,
                active: false
            });
        } else {
            $("#accordion").accordion({
                heightStyle: "content",
                collapsible: true,
                active: false
            });
        }

        //select images from toolbar
        var imageList = document.getElementsByClassName("sensor");

        //loop through imageList
        for (var i = 0; i  < imageList.length; i++) {
            //use a closure to keep references clean
            (function() {
                var $house, image;
                $house = $(imageList[i]);
                $house.hide();
                image = new Image();
                image.onload = function () {
                    $house.show();
                };
                //read source image from given img tag
                image.src = imageList[i].getAttribute("src");
                // start loading the image used in the draggable toolbar element
                // this image will be used in a new Konva.Image
                // make the toolbar image draggable
                $house.draggable({helper: 'clone'}).on('dragstart', function (e, ui) {
                    $(ui.helper).css('z-index','999999');
                });
                $house.data("url", "sensor"); // key-value pair
                $house.data("width", document.getElementsByClassName("sensor")[i].naturalWidth/3); // key-value pair
                $house.data("height", document.getElementsByClassName("sensor")[i].naturalHeight/3); // key-value pair
                $house.data("image", image); // key-value pair
                $house.data("class", document.getElementsByClassName("sensor")[i].id);
            })();
        }


        var layer = stage.getLayers()[0];

        stage.add(layer);

        var $stageContainer = $("#map");
        // get the offset position of the kinetic container

        var stageOffset = $stageContainer.offset();
        var offsetX = stageOffset.left;
        var offsetY = stageOffset.top;

        // make the Konva Container a dropzone
        $stageContainer.droppable({
            drop: dragDrop
        });

        var sensor1placed = false;

        // handle a drop into the Konva container
        function dragDrop(e, ui) {

            // get the drop point
            var x = parseInt(ui.offset.left - offsetX);
            var y = parseInt(ui.offset.top - offsetY);

            // Image offsets
            var widthOff = 20;
            var heightOff = 90;

            // get the drop payload (here the payload is the image)
            var element = ui.draggable;
            var data = element.data("url");
            var theImage = element.data("image");
            var imgWidth = element.data("width");
            var imgHeight = element.data("height");
            var type = element.data("class");

            for (var i = 0; i  < imageList.length; i++) {
                //use a closure to keep references clean

                (function () {
                    if (type == "sensor"+i) {
                        console.log("Sensor"+i);
                        var sensor = new Konva.Image({
                            name: data+i,
                            id: type,
                            x: x+widthOff,
                            y: y-heightOff,
                            image: theImage,
                            width: Math.round((imgWidth/1.5) * 100) / 100,
                            height: Math.round((imgHeight/1.5) * 100) / 100,
                            draggable: true
                        });
                        console.log(data+i);
                        sensor.on('dblclick', function () {
                            sensor.remove();
                            draggable(type, "enable");
                            layer.draw();
                        });
                        sensor.on('click', function(){
                            sensor.moveToTop();
                            layer.draw();
                        });
                        layer.add(sensor);

                    }


                    draggable(type, "disable");

                })();
            }

            layer.draw();
            stage.add(layer);

        }

    });

    function draggable(type, enable){
        if (type == "sensor1"){
            $('#sensor1').draggable(enable);
        } else if (type == "sensor2"){
            $('#sensor2').draggable(enable);
        } else if (type == "sensor3"){
            $('#sensor3').draggable(enable);
        } else if (type == "sensor4"){
            $('#sensor4').draggable(enable);
        } else if (type == "sensor5"){
            $('#sensor5').draggable(enable);
        } else if (type == "sensor6"){
            $('#sensor6').draggable(enable);
        }
    }



    $("#save").click( function() {
        json = stage.toJSON();

        // Using the core $.ajax() method
        $.ajax({

            url: "php/save.php",

            type: "POST",

            data: {data: json},

            // contentType: "application/json",

            success: function (json) {

            },

            error: function (xhr, status, errorThrown) {
                alert("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            },

            complete: function (xhr, status) {

            }
        });
    });

}


