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

    $id = 19;

    $json = R::load( 'maps', $id );

    echo $json;

}