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


$maps =  R::findAll('maps');

//var_dump($maps);

echo $twig->render('home.twig', array($maps));