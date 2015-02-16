//<![CDATA[
$(window).load(function(){

    $( "#accordion" ).accordion({
        heightStyle: "fill"
    });

    var $width = document.getElementById('container').clientWidth;
   // var $height = document.getElementById('content').clientHeight - 14;
    var $height = 400;

// get a reference to the house icon
    var $house = $(".imag");

// get the offset position of the kinetic container
    var $stageContainer = $("#container");
    var stageOffset = $stageContainer.offset();
    var offsetX = stageOffset.left;
    var offsetY = stageOffset.top;

// create the Kinetic.Stage and layer
    var stage = new Kinetic.Stage({
        container: 'container',
        width: $width,
        height: $height
    });

// grid data
    var CELL_SIZE = 30,
        w = $width/10,
        h = $height/10,
        W = w * CELL_SIZE,
        H = h * CELL_SIZE;

// function of drawing the grid in the container
    var make_grid = function(layer) {
        var r = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: W,
            height: H,
            fill: "white"
        });
        layer.add(r);
        for (i = 0; i < w + 1; i++) {
            var I = i * CELL_SIZE;
            var l = new Kinetic.Line({
                stroke: "grey",
                strokeWidth: 0.5,
                points: [I, 0, I, H]
            });
            layer.add(l);
        }

        for (j = 0; j < h + 1; j++) {
            var J = j * CELL_SIZE;
            var l2 = new Kinetic.Line({
                stroke: "grey",
                strokeWidth: 0.5,
                points: [0, J, W, J]
            });
            layer.add(l2);
        }
        return r;
    };

    var layer = new Kinetic.Layer();
//var chambre = new Kinetic.Group();
    var rect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: CELL_SIZE,
        height: CELL_SIZE,
        fill: "white",
        stroke: "grey",
        strokeWidth: 0.5
    });
    var gr = make_grid(layer);

// add the shape to the layer
    layer.add(rect);
// add the layer to the stage
    stage.add(layer);

    /************************************/
    function Picture (x, y, name, url, eqpt_id){
        this.x = x;
        this.y = y;
        this.name = name;
        this.url = url;
        this.id = "#house_"+eqpt_id ;
    }
    /*Pictures = [{"x": Picture.x,
     "y": Picture.y,
     "name": Picture.name,
     "url": Picture.url,
     "eqpt_id": Picture.eqpt_id
     }];*/
    var image1 = new Picture(null, null, "television","tv.png",1);
    var xi = image1.x;
    /************************************/


//create a group
    var group = new Kinetic.Group({
        draggable: true //make group draggable
    });
    var rec = new Kinetic.Rect({
        x: 10,
        y: 330,
        width: $width,
        height: $height
    });
    group.add(rec);
    //return group;
    group.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });
    group.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });
    layer.add(group);
    stage.add(layer);

// make the images draggable
    $house.draggable({
        helper: 'clone',
        cursor: 'pointer',
        revert: 'invalid',
        snap: 'true',
        snapTolerance: 15
    });
    $(".room").draggable({
        helper: 'clone',
        cursor: 'pointer',
        revert: 'invalid',
        snap: true,
        snapTolerance: 15
    });

// make the Kinetic Container a dropzone
    $stageContainer.droppable({
        drop: dragDrop
    });

// handle a drop into the Kinetic container
    function dragDrop(e, ui) {
        // get the drop point
        var x = parseInt(ui.offset.left - offsetX, 10);
        var y = parseInt(ui.offset.top - offsetY, 10);

        // get the drop payload (here the payload is the image)
        var element = ui.draggable;
        var data = element.data("url");
        //var theImage = document.getElementById('bedroom');
		var theImage = element.data("image");
        // create a new Kinetic.Image at the drop point
        // be sure to adjust for any border width (here border==1)
        var image = new Kinetic.Image({
            name: data,
            x: x,
            y: y,
            image: theImage,
            draggable: true
        });

        image.on('dblclick', function() {
            image.remove();
            layer.draw();
        });

        var $clone = ui.helper.clone();
        // all clones are draggable
        // if clone is shape then draggable + resizable
        if (!$clone.is('.inside-droppable')) {
            $(this).append($clone.addClass('inside-droppable').draggable({
                containment: $stageContainer,
                tolerance: 'fit',
                cursor: 'pointer',
                position: 'relative',
                snap: true,
                snapTolerance: 15
            }));

            if ($clone.is(".imag") === false) {
                $clone.resizable({
                    containment: $stageContainer
                });
            }
            $clone.on('dblclick', function () {
                $clone.remove();
                layer.draw();
            });
            $clone.css({top: y, left: x, position:'absolute'});
        }


        group.add(image);
        layer.add(group);
        stage.add(layer);


}

    var myDataUrl;
    document.getElementById('save').addEventListener('click', function(){
        //place outside of scope of function for saving
        stage.toDataURL({
            callback: function(dataUrl){

                // do something with the data url
                // like window.open(dataUrl);
                // you can do anything do anything really, like
                myDataUrl = dataUrl;

                var img= new Image(); //or document.createElement('img');
                img.src= myDataUrl;

                //(new Image()).src = "myDataUrl"; //or the shortcut way

                window.open(dataUrl);
            },
            mimeType: 'image/jpeg',
            quality: 0.5
        });
    }, false);

    // tooltip
    var tooltip = new Kinetic.Label({
        x: 170,
        y: 75,
        opacity: 0.75
    });

    tooltip.add(new Kinetic.Tag({
        fill: 'black',
        pointerDirection: 'down',
        pointerWidth: 10,
        pointerHeight: 10,
        lineJoin: 'round',
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: {x:10,y:20},
        shadowOpacity: 0.5
    }));

    tooltip.add(new Kinetic.Text({
        text: 'Tooltip pointing down',
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 5,
        fill: 'white'
    }));

    // simple label
    var simpleLabel = new Kinetic.Label({
        x: 350,
        y: 50,
        opacity: 0.75
    });

    simpleLabel.add(new Kinetic.Tag({
        fill: 'yellow'
    }));

    simpleLabel.add(new Kinetic.Text({
        text: 'Simple label',
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 5,
        fill: 'black'
    }));

    // add the labels to layer
    layer.add(simpleLabel);

    // add the layer to the stage
    stage.add(layer);


});//]]>
