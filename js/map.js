/**
 * Created by Ross on 17/02/2015.
 */
$(window).load(function() {
    // Sets the width and height of the canvas
    var $width = document.getElementById('map').clientWidth;
    // var $height = document.getElementById('content').clientHeight - 14;
    var $height = 400;

    var json;

    // get the offset position of the kinetic container
    //var $stageContainer = $("#map");
    //var stageOffset = $stageContainer.offset();
    // var offsetX = stageOffset.left;
    //var offsetY = stageOffset.top;

// $('#load').click(function() {

    $.ajax({
        url: "php/get.php",


        type: "POST",

        data: {action: 'getmap'},

        success: function (data) {
            json = JSON.parse(data);

            json = JSON.parse(json.json);

            json.attrs[0] = $width;

            json = JSON.stringify(json);

            var stage = Konva.Node.create(json, 'map');

            var circles = stage.find('Circle');

            circles.each(function (circle) {
                circle.draggable(false);
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
            images.each(function (image) {

                if (image.attrs['id'] == "bed") {

                    var imageObj = new Image();

                    console.log(stage.get('.bed'));

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

            stage.draw();
        }
    });
    
});