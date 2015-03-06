<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 05/03/2015
 * Time: 21:42
 */

require_once 'Twig/Autoloader.php';
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem('views');
$twig = new Twig_Environment($loader);

echo $twig->render('editing.twig', array('text' => 'Hello world!'));