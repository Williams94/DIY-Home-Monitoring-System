/**
 * Created by Ross on 05/03/2015.
 */
var stage;
var name;

$(window).load(function() {
    // Sets the width and height of the canvas
    var $width = document.getElementById('map').clientWidth;
    // var $height = document.getElementById('content').clientHeight - 14;
    var $height = 400;

    var json;

    $.ajax({
        url: "php/get.php",

        type: "POST",

        dataType: "json",

        data: {action: 'getmap'},

        success: function (data) {
            json = data;

            console.log(data.id);

            name = json.name;

            json = JSON.parse(json.json);

            json.attrs[0] = $width;

            json = JSON.stringify(json);

            stage = Konva.Node.create(json, 'map');

            var circles = stage.find('Circle');

            circles.each(function (circle) {
                circle.draggable(true);
                circle.on('click', function(){
                    circle.moveToTop();
                })
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

            var text = stage.find('Text');

            text.each(function(){
               text.hide();
            });

            var group = stage.find('Group');

            group.each(function (group) {
                var width = group.children['0'].attrs['width'];
                var height = group.children['0'].attrs['height'];
                var x = group.children['0'].attrs['x'];
                var y = group.children['0'].attrs['y'];

                group.draggable(true);
                //addAnchor(group, x, y, 'topLeft');
                //addAnchor(group, x+width, y, 'topRight');
                addAnchor(group, x+width, y+height, 'bottomRight');
                //addAnchor(group, x, y+height, 'bottomLeft');
                group.on('click', function(){
                    group.moveToTop();
                })
            });

            var triangle = stage.find('RegularPolygon');

            triangle.each(function (triangle) {
                triangle.draggable(true);
                triangle.on('click', function(){
                    triangle.moveToTop();
                })
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

                image.on('click', function(){
                    image.moveToTop();
                });
                if (image.attrs['id'] == "bed") {

                    var imageObj = new Image();

                    //console.log(stage.get('.bed'));

                    imageObj.onload = function () {


                        stage.get('.bed')[bed].image(imageObj);
                        stage.get('.bed')[bed].draggable(true);
                        stage.draw();
                        bed++;
                    };

                    imageObj.src = 'images/sleeping.png';


                }

                else if (image.attrs['id'] == "bathroom") {
                    var bathroom = new Image();
                    bathroom.onload = function () {
                        stage.get('.bathroom')[bath].image(bathroom);
                        stage.get('.bathroom')[bath].draggable(true);
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
                        stage.get('.kitchen')[cutlery].draggable(true);
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
                        stage.get('.washer')[wash].draggable(true);
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
                        stage.get('.tv')[screen].draggable(true);
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
                        stage.get('.sofa')[couch].draggable(true);
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
                        stage.get('.door')[open].draggable(true);
                        stage.draw();
                        open++;
                    };

                    // sensor2.setAttribute('draggable', 'false');
                    door.src = 'images/open129.png';
                }


            });
            dragNdrop(stage, name);
            stage.draw();
        }
    });
});

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

function dragNdrop(stage, name){
    $( document ).ready(function() {


            $("#accordion").accordion({
                heightStyle: "content",
                collapsible : true
            });


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
            var widthOff = 10;
            var heightOff = 40;

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
                    y: y+15,
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

                var rectXoff = 12;
                var rectYoff = (-16);
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
                addAnchor(group,x+97,y+35,"bottomRight");
                addAnchor(group, x+12,y-16,"topLeft");
                addAnchor(group, x+10,y+35,"bottomLeft");
                addAnchor(group, x+97,y-16,"topRight");
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
                    y: y+15,
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

    });





    $("#save").click( function(){
        var name = $('#name').val();

        json = stage.toJSON();

        // Using the core $.ajax() method
        $.ajax({

            url: "php/save.php",

            type: "POST",

            data: {data:json,name:name,action:'edit'},

            // contentType: "application/json",

            success: function( json ) {
                console.log(json);
                bootbox.dialog({
                    message: "<h3>" + name + " map saved!"+"</h3>",

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
}



