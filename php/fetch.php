<?php
/**
 * Created by PhpStorm.
 * User: Ross
 * Date: 12/03/2015
 * Time: 00:15
 */
include '../dblogin.php';



$action = $_POST["action"];
$type = $_POST["type"];

if($action=="sensor1"){

    if ($type == "1") {
        $data = R::getAll('SELECT * FROM `sensor1`  WHERE type=1  ORDER BY id DESC LIMIT 500');
    }
    else if ($type == "2") {
        $data = R::getAll('SELECT * FROM `sensor1`  WHERE type=2  ORDER BY id DESC LIMIT 500');
    }
    echo json_encode($data);

<<<<<<< HEAD
}
else if($action=="sensor2"){
    if ($type == 1) {
        $data = R::getAll('SELECT * FROM `sensor2`  WHERE type=1  ORDER BY id DESC LIMIT 500');
    }
    else if ($type == 2) {
        $data = R::getAll('SELECT * FROM `sensor2`  WHERE type=2  ORDER BY id DESC LIMIT 500');
    }
=======
    $data = R::getAll( 'SELECT * FROM `sensor1`  WHERE type=1  ORDER BY id DESC LIMIT 500' );
>>>>>>> parent of 979779d... Small changes

    echo json_encode($data);

}
else if($action=="sensor3"){

    if ($type == 1) {
        $data = R::getAll('SELECT * FROM `sensor3`  WHERE type=1  ORDER BY id DESC LIMIT 500');
    }
    else if ($type == 2) {
        $data = R::getAll('SELECT * FROM `sensor3`  WHERE type=2  ORDER BY id DESC LIMIT 500');
    }

    echo json_encode($data);

}
else if($action=="sensor4"){

    if ($type == 1) {
        $data = R::getAll('SELECT * FROM `sensor4`  WHERE type=1  ORDER BY id DESC LIMIT 500');
    }
    else if ($type == 2) {
        $data = R::getAll('SELECT * FROM `sensor4`  WHERE type=2  ORDER BY id DESC LIMIT 500');
    }

    echo json_encode($data);

}
else if($action=="sensor5"){

    if ($type == 1) {
        $data = R::getAll('SELECT * FROM `sensor5`  WHERE type=1  ORDER BY id DESC LIMIT 500');
    }
    else if ($type == 2) {
        $data = R::getAll('SELECT * FROM `sensor5`  WHERE type=2  ORDER BY id DESC LIMIT 500');
    }

    echo json_encode($data);

}
else if($action=="sensor6"){

<<<<<<< HEAD
    if ($type == 1) {
        $data = R::getAll('SELECT * FROM `sensor6`  WHERE type=1  ORDER BY id DESC LIMIT 500');
    }
    else if ($type == 2) {
        $data = R::getAll('SELECT * FROM `sensor6`  WHERE type=2  ORDER BY id DESC LIMIT 500');
    }

    echo json_encode($data);
}
=======
    }
>>>>>>> parent of 979779d... Small changes
