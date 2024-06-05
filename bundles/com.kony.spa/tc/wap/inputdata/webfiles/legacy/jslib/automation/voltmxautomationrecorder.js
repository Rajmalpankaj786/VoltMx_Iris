
$KAR = (function() {
    
    var connection, runMode, lastGUID, lastWidget, lastAction, scriptDetails,
    jasmineResults = {
        'messageType': 'jasmineEvent',
        'messageData': {
            'DeviceID': 'web'
        }
    },
    reportingResult = {
        "messageType": "jasmineDashboardResult",
        "messageData": {
            "metadata":{
            }
        }
    };

    var baseTemplate = `<!DOCTYPE html>
    <html lang="en">
       <head>
          <meta charset="utf-8">
          <meta name="viewport" content="user-scalable = no">
          <meta name="description" content="">
          <meta name="author" content="">
          <title>
             Iris
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <!--Inline Style Starts-->
    <style>
        body,
        html {
            height: 100%;
        }
        body {
            font-family: 'Helvetica';
            margin: 0;
            padding: 0;
            height: 100%;
            position: relative;
            letter-spacing: 0.5px;
            min-width: 1024px;
        }

        body,
        div,
        p,
        span,
        a,
        input,
        head,
        table,
        tr,
        tbody,
        thead,
        td,
        ul,
        li,
        ol,
        i,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        dl,
        dt,
        dd,
        select,
        input {
            margin: 0;
            padding: 0;
        }

        p {
            font-family: 'Helvetica';
        }

        h4 {
            font-family: 'Helvetica';
            font-weight: 400;
        }

        a {
            text-decoration: none !important;
        }

        .parent-heading {
            /* background: #F2F4F7; */
            padding: 10px 15px;
        }

        .label-heading {
            font-size: 18px;
            color: #444444;
            font-weight: bold;
        }

        .label-heading-suite {
                top: 5px;
                position: inherit;
                padding: 8px 5px 5px 0px;
                font-size: 18px;
                color: #444444;
                font-weight: bold;
            }



        .sub-heading {
            font-size: 12px;
            color: #333333;
            font-weight: 100;
            margin-left: 8px;
        }

        .date {
            font-size: 12px;
            color: #333333;
            opacity: 0.7;
            font-weight: 100;
            margin-left: 8px;
            position: absolute;
            top: 14px;
        }

        .info-sections .passed {
            border: 1px solid #34C84A;
            border-radius: 4px;
            padding: 5px 10px;
            width: fit-content;
        }

        .info-sections .passed-text {
            font-size: 10px;
            color: #34C84A;
            /* font-weight: 600; */
        }

        .info-sections .failed {
            border: 1px solid #FF4743;
            border-radius: 4px;
            padding: 5px 10px;
            width: fit-content
        }

        .info-sections .failed-text {
            font-size: 10px;
            color: #FF4743;
            /* font-weight: 600; */
        }

        .info-sections .pending {
            border: 1px solid #FF8B00;
            border-radius: 4px;
            padding: 5px 10px;
            width: fit-content
        }

        .info-sections .pending-text {
            font-size: 10px;
            color: #FF8B00;
            /* font-weight: 600; */
        }

        .ml-10 {
            margin-left: 10px;
        }

        .mr-20 {
            margin-right: 20px;
        }

        .info-sections {
            display: inline-block;
            margin-top: 12px;
        }
        .accordion {
            background-color: #f7f7f7;
            border: 1px solid #E6E6E6 !important;
            color: #444;
            cursor: pointer;
            padding: 10px 15px;
            width: 100%;
            border: none;
            text-align: left;
            outline: none;
            transition: 0.4s;
        }

        .accordion-dialog {
            background-color: #e2e5e8;
            padding: 15px 0px;
            padding-left: 18px;
            padding-right: 70px;
            width: -webkit-fill-available;
            display: table
        }

        .active,
        .accordion:hover {
            background-color: #F7F7F7
        }

        .panel {
            /* padding: 0 18px; */
            display: none;
            background-color: white;
            overflow: hidden;
            border: 1px solid #E6E6E6;
            border-radius: 0px;
            box-shadow: none;
            margin-bottom: 5px;
            border-top: 0px;
        }

        .content-accordian {
            padding: 15px 0px;
            padding-left: 18px;
            padding-right: 70px;
            border-bottom: 1px solid #E6E6E6;
            width: -webkit-fill-available;
            display: table
        }

        .container-data {
            width: 100%;
        }

        .col-sm-3,
        .col-sm-1 {
            float: left;
        }

        .fa {
            font-size: 12px;
            color: #333333
        }

        .accordian-title {
            font-size: 12px;
            color: #333333;
            font-weight: 300
        }

        .passed-circle {
            background-color: #34C84A;
            font-size: 10px;
            color: #fff;
            padding: 4px 8px;
            border-radius: 20px;
        }

        .failed-circle {
            background-color: #FF4743;
            font-size: 10px;
            color: #fff;
            padding: 4px 8px;
            border-radius: 20px;
            margin-left: 6px;
        }

        .disabled {
            opacity: 0.6;
        }

        .pending-circle {
            background-color: #FF8B00;
            font-size: 10px;
            color: #fff;
            padding: 4px 8px;
            border-radius: 20px;
            margin-left: 6px;
        }

        .info-area {
            margin-top: -1px;
            position: absolute;
            float: right;
            right: 26px;
        }

        .accordion.active > .fa-chevron-right {
            transform: rotate(90deg)
        }

        .accordian-section {
            padding: 0px 15px;
            height: -webkit-fill-available;
        }

        .p-0 {
            padding: 0px;
        }

        .accordian-heading {
            color: #333333;
            font-size: 12px;
            opacity: 0.5;
        }

        .accordian-value {
            color: #333333;
            font-size: 12px;
            opacity: 1;
            margin-top: 2px;
            /*float: right;   */
            right: 26px;
        }

        .success {
            color: #34C84A
        }

        .last-section .passed {
            background-color: #34C84A;
            color: #fff;
            font-size: 10px;
            font-weight: 300;
            display: inline-block;
            /* padding: 4px 18px; */
            width: 70px;
            /* height: 20px; */
            line-height: 23px;
            border-radius: 4px
        }

        .last-section .failed {
            background-color: #FF4743;
            color: #fff;
            font-size: 10px;
            font-weight: 300;
            display: inline-block;
            /* padding: 4px 18px; */
            width: 70px;
            /* height: 20px; */
            line-height: 23px;
            border-radius: 4px
        }

        .last-section .pending {
            background-color: #FF8B00;
            color: #fff;
            font-size: 10px;
            font-weight: 300;
            display: inline-block;
            /* padding: 4px 18px; */
            width: 70px;
            /* height: 20px; */
            line-height: 23px !important;
            border-radius: 4px
        }

        .last-section {
            padding-top: 7px;
            padding-right: 0px;
            text-align: center;
        }

        .w-30 {
            width: 30%
        }

        .w-10 {
            width: 10%;
        }

        .mb-5 {
            margin-bottom: 5px;
        }

        div.content-accordian:hover {
            background-color: rgb(230, 230, 230, 0.2)/* opacity: 0.4; */
        }

        .failed-info-section {
            //height: 163px;
            overflow: auto;
            display: list-item;
        }

        .failed-info-section:hover {
            background-color: #fff !important
        }

        .active-color {
            background-color: rgb(230, 230, 230, 0.2)
        }

        .view span {
            height: 11px;
            width: 55px;
            color: #003E75;
            font-size: 12px;
            letter-spacing: 0;
            line-height: 11px;
        }

        .view:hover,
        .view:visited,
        .view:active,
        .view:focus {
            text-decoration: none !important;
            color: #2F90FF !important;
        }

        .linkicon {
            color: #2F90FF;
            transform: rotate(270deg);
        }

        .ml-5 {
            margin-left: 5px;
        }

        .failed-content {
            font-size: 12px;
            color: #333333;
            line-height: 22px;
            padding-left: 16px;
            width: 95%;
        }

        .error-text {
            color: #FF4743
        }

        .d-none {
            display: none;
        }

        .last-row {
            border-bottom: none
        }
        /*invisible scrollbar*/

        .failed-info-section::-webkit-scrollbar {
            width: 0 !important
        }

        .failed-info-section {
            overflow: -moz-scrollbars-none;
        }

        .failed-info-section {
            -ms-overflow-style: none;
        }

        .pull-left {
            float: left!important;
        }

        .arrow-arrow {
            border-bottom: 1.7px solid #2F90FF;
            border-right: 1.7px solid #2F90FF;
            width: 6px;
            height: 6px;
            transform: rotate(-45deg);
            display: inline-block;
        }
        .report-img {
            border: 4px solid #444444a6;
            cursor: zoom-in;
            width: 150px;
        }
        .wrapper {
            display: flex;
            flex-direction: row;
            width:100%;
            margin : 0;
        }
        .first-div {
            margin : 0;
            float : left;
        }
        .accordion-spec {
            display: none;
            top: 0px;
            left: 0px;
            width:-webkit-fill-available;
            height:-webkit-fill-available;
            position: absolute;
            background-color: #ebeef0;
            z-index: 10;
            padding:5px 20px 10px 20px;
        }

        .second-div {
            /* //width:60%; */
            margin : 0;
            float : left ;
        }

        .count-span {
            height: 11px;
            width: 12px;
            color: #FF5255;
            font-size: 12px;
            letter-spacing: 0;
            line-height: NaNpx;
        }

        .btn-close {
            border-radius: 4px;
            border: none;
            outline: none;
            background: #003E75;
            width: 75px;
            height: 25px;
            position: absolute;
            right: 20px;
            top: 5px;
            font-size: 12px;
            color: #FFFFFF;
            letter-spacing: 0.33px;
            line-height: 12px;
        }

        @media all {
            .featherlight {
                display: none;
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 2147483647;
                text-align: center;
                white-space: nowrap;
                cursor: pointer;
                background: #333;
                background: rgba(0, 0, 0, 0);
                height: 100%
            }

            .featherlight:last-of-type {
                background: rgba(0, 0, 0, .7)
            }

            .featherlight:before {
                content: '';
                display: inline-block;
                height: 100%;
                vertical-align: middle;
                margin-right: -.25em
            }

            .featherlight .featherlight-content {
                position: relative;
                text-align: left;
                vertical-align: middle;
                display: inline-block;
                overflow: auto;
                margin-left: auto;
                margin-top: auto;
                margin-right: auto;
                margin-bottom: auto;
                max-height: 95%;
                padding-left: 5px;
                padding-right: 5px;
                padding-top: 5px;
                padding-bottom: 5px;
                background: #8c8d8f;
                white-space: normal
            }

            .featherlight .featherlight-inner {
                display: block;
                background: #FFFFFF;
            }

            .featherlight .featherlight-close-icon {
                position: absolute;
                z-index: 9999;
                top: 0;
                right: 0;
                line-height: 25px;
                width: 25px;
                cursor: pointer;
                text-align: center;
                font-family: Arial, sans-serif;
                background: #fff;
                background: rgba(255, 255, 255, .3);
                color: #000
            }

            .featherlight .featherlight-image {
                border: 4px
            }

            .featherlight-iframe .featherlight-content {
                border-bottom: 0;
                padding: 0
            }

            .featherlight iframe {
                border: 0
            }
        }

          </style>
          <!--Inline Style Ends-->
       </head>
       <body>
          <div class="parentContainer">
             <div class="parentContainer1">
                <div class="parent-heading">
                   <div class="heading">
                      <h4 class="label-heading">Iris Testing Result  <span class="date">{{date}}</span></h4>
                   </div>
                   <div class="info-sections">
                      <div class="passed pull-left">
                         <p class="passed-text">Passed : {{passedCount}}</p>
                      </div>
                      <div class="failed pull-left ml-10">
                         <p class="failed-text">Failed : {{failedCount}}</p>
                      </div>
                      <div class="pending pull-left ml-10">
                         <p class="pending-text">Pending : {{pendingCount}}</p>
                      </div>
                   </div>
                </div>
                <div class="accordian-section">
                    {%{suites}%}
                </div>
             </div>
          </div>
        <div id='myModal' class='featherlight' style='display:none'>
            <div class='featherlight-content'>
                <img alt='' class='featherlight-image featherlight-inner' id='img01' style='height:400px;'>
            </div>
        </div>
       </body>
       <script type="text/javascript">
          var acc = document.getElementsByClassName("accordion");
          var i;
          for (i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function() {
                   this.classList.toggle("active");
                   var panel = this.nextElementSibling;
                   if(panel.style.display === "block") {
                      panel.style.display = "none";
                   } else {
                      panel.style.display = "block";
                   }
                });
          }

          var getClosest = function(element, className){
             for( ;element && element !== document; element = element.parentNode ) {
                if(element.classList.contains(className)) {
                   return element;
                }
             }
          }

          var views = document.getElementsByClassName("view");
          for(i = 0; i < views.length; i++) {
             views[i].addEventListener("click", function() {
                var view = getClosest(this, 'col-sm-12');
                var viewChildren = view.parentElement.children;
                for(var i in viewChildren) {
                    if(i === 'length'){
                        break;
                    }
                    if(viewChildren[i] !== this.parentElement && viewChildren[i].className === 'col-sm-12 content-accordian')
                    viewChildren[i].style.display = 'none';
                }

                var mb = document.getElementsByClassName('mb-5');

                for(var i = 0; i < mb.length; i++) {
                    var item = mb.item(i);
                    if(item !== view.parentElement.parentElement){
                        item.style.display = 'none';
                    }
                }

                if(view) {
                   var log = view.nextElementSibling;
                   var parentHead = document.getElementsByClassName('parent-heading')[0];
                   if(log.style.display === "block") {
                      log.style.display = "none";
                   } else {
                      log.style.display = "block";
                      parentHead.style.display = "none";
                   }
                }
             });
          }
        var closeExpectations = function(e){
            e.parentElement.style.display = 'none';
            var parentHead = document.getElementsByClassName('parent-heading')[0];
            parentHead.style.display = 'block';
            var panel = getClosest(e, 'panel')
            var viewChildren = panel.children;
            for(var i in viewChildren) {
                if(i === 'length'){
                    break;
                }
                if(viewChildren[i] !== this.parentElement && viewChildren[i].className === 'col-sm-12 content-accordian')
                viewChildren[i].style.display = 'table';
            }
            var mb = document.getElementsByClassName('mb-5');

            for(var i = 0; i < mb.length; i++) {
                var item = mb.item(i);
                if(item !== panel.parentElement){
                    item.style.display = 'block';
                }
            }
       };
        var modal = document.getElementById('myModal');
        var modalImg = document.getElementById('img01');
        var imgs = document.getElementsByClassName('report-img');
        for (i = 0; i < imgs.length; i++) {
            imgs[i].addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
            });
        }
        modal.onclick = function() {
            modal.style.display = 'none';
        }
       </script>
    </html>`;

    var suiteHTML = `<div class="mb-5">
                      <button class="accordion">
                      <i class="fa fa-chevron-right "></i>
                      <span class="accordian-title  ml-10 mr-20">Suite description : {{description}}</span>
                      <span class="info-area ">
                      <span class="passed-circle">{{passedCount}}</span>
                      <span class="failed-circle">{{failedCount}}</span>
                      <span class="pending-circle">{{pendingCount}}</span>
                      </span>
                      </button>
                      <div class="panel" style="display: none">
                         {%{specs}%}
                      </div>
                   </div>`;

    var failedExpectationContent = `<div class='col-sm-12 content-accordian failed-info-section' style='display:block; width:-webkit-fill-available;'>
                                        <div class='wrapper'>
                                            <div class='first-div' style='display:{{screenShotVisibilty}}'> <img class='report-img' src='{{failedScreenShot}}'></div>
                                            <div class='second-div'>
                                                <p class='failed-content'>{{lineDetails}}</p>
                                                <p class='failed-content'>{{message}}</p>
                                                <p class='failed-content'>{{stack}}</p>
                                            </div>
                                        </div>
                                    </div>`;
    var passedExpectationContent = `<div class="col-sm-3 w-30">
                               <!-- <p>Second section</p> -->
                               <p class="accordian-heading">Failed Expectations : </p>
                               <p class="accordian-value success">None</p>
                            </div>`;

    var failedExpectationView = `<div class="col-sm-3 w-30">
                                     <!-- <p>Second section</p> -->
                                     <p class="accordian-heading">Failed Expectations : </p>
                                     <p class="accordian-value">
                                        <span class="count-span">{{failedExpCount}}</span>&nbsp;&nbsp;
                                        <a href="javascript:void(0)" class="view">
                                            <span>View Details</span>
                                        </a>
                                     </p>
                                  </div>`;

    var specHTML = `<div class='col-sm-12 content-accordian'>
                    <div class='container-data'>
                        <div class='col-sm-3 w-30'>
                            <!-- <p>first section</p> -->
                            <p class='accordian-heading'>Spec Description : </p>
                            <p class='accordian-value'>{{description}}</p>
                        </div>
                        {%{failedView}%}
                        <div class='col-sm-3 w-30'>
                            <!-- <p>third section</p> -->
                            <p class='accordian-heading'>Execution Time : </p>
                            <p class='accordian-value'>{{duration}}</p>
                        </div>
                        <div class='col-sm-1 last-section p-0 w-10'>
                            <label class='{{status}}'>{{status}}</label>
                        </div>
                    </div>
                </div>

                <div class='accordion-spec' style='display:none'>
                                <div class='heading'>
                                                <h4 class='label-heading-suite'>Suite description:&nbsp;{{suiteDescription}}
                                                </h4>
                                    </div>
                                    <div style="border: 0.5px solid #A1ACB1 !important;">
                                    <div class='col-sm-12 accordion-dialog'>
                                                <div class='container-data'>
                                                    <div class='col-sm-3 w-30'>
                                                        <!-- <p>first section</p> -->
                                                        <p class='accordian-title'>Spec Description : </p>
                                                        <p class='accordian-value'>{{description}}</p>
                                                    </div>
                                                    <div class='col-sm-3 w-30'>
                                                        <!-- <p>Second section</p> -->
                                                        <p class='accordian-title'>Failed Expectations : </p>
                                                        <p class='accordian-value'>
                                                                <span>{{failedExpCount}}</span>
                                                        </p>
                                                    </div>
                                                    <div class='col-sm-3 w-30'>
                                                            <!-- <p>third section</p> -->
                                                            <p class='accordian-title'>Execution Time : </p>
                                                            <p class='accordian-value'>{{duration}}</p>
                                                    </div>
                                                    <div class='col-sm-1 last-section p-0 w-10'>
                                                            <label class='{{status}}'>{{status}}</label>
                                                    </div>
                                                </div>
                                    </div>
                                    <div class="col-sm-12" style="display:block; background-color: #FFFFFF;">
                                    {%{failedContent}%}
                                    </div>
                                    </div>
                                    <button class="btn-close" onclick="closeExpectations(this)">Back</button>
                </div>`;

    var templatingEngine = {
        suites: function(suites) {
            var suitesTemplate = "", suitesCount = suites.length,
            index;

            for(index = 0; index < suitesCount; index++) {
                suitesTemplate += templatingEngine.parseHTML(suites[index], suiteHTML);
            }
            return suitesTemplate;
        },
        specs: function(specs) {
            var specsTemplate = "", specsCount = specs.length,
            index;

            for(index = 0; index < specsCount; index++) {
                specsTemplate += templatingEngine.parseHTML(specs[index], specHTML);
            }
            return specsTemplate;
        },
        failedView: function(failedExpectations) {
            var expectationTemplate = "", expectationsLength = failedExpectations.length,
            index, failedCount={};

            if(expectationsLength>0){
                failedCount['failedExpCount']=expectationsLength;
                expectationTemplate += templatingEngine.parseHTML(failedCount, failedExpectationView);
            }
            if(failedExpectations.length === 0) {
                 expectationTemplate += templatingEngine.parseHTML(failedExpectations[index], passedExpectationContent);
            }
            return expectationTemplate;
        },
        failedContent: function(failedExpectations) {
            var expectationTemplate = "", expectationsLength = failedExpectations.length,
            index;

            for(index = 0; index < expectationsLength; index++) {
                expectationTemplate += templatingEngine.parseHTML(failedExpectations[index], failedExpectationContent);
            }
            return expectationTemplate;
        },
        parseHTML: function(data, template) {
            
            var match, regex = /{{[a-zA-Z]*}}/gm, key, subtemplate;

            do {
                match = regex.exec(template);
                regex.lastIndex = 0;
                if(match) {
                    match = match[0];
                    key = match.substr(2, match.length - 4);
                    template = template.split(match).join(data[key]);
                }
            } while(match);

            
            regex = /{%{[a-zA-Z.]*}%}/gm;
            do {
                match = regex.exec(template);
                regex.lastIndex = 0;
                if(match) {
                    match = match[0];
                    key = match.substr(3, match.length - 6);
                    subtemplate = templatingEngine[key](data[key]);
                    template = template.split(match).join(subtemplate);
                }
            } while(match);


            return template;
        }
    };

    var reporter = {
        jasmineStarted: function(suiteInfo) {

            jasmineResults.messageData.jasmineStage = 'jasmineStarted';
            jasmineResults.UUID = _generateGUID();
            connection && connection.send(JSON.stringify(jasmineResults));
            defaultReporter.jasmineStarted(suiteInfo);
            reportingResult.messageData.jasmineStage = 'jasmineStarted';
            connection && connection.send(JSON.stringify(reportingResult));
        },
        suiteStarted: function(result) {
            jasmineResults.messageData.jasmineStage = 'suiteStarted';
            jasmineResults.UUID = _generateGUID();
            jasmineResults.messageData.metadata = JSON.stringify(result);
            connection && connection.send(JSON.stringify(jasmineResults));
            defaultReporter.suiteStarted(result);
        },
        specStarted:function (result) {
            jasmineResults.messageData.jasmineStage = 'specStarted';
            jasmineResults.UUID = _generateGUID();
            jasmineResults.messageData.metadata = JSON.stringify(result);
            connection && connection.send(JSON.stringify(jasmineResults));
            defaultReporter.specStarted(result);
        },
        specDone: function(result) {
            var expectation = {
                messageType: 'jasmineResult',
                messageData: {
                    'DeviceID': 'web',
                    'result': result.status
                }
            };
            var date = new Date();

            jasmineResults.messageData.jasmineStage = 'specDone';
            jasmineResults.UUID = _generateGUID();
            jasmineResults.messageData.metadata = JSON.stringify(result);
            connection && connection.send(JSON.stringify(jasmineResults));
            connection && connection.send(JSON.stringify(expectation));
            defaultReporter.specDone(result);
            reportingResult.messageData.jasmineStage = 'specDone';
            reportingResult.messageData.metadata.html = _getHTMLReporter(date);
            reportingResult.messageData.metadata.JSON = JSON.stringify(reportingInput);
            connection && connection.send(JSON.stringify(reportingResult));
        },

        suiteDone: function(result) {
            var date = new Date();

            jasmineResults.messageData.jasmineStage = 'suiteDone';
            jasmineResults.UUID = _generateGUID();
            jasmineResults.messageData.metadata = JSON.stringify(result);
            connection && connection.send(JSON.stringify(jasmineResults));
            defaultReporter.suiteDone(result);
            reportingResult.messageData.jasmineStage = 'suiteDone';
            reportingResult.messageData.metadata.html = _getHTMLReporter(date);
            reportingResult.messageData.metadata.JSON = JSON.stringify(reportingInput);
            connection && connection.send(JSON.stringify(reportingResult));
        },

        jasmineDone: function() {
            var date = new Date();

            jasmineResults.messageData.jasmineStage = 'jasmineDone';
            jasmineResults.UUID = _generateGUID();
            connection && connection.send(JSON.stringify(jasmineResults));
            reportingResult.messageData.jasmineStage = 'jasmineDone';
            reportingResult.messageData.metadata.html = _getHTMLReporter(date);
            reportingResult.messageData.metadata.JSON = JSON.stringify(reportingInput);
            connection && connection.send(JSON.stringify(reportingResult));
        }
    };

    var reportingInput = {};

    var specStartDurations = {};
    var failedTestSuites = [];
    var defaultReporter = {
        jasmineStarted: function(suiteInfo) {
            var karConfig = _voltmx.automation.server, wSocket = null, reportMessage = null;
            reportingInput = {
                status: '',
                passedCount: 0,
                failedCount: 0,
                pendingCount: 0,
                suites: []
            };
            if(karConfig) {
                wSocket = karConfig.wSocket;
                reportMessage = {
                    "eventName" : "jasmineStatus",
                    "to" : "afwsclient",
                    "status" : "jasmineStarted",
                    "result" : suiteInfo
                };
                wSocket && wSocket.send(JSON.stringify(reportMessage));
            }
        },
        suiteStarted: function(result) {
            var karConfig = _voltmx.automation.server, wSocket = null, reportMessage = null;
            reportingInput.suites.push({
                'description': result.description,
                'specs': [],
                'passedCount': 0,
                'failedCount': 0,
                'pendingCount':0
            });
            if(karConfig) {
                wSocket = karConfig.wSocket;
                reportMessage = {
                    "eventName" : "jasmineStatus",
                    "to" : "afwsclient",
                    "status" : "suiteStarted",
                    "result" : result
                };
                wSocket && wSocket.send(JSON.stringify(reportMessage));
            }
        },
        specStarted:function (result) {
            var karConfig = _voltmx.automation.server, wSocket = null, reportMessage = null;
            specStartDurations[result.id] = new Date().getTime();

            if(karConfig) {
                wSocket = karConfig.wSocket;
                reportMessage = {
                    "eventName" : "jasmineStatus",
                    "to" : "afwsclient",
                    "status" : "specStarted",
                    "result" : result
                };
                wSocket && wSocket.send(JSON.stringify(reportMessage));
            }
        },
        specDone: function(result) {
            var karConfig = _voltmx.automation.server, wSocket = null, reportMessage = null;
            var failure, passed, i, spec = {
                'failedContent': []
            };

            
            for (i = 0; i < result.failedExpectations.length; i++) {
                var failedScreenShotExists = true, failedScreenShot = null;
                failure = result.failedExpectations[i];
                failure.lineDetails="";
                if(failure.additionalDetails)
                {
                    if(failure.additionalDetails.lineNumber && failure.additionalDetails.colNumber ){
                        if(scriptDetails != undefined && scriptDetails.testFilePath != undefined && scriptDetails.testFilePath.indexOf('Test Cases') >= 0) {
                            failure.additionalDetails.lineNumber--;
                        }
                        failure.lineDetails="TestCase"+"&lt"+result.description+"&gt"+"failed at line: "+failure.additionalDetails.lineNumber+" col: "+failure.additionalDetails.colNumber;
                    }

                    if(failure.additionalDetails.failedScreenShot){
                        failedScreenShotExists = true;
                        failedScreenShot = failure.additionalDetails.failedScreenShot;
                    }
                }
                spec.failedContent.push({
                    'message': failure.message,
                    'stack': failure.stack,
                    'failedScreenShot':failedScreenShot,
                    'lineDetails':failure.lineDetails,
                    'failedExpCount': result.failedExpectations.length,
                    'screenShotVisibilty': failedScreenShotExists ? 'block' : 'none'
                });
            }
            var suiteInfo = reportingInput.suites[reportingInput.suites.length - 1];
            if(i > 0) {
                suiteInfo.failedCount++
            } else {
                suiteInfo.passedCount++
            }
            spec.failedView = spec.failedContent;
            spec.status = result.status;
            spec.description = result.description;
            spec.failedExpCount = result.failedExpectations.length;
            spec.suiteDescription = suiteInfo.description;

            spec.duration = (new Date().getTime() - specStartDurations[result.id]) + ' ms';
            suiteInfo.specs.push(spec);
            
            for (i = 0; i < result.failedExpectations.length; i++) {
                var failedExpectation = result.failedExpectations[i];
                if(failedExpectation.additionalDetails && failedExpectation.additionalDetails.failedScreenShot){
                    failedExpectation.additionalDetails.failedScreenShot = null;
                }
            }
            if(karConfig) {
                wSocket = karConfig.wSocket;
                reportMessage = {
                    "eventName" : "jasmineStatus",
                    "to" : "afwsclient",
                    "status" : "specDone",
                    "result" : result
                };
                wSocket && wSocket.send(JSON.stringify(reportMessage));
            }
        },

        suiteDone: function(result) {
            var karConfig = _voltmx.automation.server, wSocket = null, reportMessage = null,
                suite = reportingInput.suites[reportingInput.suites.length - 1],spec = suite.specs,
                i, suiteStatus = 'passed';

            suite.passedCount = 0;
            suite.failedCount = 0;
            suite.pendingCount = 0;

            for(i = 0; i < spec.length; i++) {
                if(spec[i].status === 'failed') {
                    if(suiteStatus === 'passed') {
                        suiteStatus = 'failed';
                    }
                    suite.failedCount++;
                } else if(spec[i].status === 'pending') {
                    if(suiteStatus === 'passed') {
                        suiteStatus = 'pending';
                    }
                    suite.pendingCount++;
                } else {
                    suite.passedCount++;
                }
            }
            if(suiteStatus === 'failed'){
                failedTestSuites.push(suite.description);
            }
            suite.status = suiteStatus;
            if(karConfig) {
                wSocket = karConfig.wSocket;
                reportMessage = {
                    "eventName" : "jasmineStatus",
                    "to" : "afwsclient",
                    "status" : "suiteDone",
                    "result" : result
                };
                wSocket && wSocket.send(JSON.stringify(reportMessage));
            }
        },
        jasmineDone: function(result) {
            var karConfig = _voltmx.automation.server, wSocket = null, reportMessage = null,
            rerunSuites = null, reporterHTML = null, coverageJSONFileName = null,
            applicationName = appConfig.appName, applicationId = appConfig.appId,
            reportFileName = "";
            
            var date = new Date();

            reporterHTML = _getHTMLReporter(date);
            reportFileName = 'TestResult_' + applicationId + '_' + _getDate(date, '-', '_') + '.html';
            _downloadFile(reportFileName, reporterHTML, 'text/html');

            if(_voltmx.automation.captureFailedTestSuites) {
                rerunSuites = {
                    "failedTestSuites" : failedTestSuites
                }, jsonFileName = applicationName + '_FailedTestSuites.json';
                _downloadFile(jsonFileName, JSON.stringify(rerunSuites), 'application/json');
            }

            if(window.__coverage__) {
                coverageJSONFileName = applicationName + '_coverage.json'
                _downloadFile(coverageJSONFileName, JSON.stringify(__coverage__), 'application/json');
            }

            if(karConfig) {
                wSocket = karConfig.wSocket;
                reportMessage = {
                    "eventName" : "jasmineStatus",
                    "to" : "afwsclient",
                    "status" : "jasmineDone",
                    "result" : result
                };
                wSocket && wSocket.send(JSON.stringify(reportMessage));
            }
        }
    };

    var _downloadFile = function(filename, contentString, contentType) {
        var blob = new Blob([contentString], {type: contentType}),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl =  [contentType, a.download, a.href].join(':')
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            a.dispatchEvent(e);
    };

    var _getDate = function (date, timeSeperator, dateTimeSeperator) {

        var mm = date.getMonth();
        mm = mm < 9 ? "0" + (mm + 1) : mm + 1; 

        var dd = date.getDate();
        dd = dd < 10 ? "0" + dd : dd;

        var hh = date.getHours();
        hh = hh < 10 ? "0" + hh : hh;

        var min = date.getMinutes();
        min = min < 10 ? "0" + min : min;

        var ss = date.getSeconds();
        ss = ss < 10 ? "0" + ss : ss;

        return dd + "-" + mm + "-" + date.getFullYear() + dateTimeSeperator + hh + timeSeperator + min + timeSeperator + ss;
    };

    var _getHTMLReporter = function(date) {
        
            var suite = reportingInput.suites, i, jasmineStatus = 'passed', passedCount = 0,
            failedCount = 0, pendingCount = 0, date, reporterHTML;

            for(i = 0; i < suite.length; i++) {
                if(suite[i].status === 'failed') {
                    if(jasmineStatus === 'passed') {
                        jasmineStatus = 'failed';
                    }
                    failedCount++;
                } else if(suite[i].status === 'pending') {
                    if(jasmineStatus === 'passed') {
                        jasmineStatus = 'pending';
                    }
                    pendingCount++;
                } else {
                    passedCount++;
                }
            }
            reportingInput.status = jasmineStatus;
            reportingInput.pendingCount = pendingCount;
            reportingInput.failedCount = failedCount;
            reportingInput.passedCount = passedCount;
            reportingInput.date = _getDate(date, ':', ' ');

            reporterHTML = templatingEngine.parseHTML(reportingInput, baseTemplate);

            return reporterHTML;
    };

    var _getClickableParentInfo = function(widgetModel, metaInfo, widgetType) {
        var parentInfo, parent;
        switch(widgetType) {
            case 'image':
            case 'label':

                parent = _getClickableParent(widgetModel, metaInfo.target.parentNode);
                if(parent) {
                    metaInfo.target = parent.node;

                    parentInfo = {
                        'metaInfo': metaInfo,
                        'widgetModel': parent.model,
                        'widgetType': parent.model.wType.toLowerCase()
                    };
                }
            break;
            default:
                parentInfo = {
                    'widgetModel': widgetModel,
                    'metaInfo': metaInfo,
                    'widgetType': widgetType
                };
            break;
        }

        return parentInfo;
    };

    var _getClickableParent= function(widgetModel, widgetNode) {
        var parentModel = widgetModel.parent, parentNode = $KU.getParentByAttribute(widgetNode, 'kwidgettype'),
        clickableParent;

        while(parentModel.wType !== 'Form') {
            if(parentModel.wType.toLowerCase() === 'flexcontainer') {
                clickableParent =  {
                    model: parentModel,
                    node: parentNode
                };
                break;
            } else {
                parentModel = parentModel.parent;
                parentNode = $KU.getParentByAttribute(parentNode, 'kwidgettype');
            }
        }

        return clickableParent;
    };

    var _generateGUID = function() {
        var date = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            date += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (arg) {
            var random = (date + Math.random() * 16) % 16 | 0;
            date = Math.floor(date / 16);
            return (arg === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
        });
    };

    var _getGUID = function(widgetModel, actionType, widgetType, metaInfo) {
        var guid, generateNewGUID;
        var sameGUIDWidgetsList = ['textbox', 'textarea', 'slider'];

        if(actionType === 'touch') {
            if(metaInfo.type === 'start') {
                generateNewGUID = true;
                actionType = 'start';
            } else if(metaInfo.type ==='move') {
                if(widgetModel.onTouchStart && widgetModel === lastWidget && lastAction === 'start') {
                    generateNewGUID = false;
                } else {
                    if(widgetModel === lastWidget && lastAction === 'move') {
                        generateNewGUID = false;
                    } else {
                        generateNewGUID = true;
                    }
                }
                actionType = 'move';
            } else {
                if((widgetModel.onTouchStart || widgetModel.onTouchMove) && !$KAR.isAssertMode()) {
                    generateNewGUID = false;
                } else {
                    generateNewGUID = true;
                }
                actionType = 'end';
            }
        } else {
            if(widgetModel === lastWidget && actionType === lastAction && sameGUIDWidgetsList.indexOf(widgetType) >= 0) {
                generateNewGUID = false;
            } else {
                generateNewGUID = true;
            }
        }

        if(generateNewGUID) {
            guid = _generateGUID();
            lastWidget = widgetModel;
            lastAction = actionType;
            lastGUID = guid;
        } else {
            guid = lastGUID;
            lastAction = actionType; 
        }
        return guid;
    };

    
    var _getPostData = function(widgetPath, widgetType, actionType, metaInfo, widgetModel) {
        var widgetTypeMap = {
            'igallery': 'imagegallery',
            'hstrip': 'horizontalimagestrip',
            'segment': 'segmentedui',
            'textfield': 'textbox'
        }, postData,
        touchMap = {
            'touchstart': 'start',
            'mousedown': 'start',
            'touchmove': 'move',
            'mousemove': 'move',
            'touchend': 'end',
            'mouseup': 'end'
        };

        widgetType = widgetTypeMap[widgetType] || widgetType;

        var uiActions = {
            'button': {
                click: function(postData, metaInfo) {
                    return postData;
                }
            },
            'textarea': {
                enterText: function(postData, metaInfo) {
                    postData.messageData.metadata = {
                        'text': metaInfo.text
                    };

                    return postData;
                }
            },
            'textbox': {
                enterText: function(postData, metaInfo) {
                    postData.messageData.metadata = {
                        'text': metaInfo.text
                    };

                    return postData;
                }
            },
            'box': {
                click: function(postData, metaInfo) {
                    return postData;
                }
            },
            'flexcontainer': {
                click: function(postData, metaInfo) {
                    return postData; 
                }
            },
            'richtext': {
                click: function(postData, metaInfo) {
                    if(metaInfo.data && metaInfo.data[0]) {
                        postData.messageData.metadata = {
                            'linkText': metaInfo.data[0]
                        };
                    } else if(metaInfo.data && metaInfo.data.childNodes[0]) {
                        postData.messageData.metadata = {
                            'linkText': metaInfo.data.childNodes[0].textContent
                        };
                    }
                    return postData;
                }
            },
            'link': {
                click: function(postData, metaInfo) {
                    return postData;
                }
            },
            'checkboxgroup': {
                click: function(postData, metaInfo) {
                    postData.messageData.metadata = {
                        'selection': metaInfo.selection
                    };

                    return postData;
                }
            },
            'radiobuttongroup': {
                click: function(postData, metaInfo) {
                    postData.messageData.metadata = {
                        'selection': metaInfo.key
                    };

                    return postData;
                }
            },
            'listbox': {
                selectItem: function(postData, metaInfo) {
                    postData.messageData.metadata = {
                        'selection': metaInfo.selection
                    };

                    return postData;
                }
            },
            'combobox': {
                selectItem: function(postData, metaInfo) {
                    postData.messageData.metadata = {
                        'selection': parseInt(metaInfo.selection)
                    };

                    return postData;
                }
            },
            'appmenu': {
                click: function(postData, metaInfo) {
                    postData.messageData.metadata = {
                        'menuItemId': metaInfo.appmenuId
                    };

                    return postData;
                }
            },
            'imagegallery': {
                click: function(postData, metaInfo) {
                    var widgetPath = postData.messageData.widgetPath;
                    postData.messageData.metadata = {
                        'selection': metaInfo.selection
                    };
                    postData.messageData.widgetPath = widgetPath.substr(0, widgetPath.lastIndexOf('.') - 1);

                    return postData;
                }
            },
            'horizontalimagestrip': {
                click: function(postData, metaInfo) {
                    var widgetPath = postData.messageData.widgetPath;
                    postData.messageData.metadata = {
                        'selection': metaInfo.selection
                    };
                    postData.messageData.widgetPath = widgetPath.substr(0, widgetPath.lastIndexOf('.') - 1);

                    return postData;
                }
            },
            'switch': {
                toggle: function(postData, metaInfo) {
                    return postData;
                }
            },
            'calendar': {
                selectDate: function(postData, metaInfo) {
                    var dateComponents = metaInfo.selection,
                    expectedFormat = [dateComponents[1], dateComponents[0], dateComponents[2]];

                    postData.messageData.metadata = {
                        'selection': expectedFormat
                    };

                    return postData;
                }
            },
            'datagrid': {
                click: function(postData, metaInfo) {
                    var index = metaInfo.colIndex.split(',');
                    postData.messageData.metadata = {
                        'pinData': {
                            'row': parseInt(index[0]),
                            'col': parseInt(index[1])
                        }
                    };

                    return postData;
                }
            },
            'menucontainer': {
                click: function(postData, metaInfo) {
                    
                }
            },
            'browser': {
                onSuccess: function(postData, metaInfo) {

                },
                onFailure: function(postData, metaInfo) {

                }
            },
            'alert': {
                click: function(postData, metaInfo) {

                }
            },
            'map': {
                click: function(postData, metaInfo) {
                    var pointData = metaInfo.clickData;

                    postData.messageData.metadata = {
                        'pinData': {
                            'lat': pointData.latLng && pointData.latLng.lat(),
                            'lon': pointData.latLng && pointData.latLng.lng()
                        }
                    };

                    return postData;
                },
                clickOnPin: function(postData, metaInfo) {
                    postData.messageData.metadata = {
                        'pinData': {
                            'lat': metaInfo.locationData.lat,
                            'lon': metaInfo.locationData.lon
                        }
                    };

                    return postData;
                },
                clickOnPinCallout: function(postData, metaInfo) {
                    postData.messageData.metadata = {
                        'pinData': {
                            'lat': metaInfo.locationData.lat,
                            'lon': metaInfo.locationData.lon
                        }
                    };
                    return postData;
                }
            },
            'segmentedui': {
                click: function(postData, metaInfo) {
                    postData.messageData.metadata = metaInfo;

                    return postData;
                },
                getItem: function(postData, metaInfo) {

                },
                pull: function(postData, metaInfo) {
                    return postData;
                },
                push: function(postData, metaInfo) {
                    return postData;
                },
                scrollToBottom: function(postData, metaInfo) {

                },
                scrollToRow: function(postData, metaInfo) {

                },
                scrollToTop: function(postData, metaInfo) {

                }
            },
            'collectionview': {
                onItemSelect: function(postData, metaInfo) {

                },
                scrolltoItem: function(postData, metaInfo) {

                }
            },
            'tabpane': {
                click: function(postData, metaInfo) {
                    var widgetPath = postData.messageData.widgetPath;
                    postData.messageData.metadata = {
                        'tabID': metaInfo.tabID
                    };
                    widgetPath = widgetPath.substr(0, widgetPath.lastIndexOf('.'));

                    postData.messageData.widgetPath = widgetPath.substr(0, widgetPath.lastIndexOf('.'));
                    postData.messageData.appName = _voltmx.mvc.getCurrentAppName() || appConfig.appName;

                    return postData;
                }
            },
            'slider': {
                slide: function(postData, metaInfo) {
                    postData.messageData.metadata = {
                        'selection': metaInfo.selectedValue
                    };

                    return postData;
                }
            }
        };

        var gestures = {
            scroll: function(postData, metaInfo) {
                return postData;
            },
            longPress: function(postData, metaInfo){
                return postData;
            },
            swipe: function(postData, metaInfo){
                return postData;
            },
            tap: function(postData, metaInfo){
                return postData;
            },
            rotate: function(postData, metaInfo){
                return postData;
            },
            pinch: function(postData, metaInfo){
                return postData;
            },
            pan: function(postData, metaInfo){
                return postData;
            },
            longpress: function(postData, metaInfo){
                return postData;
            }
        };

        var device = {
            deviceback: function(postData, metaInfo) {
                return postData;
            },
            orientation: function(postData, metaInfo) {
                return postData
            }
        };

        if(metaInfo.eventType === 'uiAction') {
            postData = {
                'messageType': 'Record',
                'messageData': {
                    'DeviceID': 'web',
                    'widgetPath': widgetPath,
                    'widgetType': widgetType,
                    'actionType': actionType
                }
            };
            postData = uiActions[widgetType][actionType](postData, metaInfo);
        } else if(metaInfo.eventType === 'gesture') {
            postData = {
                'messageType': 'Record',
                'messageData': {
                    'DeviceID': 'web',
                    'widgetPath': widgetPath,
                    'widgetType': 'gesture',
                    'actionType': actionType
                }
            };
            postData = gestures[actionType](postData, metaInfo);
        } else if(metaInfo.eventType === 'device') {
            postData = {
                'messageType': 'Record',
                'messageData': {
                    'DeviceID': 'web',
                    'actionType': actionType
                }
            };
            postData = device[actionType](postData, metaInfo);
        } else if(metaInfo.eventType === 'touch') {
            actionType = touchMap[actionType];
            postData = {
                'messageType': 'Record',
                'messageData': {
                    'DeviceID': 'web',
                    'widgetPath': widgetPath,
                    'widgetType': 'widget',
                    'actionType': 'touch',
                    'metadata': {
                        'touchEvent': actionType,
                        'point': [parseInt(metaInfo.x), parseInt(metaInfo.y)]
                    }
                }
            };
            metaInfo.type = actionType;
            actionType = 'touch';
        } else if(metaInfo.eventType === 'fetchWidgetPath') {
            postData = {
                'messageType': 'Record',
                'messageData': {
                    'DeviceID': 'web',
                    'widgetPath': widgetPath,
                    'widgetType': 'widget',
                    'actionType': 'fetchWidgetPath',
                }
            };
            metaInfo.type = actionType;
            actionType = 'touch';
        }
        postData.UUID = _getGUID(widgetModel, actionType, widgetType, metaInfo);

        return postData;
    };

    var _getMinimalPath = function(widgetModel, metaInfo) {
        var widgetFullId = _getWidgetPath(widgetModel, metaInfo),
            widgetPath = widgetFullId.split('_').join('.');

        return widgetPath;
    };

    var _getWidgetPathInContainer = function(childNode) {
        var row = $KU.getParentByAttribute(childNode, 'index');
        if(row) {
            var container = row.parentNode.parentNode;
            if(row.getAttribute('kwidgettype') == 'GridNode') {
                container = container.parentNode.parentNode;
            }
            var containerModel = $KU.getModelByNode(container), index;
            if(containerModel.hasSections) {
                index = row.getAttribute('secindex');
            } else {
                index = row.getAttribute('index');
            }
            var id = childNode.getAttribute('id').split(/_(.+)/)[1];
            var containerId = container.getAttribute('id') + '[' + index + ']';

            return containerId + '_' + id;

        }
    };

    var _getWidgetPath = function(widgetModel, metaInfo) {
        var id, widgetModel;

        if(metaInfo.target && metaInfo.target.getAttribute('kcontainerID')) {
            id = _getWidgetPathInContainer(metaInfo.target);
        } else {
            if(metaInfo.target) {
                id = metaInfo.target.getAttribute('id');
            } else {
                widgetNode = $KU.getNodeByModel(widgetModel);
                id = widgetNode.getAttribute('id');
            }
        }

        return id;
    };

    var reloadJasminelibrary = (function() {

        function _load(tag) {
            return function(url) {
                return new Promise(function(resolve, reject) {
                    var element = document.createElement(tag);
                    var parent = 'head';
                    var attr = 'src';

                        element.type = "text/javascript";
                        element.onload = function() {
                            resolve(url);
                        };
                        element.onerror = function() {
                            reject(url);
                        };
                        element[attr] = $KG["platformver"] + url;
                    document[parent].appendChild(element);
                });
            };
        }

        return {
            js: _load('script'),
        }
    })();

    var _registerMessageEvent = function() {
        
        _voltmx.automation.eventDetails = {"pauseTest" : false};
        window.addEventListener('message', _messageListener, false);
    }

    var _messageListener = function(messageEvent){
        if(messageEvent.data.mode && messageEvent.data.mode === "CAT"){
            if(messageEvent.data.event && messageEvent.data.event === _voltmx.automation.eventDetails.eventName){
                _voltmx.automation.eventDetails.pauseTest = false;
                if(messageEvent.data.data) {
                    _voltmx.automation.eventDetails.data = messageEvent.data.data;
                } else {
                    delete _voltmx.automation.eventDetails.data
                }
            }
        }
    }


    var module = {
        isAssertMode : function() {
            return ['fetchWidgetPath', 'fetchWidgetPathPending'].indexOf(runMode) !== -1;
        },
        initializeConnection: function() {
            
                var testAutomationConfig = appConfig.testAutomation;
                var ipAddress = testAutomationConfig.scriptsURL.split('://')[1].split(':')[0];
                var portNumber = parseInt(testAutomationConfig.webSocketPort);
                window.WebSocket = window.WebSocket || window.MozWebSocket;

                if(isNaN(portNumber)) {
                    voltmx.web.logger('log', 'Invalid value provided for test automation web socket client port number. Continuing with default port 9111.');
                    portNumber = 9111;
                }

                connection = new WebSocket('ws://'+ ipAddress + ':' + portNumber);

                connection.onopen = function() {
                    var device = {
                        'messageType': 'DeviceInit',
                        'messageData': {
                            'DeviceID': 'web'
                        },
                        'UUID': _generateGUID()
                    };
                    
                    console.log('JasmineAutomation: Socket open');
                    connection.send(JSON.stringify(device));
                };

                connection.onerror = function (error) {
                    
                    console.log('JasmineAutomation: Socket error');
                    if(this.close) {
                        this.close();
                    }
                    connection = null;
                };

                connection.onmessage = function (message) {
                    
                    console.log('JasmineAutomation: Socket message');
                    var data = JSON.parse(message.data);
                    runMode = data.messageData.Action;

                    switch(runMode) {
                        case 'Record':
                            
                            break;

                        case 'Play':
                            scriptDetails = data.messageData.AutomationScriptDetails;
                            module.runPlayback(scriptDetails);
                            break;

                        case 'Stop':
                            
                            break;
                        case 'fetchWidgetPath':
                            
                            break;
                    }
                };

                connection.onclose = function(message) {
                    connection = null;
                    console.log('JasmineAutomation: Socket close');
                };
            
        },
        sendRecording: function(widgetModel, actionType, metaInfo) {
            var widgetPath, postData, nonClickableWidgets, widgetType, clickableWidgetInfo, isRecordable = true;

            if(connection && (runMode === 'Record' || runMode === 'fetchWidgetPath')) {
                widgetType = (widgetModel.wType || metaInfo.wType).toLowerCase();
                nonClickableWidgets = ['image', 'label'];
                if(metaInfo.eventType === 'uiAction' && nonClickableWidgets.indexOf(widgetType) !== -1) {
                    clickableWidgetInfo = _getClickableParentInfo(widgetModel, metaInfo, widgetType);
                    if(!clickableWidgetInfo) {
                        isRecordable = false;
                    } else {
                        widgetModel = clickableWidgetInfo.widgetModel;
                        widgetType = clickableWidgetInfo.widgetType;
                        metaInfo = clickableWidgetInfo.metaInfo;
                    }
                }
                if(isRecordable) {
                    if(runMode === 'fetchWidgetPath'){
                        
                        if(actionType == 'mousemove') return;

                        metaInfo.eventType = 'fetchWidgetPath';
                        runMode = 'fetchWidgetPathPending';
                    }

                    widgetPath = widgetModel && _getMinimalPath(widgetModel, metaInfo);
                    postData = _getPostData(widgetPath, widgetType, actionType, metaInfo, widgetModel);
                    connection.send(JSON.stringify(postData));
                }
            }
        },
        runRegularAutomation: function(voltmxAutomationPath) {
            var appName = appConfig.appName;
            var testScriptPaths = {
                "testScripts": voltmxAutomationPath,
                "Test Suites": voltmxAutomationPath + "/" + appName + "/Test Suites",
                "Test Cases": voltmxAutomationPath + "/" + appName + "/Test Cases",
                "Test Plans": voltmxAutomationPath + "/" + appName + "/Test Plans"
            }

            if($KG.appbehaviors['isCompositeApp'] == true) {
                for(var app in appConfig.microApps) 
                { 
                    var microAppName =appConfig.microApps[app].appName;
                    testScriptPaths[microAppName + "/Test Cases"] = voltmxAutomationPath + "/" + microAppName + "/Test Cases";
                    testScriptPaths[microAppName + "/Test Suites"] = voltmxAutomationPath + "/" + microAppName + "/Test Suites";
                    testScriptPaths[microAppName + "/Test Plans"] = voltmxAutomationPath + "/" + microAppName + "/Test Plans";
                }
            } else {
                testScriptPaths[appName + "/Test Cases"] = voltmxAutomationPath + "/" + appName + "/Test Cases";
                testScriptPaths[appName + "/Test Suites"] = voltmxAutomationPath + "/" + appName + "/Test Suites";
                testScriptPaths[appName + "/Test Plans"] = voltmxAutomationPath + "/" + appName + "/Test Plans";
            }
            requirejs.config({
                paths: testScriptPaths
            });
            require(["testScripts/customReporter"], function() {
                var testPlanPath = "Test Plans/", testPlan = "testPlan";
                jasmine.getEnv().clearReporters();
                jasmine.getEnv().addReporter(userReporter);
                jasmine.getEnv().addReporter(defaultReporter);
                jasmine.getEnv().randomizeTests(false);
                if(_voltmx.automation.params && _voltmx.automation.params.testPlan) {
                    testPlan = _voltmx.automation.params.testPlan;
                }

                testPlanPath = testPlanPath + testPlan;
                require([testPlanPath], function() {
                });
            });
        },
        runPlayback: function(data) {
            Promise.all([
                reloadJasminelibrary.js("jslib/tparty/jasmine/jasmine.js"),
                reloadJasminelibrary.js("jslib/tparty/jasmine/jamsinecucumber.js"),
                reloadJasminelibrary.js("jslib/tparty/jasmine/jasmine-feature-runner.js"),
                reloadJasminelibrary.js("jslib/tparty/jasmine/testDefinitions.js")
            ]).then(function() {
                    jasmine.getEnv().addReporter(reporter);
                    jasmine.getEnv().randomizeTests(false);
                    if (data.requireFiles) {
                        for (let i = 0; i < data.requireFiles.length; i++) {
                            let requireScript = document.createElement('script');
                            requireScript.type = "text/javascript";
                            requireScript.title = (data.requireFiles[i])["fileName"];
                            requireScript.text = (data.requireFiles[i])["script"];
                            document.getElementsByTagName('head')[0].appendChild(requireScript);
                        }
                    }
                    var script = document.createElement('script');
                    script.type = "text/javascript";
                    script.text = data.testScript;
                    document.getElementsByTagName('head')[0].appendChild(script);
                    features.forEach(feature => {
                        jasmineFeatureRunner(features, steps)(feature);
                    });
                    jasmine.getEnv().execute();
                }).catch(function() {
                    voltmx.web.logger('log', 'Automation scripts failed to load at playback');
                });
        },
        invokeJasmineAutomation: function(voltmxAutomationPath) {
            var metaInfoURL = voltmxAutomationPath + "/metaInfo.json";
            var metaInfoRequest = new voltmx.net.HttpRequest();

            _registerMessageEvent();

            try {
                metaInfoRequest.timeout = 10000; 
                metaInfoRequest.open(constants.HTTP_METHOD_GET, metaInfoURL, false);
                metaInfoRequest.onReadyStateChange = function () {
                    var automationConfig, enableRecording;
                    if(metaInfoRequest.readyState === constants.HTTP_READY_STATE_DONE) {
                        if(metaInfoRequest.status === 200) {
                            try {
                                if(metaInfoRequest.response && metaInfoRequest.response.length !== 0) {
                                    automationConfig = JSON.parse(metaInfoRequest.response);
                                    _voltmx.automation.IntegrationTests = automationConfig.IntegrationTests;
                                    enableRecording = automationConfig.automationWindowOpened;
                                    if(automationConfig.captureFailedTestSuites) {
                                        _voltmx.automation.captureFailedTestSuites = automationConfig.captureFailedTestSuites
                                    }
                                    if(enableRecording) {
                                        
                                        module.initializeConnection();
                                    } else {
                                        if(_voltmx.automation.params && _voltmx.automation.params.wsport) {
                                            voltmx.automation.webSocket.connectToHost().finally(() => { module.runRegularAutomation(voltmxAutomationPath); });
                                        } else {
                                            
                                            module.runRegularAutomation(voltmxAutomationPath);
                                        }
                                    }
                                } else {
                                    voltmx.web.logger('log', 'Invalid meta information found. Continuing with automation scripts playback');
                                }
                            } catch(exception) {
                                voltmx.web.logger('log', 'Unable to read file metaInfo.json');
                                voltmx.web.logger('log', 'Exception in metaInfo.json: ' + exception.message);
                            }
                        } else if(metaInfoRequest.status == 404) {
                            voltmx.web.logger('log', 'No meta information found. There are no automation scripts deployed.');
                        } else {
                            voltmx.web.logger('log', 'Failed to start automation. Request status: ' + metaInfoRequest.status);
                        }
                    } else {
                        voltmx.web.logger('log', 'Invoke jasmine automation request readyState: ' +
                                        metaInfoRequest.readyState  + ' request status: ' + metaInfoRequest.status);
                    }
                };
                metaInfoRequest.send();
            } catch(exception) {
                voltmx.web.logger('log', 'Jasmine metaInfo file request error: ' + exception.message);
            }

        }
    };

 return module;
}());

