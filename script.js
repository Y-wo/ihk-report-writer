'use strict'

/*
TODO:
    - gesamtes Ausspucken (unten - automatisch immer)
        * Datum noch hinzufügen
    . favIcon für change button
    - button und Funktion, Sätze zu ändern
    - Sätze verbessern
    - Datumsfunktion
    - hover ?

 */


let subjects = [
    {
        title : 'WPF',
        teacher : 'Herr Beicht',
        topic: null,
        sentenceIndex: null,
    },
    {
        title : 'Deutsch',
        teacher : 'Frau Caglar',
        topic: null,
        sentenceIndex: null,
    },
    {
        title : 'Englisch',
        teacher : 'Frau Caglar',
        topic: null,
        sentenceIndex: null,
    },
    {
        title : 'Lernfeld 1',
        teacher : 'Frau Führich-Albert',
        topic: null,
        sentenceIndex: null,
    },
    {
        title : 'Lernfeld 2',
        teacher : 'Herr Schäfer',
        topic: null,
        sentenceIndex: null,
    },
    {
        title : 'Lernfeld 2',
        teacher : 'Frau Gau',
        topic: null,
        sentenceIndex: null,
    },
    {
        title : 'Lernfeld 3',
        teacher : 'Herr Heyeckhaus',
        topic: null,
        sentenceIndex: null,
    },
    {
        title : 'Lernfeld 4',
        teacher : 'Herr Decker',
        topic: null,
        sentenceIndex: null,
    },
    {
        title : 'Lernfeld 5',
        teacher : 'Herr Donnarumma',
        topic: null,
        sentenceIndex: null,
    },
    {
        title : 'SoWi',
        teacher : 'Frau Ruf',
        topic: null,
        sentenceIndex: null,
    }
]


document.addEventListener("DOMContentLoaded", function () {

    let reportNumber = document.querySelector(".reportNumberJs")
    let reportSubject = document.querySelector(".reportSubjectJs")
    let beginDateInput = document.querySelector(".beginDateJs")
    let endDateInput = document.querySelector(".endDateJs")
    let applyButton = document.querySelector(".applyButton")
    let completeOutput = document.querySelector(".completeOutput")

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
        }
    })

    reportSubject.addEventListener("keyup", function(e){
        if (e.key === "Enter") {
            let reportSubjectValue = reportSubject.value
        }
    })


    //--- subject inputs
    let counter = 1
    for(let subject of subjects){
        //divs
        let completeDiv = document.createElement("div")
        completeDiv.className = "thisDiv col-12 d-flex flex-column mb-3"
        let divTop = document.createElement("div")
        divTop.className = "col-12 "
        let divBottom = document.createElement("div")
        divBottom.className = "col-12 d-flex"
        let leftDiv = document.createElement("div")
        leftDiv.className = "leftDiv col-3 d-flex"

        let midDiv = document.createElement("div")
        midDiv.className = "midDiv col-1 d-flex align-items-center justify-content-center"
        let rightDiv = document.createElement("div")
        rightDiv.className = "rightDiv col-8 d-flex flex-column align-items-start "

        //button
        let changeButton = document.createElement("button")
        changeButton.append("Wechseln")
        changeButton.className= "btn bg-success py-0"

        //heading
        let heading = document.createElement("h6")
        heading.append(subject.title + " - " + subject.teacher)
        //topic input
        let topicInput = document.createElement("input")
        topicInput.placeholder = 'Fach' + counter
        topicInput.className = 'topic' + counter + ' rounded'

        //output
        let output = document.createElement("div")
        output.className = 'output' + counter + ' h-100 d-flex align-items-center'

        //appending
        divTop.append(heading)
        divBottom.append(leftDiv)
        divBottom.append(midDiv)
        divBottom.append(rightDiv)
        leftDiv.append(topicInput)
        rightDiv.append(output)

        completeDiv.append(divTop)
        completeDiv.append(divBottom)
        $(".roundingSubjectDiv").append(completeDiv)

        //events
        topicInput.addEventListener("keyup", function(event){
            if(event.key === "Enter"){
                subject.topic = topicInput.value
                setSubjectOutput(subject, output)
                midDiv.append(changeButton)
            }
        })

        changeButton.addEventListener("click", function(){
            setSubjectOutput(subject, output)
        })
        counter++
    }

    //apply Event
    applyButton.addEventListener("click", function(){
        completeOutput.innerHTML = ''
        if(reportNumber.value) {
            console.log(reportNumber.value)
            let reportNumberParagraph = document.createElement('p')
            reportNumberParagraph.append('IHK-Bericht ' + reportNumber.value)
            completeOutput.append(reportNumberParagraph)
        }

        if(reportSubject.value) {
            let reportSubjectParagraph = document.createElement('p')
            reportSubjectParagraph.style = "font-weight: bold;"
            reportSubjectParagraph.append(reportSubject.value)
            completeOutput.append(reportSubjectParagraph)
        }



        for(let subject of subjects){
            if(subject.sentenceIndex !== null){
                let sentenceEntity = new SentenceEntity(subject)
                let subjectParagraph = document.createElement('p')
                subjectParagraph.append(sentenceEntity.getStoredSentence())
                completeOutput.append(subjectParagraph)
            }
        }
    })




})




function setSubjectOutput(subject, output){
    let sentenceEntity = new SentenceEntity(subject)
    subject.sentenceIndex = Math.floor(Math.random() * sentenceEntity.getSentenceArrayLength())
    output.innerHTML = sentenceEntity.getSentence(subject.sentenceIndex)
}

function SentenceEntity(subject) {
    let title = subject.title
    let teacher = subject.teacher
    let topic = subject.topic
    let sentenceIndex = subject.sentenceIndex
    this.sentenceArray = [
        'In Fach ' + title + ' bei ' + teacher + ' haben wir uns mit dem Thema ' + topic + ' beschäftigt.',
        teacher + ' behandelte in ' + title + ' besonders das Thema ' + topic + '.',
        'In ' + title + ' bei ' + teacher + ' stand diese Woche ' + topic + ' im Zentrum.',
        'In ' + title + ' bei ' + teacher + ' stand diese Woche ' + topic + ' im Fokus.',
        'Im Zentrum von ' + title + ' bei ' + teacher + ' stand diese Woche die Thematik ' + topic + ' im Zentrum.',
        'Im Zentrum von ' + title + ' bei ' + teacher + ' stand diese Woche die Thematik ' + topic + ' im Fokus.',
        teacher + ' behandelte diese Woche in ' + title + ' das Themengebiet ' + topic + '.',
        'Bei ' + teacher + ' lernten wir in ' + title + ' das Thema ' + topic + ' kennen.',
        'Bei ' + teacher + ' in ' + title + ' setzten wir uns mit ' + topic + ' auseinander.',
        'Der Gegenstand "' + topic + '" wurde bei ' + teacher + ' in ' +  title + ' behandelt.',
        'Bei ' + teacher + ' in ' + title + ' wurde der Gegenstand "' + topic + ' behandelt.'
    ]

    this.getSentenceArray = function(){
        return this.sentenceArray
    }

    this.getSentenceArrayLength = function(){
        return this.sentenceArray.length
    }

    this.getSentence = function(index){
        return this.sentenceArray[index]
    }

    this.getStoredSentence = function(){
        return this.sentenceArray[sentenceIndex]
    }

}