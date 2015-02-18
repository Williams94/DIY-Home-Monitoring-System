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

echo $twig->render('home.twig', array('text' => 'Hello world!'));



/*
if(isset($_POST)){
    $json = $_POST['json'];


    //3. Generate Database Insert Query
    //4. Run mysql Query to insert

    // Return appropriate return back to Javascript code - Success or Failure
}*/