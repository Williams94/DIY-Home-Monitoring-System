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




    //$data = R::findAll( 'sensor1' , ' ORDER BY id DESC LIMIT 10 ' );

    for ($i = 4; $i < 100; $i++){
        $data = R::load( 'sensor1', $i );

        echo substr($data['time'],0,5).", ".($data['temp']/10)."'";
    }


    //$data = R::load( 'sensor1', $id );





    //print_r();


    }