/**
 * Created by Ross on 17/02/2015.
 */

    // Sets the width and height of the canvas
    var $width = document.getElementById('map').clientWidth;
    // var $height = document.getElementById('content').clientHeight - 14;
    var $height = 400;



    // get the offset position of the kinetic container
    var $stageContainer = $("#map");
    var stageOffset = $stageContainer.offset();
    var offsetX = stageOffset.left;
    var offsetY = stageOffset.top;



    // create the Kinetic.Stage and layer
    var stage = Konva.Node.create(json, 'map');

