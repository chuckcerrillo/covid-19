<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiController extends Controller
{
    public function __construct()
    {
        define('MASTER_LIST','../covid-data/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv');
        define('COVID_DATA_TIME_SERIES',[
            'confirmed' => '../covid-data/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
            'deaths' => '../covid-data/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv',
            'recovered' => '../covid-data/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv',
            'confirmedUS' => '../covid-data/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv',
            'deathsUS' => '../covid-data/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv',
        ]);

        define('COVID_DATA','../covid-data-clean/COVID-19_CLEAN/csse_covid_19_daily_reports_cleaned/');
        define('OXFORD_DATA','../oxford/data/timeseries/');
        define('OXFORD_LATEST','../oxford/data/OxCGRT_latest_withnotes.csv');
        define('STATS','./stats/');
    }

    public function get_sidebar_list()
    {
        $filename = STATS . 'sidebar_list.json';
        $file = fopen($filename,'r');
        $data = json_decode(fread($file,filesize($filename)),true);
        return response($data)->setStatusCode(Response::HTTP_OK);
    }
}
