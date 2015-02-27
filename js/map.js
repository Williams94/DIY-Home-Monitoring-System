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

            circles.each(function(circle){
                circle.draggable(false);
            });

            var rects = stage.find('Rect');

            rects.each(function (rect){
               rect.draggable(false);
            });

            var triangle = stage.find('RegularPolygon');

            triangle.each(function (triangle) {
               triangle.draggable(false);
            });

            var images = stage.find('Image');
            var x = 0;
            images.each(function (image) {

                    if (image.attrs['id'] == "sensor0") {
                        var imageObj = new Image();

                        imageObj.onload = function () {
                            console.log(x);
                            stage.get('.sensor')[x].image(imageObj);
                            stage.get('.sensor')[x].draggable(false);
                            stage.get('.sensor')[x].setAttr('width', 60);
                            stage.get('.sensor')[x].setAttr('height', 40);
                            stage.draw();
                            x++;
                        };

                        imageObj.src = 'images/sensor.png';



                    } else if (image.attrs['id'] == "sensor1") {
                        var sensor2 = new Image();

                        sensor2.onload = function () {
                            stage.get('.sensor')[x].image(sensor2);
                            stage.get('.sensor')[x].draggable(false);
                            stage.get('.sensor')[x].setAttr('width', 60);
                            stage.get('.sensor')[x].setAttr('height', 40);
                            stage.draw();
                        };

                       // sensor2.setAttribute('draggable', 'false');
                        sensor2.src = 'images/sensor2.jpeg';
                    }


                });

                stage.draw();
        }
    });
});

