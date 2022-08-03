'use strict'

let subject1 = "WPF"
let teacher1 = "Herr Beicht"



document.addEventListener("DOMContentLoaded", function () {

    $('#testButton').click(function() {
        console.log("test123")
        $('#testOutput').append("test123")
    })

    $(".inputSubject1Js").val(subject1)
    $(".inputTeacher1Js").val(teacher1)

    // $(".output1Js").val(function (subject1, teacher1 ){
    //
    // })

    $(".output1Js").append( writeSentence(subject1, teacher1))



})



function writeSentence(subject1, teacher1){
    return "hallo " + subject1 + " " + teacher1
}