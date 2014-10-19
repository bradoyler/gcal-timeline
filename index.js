
(function($) {

	$.fn.gCalTimeline=function(options) {
    var $div = $(this);

	var defaults = $.extend (
		{
			calendarId:'en.usa%23holiday%40group.v.calendar.google.com',
			dateFormat: 'MonthDay',
			errorMsg:'No events in calendar',
			timeZone:'America/New_York',
			futureEvents:false,
			maxEvents: 50
		},
		options);

		var s='', st='starttime';

		var feedUrl = 'http://www.google.com/calendar/feeds/'+defaults.calendarId.trim()+
    '/public/full?orderby='+st+'&sortorder=a&futureevents='+defaults.futureEvents+'&max-results='+
    defaults.maxEvents+'&ctz='+defaults.timeZone.trim()+'&alt=json';

		$.ajax({
			url: feedUrl,
			dataType:"json",
			success:function(data) {
        $($div).append('<h2>'+ data.feed.title.$t +'</h2><div id="timeline_items" class="year-02"></div>');

				$.each(data.feed.entry, function(e, item) {

          s+='<div class="timeline-item">';
          if(item.gd$when) {
            s+='<div class="year">'+formatDate(item.gd$when[0].startTime,defaults.dateFormat.trim())+'</div>';
          }
          s+='<div class="marker"><div class="dot"></div></div>';
					s+='<div class="info">'+item.title.$t+' '+ item.content.$t  +'</div>';
					s+='</div>';
				});

        s+='<p><a href="'+ data.feed.link[0].href +'" target="blank">View Calendar</a></p>';
				$('#timeline_items').append(s);
			},
			error: function (err) {
				s+='<div class="entry"><p>'+defaults.errorMsg+'</p></div>';
				$($div).append(s);
			}
		});

		function formatDate(strDate, strFormat) {

			var fd,arrDate,am,time;
			var calendar = {
				months: {
					full: ['','January','February','March','April','May','June','July','August','September','October','November','December'],
					short: ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
				},
				days: {
					full: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
					short: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun']
				}
			};

			if(strDate.length > 10) {
				arrDate = /(\d+)\-(\d+)\-(\d+)T(\d+)\:(\d+)/.exec(strDate);

				am 		= (arrDate[4] < 12);
				time 	= am?(parseInt(arrDate[4])+':'+arrDate[5]+' AM') : (arrDate[4]-12+':'+arrDate[5]+' PM');

				if (time.indexOf('0') === 0) {
					if (time.indexOf(':00') == 1) {
						if (time.indexOf('AM') == 5 ) {
							time='MIDNIGHT';
						  } else {
							 time='NOON';
						}
					} else {
						time = time.replace('0:','12:');
					}
				}

			} else {
				arrDate = /(\d+)\-(\d+)\-(\d+)/.exec(strDate);
				time = 'Time not present in feed.';
			}

			year 		= parseInt(arrDate[1]);
			month 		= parseInt(arrDate[2]);
			dayNum 	= parseInt(arrDate[3]);

			var d = new Date(year,month-1,dayNum);

			switch(strFormat)
			{
			case 'ShortTime':
				fd = time;
			break;
			case 'ShortDate':
				fd = month+'/'+dayNum+'/'+year;
			break;
			case 'LongDate':
				fd = calendar.days.full[d.getDay()]+' '+calendar.months.full[month]+' '+dayNum+', '+year;
			break;
			case 'LongDate+ShortTime':
				fd = calendar.days.full[d.getDay()]+' '+calendar.months.full[month]+' '+dayNum+', '+year+' '+time;
			break;
			case 'ShortDate+ShortTime':
				fd = month+'/'+dayNum+'/'+year+' '+time;
			break;
			case 'DayMonth':
				fd = calendar.days.short[d.getDay()]+', '+calendar.months.full[month]+' '+dayNum;
			break;
			case 'MonthDay':
				fd = calendar.months.full[month]+' '+dayNum;
			break;
			case 'YearMonth':
				fd = calendar.months.full[month]+' '+year;
			break;
			default:
				fd = calendar.days.full[d.getDay()]+' '+calendar.months.short[month]+' '+dayNum+', '+year+' '+time;
			}

			return fd;
		}
	};

}(jQuery));
