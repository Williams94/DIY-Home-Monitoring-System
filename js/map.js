/**
 * Created by Ross on 17/02/2015.
 */

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

            console.log(json);

            json.attrs[0] = $width;
            console.log(json.attrs[0]);


            //console.log(json.attrs.width);

           // json.attrs.width = $width;

            json = JSON.stringify(json);
            console.log(json);

            var stage = Konva.Node.create(json, 'map');

            //console.log(json);
        }
    });
// });

    // create the Kinetic.Stage and layer
   // var stage = Konva.Node.create(json, 'map');

