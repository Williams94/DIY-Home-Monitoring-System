// get a reference to the house icon in the toolbar
// hide the icon until its image has loaded
$(window).load(function() {

    function update(activeAnchor) {

        var group = activeAnchor.getParent();
        var topLeft = group.get('.topLeft')[0];
        var topRight = group.get('.topRight')[0];
        var bottomRight = group.get('.bottomRight')[0];
        var bottomLeft = group.get('.bottomLeft')[0];
        var image = group.get('Shape')[0];

        var anchorX = activeAnchor.getX();
        var anchorY = activeAnchor.getY();

        // update anchor positions
        switch (activeAnchor.getName()) {
            case 'topLeft':
                topRight.setY(anchorY);
                bottomLeft.setX(anchorX);
                break;
            case 'topRight':
                topLeft.setY(anchorY);
                bottomRight.setX(anchorX);
                break;
            case 'bottomRight':
                bottomLeft.setY(anchorY);
                topRight.setX(anchorX);
                break;
            case 'bottomLeft':
                bottomRight.setY(anchorY);
                topLeft.setX(anchorX);
                break;
        }
        image.position(topLeft.position());
        var width = topRight.getX() - topLeft.getX();
        var height = bottomLeft.getY() - topLeft.getY();
        if(width && height) {
            image.width(width);
            image.height(height);
        }
    }

    function addAnchor(group, x, y, name) {
        var stage = group.getStage();
        var layer = group.getLayer();

        var anchor = new Konva.Circle({
            id: 'anchor',
            x: x,
            y: y,
            stroke: '#666',
            fill: '#ddd',
            strokeWidth: 2,
            radius: 6,
            name: name,
            draggable: true,
            dragOnTop: false,
            opacity: 0.7
        });
        anchor.on('dragmove', function() {
            update(this);
            layer.draw();
        });
        anchor.on('mousedown touchstart', function() {
            group.setDraggable(false);
            this.moveToTop();
        });
        anchor.on('dragend', function() {
            group.setDraggable(true);
            layer.draw();
        });
        // add hover styling
        anchor.on('mouseover', function() {
            var layer = this.getLayer();
            document.body.style.cursor = 'pointer';
            this.setStrokeWidth(4);
            layer.draw();
        });
        anchor.on('mouseout', function() {
            var layer = this.getLayer();
            document.body.style.cursor = 'default';
            this.setStrokeWidth(2);
            layer.draw();
        });
        group.add(anchor);

    }



        $("#accordion").accordion({
            heightStyle: "content",
            collapsible : true
        });


    // Sets the width and height of the canvas
    var width = document.getElementById('container').clientWidth;
    var height = 450;

    var json;

    // get the offset position of the Konva container
    var $stageContainer = $("#container");
    var stageOffset = $stageContainer.offset();
    var offsetX = stageOffset.left;
    var offsetY = stageOffset.top;



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
    console.log(height);
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
        strokeWidth: 3,
        fill: '#EBEBE0'
    });

    layer.add(border);


    // handle a drop into the Konva container
    function dragDrop(e, ui) {

        // get the drop point
        var x = parseInt(ui.offset.left - offsetX);
        var y = parseInt(ui.offset.top - offsetY);

        // Image offsets
        var widthOff = 10;
        var heightOff = 0;

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

                x: x+50,
                y: y+35,
                sides: 3,
                radius: 85/2,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 3,
                draggable: true
            });
            triangle.on('dblclick', function () {
                triangle.remove();
                layer.draw();
            });
            triangle.on('click', function(){
               triangle.moveToTop();
                layer.draw();
            });
            layer.add(triangle);
        }

        else if (type == "rect") {

            var rectXoff = 11;
            var rectYoff = 6;
            var rect = new Konva.Rect({
                id: type,
                x: x+rectXoff,
                y: y+rectYoff,
                width: 85,
                height: 50,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 3
            });

            var group = new Konva.Group({
                draggable: true
            });
            layer.add(group);
            group.add(rect);
            addAnchor(group,x+96,y+56,"bottomRight");
            addAnchor(group, x+11,y+6,"topLeft");
            addAnchor(group, x+11,y+56,"bottomLeft");
            addAnchor(group, x+96,y+6,"topRight");
            group.on('dblclick', function () {
                group.remove();
                layer.draw();
            });
            group.on('click', function(){
                group.moveToTop();
                layer.draw();
            });
        }

        else if(type == "circle") {
            console.log("Circle");
            var circle = new Konva.Circle({
                x: x+50,
                y: y+35,
                radius: 85/2,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 3,
                draggable: true
            });
            circle.on('dblclick', function(){
                circle.remove();
                layer.draw();
            });
            circle.on('click', function(){
                circle.moveToTop();
                layer.draw();
            });
            layer.add(circle);
        }


        else if (type == "bed"){
            console.log("Bed!");
            var bed = new Konva.Image({
                name: 'bed',
                id: type,
                x: x+widthOff,
                y: y-heightOff,
                image: theImage,
                width: Math.round((imgWidth*2) * 100) / 100,
                height: Math.round((imgHeight*2) * 100) / 100,
                draggable: true
            });
            bed.on('dblclick', function () {
                bed.remove();
                layer.draw();
            });
            bed.on('click', function(){
                bed.moveToTop();
                layer.draw();
            });
            layer.add(bed);
        }

        else if (type == "bathroom"){
            console.log("Bathroom!");
            var bathroom = new Konva.Image({
                name: 'bathroom',
                id: type,
                x: x+widthOff,
                y: y-heightOff,
                image: theImage,
                width: Math.round((imgWidth*1.5) * 100) / 100,
                height: Math.round((imgHeight*1.5) * 100) / 100,
                draggable: true
            });
            bathroom.on('dblclick', function(){
                bathroom.remove();
                layer.draw();
            });
            bathroom.on('click', function(){
                bathroom.moveToTop();
                layer.draw();
            });
            layer.add(bathroom);
        }

        else if (type == "kitchen"){
            console.log("Kitchen!");
            var kitchen = new Konva.Image({
                name: 'kitchen',
                id: type,
                x: x+widthOff,
                y: y-heightOff,
                image: theImage,
                width: Math.round((imgWidth*1.5) * 100) / 100,
                height: Math.round((imgHeight*1.5) * 100) / 100,
                draggable: true
            });
            kitchen.on('dblclick', function(){
                kitchen.remove();
                layer.draw();
            });
            kitchen.on('click', function(){
                kitchen.moveToTop();
                layer.draw();
            });
            layer.add(kitchen);
        }

        else if (type == "washer"){
            console.log("Washer!");
            var washer = new Konva.Image({
                name: 'washer',
                id: type,
                x: x+widthOff,
                y: y-heightOff,
                image: theImage,
                width: Math.round((imgWidth*1.5) * 100) / 100,
                height: Math.round((imgHeight*1.5) * 100) / 100,
                draggable: true
            });
            washer.on('dblclick', function(){
                washer.remove();
                layer.draw();
            });
            washer.on('click', function(){
                washer.moveToTop();
                layer.draw();
            });
            layer.add(washer);
        }

        else if (type == "tv"){
            console.log("TV!");
            var tv = new Konva.Image({
                name: 'tv',
                id: type,
                x: x+widthOff,
                y: y-heightOff,
                image: theImage,
                width: Math.round((imgWidth*1.5) * 100) / 100,
                height: Math.round((imgHeight*1.5) * 100) / 100,
                draggable: true
            });
            tv.on('dblclick', function(){
                tv.remove();
                layer.draw();
            });
            tv.on('click', function(){
                tv.moveToTop();
                layer.draw();
            });
            layer.add(tv);
        }

        else if (type == "sofa"){
            console.log("Sofa!");
            var sofa = new Konva.Image({
                name: 'sofa',
                id: type,
                x: x+widthOff,
                y: y-heightOff,
                image: theImage,
                width: Math.round((imgWidth*1.5) * 100) / 100,
                height: Math.round((imgHeight*1.5) * 100) / 100,
                draggable: true
            });
            sofa.on('dblclick', function(){
                sofa.remove();
                layer.draw();
            });
            sofa.on('click', function(){
                sofa.moveToTop();
                layer.draw();
            });
            layer.add(sofa);
        }

        else if (type == "door"){
            console.log("Door!");
            var door = new Konva.Image({
                name: 'door',
                id: type,
                x: x+widthOff,
                y: y-heightOff,
                image: theImage,
                width: Math.round((imgWidth*1.5) * 100) / 100,
                height: Math.round((imgHeight*1.5) * 100) / 100,
                draggable: true
            });
            door.on('dblclick', function(){
                door.remove();
                layer.draw();
            });
            door.on('click', function(){
                door.moveToTop();
                layer.draw();
            });
            layer.add(door);
        }


        layer.draw();
        stage.add(layer);
    }









    $("#save").click( function(){
        var name = $('#name').val();

        json = stage.toJSON();

        // Using the core $.ajax() method
        $.ajax({

            url: "php/save.php",

            type: "POST",

            data: {data:json,name:name,action:'save'},

            // contentType: "application/json",

            success: function( json ) {
                console.log(json);
                bootbox.dialog({
                    message: "<h3>"+name + " map saved!</h3>",

                    title: "<h2>Saved!</h2>",

                    onEscape: function() {},

                    show: true,



                    closeButton: true,

                    animate: true,

                    className: "my-modal",

                    buttons: {

                        "Keep editing": {
                            className: "btn-primary",
                            callback: function() {}
                        },

                        success: {

                            label: "Next",

                            className: "btn-success",

                            callback: function() {
                                window.location.href = "sensors.php";
                            }
                        }


                    }
                });

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

/*
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
*/


});
