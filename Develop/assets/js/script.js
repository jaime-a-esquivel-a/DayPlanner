
var dayWrkHrs = ['9:00am','10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm'];
var appInterval = setInterval(updateTimeBar, 1000);

printTimeBlocks();

function printTimeBlocks(){

    var lstored;
    var agendaHr;
    var agendValue;
    var agendaTime;
    var htmlStr = '';
    
    $('#agenda').html('');
    $('#currentDay').html(moment().format('dddd') + ' ');
    $('#currentDate').html(moment().format('LL') + ', ');

    if ( localStorage.getItem('lclDayEvents') != undefined ){

        var lclDayEvents = JSON.parse(localStorage.getItem('lclDayEvents'));
        lstored = true;

    }

    for ( i = 0 ; i < dayWrkHrs.length ; i++ ){

        agendaHr = dayWrkHrs[i];
        agendValue = '';
        agendaTime = '';

        if(lstored){

            var searchIndex = lclDayEvents.findIndex((EventObj) => EventObj.Evthour == dayWrkHrs[i]);

            if (searchIndex >= 0){
                
                var EventObjfound = lclDayEvents[searchIndex];
                agendValue = EventObjfound.EvtText;

            }

        }

        agendaTime = timeOfBlock(agendaHr);

        htmlStr += '<div class="row">';
        htmlStr += '<span id="'+agendaHr+'-mark" class="col-1 hour">'+agendaHr+'</span>';
        htmlStr += '<input type="text" name="'+agendaHr+'-desc" id="'+agendaHr+'-desc" class="col-10 '+agendaTime+'" value="'+agendValue+'"></input>';
        htmlStr += '<button id="'+agendaHr+'-save" type="button" class="col-1 saveBtn" onclick="saveEvent(&apos;'+agendaHr+'&apos;)">💾</button> ';
        htmlStr += '</div>';

    }

    $('#agenda').html(htmlStr);

}

function timeOfBlock(lphour){

    var hour = moment().hours();

    var timeBlock =  moment(lphour, 'h:mma').hours();

    if (timeBlock < hour){
        return 'past';
    }else if ( timeBlock == hour){;
        return 'present';
    }else{
        return 'future';
    }

}

function updateTimeBar(){

    $('#currentHour').html(moment().format('LTS'));

}

function saveEvent(lphour){

    var lclDayEvents = [];
    var lclEvtText = document.getElementById(lphour+'-desc');

    var EventObj = {
        Evthour: lphour,
        EvtText: lclEvtText.value.trim(),
    };
  
    if ( localStorage.getItem('lclDayEvents') != undefined ){

        lclDayEvents = JSON.parse(localStorage.getItem('lclDayEvents'));

        var searchIndex = lclDayEvents.findIndex((EventObj) => EventObj.Evthour == lphour);

        if ( searchIndex >= 0 ){

            lclDayEvents.splice(searchIndex, 1);
            
        }

    } 

    lclDayEvents.push(EventObj);

    localStorage.setItem('lclDayEvents', JSON.stringify(lclDayEvents));
    
}

function getEvent(lphour){
    
    var lclDayEvents = [];

    if ( localStorage.getItem('lclDayEvents') != undefined ){

        lclDayEvents = JSON.parse(localStorage.getItem('lclDayEvents'));

    }

}



