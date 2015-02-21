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

    session_start();

    $id = $_SESSION['mapid'];

    $json = R::load( 'maps', $id );

    echo $json;

}