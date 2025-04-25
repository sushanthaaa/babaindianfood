<?php

	$errorMSG = "";

	// NAME
	if (empty($_POST["Name"])) {
		$errorMSG = "Name is required. ";
	} else {
		$Name = $_POST["Name"];
	}

	// EMAIL
	if (empty($_POST["Email"])) {
		$errorMSG .= "Email is required. ";
	} else {
		$Email = $_POST["Email"];
	}

	// PHONE
	if (empty($_POST["Phone"])) {
		$errorMSG .= "Phone is required. ";
	} else {
		$Phone = $_POST["Phone"];
	}

	// MESSAGE
	if (empty($_POST["Message"])) {
		$errorMSG .= "Message is required. ";
	} else {
		$Message = $_POST["Message"];
	}

	$subject = 'Contact Inquiry from Website';

	//$EmailTo = "info@yourdomain.com"; // Replace with your email.
    $EmailTo = "Sushanthaaatechnology@gmail.com";
    
	// prepare email body text
	$Body = "";
	$Body .= "Name: ";
	$Body .= $Name;
	$Body .= "\n";
	$Body .= "Email: ";
	$Body .= $Email;
	$Body .= "\n";
	$Body .= "Phone: ";
	$Body .= $Phone;
	$Body .= "\n";
	$Body .= "Message: ";
	$Body .= $Message;
	$Body .= "\n";

	// send email
	$success = @mail($EmailTo, $subject, $Body, "From:".$email);

	// redirect to success page
	if ($success && $errorMSG == ""){
	   echo "success";
	}else{
		if($errorMSG == ""){
			echo "Something went wrong :(";
		} else {
			echo $errorMSG;
		}
	}

?>