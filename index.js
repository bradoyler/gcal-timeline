
(function($) {

	$.fn.gCalTimeline=function(options) {
    var $div = $(this);

	var defaults = $.extend (
		{
			calendarId:'en.usa#holiday@group.v.calendar.google.com',
			apiKey:'Public_API_Key',
			dateFormat: 'MonthDay',
			errorMsg:'No events in calendar',
			timeZone:'America/New_York',
			futureEvents:false,
			maxEvents: 50
		},
		options);

		var s='';
		var feedUrl = 'https://www.googleapis.com/calendar/v3/calendars/'+encodeURIComponent(defaults.calendarId.trim())+
    '/events?key='+ defaults.apiKey +'&orderBy=startTime&singleEvents=true&maxResults='+ defaults.maxEvents;

		$.ajax({
			url: feedUrl,
			dataType:'json',
			success:function(data) {
        $($div).append('<h2>'+ data.summary +'</h2><div id="timeline_items" class="year-02"></div>');

				$.each(data.items, function(e, item) {
          s+='<div class="timeline-item">';
          var eventdate = item.start.dateTime || item.start.date ||'';
          s+='<div class="year">'+formatDate(eventdate, defaults.dateFormat.trim())+'</div>';
          s+='<div class="marker"><div class="dot"></div></div>';
					s+='<div class="info">'+item.summary+' '+ item.description +'</div>';
					s+='</div>';
				});
				$('#timeline_items').append(s);
			},
			error: function (error) {
				s+='<div class="entry"><p>'+defaults.errorMsg+' | '+error+ '</p></div>';
				$($div).append(s);
			}
		});

		function formatDate(strDate, strFormat) {
			console.log(strDate.length,'date');
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
					if (time.indexOf(':00') === 1) {
						if (time.indexOf('AM') === 5 ) {
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

			var year 		= parseInt(arrDate[1]);
			var month 	= parseInt(arrDate[2]);
			var dayNum 	= parseInt(arrDate[3]);

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
