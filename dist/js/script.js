"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // находим все кнопки
    let hamburger = document.getElementById('header_hamburger');
    let but_aboutUs = document.getElementById('but_aboutUs');
    let but_services = document.getElementById('but_services');
    let but_catalog = document.getElementById('but_catalog');
    let but_contacts = document.getElementById('but_contacts');
//  назначаем им слушателей
    hamburger.addEventListener('click', () => {
        let header__menu = document.getElementById('header__menu');
        header__menu.classList.toggle('header__menu_active');
    });

    but_aboutUs.addEventListener('click', getAboutUs);
    // but_services.addEventListener('click', getServices);
    // but_catalog.addEventListener('click', getCatalog);
    // but_contacts.addEventListener('click', getContact);
    

});

function getAboutUs(){
    console.log("getAboutUs");
    let url="php/aboutUs.php";
    let xhr = new XMLHttpRequest() ; 
    xhr.open('GET', url)  ; 
    // xhr.responseType = 'json'  // ответ будет сразу в виде json строки и его надо сразу распарсить в результате в ответе получаем объект
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onerror = () =>{
        console.log(xhr.response);
    };
    xhr.onload = function(){ 
        console.log(xhr.response);  
        // let content =  document.getElementById('content');     
        document.getElementById('content').innerHTML = xhr.response;    // Содержимое ответа, помещаем внутрь э    

    };
    xhr.send();  // Инициирует запрос. Посылаем запрос на сервер.
}