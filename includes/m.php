<?php
$referer=$_SERVER[ 'HTTP_REFERER'];
$URL='http://localhost' ;
$pos=strrpos($referer,$URL);
if(empty($referer) || empty($pos) || $pos<0 ){
    header( 'Location: '.$URL); }
$name=trim($_POST[ 'name']);
$email=trim($_POST[ 'email']);
$subject=trim($_POST[ 'subject']);
$betatest=trim($_POST[ 'betatest']);
if(function_exists( 'stripslashes')) {
    $message=stripslashes(trim($_POST[ 'message'])); }
else {
    $message=trim($_POST[ 'message']);
}
$emailTo='contact@mobvino.com' ;
$subject='Message depuis le site web de : ' .$name;
$body="Nom: $name \n\nEmail : $email \n\nSujet : $subject\n\nMessage : $message\n\nDeveir beta testeur : $betatest" ; $headers='From: Mobvino <' .$emailTo. '>' . "\r\n" . 'Reply-To: ' . $email;
mail($emailTo, $subject, $body, $headers);
return true;
?>
