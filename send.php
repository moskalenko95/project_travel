<?php
$recepient = "moskalb.ua@gmail.com";
$sitename = "Travel";

$username = trim($_GET["username"]);
$email = trim($_GET["email"]);
$phone = trim($_GET["phone"]);

if ($username!='' and $email!='' and $phone!='') {
    $message = "$username $email $phone";
    $res = mail($recepient, 'Subject', $message);
    if ($res) {
        echo 1;
    } else {
        echo 0;
    }
}
else {
    echo 0;
}

?>