<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 03/02/2015
 * Time: 23:45
 */
include 'dblogin.php';

require_once 'Twig/Autoloader.php';
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem('views');
$twig = new Twig_Environment($loader);


$maps =  R::getCol( 'SELECT id FROM maps' );

echo $twig->render('home.twig', array($maps));

/*
$action=$_POST["action"];

if($action=="getMap"){



    $json = R::load( 'map', $id );

    $map = R::dispense('maps');

    $map->json = $json;

    $id = R::store($map);

    echo $json;

}
*/