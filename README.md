gcal-timeline.js
=========================

A jQuery plugin to display a public google calender in a timeline.

## Default Options
```js
{
  calenderId:'en.usa%23holiday%40group.v.calendar.google.com',
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
<script type="text/javascript" src="jquery.gcal-timeline.min.js"></script>

<script type="text/javascript">
  $(function() {
    $('#timeline').gCalTimeline({calenderId:'en.usa%23holiday%40group.v.calendar.google.com'});
  });
</script>
<div id="timeline"></div>
```
### screenshot

![screen shot 2014-10-19 at 12 11 52 am](https://cloud.githubusercontent.com/assets/425966/4692028/23072ffa-5746-11e4-83db-2f48ad9154f0.png)


**License**: MIT [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
