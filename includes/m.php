<?php
$referer=$ _SERVER[ 'HTTP_REFERER'];
$URL='http://localhost' ;
$pos=s trrpos($referer,$URL);
if(empty($referer) || empty($pos) || $pos<0 ){
    header( 'Location: '.$URL); }
$name=t rim($_POST[ 'name']);
$email=t rim($_POST[ 'email']);
$subject=t rim($_POST[ 'subject']);
$betatest=t rim($_POST[ 'betatest']);
if(function_exists( 'stripslashes')) {
    $message=s tripslashes(trim($_POST[ 'message'])); }
else {
    $message=t rim($_POST[ 'message']);
}
$emailTo='contact@mobvino.com' ;
$subject='Message depuis le site web de : ' .$name;
$body="Nom: $name \n\nEmail : $email \n\nSujet : $subject\n\nMessage : $message\n\nDeveir beta testeur : $betatest" ; $headers='From: Mobvino <' .$emailTo. '>' . "\r\n" . 'Reply-To: ' . $email;
mail($emailTo, $subject, $body, $headers);
return true;
?>
