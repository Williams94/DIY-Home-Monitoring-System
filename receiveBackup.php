<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 08/03/2015
 * Time: 22:02
 */

include 'dblogin.php';

$packet = $_POST['data'];
$data = explode(",",$packet);

if ($data[2] == "42C7645F"){
     //Sensor 1
    $sensor1 = R::dispense('sensor1');
    $sensor1->date = $data[0];
    $sensor1->time = $data[1];
    $sensor1->address = $data[2];
    $sensor1->rssi = $data[3];
    $sensor1->type = $data[4];
    $sensor1->packet = $data[5];
    $sensor1->power = $data[6];
    $sensor1->battery = $data[7];
    $sensor1->humidity = $data[8];
    $sensor1->temp = $data[9];
    $sensor1->light = $data[10];
    $sensor1->PIRcount = $data[11];
    $sensor1->PIRenergy = $data[12];
    $sensor1->switch = $data[13];

    $id = R::store($sensor1);
    echo $data[2] + " Data Received";
}
if ($data[2] == "4214EDAC"){
     //Sensor 2
    $sensor2 = R::dispense('sensor2');
    $sensor2->date = $data[0];
    $sensor2->time = $data[1];
    $sensor2->address = $data[2];
    $sensor2->rssi = $data[3];
    $sensor2->type = $data[4];
    $sensor2->packet = $data[5];
    $sensor2->power = $data[6];
    $sensor2->battery = $data[7];
    $sensor2->humidity = $data[8];
    $sensor2->temp = $data[9];
    $sensor2->light = $data[10];
    $sensor2->PIRcount = $data[11];
    $sensor2->PIRenergy = $data[12];
    $sensor2->switch = $data[13];

    $id = R::store($sensor2);
    echo $data[2] + " Data Received";
}
if ($data[2] == "425EFE31"){
     //Sensor 3
    $sensor3 = R::dispense('sensor3');
    $sensor3->date = $data[0];
    $sensor3->time = $data[1];
    $sensor3->address = $data[2];
    $sensor3->rssi = $data[3];
    $sensor3->type = $data[4];
    $sensor3->packet = $data[5];
    $sensor3->power = $data[6];
    $sensor3->battery = $data[7];
    $sensor3->humidity = $data[8];
    $sensor3->temp = $data[9];
    $sensor3->light = $data[10];
    $sensor3->PIRcount = $data[11];
    $sensor3->PIRenergy = $data[12];
    $sensor3->switch = $data[13];

    $id = R::store($sensor3);
    echo $data[2] + " Data Received";
}
 if ($data[2] == "42FDEFA0"){
    //Sensor 4
    $sensor4 = R::dispense('sensor4');
    $sensor4->date = $data[0];
    $sensor4->time = $data[1];
    $sensor4->address = $data[2];
    $sensor4->rssi = $data[3];
    $sensor4->type = $data[4];
    $sensor4->packet = $data[5];
    $sensor4->power = $data[6];
    $sensor4->battery = $data[7];
    $sensor4->humidity = $data[8];
    $sensor4->temp = $data[9];
    $sensor4->light = $data[10];
    $sensor4->PIRcount = $data[11];
    $sensor4->PIRenergy = $data[12];
    $sensor4->switch = $data[13];

    $id = R::store($sensor4);
    echo $data[2] + " Data Received";
}
if ($data[2] == "421F8331"){
     //Sensor 5
    $sensor5 = R::dispense('sensor5');
    $sensor5->date = $data[0];
    $sensor5->time = $data[1];
    $sensor5->address = $data[2];
    $sensor5->rssi = $data[3];
    $sensor5->type = $data[4];
    $sensor5->packet = $data[5];
    $sensor5->power = $data[6];
    $sensor5->battery = $data[7];
    $sensor5->humidity = $data[8];
    $sensor5->temp = $data[9];
    $sensor5->light = $data[10];
    $sensor5->PIRcount = $data[11];
    $sensor5->PIRenergy = $data[12];
    $sensor5->switch = $data[13];

    $id = R::store($sensor5);
    echo $data[2] + " Data Received";
}
if ($data[2] == "42679E2B"){
    //Sensor 6
    $sensor6 = R::dispense('sensor6');
    $sensor6->date = $data[0];
    $sensor6->time = $data[1];
    $sensor6->address = $data[2];
    $sensor6->rssi = $data[3];
    $sensor6->type = $data[4];
    $sensor6->packet = $data[5];
    $sensor6->power = $data[6];
    $sensor6->battery = $data[7];
    $sensor6->humidity = $data[8];
    $sensor6->temp = $data[9];
    $sensor6->light = $data[10];
    $sensor6->PIRcount = $data[11];
    $sensor6->PIRenergy = $data[12];
    $sensor6->switch = $data[13];

    $id = R::store($sensor6);
    echo $data[2] + " Data Received";
}
?>

