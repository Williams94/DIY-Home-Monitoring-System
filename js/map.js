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

            //console.log(json);

            json.attrs[0] = $width;
           // console.log(json.attrs[0]);


            //console.log(json.attrs.width);

           // json.attrs.width = $width;

            json = JSON.stringify(json);
           // console.log(json);

            var stage = Konva.Node.create(json, 'map');

            var images = stage.find('Image');

            console.log(images);



                images.each(function (image) {
                    var x = image.index - 2;

                    if (image.attrs['id'] == "sensor0") {

                        var imageObj = new Image();

                        imageObj.onload = function () {
                            stage.get('.sensor')[x].image(imageObj);
                            stage.get('.sensor')[x].draggable(false);
                            stage.draw();
                        };

                        imageObj.src = 'images/sensor.png';
                    } else if (image.attrs['id'] == "sensor1") {
                        var sensor2 = new Image();

                        sensor2.onload = function () {
                            stage.get('.sensor')[x].image(sensor2);
                            stage.get('.sensor')[x].draggable(false);
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

