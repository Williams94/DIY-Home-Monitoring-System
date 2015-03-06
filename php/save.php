<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 18/02/2015
 * Time: 18:45
 */

include '../dblogin.php';

$action = $_POST["action"];

if($action=="save") {
    $json = $_POST['data'];
    $name = $_POST['name'];

    $map = R::dispense('maps');

    $map->name = $name;
    $map->json = $json;
    $map->created = R::isoDateTime();

    $id = R::store($map);

    session_start();

    $_SESSION['mapid'] = $id;
}

else if ($action=="edit"){
    session_start();

    $id = $_SESSION['mapid'];

    $json = $_POST['data'];
    $name = $_POST['name'];



    $map =  R::load( 'maps', $id );

    if ($name != ""){
        $map->name = $name;
    }
    $map->json = $json;
    $map->lastEdited = R::isoDateTime();

    R::store($map);


}