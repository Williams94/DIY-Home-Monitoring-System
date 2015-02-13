<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 03/02/2015
 * Time: 23:45
 */
require_once 'Twig/Autoloader.php';

Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('views');

$twig = new Twig_Environment($loader);

echo $twig->render('home.twig', array('text' => 'Hello world!'));
