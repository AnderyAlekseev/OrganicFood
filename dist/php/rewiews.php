<?php
    include 'config.php'; 
    $db_table = 'customers';
try{
    $pdo = new PDO('mysql:host='.$db_host.'; dbname='.$db_name, $db_username, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
}catch (PDOException $e) {
    echo 'Подключение к БД не удалось: ' . $e->getMessage();
}
    $selAllStr = "SELECT * FROM customers ORDER BY `id`";
    $state = $pdo->prepare($selAllStr);
    $state->execute(); 
    $customers = $state->fetchAll(PDO::FETCH_ASSOC);    // достаём из БД все отзывы
// var_dump($customers);
    $state = $pdo->prepare("SELECT curent_count FROM count "); // достаем из БД номер текущего отзыва
    $state->execute(); 
    $str_count = $state->fetch(PDO::PARAM_INT);
    $curent_item = (int)$str_count[0];

                /*  Обрабатываем запрос от нажатий кнопок */
                if (isset($_GET['direction'])  )
                {
                    $dir = $_GET['direction'];
                    
                    $maxIdStr = "SELECT MAX(id) FROM customers";
                    $state = $pdo->prepare($maxIdStr);
                    $state->execute(); 
                    $str_MaxId = $state->fetch(PDO::PARAM_INT);
                    $MaxItem = (int)$str_MaxId[0];  // определяем максимальное количество отзывов
                
                    if($dir == "prev"){
                        $curent_item--;     // если ajax запрос пр нажатии кнопки "предыдущий отзыв" , уменьшаем номер текущего отзыва
                    }else if($dir == "next") {
                        $curent_item++;
                    }
                    if($curent_item > $MaxItem){ // зацикливание прокрутки отзывов по кругу 
                        $curent_item = 1;
                    }else if ($curent_item == 0){
                        $curent_item = $MaxItem;
                    }
                    $state = $pdo->prepare("UPDATE count  SET curent_count=? ");    // обновляем номер текущего отзыва в БД
                    $state->execute([$curent_item ]); 
                }

    $responce = $customers[$curent_item-1]; // в ответе посылаем отзыв с текущим номером
    echo json_encode($responce);
    $pdo = NULL;
