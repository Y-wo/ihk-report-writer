'use strict'

/*
TODO:
    - input links, output rechts
    - gesamtes Ausspucken (unten - automatisch immer)
    - button und Funktion, Sätze zu ändern
    - Sätze verbessern
    - Datumsfunktion

 */


let subjects = [
    {
        title : 'WPF',
        teacher : 'Herr Beicht',
    },
    {
        title : 'Deutsch',
        teacher : 'Frau Caglar',
    },
    {
        title : 'Englisch',
        teacher : 'Frau Caglar',
    },
    {
        title : 'Lernfeld 1',
        teacher : 'Frau Führich-Albert',
    },
    {
        title : 'Lernfeld 2',
        teacher : 'Herr Schäfer',
    },
    {
        title : 'Lernfeld 2',
        teacher : 'Frau Gau',
    },
    {
        title : 'Lernfeld 3',
        teacher : 'Herr Heyeckhaus',
    },
    {
        title : 'Lernfeld 4',
        teacher : 'Herr Decker',
    },
    {
        title : 'Lernfeld 5',
        teacher : 'Herr Donnarumma',
    },
    {
        title : 'SoWi',
        teacher : 'Frau Ruf',
    }
]




document.addEventListener("DOMContentLoaded", function () {

    let counter = 1
    for(let subject of subjects){

        console.log(counter)
        //div
        let thisDiv = document.createElement("div")
        thisDiv.className = "thisDiv col-10 d-flex flex-column align-items-center mb-3"

        //heading
        let heading = document.createElement("h5")
        heading.append(subject.title + " - " + subject.teacher)
        //topic input
        let topicInput = document.createElement("input")
        topicInput.placeholder = 'Fach' + counter
        topicInput.className = 'topic' + counter

        //output
        let output = document.createElement("div")
        output.className = 'output' + counter + ' align-self-start'

        thisDiv.append(heading)
        thisDiv.append(topicInput)
        thisDiv.append(output)
        $(".mainDivJs").append(thisDiv)

        //events
        topicInput.addEventListener("keyup", function(event){
            if(event.key === "Enter"){
                subject.topic = topicInput.value
                console.log(subject.topic)
                output.append(writeSentence(subject.title, subject.teacher, subject.topic))
            }
        })

        counter++

    }




})



// let sentence1 = `In ${subject} bei ${teacher} haben wir uns mit dem Thema blabla beschäftigt`

function writeSentence(subject, teacher, topic){
    let sentenceArray = [
        'In Fach ' + subject + ' bei ' + ' haben wir uns mit dem Thema ' + topic + ' beschäftigt.',
        teacher + ' behandelte in Fach ' + subject + ' besonders das Thema ' + topic,
    ]

    let randomNumber = Math.floor(Math.random() * sentenceArray.length)
    return sentenceArray[randomNumber]
}