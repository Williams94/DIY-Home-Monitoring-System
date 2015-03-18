<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 12/03/2015
 * Time: 00:15
 */
include '../dblogin.php';



$action = $_POST["action"];

if($action=="gettemp"){




    $data = R::getAll( 'SELECT * FROM `sensor1`  WHERE type=1  ORDER BY id DESC LIMIT 800' );

    echo json_encode($data);

    /*
    for ($i = 4; $i < 100; $i++){
        //$data = R::load( 'sensor1', $i );


            //substr($data['time'],0,5).", ".($data['temp']/10)."'";
    }


    //$data = R::load( 'sensor1', $id );
*/




    //print_r();


    }
