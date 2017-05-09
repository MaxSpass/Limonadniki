<?php
session_start();
new post_contact($_POST);
class post_contact 
{
    public function __construct($post_data) 
	{
		$this->send_contact_form($post_data);
    }
	function send_contact_form($post_data) 
	{

	$data = json_decode($_POST['json_string']);
	var_dump($data[0]);
	var_dump($data[0]->products, $data[0]->form->email);

	$products = $data[0]->products; //array of products
	
	$form_data = $data[0]->form; //form data
	
	$email = $form_data->email;
	$name = $form_data->name;
	$tel = $form_data->tel;
	$total = $form_data->total;
		
	$main_email = 'maxspas1@mail.com';


    if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['tel']))
	{
		$headers = "MIME-Version: 1.0" . PHP_EOL .
		"Content-Type: text/html; charset=utf-8" . PHP_EOL .
		'From: '.$main_email.' <'.$main_email.'>' . PHP_EOL;
		$message = '<p style="color:grey">Форма: <span style="color:#000">'.$_POST['namemodal'].'</span></p>';
		$message .= '<p style="color:grey">IP: <span style="color:#000">'.$_SERVER['REMOTE_ADDR'].'</span></p>';
		$message .= '<p style="color:grey">Имя: <span style="color:#000">'.$_POST['name'].'</span></p>';
		$message .= '<p style="color:grey">Email: <span style="color:#000">'.$_POST['email'].'</span></p>';
		$message .= '<p style="color:grey">Телефон: <span style="color:#000">'.$_POST['tel'].'</span></p>';
		mail($main_email, 'Main Form', $message, $headers );

		var_dump($_POST['name'],$_POST['email'],$_POST['tel']);
	}

    if(isset($name) && isset($email) && isset($tel))
	{
		$headers = "MIME-Version: 1.0" . PHP_EOL .
		"Content-Type: text/html; charset=utf-8" . PHP_EOL .
		'From: '.$main_email.' <'.$main_email.'>' . PHP_EOL;
		$message = '<p style="color:grey">Форма: <span style="color:#000">"Корзина"</span></p>';
		$message .= '<p style="color:grey">IP: <span style="color:#000">'.$_SERVER['REMOTE_ADDR'].'</span></p>';
		$message .= '<p style="color:grey">Имя: <span style="color:#000">'.$name.'</span></p>';
		$message .= '<p style="color:grey">Email: <span style="color:#000">'.$email.'</span></p>';
		$message .= '<p style="color:grey">Телефон: <span style="color:#000">'.$tel.'</span></p>';
		foreach ($products as $product) {
			$message .= '<p style="color:#000;font-size:20px;border:1px solid maroon;display:inline-block;width:100%;padding:5px 10px"> Названиме товара: '. $product->name . ' <span style="margin:0 10px;color:red;font-weight:bold">|</span> Цена за единицу: ' . $product->price . '(грн) <span style="margin:0 10px;color:red;font-weight:bold">|</span> Количество:' . $product->quantity . '(шт)</p>';
		}

		$message .= '<p style="color:maroon;font-size:22px;font-weight:bold">Общая сумма по заказу: '.$total.'грн</p>';
		var_dump($message);
// die();
		mail($main_email, 'Main Form', $message, $headers );
	}


	}
}

