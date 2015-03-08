<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 05/03/2015
 * Time: 15:41
 */

include '../dblogin.php';

session_start();

$id = $_SESSION['mapid'];

$json = $_POST['data'];

$map =  R::load( 'maps', $id );

$map->json2 = $json;
$map->lastUpdated = R::isoDateTime();
$map->active = true;

R::store($map);