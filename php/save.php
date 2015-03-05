<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 18/02/2015
 * Time: 18:45
 */

include '../dblogin.php';

$json = $_POST['data'];
$name = $_POST['name'];

$map = R::dispense('maps');

$map->name = $name;
$map->json = $json;
$map->created = R::isoDateTime();

$id = R::store($map);

session_start();

$_SESSION['mapid'] = $id;