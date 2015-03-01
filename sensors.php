<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 01/03/2015
 * Time: 17:27
 */

require_once 'Twig/Autoloader.php';
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem('views');
$twig = new Twig_Environment($loader);

echo $twig->render('place.twig', array('text' => 'Hello world!'));