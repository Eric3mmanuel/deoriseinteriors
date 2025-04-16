<?php
//make sure your server allows PHP mail() function (some hosts require SMTP instead)
//$POST COLLECTS THE DATA SUBMITTED FROM THE FORM
// Check for empty fields
if(empty($_POST['name'])      ||//E.G (empty($_POST['name']) CHECKS IF THE NAME FIELD IS LEFT BLANK
   empty($_POST['email'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))//This ensures the email is valid
   {
   echo "No arguments Provided!";/*IF ANY FIELD IS EMPTY OR THE EMAIL IS INVALID,IT STOPS THE PROCESS AND SHOWS THE CODE ON THE LEFT*/ 
   return false;                                                       
   }
//strip_tags() and htmlspecialchars() remove harmful code (like scripts) to prevent hacking(XSS attacks)
//This makes sure that only clean text is stored  
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
   
// Create the email and send the message
//PREPARING THE EMAIL
//$to is the email where the message should be sent(you can replace it with your own gmail)
//$email_subject creates a title for the email
//$email_body contains the actual message with the name,email,phone and message
//SETTING EMAIL HEADERS
//"From: noreply@yourdomain.com\n" sets the sender email (so it doesnt look like spam)
//"Reply-To: $email_address" allows you to directly reply to the sender
//mail()sends the email to the specified $to address
//return true;confirms that the email was sent successfully
$to = 'ericjohn14656@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
$headers = "From: noreply@decoriseinteriors.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";   
mail($to,$email_subject,$email_body,$headers);
return true;         
?>

