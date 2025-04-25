<?php

	$errorMSG = "";

	// NAME
	if (empty($_POST["name"])) {
		$errorMSG = "Name is required. ";
	} else {
		$name = $_POST["name"];
	}

	// EMAIL
	if (empty($_POST["email"])) {
		$errorMSG .= "Email is required. ";
	} else {
		$email = $_POST["email"];
	}

	// PHONE
	if (empty($_POST["phone"])) {
		$errorMSG .= "Phone is required. ";
	} else {
		$phone = $_POST["phone"];
	}

	// DATE
	if (empty($_POST["date"])) {
		$errorMSG .= "Date is required. ";
	} else {
		$date = $_POST["date"];
	}

	// TIME
	if (empty($_POST["time"])) {
		$errorMSG .= "time is required. ";
	} else {
		$time = $_POST["time"];
	}

	// PERSON
	if (empty($_POST["person"])) {
		$errorMSG .= "person is required. ";
	} else {
		$person = $_POST["person"];
	}

	$subject ='Book Appointment from site';

	$EmailTo = "info@yourdomain.com"; // Replace with your email.

	// prepare email body text
	$Body = "";
	$Body .= "name: ";
	$Body .= $name;
	$Body .= "\n";
	$Body .= "Email: ";
	$Body .= $email;
	$Body .= "\n";
	$Body .= "Phone: ";
	$Body .= $phone;
	$Body .= "\n";	
	$Body .= "Date: ";
	$Body .= $date;
	$Body .= "\n";
	$Body .= "time: ";
	$Body .= $time;
	$Body .= "\n";
	$Body .= "person: ";
	$Body .= $person;
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