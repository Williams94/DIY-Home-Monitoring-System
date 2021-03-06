/**
 * Created by Ross on 20/03/2015.
 */
    NProgress.start();
    // create a dataSet with groups
    var names = ['Humidity', 'Temperature', 'Light', 'Movement'];
    var groups = new vis.DataSet();
    var groups2 = new vis.DataSet();
    var groups3 = new vis.DataSet();

    groups.add({
        id: 0,
        content: names[0],
        className: 'customStyle1',
        options: {
            yAxisOrientation: 'right',
            drawPoints: false,
            shaded: {
                orientation: 'bottom' // top, bottom
            }
        }});

    groups.add({
        id: 1,
        content: names[1],
        className: 'customStyle3',
        options: {
            drawPoints: false,
            shaded: {
                orientation: 'top' // top, bottom
            }}
    });

    groups2.add({
        id: 0,
        content: names[2],
        className: 'customStyle2',
        options: {
            drawPoints: false,
            shaded: {
                orientation: 'top' // top, bottom
            }
        }
    });

    groups3.add({
        id: 0,
        content: names[3],
        className: 'customStyle4',
        options: { drawPoints: false }
    });



    var container = document.getElementById('visualization');
    var container2 = document.getElementById('visualization2');
    var container3 = document.getElementById('visualization3');

    var items = [];
    var items2 = [];
    var items3 = [];

    var dataset = new vis.DataSet(items);
    var dataset2 = new vis.DataSet(items2);
    var dataset3 = new vis.DataSet(items3);

    var packets;

    NProgress.inc();

    function fetch(){
        dataset.clear();
        dataset2.clear();
        dataset3.clear();
        var sensor = document.getElementById("btn1").value;
        var type = document.getElementById("btn2").value;
        //console.log( sensor + " " + type);
        $.ajax({
            url: "php/fetch.php",

            type: "POST",

            data: {
                action: sensor,
                type: type},


            success: function (data) {
                NProgress.done();
                packets = JSON.parse(data);
                //console.log(packets.length);
                dataSet();
            }

        });
    }
    function dataSet(){
        for (var i = 0; i < packets.length; i++){
            var temp = packets[i]['temp']/10;
            var humidity = Math.round(packets[i]['humidity']);
            var light = packets[i]['light'];
            var movement = packets[i]['pi_renergy'];
            var date = packets[i]['date'].replace(/\//g, "-");
            var time = packets[i]['time'];
            var dateTime = date + " " + time;

            var thisTime = new Date(packets[i]['date'] + " " + time);
            var lastTime = new Date(packets[i+1]['date'] + " " + packets[i+1]['time']);
            //console.log("Current: " +thisTime + " Last: " + lastTime + " Diff: " + (thisTime-lastTime)/1000);

            var thisEnergy = packets[i]['pi_renergy'];
            var lastEnergy = packets[i+1]['pi_renergy'];
            //console.log("Current eng: " + thisEnergy + " Last eng: " + lastEnergy);

            var energyDiff = (thisEnergy - lastEnergy)/((thisTime-lastTime)/1000);


            dataset.add([
                {x: dateTime, y: humidity, group: 0},
                {x: dateTime, y: temp, group: 1}
            ]);
            dataset2.add([
                {x: dateTime, y: light, group: 0}
            ]);
            if (energyDiff>0 && energyDiff < 9999) {
                //console.log(Math.round(energyDiff));
                dataset3.add([
                    {x: dateTime, y: Math.round(energyDiff), group: 0}
                ]);
            }
        }
    }

    var startDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    var endDate = moment().add(1, 'days').format('YYYY-MM-DD');

    var options = {
        height: '500px',
        defaultGroup: 'ungrouped',
        legend: true,
        start: startDate,
        end: endDate,
        sampling: 'true',
        dataAxis:{
            customRange:{
                left:{
                    min: '5',
                    max: '35'
                }
            }
        }
    };


    var options2 = {
        height: '500px',
        legend: true,
        start: startDate,
        end: endDate,
        sampling: true,
        dataAxis:{
            customRange:{
                left:{
                    min: '-10',
                    max: '600'
                }
            }
        }
    };


    var options3 = {
        height: '500px',
        legend: true,
        start: startDate,
        end: endDate,
        sort: false,
        dataAxis:{
            customRange:{
                left:{
                    min: '0',
                    max: '90'
                }
            }
        }
    };


    var graph2d = new vis.Graph2d(container, dataset, groups, options);
    var graph2d2 = new vis.Graph2d(container2, dataset2, groups2, options2);
    var graph2d3 = new vis.Graph2d(container3, dataset3, groups3, options3);

