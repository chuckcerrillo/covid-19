<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Covid-19 Tracker</title>


</head>
<body>
    <h1>Update scripts</h1>

    <p>In the background, a cron job (scheduled task) runs on the first minute of every 2 hours (e.g. 00:01, 02:01, 04:01, etc). This job runs scripts that pulls fresh data from the Johns Hopkins COVID-19 github repo and the Oxford COVID-19 Government Response github repo.</p>
    <p>Another cron job runs every 2nd minute of every hour, which is used to refresh the JSON files, which is used by the website.</p>
    <h2>Update</h2>
    <p><a target="_blank" href="/statistics/update_all">Update database and refresh JSON files</a> - most of the time you only want to run this</p>


    <p>If for any reason you need to run specific components, here's the breakdown of scripts:</p>
    <h2>Update database</h2>
    <ul>
        <li><a target="_blank" href="/statistics/harvest_cases_from_jh_timeline_global">Harvest global data from JH</a></li>
        <li><a target="_blank" href="/statistics/harvest_cases_from_jh_timeline_us">Harvest US data from JH</a></li>
        <li><a target="_blank" href="/statistics/harvest_oxford">Harvest government response data from Oxford</a></li>
        <li><a target="_blank" href="/statistics/harvest_annotations">Harvest annotations from our Google spreadsheet</a></li>
        <li><a target="_blank" href="/statistics/data_overrides">Apply all overrides from Wikipedia, Worldometers and manual overrides from Google spreadsheet (unfinished, only Wikipedia and manual overrides are implemented at the moment, no Worldometers)</a></li>
        <li><a target="_blank" href="/statistics/recalculate_global">Recompute the global numbers (do this after harvesting all data and applying all overrides)</a></li>
        <li><a target="_blank" href="/statistics/update_database">Runs all of the above database-related scripts</a></li>
    </ul>

    <h2>Update JSON files</h2>
    <p>The JSON files are the data files being used by the website. These are already pre-processed based on the data in the MySQL database. Using the pre-processed files is faster than querying the database. It also saves on server load since nothing has to be recalculated every time a request is made by the website.</p>
    <ul>
        <li><a target="_blank" href="/statistics/generate_global_summary">Homepage: Global summary</a></li>
        <li><a target="_blank" href="/statistics/generate_at_a_glance">Homepage: At a glance</a></li>
        <li><a target="_blank" href="/statistics/generate_daily_ranking">Homepage: Daily Ranking</a></li>
        <li><a target="_blank" href="/statistics/generate_all_countries">All: Countries and states list</a></li>
        <li><a target="_blank" href="/statistics/generate_all_daily">Comparison: Daily stats used for comparison and charts</a></li>
        <li><a target="_blank" href="/statistics/update_json">Runs all of the above JSON-related scripts</a></li>
    </ul>
</body>
</html>
