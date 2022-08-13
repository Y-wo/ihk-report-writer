'use strict'

/*
TODO:
    - general Infos optisch anpassen (asurichten)
    - gesamtes Ausspucken (unten - automatisch immer)
    - button und Funktion, Sätze zu ändern
    - Sätze verbessern
    - Datumsfunktion
    - hover ?

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

    let reportNumber = document.querySelector(".reportNumberJs")
    let reportSubject = document.querySelector(".reportSubjectJs")
    let beginDateInput = document.querySelector(".beginDateJs")
    let endDateInput = document.querySelector(".endDateJs")


    beginDateInput.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            let beginDate = new Date(beginDateInput.value)
            let beginDateCopy = new Date(beginDateInput.value)
            let endDate = new Date(beginDateCopy.setDate(beginDateCopy.getDate() + 7))
            let endDay = endDate.getDate()
            if(endDay < 10) endDay = '0' + endDay
            let endMonth = endDate.getMonth() + 1
            if(endMonth < 10) endMonth = '0' + endMonth
            let endYear = endDate.getFullYear()
            endDateInput.value = endDay + '.' + endMonth + '.' + endYear
        }
    })

    reportNumber.addEventListener("keyup", function(e){
        if (e.key === "Enter") {
            let reportNumberValue = reportNumber.value
            console.log(reportNumberValue)
        }
    })

    reportSubject.addEventListener("keyup", function(e){
        if (e.key === "Enter") {
            let reportSubjectValue = reportSubject.value
            console.log(reportSubjectValue)
        }
    })





    //--- subject inputs
    let counter = 1
    for(let subject of subjects){
        //divs
        let bigDiv = document.createElement("div")
        bigDiv.className = "thisDiv col-12 d-flex flex-column mb-3"
        let bigDivUp = document.createElement("div")
        bigDivUp.className = "col-12"
        let divDown = document.createElement("div")
        divDown.className = "col-12 d-flex "
        let leftDiv = document.createElement("div")
        leftDiv.className = "leftDiv col-4 d-flex "
        let leftDivDown = document.createElement("div")
        leftDivDown.className = "col-12 d-flex justify-content-between"
        let rightDiv = document.createElement("div")
        rightDiv.className = "rightDiv col-8 d-flex flex-column align-items-start "

        //button
        let changeButton = document.createElement("button")
        changeButton.append("Wechseln")
        changeButton.className="col-4 btn bg-success mx-3 "

        //heading
        let heading = document.createElement("h6")
        heading.append(subject.title + " - " + subject.teacher)
        //topic input
        let topicInput = document.createElement("input")
        topicInput.placeholder = 'Fach' + counter
        topicInput.className = 'topic' + counter + ' col-7 rounded'

        //output
        let output = document.createElement("div")
        output.className = 'output' + counter + ' h-100 d-flex align-items-center'


        //appending
        bigDivUp.append(heading)
        divDown.append(leftDiv)
        divDown.append(rightDiv)
        leftDiv.append(topicInput)
        // leftDiv.append(changeButton)
        rightDiv.append(output)
        bigDiv.append(bigDivUp)
        bigDiv.append(divDown)
        $(".mainDivJs").append(bigDiv)

        //events
        topicInput.addEventListener("keyup", function(event){
            if(event.key === "Enter"){
                subject.topic = topicInput.value
                console.log(subject.topic)
                output.innerHTML = writeSentence(subject.title, subject.teacher, subject.topic)
                leftDiv.append(changeButton)
            }
        })

        changeButton.addEventListener("click", function(){
            output.innerHTML = writeSentence(subject.title, subject.teacher, subject.topic)
        })

        counter++
    }




})



// let sentence1 = `In ${subject} bei ${teacher} haben wir uns mit dem Thema blabla beschäftigt`

function writeSentence(subject, teacher, topic){
    let sentenceArray = [
        'In Fach ' + subject + ' bei ' + teacher + ' haben wir uns mit dem Thema ' + topic + ' beschäftigt.',
        teacher + ' behandelte in ' + subject + ' besonders das Thema ' + topic + '.',
        'In ' + subject + ' bei ' + teacher + ' stand diese Woche ' + topic + ' im Zentrum.',
        'In ' + subject + ' bei ' + teacher + ' stand diese Woche ' + topic + ' im Fokus.',
        'Im Zentrum von ' + subject + ' bei ' + teacher + ' stand diese Woche die Thematik ' + topic + ' im Zentrum.',
        'Im Zentrum von ' + subject + ' bei ' + teacher + ' stand diese Woche die Thematik ' + topic + ' im Fokus.',
        teacher + ' behandelte diese Woche in ' + subject + ' das Themengebiet ' + topic + '.',
        'Bei ' + teacher + ' lernten wir in ' + subject + ' das Thema ' + topic + ' kennen.',
        'Bei ' + teacher + ' in ' + subject + ' setzten wir uns mit ' + topic + ' auseinander.',
        'Der Gegenstand "' + topic + '" wurde bei ' + teacher + ' in ' +  subject + ' behandelt.',
        'Bei ' + teacher + ' in ' + subject + ' wurde der Gegenstand "' + subject + ' behandelt.'
    ]

    let randomNumber = Math.floor(Math.random() * sentenceArray.length)
    return sentenceArray[randomNumber]
}