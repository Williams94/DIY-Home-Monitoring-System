<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 18/02/2015
 * Time: 21:54
 */
include '../dblogin.php';



$action = $_POST["action"];

if($action=="getmap"){


    $id = R::getCell( 'SELECT * FROM maps ORDER BY id DESC LIMIT 1' );

    session_start();

    $_SESSION['mapid'] = $id;

    $json = R::load( 'maps', $id );

    echo $json;

}