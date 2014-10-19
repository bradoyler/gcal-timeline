googleCalendarTimeline.js
=========================

A jQuery plugin to display a public google calender in a timeline.

## Default Options
```js
{
  gcalFeedId:'en.usa%23holiday%40group.v.calendar.google.com',
  dateFormat: 'MonthDay',
  errorMsg:'No events in calendar',
  timeZone:'America/New_York',
  futureEvents:false,
  maxEvents: 50
}
```

## Example

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript" src="jquery.googleCalendarTimeline.min.js"></script>

<script type="text/javascript">
  $(function() {
    $('#timeline').gCalTimeline({gcalFeedId:'en.usa%23holiday%40group.v.calendar.google.com'});
  });
</script>
<div id="timeline"></div>
```


**License**: MIT [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
