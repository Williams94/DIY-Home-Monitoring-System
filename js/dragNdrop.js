// get a reference to the house icon in the toolbar
// hide the icon until its image has loaded
$(window).load(function() {
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
            $house.data("width", document.getElementsByClassName("imageToDrag")[i].naturalWidth/3); // key-value pair
            $house.data("height", document.getElementsByClassName("imageToDrag")[i].naturalHeight/3); // key-value pair
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


    var group = new Konva.Group({

    });
    layer.add(group);

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
            console.log("Triangle");
            var triangle = new Konva.RegularPolygon({

                x: x+10,
                y: y+30,
                sides: 3,
                radius: Math.round((imgWidth/2) * 100) / 100,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 3,
                draggable: true
            });
            triangle.on('dblclick', function () {
                triangle.remove();
                layer.draw();
            });
            layer.add(triangle);
        }

        else if (type == "rect") {
            console.log(imgWidth + " " +imgHeight);
            var rect = new Konva.Rect({
                name: data,
                id: type,
                x: x,
                y: y+10,
                width: Math.round(imgWidth * 100) / 100,
                height: Math.round((imgHeight/2)*100) /100,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 3,
                draggable: true
            });
            rect.on('dblclick', function () {
                rect.remove();
                layer.draw();
            });
            group.add(rect)
            layer.add(rect);
        }

        else if(type == "circle") {
            console.log("Circle");
            var circle = new Konva.Circle({
                x: x+10,
                y: y+10,
                radius: Math.round((imgWidth/2) * 100) / 100,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 3,
                draggable: true
            });
            circle.on('dblclick', function(){
                circle.remove();
                layer.draw();
            });
            layer.add(circle);
        }

        else if (type == "sensor0"){
            console.log("Sensor");
            var image = new Konva.Image({
                name: data,
                id: type,
                x: x,
                y: y,
                image: theImage,
                width: Math.round((imgWidth/2) * 100) / 100,
                height: Math.round((imgWidth/2) * 100) / 100,
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
        var newScale = {x: xScale, y: yScale};
        //console.log(newScale);
        stage.setAttr('width', w);
        stage.setAttr('height', h);
        stage.setAttr('scale', newScale );
        stage.draw();


        $stageContainer.width(w*xScale);
        $stageContainer.height(h*yScale);

    }



});