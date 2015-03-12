/**
 * Created by Ross on 11/03/2015.
 */
var tempData;
var values = [];
function fetchTemp(){
    $.ajax({
        url: "php/fetch.php",

        type: "POST",

        data: {action: 'gettemp'},


        success: function (data) {

            tempData = data.split("'");
            //console.log(tempData);
            for (var i = 0; i < tempData.length - 1; i++){
               values[i] = tempData[i].split(",");
            }

            console.log(values);
            var dataset = [{label: "line1",data: points}];
            var options = {
                series: {
                    lines: { show: true },
                    points: {
                        radius: 3,
                        show: true
                    }


                }
            };

            $.plot($("#flot-placeholder"), dataset, options);
        }

    });
}

var points = [[1, 130], [2, 40], [3, 80], [4, 160], [5, 159], [6, 370], [7, 330], [8, 350], [9, 370], [10, 400], [11, 330], [12, 350]];



$(document).ready(function () {
    fetchTemp();


    console.log(points);


});