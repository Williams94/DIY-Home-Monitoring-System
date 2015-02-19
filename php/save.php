<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 18/02/2015
 * Time: 18:45
 */

include '../dblogin.php';

    $json = $_POST['data'];

    $map = R::dispense('maps');

    $map->json = $json;

    $id = R::store($map);