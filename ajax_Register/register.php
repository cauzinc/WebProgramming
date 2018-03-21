<?php
    $account = array("admin0206","cauzinc","sgrey0206");
    $usn = $_POST['usn'];
    $pwd = $_POST['pwd'];

    $notRegistered = true;
    for($i=0; $i<count($account); $i++){
        if($account[$i] == $usn){
            $notRegistered = false;
        }
    }
    if($notRegistered){
        echo true;
    }else{
        echo false;
    }
?>