<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 04/02/2015
 * Time: 17:09
 */
require_once 'Twig/Autoloader.php';

Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('views');

$twig = new Twig_Environment($loader);

echo $twig->render('build.twig', array('text' => 'Hello world!'));