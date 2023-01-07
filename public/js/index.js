"use strick";

//=========================================================
//client side code
//=========================================================

ready (function(){
    //get the index.html from server
    console.log("Client script loaded.");

    function ajaxGET(url, callback) {
        const xhr = new XMLHttpRequest();
        // console.log("xhr", xhr);
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                //console.log('responseText:' + xhr.responseText);
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    //=================================================
    //add even listesner on DOM










});


// callback function declaration
function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}