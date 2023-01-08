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
    //add event listener on DOM
    document.querySelector("#submit").addEventListener("click", function(e){

        let benefit = document.getElementsByName("benefit");
        let type = document.getElementsByName("type");

        let searchKey = "";
        for(let i=0 ; i < benefit.length; i++){
            if(benefit[i].checked){
                searchKey = benefit[i].value;
            }
        }
        let vof = "";
        for(let i=0; i < type.length; i++){
            if(type[i].checked){
                vof = type[i].value;
            }
        }

        if(searchKey == "" || vof == ""){
            window.alert("Both selections are required!");
            return;
        }

        console.log(searchKey);
        console.log(vof);

        ajaxGET("/produce?ingr=" + searchKey + "&vof=" + vof, function(data){
            console.log(data);
            window.location.assign("produce/?ingr=" + searchKey + "&vof=" + vof);
        });
    });
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