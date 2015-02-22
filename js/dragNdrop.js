// get a reference to the house icon in the toolbar
// hide the icon until its image has loaded
$(window).load(function() {
// JqueryUI accordion
    if (document.documentElement.clientWidth < 500) { // For mobile devices
        $("#accordion").accordion({
            heightStyle: "fill",
            collapsible: true,
            active: false
        });
    } else {
        $("#accordion").accordion({
            heightStyle: "content",
            collapsible: true
        });
    }


    // Sets the width and height of the canvas
    var width = document.getElementById('container').clientWidth;
    // var height = document.getElementById('content').clientHeight - 14;
    var height = 400;

    var json;

    // get the offset position of the Konva container
    var $stageContainer = $("#container");
    var stageOffset = $stageContainer.offset();
    var offsetX = stageOffset.left;
    var offsetY = stageOffset.top;

    //initialize counter for image IDs
    var imageCount = 0;

    //select images from toolbar
    var imageList = document.getElementsByClassName("imageToDrag");

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
            $house.data("width", 60); // key-value pair
            $house.data("height", 40); // key-value pair
            $house.data("image", image); // key-value pair
            $house.data("class", document.getElementsByClassName("imageToDrag")[i].id);
        })();
    }
    // create the Konva.Stage and layer
    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
    });
    var layer = new Konva.Layer();
    stage.add(layer);

    // make the Konva Container a dropzone
    $stageContainer.droppable({
        drop: dragDrop
    });

    var border = new Konva.Rect({
        width: stage.getWidth(),
        height: stage.getHeight(),
        stroke: 'black',
        strokeWidth: 4, //Border Size in Pixels
        fill: '#DDDDDD' //Background Color
    });

    layer.add(border);

    // handle a drop into the Konva container
    function dragDrop(e, ui) {

        // get the drop point
        var x = parseInt(ui.offset.left - offsetX);
        var y = parseInt(ui.offset.top - offsetY);

        // get the drop payload (here the payload is the image)
        var element = ui.draggable;
        var data = element.data("url");
        var theImage = element.data("image");
        var imgWidth = element.data("width");
        var imgHeight = element.data("height");
        var type = element.data("class");


        if (type == "triangle"){
            var triangle = new Konva.Shape({

            });
            layer.add(triangle);
        } else if (type == "sensor0" || "sensor1"){
            var image = new Konva.Image({
                name: data,
                id: type,
                x: x,
                y: y,
                image: theImage,
                width: imgWidth,
                height: imgHeight,
                draggable: true
            });
            image.on('dblclick', function () {
                image.remove();
                layer.draw();
            });
            layer.add(image);
        }

        // create a new Konva.Image at the drop point
        // be sure to adjust for any border width (here border==1)

        layer.draw();
        stage.add(layer);
    }


    $("#save").click( function(){
        json = stage.toJSON();


        // Using the core $.ajax() method
        $.ajax({

            url: "php/save.php",

            type: "POST",

            data: {data:json},

            // contentType: "application/json",

            success: function( json ) {
                console.log(json);
                alert( "The request is was successful!" );
            },

            error: function( xhr, status, errorThrown ) {
                alert( "Sorry, there was a problem!" );
                console.log( "Error: " + errorThrown );
                console.log( "Status: " + status );
                console.dir( xhr );
            },

            complete: function( xhr, status ) {

            }
        });




    });


    var rect = new Konva.Rect({
        x: 50,
        y: 50,
        width: 100,
        height: 50,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4
    });
    // add the shape to the layer
    layer.add(rect);
    // add the layer to the stage
    stage.add(layer);


    // Scale for window resize
    var initialScale = stage.scale();
    var initialWidth = $(window).width(); // initial width
    var initialHeight = $(window).height(); // initial height



    window.onresize = function(event) { // listen for change
        var w = document.getElementById('content').clientWidth; // new width of page
        var h = document.getElementById('content').clientHeight; // new height of page

        var xScale =  (w  / initialWidth) * initialScale.x;  // percent change in width (Ex: 1000 - 400/1000 means the page scaled down 60%, you should play with this to get wanted results)
        var yScale = (h / initialHeight) * initialScale.y;
        var newScale = {x: xScale, y: yScale *.8};
        //console.log(newScale);
        stage.setAttr('width', w);
        stage.setAttr('height', h);
        stage.setAttr('scale', newScale );
        stage.draw();
    }


});