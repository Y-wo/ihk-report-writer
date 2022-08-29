'use strict'


//TODO:
//  - Sätze verbessern
//  - weißes Blatt als Hintergrund?
//  - bei GitHub hochladen


//--- INFO: Change your subjects and teachers here.
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
    let applyButton = document.querySelector(".applyButton")
    let completeOutput = document.querySelector(".completeOutput")
    let hr = document.querySelector(".hrJs")

    beginDateInput.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            let beginDate = new Date(beginDateInput.value)
            let beginDateCopy = new Date(beginDateInput.value)
            let endDate = new Date(beginDateCopy.setDate(beginDateCopy.getDate() + 6))
            let endDay = endDate.getDate()
            if (endDay < 10) endDay = '0' + endDay
            var endMonth = endDate.getMonth() + 1
            if (endMonth < 10) endMonth = '0' + endMonth
            var endYear = endDate.getFullYear()
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
        subject.topic = null
        subject.sentenceIndex = null

        //divs
        let completeDiv = document.createElement("div")
        completeDiv.className = "thisDiv col-12 d-flex flex-column mb-3"
        let divTop = document.createElement("div")
        divTop.className = "col-12 "
        let divBottom = document.createElement("div")
        divBottom.className = "col-12 d-flex"
        let leftDiv = document.createElement("div")
        leftDiv.className = "leftDiv col-4 d-flex  "
        let buttonDiv = document.createElement("div")
        buttonDiv.classList = "col-5 d-flex justify-content-around"

        let rightDiv = document.createElement("div")
        rightDiv.className = "rightDiv col-8 d-flex flex-column align-items-start "

        //buttons
        let changeButton = document.createElement("button")
        let iChangeButton = document.createElement('i')
        iChangeButton.classList = "fas fa-sync-alt fa-1x"
        changeButton.append(iChangeButton)
        changeButton.classList= "changeButton btn py-0 mH2r"
        let removeButton = document.createElement("button")
        let iRemoveButton = document.createElement('i')
        iRemoveButton.classList = "fas fa-trash-alt"
        removeButton.append(iRemoveButton)
        removeButton.classList= "btn removeButton py-0 mH2r"

        //heading
        let heading = document.createElement("h6")
        heading.append(subject.title + " - " + subject.teacher)

        //topic input
        let topicInput = document.createElement("input")
        topicInput.placeholder = 'Thema'
        topicInput.className = 'topic' + counter + ' rounded'

        //output
        let output = document.createElement("div")
        output.classList = 'output' + counter + ' h-100 d-flex align-items-center col1'

        //appending
        divTop.append(heading)
        divBottom.append(leftDiv)
        divBottom.append(rightDiv)
        leftDiv.append(topicInput, buttonDiv)
        rightDiv.append(output)
        completeDiv.append(divTop)
        completeDiv.append(divBottom)
        $(".roundingSubjectDiv").append(completeDiv)

        //--- events

        //set output
        topicInput.addEventListener("keyup", function(event){
            if(event.key === "Enter"){
                subject.topic = topicInput.value
                setSubjectOutput(subject, output)
                buttonDiv.append(changeButton, removeButton)
            }
        })

        //change output
        changeButton.addEventListener("click", function(){
            setSubjectOutput(subject, output)
        })

        //remove output
        removeButton.addEventListener("click", function(){
            subject.sentenceIndex = null
            output.innerHTML = ''
            topicInput.value = ''
            buttonDiv.removeChild(changeButton)
            buttonDiv.removeChild(removeButton)
        })

        counter++
    }

    //apply Event
    applyButton.addEventListener("click", function(){
        hr.classList.remove("invisible")
        hr.classList.add("visible")
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

        if(beginDateInput.value){
            let dateParagraph = document.createElement('p')
            dateParagraph.style = "margin-bottom: 2rem !important;"
            let beginDate = new Date(beginDateInput.value)
            let beginDay = beginDate.getDate()
            if(beginDay < 10) beginDay = '0' + beginDay
            var beginMonth = beginDate.getMonth() + 1
            if(beginMonth < 10) beginMonth = '0' + beginMonth
            var beginYear = beginDate.getFullYear()
            dateParagraph.append(beginDay + "." + beginMonth + "." + beginYear + " bis " + endDateInput.value)
            completeOutput.append(dateParagraph)
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