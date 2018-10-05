<?php   
  session_start();
  date_default_timezone_set('Asia/Kolkata'); 
/**
 * @package Routes 
 **/ 

$Router->get('/src/service/getTodoItems',function() use ($Service) { 
	echo json_encode($Service->Prote()->DBI()->DAL()->common()->getTodoItems());
});
 
$Router->post('/src/service/addTodoItems',function() use ($Service) {
	echo json_encode($Service->Prote()->DBI()->DAL()->common()->addTodoItems($_POST['title'],$_POST['description']));
});

$Router->post('/src/service/updateTodoItem',function() use ($Service) {
	echo json_encode($Service->Prote()->DBI()->DAL()->common()->updateTodoItem($_POST['id'],$_POST['IsCompleted']));
});

$Router->post('/src/service/deleteTodoItem',function() use ($Service) {
	echo json_encode($Service->Prote()->DBI()->DAL()->common()->deleteTodoItem($_POST['id']));
});


$Router->get('/install', function() use ($Service) { 
	//////INSTALLATION STARTS HERE//////	
	$Service->Prote()->DBI()->DAL()->common()->install();
});