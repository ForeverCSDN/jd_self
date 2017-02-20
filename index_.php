<?php
    header('Content-Type:text/html;charset=utf-8');

    $data = array(
        array(
            'imgUrl'=>'images/detail02.jpg',
            'nowPrice'=>'9.99',
            'oldPrice'=>'199.00'
            ),
        array(
            'imgUrl'=>'images/detail03.jpg',
            'nowPrice'=>'19.00',
            'oldPrice'=>'299.00'
        ),
        array(
            'imgUrl'=>'images/detail01.jpg',
            'nowPrice'=>'33.00',
            'oldPrice'=>'233.00'
        )
    );
    //后台同步渲染
    //require 'index.html';

    //异步渲染
    //php数组转化为json字符
    $json_data = json_encode($data);
    sleep(1);
    echo $json_data;

?>
