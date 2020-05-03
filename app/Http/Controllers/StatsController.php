<?php

namespace App\Http\Controllers;

use App\Cases;
use App\Country;
use App\Http\Resources\CasesCollection;
use App\Http\Resources\CountryCollection;
use App\Http\Resources\LogCollection as LogCollectionResource;
use App\Http\Resources\StateCollection;
use App\State;
use Goutte\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\Types\AbstractList;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpFoundation\Response;

class StatsController extends Controller
{
    protected $combine = [
        'China' => ['China','Mainland China'],
        'Taiwan' => ['Taiwan','Taiwan*','Taipei and environs'],
        'Bahamas' => ['Bahamas, The', 'The Bahamas', 'Bahamas'],
        'Gambia' => ['Gambia, The', 'The Gambia', 'Gambia'],
        'Vietnam' => ['Vietnam', 'Viet Nam'],
        'Cote d\'Ivoire' => ['Cote d\'Ivoire', 'Ivory Coast'],
        'Iran' => ['Iran','Iran (Islamic Republic of)'],
        'Diamond Princess' => ['Cruise Ship','Diamond Princess'],
        'Czechia' => ['Czechia','Czech Republic'],
        'South Korea' => ['Korea, South','Republic of Korea','South Korea'],
        'Moldova' => ['Moldova','Republic of Moldova'],
        'Russia' => ['Russia','Russian Federation'],
        'United Kingdom' => ['UK','United Kingdom'],
        'Holy See' => ['Holy See','Vatican City'],
        'Azerbaijan' => ['Azerbaijan',' Azerbaijan'],
        'United States' => ['US','United States'],
        'West Bank and Gaza' => ['West Bank and Gaza','occupied Palestinian territory'],
        'Congo (Brazzaville)' => ['Republic of the Congo','Congo (Brazzaville)'],
        'Cabo Verde' => ['Cape Verde', 'Cabo Verde'],
        'Timor-Leste' => ['Timor-Leste','East Timor'],
    ];
    protected $skip_old = [
        'Cape Verde',
        'Cayman Islands',
        'Channel Islands',
        'Curacao',
        'East Timor',
        'Faroe Islands',
        'French Guiana',
        'Gibraltar',
        'Greenland',
        'Guadeloupe',
        'Guam',
        'Guernsey',
        'Hong Kong',
        'Hong Kong SAR',
        'Jersey',
        'Macao SAR',
        'Macau',
        'Martinique',
        'Mayotte',
        'North Ireland',
        'Others',
        'Palestine',
        'Republic of Ireland',
        'Republic of the Congo',
        'Reunion',
        'Saint Barthelemy',
        'St. Martin',
        'occupied Palestinian territory',
        'Aruba',
        'Puerto Rico',
        'Saint Martin',
    ];

    protected $skip = [
        'Others',
    ];

    protected $transfer = [
        'Hong Kong' => 'China',
        'Macau' => 'China',
        'French Guiana' => 'France',
        'Martinique' => 'France',
        'Reunion' => 'France',
        'Cayman Islands' => 'United Kingdom',
        'Guadeloupe' => 'France',
        'Aruba' => 'Netherlands',
        'Jersey' => 'United Kingdom',
        'Curacao' => 'Netherlands',
        'Guernsey' => 'United Kingdom',
        'Guam' => 'United States',
        'Puerto Rico' => 'United States',
        'Greenland' => 'Denmark',
        'Mayotte' => 'France',
    ];

    protected $rename = [
        'US' => 'United States',
        'Korea, South' => 'South Korea',
        'Taiwan*' => 'Taiwan',
    ];



//    Congo x2
//    Kosovo
//    Timor-Leste
//    West Bank and Gaza
    protected $worldometer_jh_map = [
        'Afghanistan' => 'Afghanistan',
        'Algeria' => 'Algeria',
        'Albania' => 'Albania',
        'Argentina' => 'Argentina',
        'Armenia' => 'Armenia',
        'Andorra' => 'Andorra',
        'Angola' => 'Angola',
        'Antigua and Barbuda' => 'Antigua and Barbuda',
        'Austria' => 'Austria',
        'Australia' => 'Australia',
        'Azerbaijan' => 'Azerbaijan',
        'Bahrain' => 'Bahrain',
        'Bangladesh' => 'Bangladesh',
        'Bahamas' => 'Bahamas',
        'Barbados' => 'Barbados',
        'Belarus' => 'Belarus',
        'Belgium' => 'Belgium',
        'Belize' => 'Belize',
        'Benin' => 'Benin',
        'Bhutan' => 'Bhutan',
        'Bolivia' => 'Bolivia',
        'Bosnia and Herzegovina' => 'Bosnia and Herzegovina', // 22
        'Botswana' => 'Botswana',
        'Burkina Faso' => 'Burkina Faso',
        'Myanmar' => 'Burma',
        'Burundi' => 'Burundi',
        'Brazil' => 'Brazil',
        'Brunei' => 'Brunei',
        'Bulgaria' => 'Bulgaria',
        'Cabo Verde' => 'Cabo Verde', // 30
        'Cambodia' => 'Cambodia',
        'Cameroon' => 'Cameroon',
        'Canada' => 'Canada',
        'CAR' => 'Central African Republic',
        'Chad' => 'Chad',
        'Chile' => 'Chile',
        'China' => 'China',
        'Colombia' => 'Colombia',
        'Costa Rica' => 'Costa Rica',
        'Ivory Coast' => 'Cote d\'Ivoire',
        'Croatia' => 'Croatia',
        'Cuba' => 'Cuba',
        'Cyprus' => 'Cyprus',
        'Czechia' => 'Czechia',
        'Denmark' => 'Denmark',
        'Diamond Princess' => 'Diamond Princess',
        'Djibouti' => 'Djibouti',
        'Dominica' => 'Dominica',
        'Dominican Republic' => 'Dominican Republic',
        'Ecuador' => 'Ecuador',
        'Egypt' => 'Egypt',
        'El Salvador' => 'El Salvador',
        'Equatorial Guinea' => 'Equatorial Guinea',
        'Eritrea' => 'Eritrea',
        'Estonia' => 'Estonia',
        'Eswatini' => 'Eswatini',
        'Ethiopia' => 'Ethiopia',
        'Fiji' => 'Fiji',
        'Finland' => 'Finland',
        'France' => 'France',
        'Gabon' => 'Gabon',
        'Gambia' => 'Gambia',
        'Georgia' => 'Georgia',
        'Germany' => 'Germany',
        'Ghana' => 'Ghana',
        'Greece' => 'Greece',
        'Grenada' => 'Grenada',
        'Guatemala' => 'Guatemala',
        'Guinea' => 'Guinea',
        'Guinea-Bissau' => 'Guinea-Bissau',
        'Guyana' => 'Guyana',
        'Haiti' => 'Haiti',
        'Honduras' => 'Honduras',
        'Vatican City' => 'Holy See',
        'Hungary' => 'Hungary',
        'Iceland' => 'Iceland',
        'India' => 'India',
        'Indonesia' => 'Indonesia',
        'Iran' => 'Iran',
        'Iraq' => 'Iraq',
        'Ireland' => 'Ireland',
        'Israel' => 'Israel',
        'Italy' => 'Italy',
        'Jamaica' => 'Jamaica',
        'Japan' => 'Japan',
        'Jordan' => 'Jordan',
        'Kazakhstan' => 'Kazakhstan',
        'Kenya' => 'Kenya',
        'South Korea' => 'South Korea',
        'Kuwait' => 'Kuwait',
        'Kyrgyzstan' => 'Kyrgyzstan',
        'Laos' => 'Laos',
        'Latvia' => 'Latvia',
        'Lebanon' => 'Lebanon',
        'Liberia' => 'Liberia',
        'Libya' => 'Libya',
        'Liechtenstein' => 'Liechtenstein',
        'Lithuania' => 'Lithuania',
        'Luxembourg' => 'Luxembourg',
        'Madagascar' => 'Madagascar',
        'Malawi' => 'Malawi',
        'Malaysia' => 'Malaysia',
        'Maldives' => 'Maldives',
        'Mali' => 'Mali',
        'Malta' => 'Malta',
        'Mauritania' => 'Mauritania',
        'Mauritius' => 'Mauritius',
        'Mexico' => 'Mexico',
        'Moldova' => 'Moldova',
        'Monaco' => 'Monaco',
        'Mongolia' => 'Mongolia',
        'Montenegro' => 'Montenegro',
        'Morocco' => 'Morocco',
        'Mozambique' => 'Mozambique',
        'MS Zaandam' => 'MS Zaandam',
        'Namibia' => 'Namibia',
        'Nepal' => 'Nepal',
        'Netherlands' => 'Netherlands',
        'New Zealand' => 'New Zealand',
        'Nicaragua' => 'Nicaragua',
        'Niger' => 'Niger',
        'Nigeria' => 'Nigeria',
        'North Macedonia' => 'North Macedonia',
        'Norway' => 'Norway',
        'Oman' => 'Oman',
        'Pakistan' => 'Pakistan',
        'Panama' => 'Panama',
        'Papua New Guinea' => 'Papua New Guinea',
        'Paraguay' => 'Paraguay',
        'Peru' => 'Peru',
        'Philippines' => 'Philippines',
        'Poland' => 'Poland',
        'Portugal' => 'Portugal',
        'Qatar' => 'Qatar',
        'Romania' => 'Romania',
        'Russia' => 'Russia',
        'Rwanda' => 'Rwanda',
        'Saint Kitts and Nevis' => 'Saint Kitts and Nevis',
        'Saint Lucia' => 'Saint Lucia',
        'St. Vincent Grenadines' => 'Saint Vincent and the Grenadines',
        'San Marino' => 'San Marino',
        'Sao Tome and Principe' => 'Sao Tome and Principe',
        'Saudi Arabia' => 'Saudi Arabia',
        'Senegal' => 'Senegal',
        'Serbia' => 'Serbia',
        'Seychelles' => 'Seychelles',
        'Sierra Leone' => 'Sierra Leone',
        'Singapore' => 'Singapore',
        'Slovakia' => 'Slovakia',
        'Slovenia' => 'Slovenia',
        'Somalia' => 'Somalia',
        'South Africa' => 'South Africa',
        'South Sudan' => 'South Sudan',
        'Spain' => 'Spain',
        'Sri Lanka' => 'Sri Lanka',
        'Sudan' => 'Sudan',
        'Suriname' => 'Suriname',
        'Sweden' => 'Sweden',
        'Switzerland' => 'Switzerland',
        'Syria' => 'Syria',
        'Taiwan' => 'Taiwan',
        'Tanzania' => 'Tanzania',
        'Thailand' => 'Thailand',
        'Togo' => 'Togo',
        'Trinidad and Tobago' => 'Trinidad and Tobago',
        'Tunisia' => 'Tunisia',
        'Turkey' => 'Turkey',
        'UAE' => 'United Arab Emirates',
        'Uganda' => 'Uganda',
        'United Kingdom' => 'United Kingdom',
        'Ukraine' => 'Ukraine',
        'Uruguay' => 'Uruguay',
        'USA' => 'United States',
        'Uzbekistan' => 'Uzbekistan',
        'Venezuela' => 'Venezuela',
        'Vietnam' => 'Vietnam',
        'Western Sahara' => 'Western Sahara',
        'Yemen' => 'Yemen',
        'Zambia' => 'Zambia',
        'Zimbabwe' => 'Zimbabwe',
    ];

    protected $oxford_jh_map = [
        'Afghanistan' => 'Afghanistan',
        'Albania' => 'Albania',
        'Algeria' => 'Algeria',
        'Andorra' => 'Andorra',
        'Angola' => 'Angola',
        'Antigua and Barbuda' => 'Antigua and Barbuda',
        'Argentina' => 'Argentina',
        'Armenia' => 'Armenia',
        'Australia' => 'Australia',
        'Austria' => 'Austria',
        'Azerbaijan' => 'Azerbaijan',
        'Bahamas' => 'Bahamas',
        'Bahrain' => 'Bahrain',
        'Bangladesh' => 'Bangladesh',
        'Barbados' => 'Barbados',
        'Belarus' => 'Belarus',
        'Belgium' => 'Belgium',
        'Belize' => 'Belize',
        'Benin' => 'Benin',
        'Bhutan' => 'Bhutan',
        'Bolivia' => 'Bolivia',
        'Bosnia and Herzegovina' => 'Bosnia and Herzegovina', // 22
        'Botswana' => 'Botswana',
        'Brazil' => 'Brazil',
        'Brunei' => 'Brunei',
        'Bulgaria' => 'Bulgaria',
        'Burkina Faso' => 'Burkina Faso',
        'Myanmar' => 'Burma',
        'Burundi' => 'Burundi',
        'Cape Verde' => 'Cabo Verde', // 30
        'Cambodia' => 'Cambodia',
        'Cameroon' => 'Cameroon',
        'Canada' => 'Canada',
        'CAR' => 'Central African Republic',
        'Chad' => 'Chad',
        'Chile' => 'Chile',
        'China' => 'China',
        'Colombia' => 'Colombia',
        'Congo (Brazzaville)' => 'Congo (Brazzaville)',
        'Democratic Republic of Congo' => 'Congo (Kinshasa)',
        'Costa Rica' => 'Costa Rica',
        'Ivory Coast' => 'Cote d\'Ivoire',
        'Croatia' => 'Croatia',
        'Cuba' => 'Cuba',
        'Cyprus' => 'Cyprus',
        'Czech Republic' => 'Czechia',
        'Denmark' => 'Denmark',
        'Diamond Princess' => 'Diamond Princess',
        'Djibouti' => 'Djibouti',
        'Dominica' => 'Dominica',
        'Dominican Republic' => 'Dominican Republic',
        'Ecuador' => 'Ecuador',
        'Egypt' => 'Egypt',
        'El Salvador' => 'El Salvador',
        'Equatorial Guinea' => 'Equatorial Guinea',
        'Eritrea' => 'Eritrea',
        'Estonia' => 'Estonia',
        'Eswatini' => 'Eswatini',
        'Ethiopia' => 'Ethiopia',
        'Fiji' => 'Fiji',
        'Finland' => 'Finland',
        'France' => 'France',
        'Gabon' => 'Gabon',
        'Gambia' => 'Gambia',
        'Georgia' => 'Georgia',
        'Germany' => 'Germany',
        'Ghana' => 'Ghana',
        'Greece' => 'Greece',
        'Grenada' => 'Grenada',
        'Guatemala' => 'Guatemala',
        'Guinea' => 'Guinea',
        'Guinea-Bissau' => 'Guinea-Bissau',
        'Guyana' => 'Guyana',
        'Haiti' => 'Haiti',
        'Vatican City' => 'Holy See',
        'Honduras' => 'Honduras',
        'Hungary' => 'Hungary',
        'Iceland' => 'Iceland',
        'India' => 'India',
        'Indonesia' => 'Indonesia',
        'Iran' => 'Iran',
        'Iraq' => 'Iraq',
        'Ireland' => 'Ireland',
        'Israel' => 'Israel',
        'Italy' => 'Italy',
        'Jamaica' => 'Jamaica',
        'Japan' => 'Japan',
        'Jordan' => 'Jordan',
        'Kazakhstan' => 'Kazakhstan',
        'Kenya' => 'Kenya',
        'South Korea' => 'South Korea',
        'Kosovo' => 'Kosovo',
        'Kuwait' => 'Kuwait',
        'Kyrgyz Republic' => 'Kyrgyzstan',
        'Laos' => 'Laos',
        'Latvia' => 'Latvia',
        'Lebanon' => 'Lebanon',
        'Liberia' => 'Liberia',
        'Libya' => 'Libya',
        'Liechtenstein' => 'Liechtenstein',
        'Lithuania' => 'Lithuania',
        'Luxembourg' => 'Luxembourg',
        'Madagascar' => 'Madagascar',
        'Malawi' => 'Malawi',
        'Malaysia' => 'Malaysia',
        'Maldives' => 'Maldives',
        'Mali' => 'Mali',
        'Malta' => 'Malta',
        'Mauritania' => 'Mauritania',
        'Mauritius' => 'Mauritius',
        'Mexico' => 'Mexico',
        'Moldova' => 'Moldova',
        'Monaco' => 'Monaco',
        'Mongolia' => 'Mongolia',
        'Montenegro' => 'Montenegro',
        'Morocco' => 'Morocco',
        'Mozambique' => 'Mozambique',
//        'MS Zaandam' => 'MS Zaandam',
        'Namibia' => 'Namibia',
        'Nepal' => 'Nepal',
        'Netherlands' => 'Netherlands',
        'New Zealand' => 'New Zealand',
        'Nicaragua' => 'Nicaragua',
        'Niger' => 'Niger',
        'Nigeria' => 'Nigeria',
        'North Macedonia' => 'North Macedonia',
        'Norway' => 'Norway',
        'Oman' => 'Oman',
        'Pakistan' => 'Pakistan',
        'Panama' => 'Panama',
        'Papua New Guinea' => 'Papua New Guinea',
        'Paraguay' => 'Paraguay',
        'Peru' => 'Peru',
        'Philippines' => 'Philippines',
        'Poland' => 'Poland',
        'Portugal' => 'Portugal',
        'Qatar' => 'Qatar',
        'Romania' => 'Romania',
        'Russia' => 'Russia',
        'Rwanda' => 'Rwanda',
        'Saint Kitts and Nevis' => 'Saint Kitts and Nevis',
        'Saint Lucia' => 'Saint Lucia',
        'St. Vincent Grenadines' => 'Saint Vincent and the Grenadines',
        'San Marino' => 'San Marino',
        'Sao Tome and Principe' => 'Sao Tome and Principe',
        'Saudi Arabia' => 'Saudi Arabia',
        'Senegal' => 'Senegal',
        'Serbia' => 'Serbia',
        'Seychelles' => 'Seychelles',
        'Sierra Leone' => 'Sierra Leone',
        'Singapore' => 'Singapore',
        'Slovak Republic' => 'Slovakia',
        'Slovenia' => 'Slovenia',
        'Somalia' => 'Somalia',
        'South Africa' => 'South Africa',
        'South Sudan' => 'South Sudan',
        'Spain' => 'Spain',
        'Sri Lanka' => 'Sri Lanka',
        'Sudan' => 'Sudan',
        'Suriname' => 'Suriname',
        'Sweden' => 'Sweden',
        'Switzerland' => 'Switzerland',
        'Syria' => 'Syria',
        'Taiwan' => 'Taiwan',
        'Tanzania' => 'Tanzania',
        'Thailand' => 'Thailand',
        'Timor-Leste' => 'Timor-Leste',
        'Togo' => 'Togo',
        'Trinidad and Tobago' => 'Trinidad and Tobago',
        'Tunisia' => 'Tunisia',
        'Turkey' => 'Turkey',
        'Uganda' => 'Uganda',
        'United Arab Emirates' => 'United Arab Emirates',
        'United Kingdom' => 'United Kingdom',
        'Ukraine' => 'Ukraine',
        'Uruguay' => 'Uruguay',
        'United States' => 'United States',
        'Uzbekistan' => 'Uzbekistan',
        'Venezuela' => 'Venezuela',
        'Vietnam' => 'Vietnam',
        'Palestine' => 'West Bank and Gaza',
        'Western Sahara' => 'Western Sahara',
        'Yemen' => 'Yemen',
        'Zambia' => 'Zambia',
        'Zimbabwe' => 'Zimbabwe',
    ];

    protected $wikipedia_jh_map = [
        'Afghanistan' => 'Afghanistan',
        'Algeria' => 'Algeria',
        'Albania' => 'Albania',
        'Andorra' => 'Andorra',
        'Angola' => 'Angola',
        'Antigua & Barbuda' => 'Antigua and Barbuda',
        'Argentina' => 'Argentina',
        'Armenia' => 'Armenia',
        'Austria' => 'Austria',
        'Australia' => 'Australia',
        'Azerbaijan' => 'Azerbaijan',
        'Bahrain' => 'Bahrain',
        'Bangladesh' => 'Bangladesh',
        'Bahamas' => 'Bahamas',
        'Barbados' => 'Barbados',
        'Belarus' => 'Belarus',
        'Belgium' => 'Belgium',
        'Belize' => 'Belize',
        'Benin' => 'Benin',
        'Bhutan' => 'Bhutan',
        'Bolivia' => 'Bolivia',
        'Bosnia & Herzegovina' => 'Bosnia and Herzegovina', // 22
        'Botswana' => 'Botswana',
        'Burkina Faso' => 'Burkina Faso',
        'Myanmar' => 'Burma',
        'Burundi' => 'Burundi',
        'Brazil' => 'Brazil',
        'Brunei' => 'Brunei',
        'Bulgaria' => 'Bulgaria',
        'Cape Verde' => 'Cabo Verde', // 30
        'Cambodia' => 'Cambodia',
        'Cameroon' => 'Cameroon',
        'Canada' => 'Canada',
        'Central African Republic' => 'Central African Republic',
        'Chad' => 'Chad',
        'Chile' => 'Chile',
        'China' => 'China',
        'Colombia' => 'Colombia',
        'DR Congo' => 'Congo (Kinshasa)',
        'Republic of the Congo' => 'Congo (Brazzaville)',
        'Costa Rica' => 'Costa Rica',
        'Ivory Coast' => 'Cote d\'Ivoire',
        'Croatia' => 'Croatia',
        'Cuba' => 'Cuba',
        'Cyprus' => 'Cyprus',
        'Czech Republic' => 'Czechia',
        'Denmark' => 'Denmark',
        'Diamond Princess' => 'Diamond Princess',
        'Djibouti' => 'Djibouti',
        'Dominica' => 'Dominica',
        'Dominican Republic' => 'Dominican Republic',
        'Ecuador' => 'Ecuador',
        'Egypt' => 'Egypt',
        'El Salvador' => 'El Salvador',
        'Equatorial Guinea' => 'Equatorial Guinea',
        'Eritrea' => 'Eritrea',
        'Estonia' => 'Estonia',
        'Eswatini' => 'Eswatini',
        'Ethiopia' => 'Ethiopia',
        'Fiji' => 'Fiji',
        'Finland' => 'Finland',
        'France' => 'France',
        'Gabon' => 'Gabon',
        'Gambia' => 'Gambia',
        'Georgia' => 'Georgia',
        'Germany' => 'Germany',
        'Ghana' => 'Ghana',
        'Greece' => 'Greece',
        'Grenada' => 'Grenada',
        'Guatemala' => 'Guatemala',
        'Guinea' => 'Guinea',
        'Guinea-Bissau' => 'Guinea-Bissau',
        'Guyana' => 'Guyana',
        'Haiti' => 'Haiti',
        'Honduras' => 'Honduras',
        'Vatican City' => 'Holy See',
        'Hungary' => 'Hungary',
        'Iceland' => 'Iceland',
        'India' => 'India',
        'Indonesia' => 'Indonesia',
        'Iran' => 'Iran',
        'Iraq' => 'Iraq',
        'Ireland' => 'Ireland',
        'Israel' => 'Israel',
        'Italy' => 'Italy',
        'Jamaica' => 'Jamaica',
        'Japan' => 'Japan',
        'Jordan' => 'Jordan',
        'Kazakhstan' => 'Kazakhstan',
        'Kenya' => 'Kenya',
        'South Korea' => 'South Korea',
        'Kuwait' => 'Kuwait',
        'Kyrgyzstan' => 'Kyrgyzstan',
        'Laos' => 'Laos',
        'Latvia' => 'Latvia',
        'Lebanon' => 'Lebanon',
        'Liberia' => 'Liberia',
        'Libya' => 'Libya',
        'Liechtenstein' => 'Liechtenstein',
        'Lithuania' => 'Lithuania',
        'Luxembourg' => 'Luxembourg',
        'Madagascar' => 'Madagascar',
        'Malawi' => 'Malawi',
        'Malaysia' => 'Malaysia',
        'Maldives' => 'Maldives',
        'Mali' => 'Mali',
        'Malta' => 'Malta',
        'Mauritania' => 'Mauritania',
        'Mauritius' => 'Mauritius',
        'Mexico' => 'Mexico',
        'Moldova' => 'Moldova',
        'Monaco' => 'Monaco',
        'Mongolia' => 'Mongolia',
        'Montenegro' => 'Montenegro',
        'Morocco' => 'Morocco',
        'Mozambique' => 'Mozambique',
        'MS Zaandam' => 'MS Zaandam',
        'Namibia' => 'Namibia',
        'Nepal' => 'Nepal',
        'Netherlands' => 'Netherlands',
        'New Zealand' => 'New Zealand',
        'Nicaragua' => 'Nicaragua',
        'Niger' => 'Niger',
        'Nigeria' => 'Nigeria',
        'North Macedonia' => 'North Macedonia',
        'Norway' => 'Norway',
        'Oman' => 'Oman',
        'Pakistan' => 'Pakistan',
        'Panama' => 'Panama',
        'Papua New Guinea' => 'Papua New Guinea',
        'Paraguay' => 'Paraguay',
        'Peru' => 'Peru',
        'Philippines' => 'Philippines',
        'Poland' => 'Poland',
        'Portugal' => 'Portugal',
        'Qatar' => 'Qatar',
        'Romania' => 'Romania',
        'Russia' => 'Russia',
        'Rwanda' => 'Rwanda',
        'Saint Kitts & Nevis' => 'Saint Kitts and Nevis',
        'Saint Lucia' => 'Saint Lucia',
        'Saint Vincent' => 'Saint Vincent and the Grenadines',
        'San Marino' => 'San Marino',
        'São Tomé & Príncipe' => 'Sao Tome and Principe',
        'Saudi Arabia' => 'Saudi Arabia',
        'Senegal' => 'Senegal',
        'Serbia' => 'Serbia',
        'Seychelles' => 'Seychelles',
        'Sierra Leone' => 'Sierra Leone',
        'Singapore' => 'Singapore',
        'Slovakia' => 'Slovakia',
        'Slovenia' => 'Slovenia',
        'Somalia' => 'Somalia',
        'South Africa' => 'South Africa',
        'South Sudan' => 'South Sudan',
        'Spain' => 'Spain',
        'Sri Lanka' => 'Sri Lanka',
        'Sudan' => 'Sudan',
        'Suriname' => 'Suriname',
        'Sweden' => 'Sweden',
        'Switzerland' => 'Switzerland',
        'Syria' => 'Syria',
        'Taiwan' => 'Taiwan',
        'Tanzania' => 'Tanzania',
        'Thailand' => 'Thailand',
        'East Timor' => 'Timor-Leste',
        'Togo' => 'Togo',
        'Trinidad & Tobago' => 'Trinidad and Tobago',
        'Tunisia' => 'Tunisia',
        'Turkey' => 'Turkey',
        'United Arab Emirates' => 'United Arab Emirates',
        'Uganda' => 'Uganda',
        'United Kingdom' => 'United Kingdom',
        'Ukraine' => 'Ukraine',
        'Uruguay' => 'Uruguay',
        'United States' => 'United States',
        'Uzbekistan' => 'Uzbekistan',
        'Venezuela' => 'Venezuela',
        'Vietnam' => 'Vietnam',
        'Western Sahara' => 'Western Sahara',
        'Yemen' => 'Yemen',
        'Zambia' => 'Zambia',
        'Zimbabwe' => 'Zimbabwe',
    ];

    public function __construct()
    {
        define('MASTER_LIST','../covid-data/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv');
//        define('MASTER_LIST','../covid-data-clean/COVID-19_CLEAN/csse_cleaned_supporting_material/Cleaned_Lookup.csv');
//        define('COVID_DATA','../covid-data/csse_covid_19_data/csse_covid_19_daily_reports/');
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

    public function index()
    {
        $filename = STATS . 'countries.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }

    public function all_scripts_index()
    {
        return view('layouts/update');
    }

    public function update_database(Request $request)
    {
        $this->harvest_cases_from_jh_timeline_global($request);
        $this->harvest_cases_from_jh_timeline_us($request);
        $this->harvest_oxford();
        $this->harvest_annotations();
        $this->data_overrides();
        $this->recalculate_global();

        return response('Done updating database')->setStatusCode(Response::HTTP_OK);
    }

    public function update_json()
    {
        $this->generate_global_summary();
        $this->generate_at_a_glance();
        $this->generate_daily_ranking();
        $this->generate_all_countries();
        $this->generate_all_daily();
        return response('Done updating JSON files')->setStatusCode(Response::HTTP_OK);
    }

    public function update_all(Request $request)
    {
        $this->update_database($request);
        $this->update_json();
        return response('Done updating everything')->setStatusCode(Response::HTTP_OK);
    }

    public function full()
    {
        $filename = STATS . 'cases.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }

    public function countries()
    {
        $filename = STATS . 'master.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }

    public function states()
    {
        $filename = STATS . 'states.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }


    public function harvest_time_series()
    {
        $worldometer_override = $this->harvest_worldometer();
        $manual_override = $this->manual_override();
        $current_timestamp = time();
        $current_date = gmdate('Y-m-d',$current_timestamp);
        $current_datetime = gmdate('Y-m-d H:i:s',$current_timestamp);


        $data = [];

        // Generate master country list
        $csv = array_map('str_getcsv', file(MASTER_LIST));
        array_walk($csv, function(&$a) use ($csv) {
            $a = array_combine($csv[0], $a);
        });
        array_shift($csv); # remove column header

        $states = [];
        $data = [];
        $global = [
            'daily' => [],
            'total' => [
                'confirmed' => 0,
                'deaths' => 0,
                'recovered' => 0,
            ],
        ];

        foreach($csv AS $row)
        {
            // Get a list of countries
            if($row['Province_State'] == 'NA' )
            {
                if(!isset($data[ $row['Country_Region'] ]))
                {
                    $data[$row['Country_Region']] = [
                        'name' => $row['Country_Region'],
                        'uid' => $row['UID'],
                        'iso2' => $row['iso2'],
                        'iso3' => $row['iso3'],
                        'code3' => $row['code3'],
                        'fips' => $row['FIPS'],
                        'admin2' => $row['Admin2'],
                        'lat' => $row['Latitude'],
                        'long' => $row['Longitude'],
                        'population' => $row['Population'],
                        'states' => [],
                        'daily' => [],
                        'total' => [
                            'l' => '',
                            'c' => '0',
                            'd' => '0',
                            'r' => '0',
                        ]
                    ];
                }
            }

            // Get a list of states inside countries
            else
            {
                if(isset($data[$row['Country_Region']])) {
                    $data[$row['Country_Region']]['states'][$row['Province_State']] = [
                        'uid' => $row['UID'],
                        'name' => $row['Province_State'],
                        'lat' => $row['Latitude'],
                        'long' => $row['Longitude'],
                        'population' => $row['Population'],
                        'total' => [
                            'l' => '',
                            'c' => '0',
                            'd' => '0',
                            'r' => '0',
                        ]
                    ];
                }
            }
        }

        // Then generate daily and tally data
        foreach(COVID_DATA_TIME_SERIES AS $type => $file) {
            $date = str_replace('.csv', '', $file);
            $csv = array_map('str_getcsv', file($file));
//            array_shift($csv); # remove column header


            $first_date = $csv[0][4];
            $first_date = explode('/',$first_date);
            $first_date = '20' . $first_date[2] . '-' . str_pad($first_date[0],2,'0',STR_PAD_LEFT) . '-' . str_pad($first_date[1],2,'0',STR_PAD_LEFT);

            foreach($csv AS $row)
            {
                /*
                 * 0 => "Province/State"
                 * 1 => "Country/Region"
                 * 2 => "Lat"
                 * 3 => "Long"
                */

                $original_row = $row;

                $total_columns = count($csv[0]);
                $state = strlen($row[0]) == 0 ? '(Unspecified)' : $row[0];
                $country = $row[1];
                $lat = $row[2];
                $long = $row[3];
                array_splice($row,0,4);
                $current_date = new \DateTime($first_date);


                foreach ($this->combine AS $key => $combine) {
                    if (in_array($country, $combine)) {
                        $country = $key;
                        break;
                    }
                }

                // Move countries into states
                if (in_array($country, array_keys($this->transfer))) {
                    $state = $country;
                    $country = $this->transfer[$country];
                }

                // Skip things that we do not know where to put
                if (in_array($country, $this->skip)) {
                    break;
                }


                if($type == 'confirmed')
                {
                    $global['total']['confirmed'] += (int)$row[count($row)-1];
                }
                if($type == 'deaths')
                {
                    $global['total']['deaths'] += (int)$row[count($row)-1];
                }
                if($type == 'recovered')
                {
                    $global['total']['recovered'] += (int)$row[count($row)-1];
                }

                if(isset($data[$country]))
                {
//                    dd($row);
                    for($x = 0; $x < count($row); $x++)
                    {

                        $date = $current_date->format('Y-m-d');
                        if(!isset($global['daily'][$date]))
                        {
                            $global['daily'][$date] = [
                                'confirmed' => 0,
                                'deaths' => 0,
                                'recovered' => 0,
                            ];
                        }

                        if(!isset($data[$country]['daily'][$date]['states'][$state]))
                        {
                            $data[$country]['daily'][$date]['states'][$state] = [
                                'c' => 0,
                                'd' => 0,
                                'r' => 0,
                            ];
                        }

                        // Manual override here
                        if (isset($manual_override[$country])) {
                            if (isset($data[$country]['daily'][$date]['states'][$state]) && isset($manual_override[$country][$date][$state])) {
                                if (strlen($manual_override[$country][$date][$state]['confirmed']) > 0) {
                                    $data[$country]['daily'][$date]['total']['c'] = 0;
                                    $global['daily'][$date]['confirmed'] += intval($manual_override[$country][$date][$state]['confirmed']) - isset($data[$country]['daily'][$date]['states'][$state]['c']) ? $data[$country]['daily'][$date]['states'][$state]['c'] : 0;
                                    $data[$country]['daily'][$date]['states'][$state]['c'] = intval($manual_override[$country][$date][$state]['confirmed']);
//                                    foreach ($data[$country]['daily'][$date]['states'] AS $s) {
//                                        $data[$country]['daily'][$date]['total']['c'] += $s['c'];
//                                    }
                                }
                                if (strlen($manual_override[$country][$date][$state]['deaths']) > 0) {
                                    $data[$country]['daily'][$date]['total']['d'] = 0;
                                    $global['daily'][$date]['deaths'] += intval($manual_override[$country][$date][$state]['deaths']) - isset($data[$country]['daily'][$date]['states'][$state]['d']) ? $data[$country]['daily'][$date]['states'][$state]['d'] : 0;
                                    $data[$country]['daily'][$date]['states'][$state]['d'] = intval($manual_override[$country][$date][$state]['deaths']);
//                                    foreach ($data[$country]['daily'][$date]['states'] AS $s) {
//                                        $data[$country]['daily'][$date]['total']['d'] += $s['d'];
//                                    }
                                }
                                if (strlen($manual_override[$country][$date][$state]['recovered']) > 0) {
                                    $data[$country]['daily'][$date]['total']['r'] = 0;
                                    $global['daily'][$date]['recovered'] += intval($manual_override[$country][$date][$state]['recovered']) - isset($data[$country]['daily'][$date]['states'][$state]['r']) ? $data[$country]['daily'][$date]['states'][$state]['r'] : 0;
                                    $data[$country]['daily'][$date]['states'][$state]['r'] = intval($manual_override[$country][$date][$state]['recovered']);
//                                    foreach ($data[$country]['daily'][$date]['states'] AS $s) {
//                                        $data[$country]['daily'][$date]['total']['r'] += $s['r'];
//                                    }
                                }
                            }
                        }



                        if($type == 'confirmed')
                        {
                            $data[$country]['daily'][$date]['states'][$state]['c'] = (int)$row[$x];
                            $data[$country]['states'][$state]['total']['c'] = (int)$row[$x];

                            $global['daily'][$date]['confirmed'] += (int)$row[$x];

                        }
                        else if($type == 'deaths')
                        {
                            $data[$country]['daily'][$date]['states'][$state]['d'] = (int)$row[$x];
                            $data[$country]['states'][$state]['total']['d'] = (int)$row[$x];

                            $global['daily'][$date]['deaths'] += (int)$row[$x];
                        }
                        else if ($type == 'recovered')
                        {
                            $data[$country]['daily'][$date]['states'][$state]['r'] = (int)$row[$x];
                            $data[$country]['states'][$state]['total']['r'] = (int)$row[$x];

                            $global['daily'][$date]['recovered'] += (int)$row[$x];
                        }

                        $current_date->add(new \DateInterval('P1D'))->format('Y-m-d');
                    }

                    // Compute daily total for state
                    foreach($data[$country]['daily'] AS $date => $daily_row)
                    {
                        $data[$country]['daily'][$date]['total'] = [
                            'c' => 0,
                            'd' => 0,
                            'r' => 0,
                        ];

                        foreach($daily_row['states'] AS $state_id => $state_row)
                        {
                            if(isset($state_row['c']))
                                $data[$country]['daily'][$date]['total']['c'] += $state_row['c'];
                            if(isset($state_row['d']))
                                $data[$country]['daily'][$date]['total']['d'] += $state_row['d'];
                            if(isset($state_row['r']))
                                $data[$country]['daily'][$date]['total']['r'] += $state_row['r'];
                        }
                    }

                    // Compute total for country
                    if($type == 'confirmed')
                    {
                        $data[$country]['total']['c'] = 0;
                    }
                    if($type == 'deaths')
                    {
                        $data[$country]['total']['d'] = 0;
                    }
                    if($type == 'recovered')
                    {
                        $data[$country]['total']['r'] = 0;
                    }
                    foreach($data[$country]['states'] AS $state => $row)
                    {
                        if($type == 'confirmed' && isset($row['total']['c']))
                        {
                            $data[$country]['total']['c'] += $row['total']['c'];
                        }
                        else if($type == 'deaths' && isset($row['total']['d']))
                        {
                            $data[$country]['total']['d'] += $row['total']['d'];
                        }
                        else if($type == 'recovered' && isset($row['total']['r']))
                        {
                            $data[$country]['total']['r'] += $row['total']['r'];
                        }



                    }
                }
            }
        }


        $current_date = $current_date->format('Y-m-d');

        // Worldometer
        foreach($worldometer_override AS $override)
        {
//                array:4 [▼
//                    "country" => "North America"
//                    "confirmed" => "696,905"
//                    "deaths" => "35,276"
//                    "recovered" => "61,446"
//                ]

            if(isset($this->worldometer_jh_map[$override['country']]))
            {
                $country = $this->worldometer_jh_map[$override['country']];
                if(isset($country))
                {
                    if (isset($data[$country]))
                    {
                        $statename = '(Unspecified)';

                        // Copy last record
                        $last_daily_record = $data[$country]['daily'][array_key_last($data[$country]['daily'])];
                        $new_daily_record = $data[$country]['daily'][array_key_last($data[$country]['daily'])];

                        if($override['confirmed'] == 'N/A')
                        {
                            $confirmed = $last_daily_record['total']['c'];
                        }
                        else
                        {
                            if($override['confirmed'] > $last_daily_record['total']['c'])
                                $confirmed = (int) str_replace(',','',$override['confirmed']);
                            else
                                $confirmed = $last_daily_record['total']['c'];
                        }

                        if($override['deaths'] == 'N/A')
                        {
                            $deaths = $last_daily_record['total']['d'];
                        }
                        else
                        {
                            if($override['deaths'] > $last_daily_record['total']['d'])
                                $deaths = (int) str_replace(',','',$override['deaths']);
                            else
                                $deaths = $last_daily_record['total']['d'];
                        }

                        if($override['recovered'] == 'N/A')
                        {
                            $recovered = $last_daily_record['total']['r'];
                        }
                        else
                        {
                            if($override['recovered'] > $last_daily_record['total']['r'])
                                $recovered = (int) str_replace(',','',$override['recovered']);
                            else
                                $recovered = $last_daily_record['total']['r'];
                        }


                        $temp_state_data = [
                            'c' => 0,
                            'd' => 0,
                            'r' => 0
                        ];
                        foreach($last_daily_record['states'] AS $index=>$state)
                        {

                            if(!isset($state['name']))
                            {
                                $state['name'] = '(Unspecified)';
                            }
                            if($state['name'] != '(Unspecified)')
                            {
                                $temp_state_data['c'] += intval($state['c']);
                                $temp_state_data['d'] += intval($state['d']);
                                $temp_state_data['r'] += intval($state['r']);
                            }

                        }

                        if(!isset($new_daily_record['states'][$statename]))
                        {
                            $new_daily_record['states'][$statename] = [
                                'name' => $statename,
                                'lat' => '',
                                'lng' => '',
                                'l' => $current_datetime,
                                'c' => $confirmed - $temp_state_data['c'],
                                'd' => $deaths - $temp_state_data['d'],
                                'r' => $recovered - $temp_state_data['r'],
                            ];
                        }
                        else
                        {
                            $new_daily_record['states'][$statename]['c'] = $confirmed - $temp_state_data['c'];
                            $new_daily_record['states'][$statename]['d'] = $deaths - $temp_state_data['d'];
                            $new_daily_record['states'][$statename]['r'] = $recovered - $temp_state_data['r'];
                        }


                        $new_daily_record['total'] = [
                            'c' => $confirmed,
                            'd' => $deaths,
                            'r' => $recovered
                        ];


                        $data[$country]['daily'][$current_date] = $new_daily_record;

                        if(!isset($global['daily'][$current_date]))
                        {
                            $global['daily'][$current_date] = [
                                'confirmed' => 0,
                                'deaths' => 0,
                                'recovered' => 0,
                            ];
                        }

                        $global['daily'][$current_date]['confirmed'] += $confirmed;
                        $global['daily'][$current_date]['deaths'] += $deaths;
                        $global['daily'][$current_date]['recovered'] += $recovered;
                    }
                }
            }
        }
        dd($data['Australia']['daily']['2020-04-18']);
    }

    public function master()
    {
        $manual_override = $this->manual_override();
//        $worldometer_override = [];
//        $manual_override = [];
        $current_timestamp = time();
        $current_date = gmdate('Y-m-d',$current_timestamp);
        $current_datetime = gmdate('Y-m-d H:i:s',$current_timestamp);

        $first_date = '2020-01-22';
        $data = [];

        // Generate master country list
        $csv = array_map('str_getcsv', file(MASTER_LIST));
        array_walk($csv, function(&$a) use ($csv) {
            $a = array_combine($csv[0], $a);
        });
        array_shift($csv); # remove column header

        $states = [];
        $data = [];
        $global = [
            'daily' => [],
            'total' => [
                'confirmed' => 0,
                'deaths' => 0,
                'recovered' => 0,
            ],
        ];

        foreach($csv AS $row)
        {
            if(isset($this->rename[$row['Country_Region']]))
            {
//                dump('Found ' . $row['Country_Region'] . ' rename to ' . $this->rename[$row['Country_Region']]);
                $row['Country_Region'] = $this->rename[$row['Country_Region']];

            }
            // Get a list of countries
            if(strlen($row['Province_State']) == 0 )
            {
                if(!isset($data[ $row['Country_Region'] ]))
                {
                    $data[$row['Country_Region']] = [
                        'name' => $row['Country_Region'],
                        'uid' => $row['UID'],
                        'iso2' => $row['iso2'],
                        'iso3' => $row['iso3'],
                        'code3' => $row['code3'],
                        'fips' => $row['FIPS'],
                        'admin2' => $row['Admin2'],
                        'lat' => $row['Lat'],
                        'long' => $row['Long_'],
                        'population' => $row['Population'],
                        'states' => [],
                        'daily' => [],
                        'total' => [
                            'l' => '',
                            'c' => '0',
                            'd' => '0',
                            'r' => '0',
                        ]
                    ];
                }
            }

            // Get a list of states inside countries
            else
            {
                if(isset($data[$row['Country_Region']])) {
                    if(!isset($data[$row['Country_Region']]['states'][$row['Province_State']]))
                    {
                        $data[$row['Country_Region']]['states'][$row['Province_State']] = [
                            'uid' => $row['UID'],
                            'name' => $row['Province_State'],
                            'lat' => $row['Lat'],
                            'long' => $row['Long_'],
                            'population' => $row['Population'],
                            'total' => [
                                'l' => '',
                                'c' => '0',
                                'd' => '0',
                                'r' => '0',
                            ]
                        ];
                    }
                    else
                    {
                        if($row['Population'] >
                            $data[$row['Country_Region']]['states'][$row['Province_State']]['population'])
                        {
                            $data[$row['Country_Region']]['states'][$row['Province_State']]['population'] = $row['Population'];
                            $data[$row['Country_Region']]['states'][$row['Province_State']]['lat'] = $row['Lat'];
                            $data[$row['Country_Region']]['states'][$row['Province_State']]['long'] = $row['Long_'];
                        }

                    }
                }
            }
        }


        // Special preparation for the US time series data...
        $files = COVID_DATA_TIME_SERIES;
        unset($files['confirmed']);
        unset($files['deaths']);
        unset($files['recovered']);

        $time_series_us = [
            'confirmed' => [],
            'deaths' => [],
        ];
        foreach($files AS $type => $file)
        {
            $date = str_replace('.csv', '', $file);
            $csv = array_map('str_getcsv', file($file));

            foreach($csv AS $key=>$row)
            {
                if($key == 0)
                {
                    continue;
                }
                /*
                 * Global
                 * 0 => "Province/State"
                 * 1 => "Country/Region"
                 * 2 => "Lat"
                 * 3 => "Long"
                 *
                 * US
                 * 0 => UID
                 * 1 => iso2
                 * 2 => iso3
                 * 3 => code3
                 * 4 => FIPS
                 * 5 => Admin2
                 * 6 => Province/State
                 * 7 => Country/Region
                 * 8 => Lat
                 * 9 => Long
                 * 10 => Combined
                */

                $state = strlen($row[6]) == 0 ? '(Unspecified)' : $row[6];
                $country = $row[7];
                $lat = $row[8];
                $long = $row[9];

                if($type == 'confirmedUS')
                {
                    array_splice($row,0,11);
                }
                else if($type == 'deathsUS')
                {
                    array_splice($row,0,12);
                }

//                $current_date = new \DateTime($first_date);

                $total_cols = count($row);


                if($type == 'confirmedUS')
                {
                    if(!isset($time_series_us['confirmed'][$state]))
                    {
                        $time_series_us['confirmed'][$state] = [
                            $state,
                            $country,
                            '',
                            '',
                        ];
                    }

                    if(count($time_series_us['confirmed'][$state]) <= 4 )
                    {
                        for($x = 0; $x < count($row); $x++)
                        {
                            $time_series_us['confirmed'][$state][] = 0;
                        }
                    }

                    for($x = 0; $x < count($row); $x++) {
                        $time_series_us['confirmed'][$state][($x+4)] +=
                            $row[$x];
                    }
                }
                else if($type == 'deathsUS')
                {
                    if(!isset($time_series_us['deaths'][$state]))
                    {
                        $time_series_us['deaths'][$state] = [
                            $state,
                            $country,
                            '',
                            '',
                        ];
                    }

                    if(count($time_series_us['deaths'][$state]) <= 4 )
                    {
                        for($x = 0; $x < count($row); $x++)
                        {
                            $time_series_us['deaths'][$state][] = 0;
                        }
                    }

                    for($x = 0; $x < count($row); $x++) {
                        $time_series_us['deaths'][$state][($x+4)] +=
                            $row[$x];
                    }
                }
            }
        }

        $files = COVID_DATA_TIME_SERIES;
        unset($files['confirmedUS']);
        unset($files['deathsUS']);

        $file_processed = [];
        $file_processed['confirmedUS'] = $time_series_us['confirmed'];
        $file_processed['deathsUS'] = $time_series_us['deaths'];


//        dump($file_processed['confirmed']);
//        dd($file_processed['confirmedUS']);
//        // Then generate daily and tally data
        foreach($files AS $type => $file) {
            $date = str_replace('.csv', '', $file);
            $csv = array_map('str_getcsv', file($file));
            $file_processed[$type] = $csv;
        }

        foreach($file_processed AS $type => $csv)
        {
            foreach($csv AS $row)
            {
                /*
                 * Global
                 * 0 => "Province/State"
                 * 1 => "Country/Region"
                 * 2 => "Lat"
                 * 3 => "Long"
                 *
                 * US
                 * 0 => UID
                 * 1 => iso2
                 * 2 => iso3
                 * 3 => code3
                 * 4 => FIPS
                 * 5 => Admin2
                 * 6 => Province/State
                 * 7 => Country/Region
                 * 8 => Lat
                 * 9 => Long
                 * 10 => Combined
                */

                $original_row = $row;
                $total_columns = count($row);

                $state = strlen($row[0]) == 0 ? '(Unspecified)' : $row[0];
                $country = $row[1];
                $lat = $row[2];
                $long = $row[3];
                array_splice($row,0,4);
                $current_date = new \DateTime($first_date);

                foreach ($this->combine AS $key => $combine) {
                    if (in_array($country, $combine)) {
                        $country = $key;
                        break;
                    }
                }

                // Move countries into states
                if (in_array($country, array_keys($this->transfer))) {
                    $state = $country;
                    $country = $this->transfer[$country];
                }

                // Skip things that we do not know where to put
                if (in_array($country, $this->skip)) {
                    break;
                }


                // We have already done United States separately...
                if($country == 'United States' && ($type == 'confirmed' || $type == 'deaths'))
                {
                    continue;
                }


                if($type == 'confirmed' || $type == 'confirmedUS')
                {
                    $global['total']['confirmed'] += (int)$row[count($row)-1];
                }
                if($type == 'deaths' || $type == 'deathsUS')
                {
                    $global['total']['deaths'] += (int)$row[count($row)-1];
                }
                if($type == 'recovered')
                {
                    $global['total']['recovered'] += (int)$row[count($row)-1];
                }

                if(isset($data[$country]))
                {
//                    dd($row);
                    for($x = 0; $x < count($row); $x++)
                    {

                        $date = $current_date->format('Y-m-d');
                        if(!isset($global['daily'][$date]))
                        {
                            $global['daily'][$date] = [
                                'confirmed' => 0,
                                'deaths' => 0,
                                'recovered' => 0,
                            ];
                        }

                        if(!isset($data[$country]['daily'][$date]['states'][$state]))
                        {
                            $data[$country]['daily'][$date]['states'][$state] = [
                                'name' => $state,
                                'c' => 0,
                                'd' => 0,
                                'r' => 0,
                            ];

                            $data[$country]['states'][$state]['name'] = $state;
                        }

                        // Manual override here
                        if (isset($manual_override[$country])) {
                            if (isset($data[$country]['daily'][$date]['states'][$state]) && isset($manual_override[$country][$date][$state])) {
                                if (strlen($manual_override[$country][$date][$state]['confirmed']) > 0) {
                                    $data[$country]['daily'][$date]['total']['c'] = 0;
                                    $global['daily'][$date]['confirmed'] += intval($manual_override[$country][$date][$state]['confirmed']) - isset($data[$country]['daily'][$date]['states'][$state]['c']) ? $data[$country]['daily'][$date]['states'][$state]['c'] : 0;
                                    $data[$country]['daily'][$date]['states'][$state]['c'] = intval($manual_override[$country][$date][$state]['confirmed']);
//                                    foreach ($data[$country]['daily'][$date]['states'] AS $s) {
//                                        $data[$country]['daily'][$date]['total']['c'] += $s['c'];
//                                    }
                                }
                                if (strlen($manual_override[$country][$date][$state]['deaths']) > 0) {
                                    $data[$country]['daily'][$date]['total']['d'] = 0;
                                    $global['daily'][$date]['deaths'] += intval($manual_override[$country][$date][$state]['deaths']) - isset($data[$country]['daily'][$date]['states'][$state]['d']) ? $data[$country]['daily'][$date]['states'][$state]['d'] : 0;
                                    $data[$country]['daily'][$date]['states'][$state]['d'] = intval($manual_override[$country][$date][$state]['deaths']);
//                                    foreach ($data[$country]['daily'][$date]['states'] AS $s) {
//                                        $data[$country]['daily'][$date]['total']['d'] += $s['d'];
//                                    }
                                }
                                if (strlen($manual_override[$country][$date][$state]['recovered']) > 0) {
                                    $data[$country]['daily'][$date]['total']['r'] = 0;
                                    $global['daily'][$date]['recovered'] += intval($manual_override[$country][$date][$state]['recovered']) - isset($data[$country]['daily'][$date]['states'][$state]['r']) ? $data[$country]['daily'][$date]['states'][$state]['r'] : 0;
                                    $data[$country]['daily'][$date]['states'][$state]['r'] = intval($manual_override[$country][$date][$state]['recovered']);
//                                    foreach ($data[$country]['daily'][$date]['states'] AS $s) {
//                                        $data[$country]['daily'][$date]['total']['r'] += $s['r'];
//                                    }
                                }
                            }
                        }



                        if($type == 'confirmed' || $type == 'confirmedUS')
                        {
                            $data[$country]['daily'][$date]['states'][$state]['c'] = (int)$row[$x];
                            $data[$country]['states'][$state]['total']['c'] = (int)$row[$x];
                            $global['daily'][$date]['confirmed'] += (int)$row[$x];

                        }
                        else if($type == 'deaths' || $type == 'deathsUS')
                        {
                            $data[$country]['daily'][$date]['states'][$state]['d'] = (int)$row[$x];
                            $data[$country]['states'][$state]['total']['d'] = (int)$row[$x];

                            $global['daily'][$date]['deaths'] += (int)$row[$x];
                        }
                        else if ($type == 'recovered')
                        {
                            $data[$country]['daily'][$date]['states'][$state]['r'] = (int)$row[$x];
                            $data[$country]['states'][$state]['total']['r'] = (int)$row[$x];

                            $global['daily'][$date]['recovered'] += (int)$row[$x];
                        }

                        $current_date->add(new \DateInterval('P1D'))->format('Y-m-d');
                    }

                    // Compute daily total for state
                    foreach($data[$country]['daily'] AS $date => $daily_row)
                    {
                        $data[$country]['daily'][$date]['total'] = [
                            'c' => 0,
                            'd' => 0,
                            'r' => 0,
                        ];

                        foreach($daily_row['states'] AS $state_id => $state_row)
                        {
                            if(isset($state_row['c']))
                                $data[$country]['daily'][$date]['total']['c'] += $state_row['c'];
                            if(isset($state_row['d']))
                                $data[$country]['daily'][$date]['total']['d'] += $state_row['d'];
                            if(isset($state_row['r']))
                                $data[$country]['daily'][$date]['total']['r'] += $state_row['r'];
                        }
                    }

                    // Compute total for country
                    if($type == 'confirmed' || $type == 'confirmedUS')
                    {
                        $data[$country]['total']['c'] = 0;
                    }
                    if($type == 'deaths' || $type == 'deathsUS')
                    {
                        $data[$country]['total']['d'] = 0;
                    }
                    if($type == 'recovered')
                    {
                        $data[$country]['total']['r'] = 0;
                    }
                    foreach($data[$country]['states'] AS $state => $row)
                    {
                        if(($type == 'confirmed' || $type == 'confirmedUS') && isset($row['total']['c']))
                        {
                            $data[$country]['total']['c'] += $row['total']['c'];
                        }
                        else if(($type == 'deaths' || $type == 'deathsUS') && isset($row['total']['d']))
                        {
                            $data[$country]['total']['d'] += $row['total']['d'];
                        }
                        else if($type == 'recovered' && isset($row['total']['r']))
                        {
                            $data[$country]['total']['r'] += $row['total']['r'];
                        }
                    }
                }
            }
        }


        // Recompute state total
        foreach($data AS $country => $country_row)
        {
            if(count($country_row['states']) > 1)
            {
                $last_daily_record = $country_row['daily'][array_key_last($country_row['daily'])];
                foreach($country_row['states'] AS $state => $state_row)
                {
                    if(isset($last_daily_record['states'][$state]['c']))
                        $data[$country]['states'][$state]['total']['c'] = $last_daily_record['states'][$state]['c'];
                    if(isset($last_daily_record['states'][$state]['d']))
                        $data[$country]['states'][$state]['total']['d'] = $last_daily_record['states'][$state]['d'];
                    if(isset($last_daily_record['states'][$state]['r']))
                        $data[$country]['states'][$state]['total']['r'] = $last_daily_record['states'][$state]['r'];
                }
            }



            // Manual override country
            foreach($country_row['daily'] AS $date => $daily_row)
            {
                $state = '(Unspecified)';
                if (isset($manual_override[$country])) {
                    if (isset($data[$country]['daily'][$date]['states'][$state]) && isset($manual_override[$country][$date][$state])) {
                        $total = [
                            'c' => 0,
                            'd' => 0,
                            'r' => 0,
                        ];
                        foreach($daily_row['states'] AS $s => $state_row)
                        {
                            if($s != $state)
                            {
                                $total['c'] += $state_row['c'];
                                $total['d'] += $state_row['d'];
                                $total['r'] += $state_row['r'];
                            }
                        }

                        if (strlen($manual_override[$country][$date][$state]['confirmed']) > 0) {
                            $data[$country]['daily'][$date]['total']['c'] = 0;
                            $data[$country]['daily'][$date]['states'][$state]['c'] = (int)$manual_override[$country][$date][$state]['confirmed'] - $total['c'];

                            $global['daily'][$date]['confirmed'] += intval($manual_override[$country][$date][$state]['confirmed']) - isset($data[$country]['daily'][$date]['total']['c']) ? $data[$country]['daily'][$date]['total']['c'] : 0;
                            $data[$country]['daily'][$date]['total']['c'] = intval($manual_override[$country][$date][$state]['confirmed']);
                        }
                        if (strlen($manual_override[$country][$date][$state]['deaths']) > 0) {
                            $data[$country]['daily'][$date]['total']['d'] = 0;

                            $data[$country]['daily'][$date]['states'][$state]['d'] = (int)$manual_override[$country][$date][$state]['deaths'] - $total['d'];




                            $global['daily'][$date]['deaths'] += intval($manual_override[$country][$date][$state]['deaths']) - isset($data[$country]['daily'][$date]['total']['d']) ? $data[$country]['daily'][$date]['total']['d'] : 0;
                            $data[$country]['daily'][$date]['total']['d'] = intval($manual_override[$country][$date][$state]['deaths']);
                        }
                        if (strlen($manual_override[$country][$date][$state]['recovered']) > 0) {
                            $data[$country]['daily'][$date]['total']['r'] = 0;
                            $data[$country]['daily'][$date]['states'][$state]['r'] = (int)$manual_override[$country][$date][$state]['recovered'] - $total['r'];

                            $global['daily'][$date]['recovered'] += intval($manual_override[$country][$date][$state]['recovered']) - isset($data[$country]['daily'][$date]['total']['r']) ? $data[$country]['daily'][$date]['total']['r'] : 0;
                            $data[$country]['daily'][$date]['total'][$state]['r'] = intval($manual_override[$country][$date][$state]['recovered']);
                        }
                    }
                }
            }
        }


        $update_date = $current_date;
        $current_date = $current_date->format('Y-m-d');

        $update_date = $update_date->sub(new \DateInterval('P1D'))->format('Y-m-d');


//        $worldometer_override = $this->harvest_worldometer();
//        // Worldometer
//        foreach($worldometer_override AS $override)
//        {
////                array:4 [▼
////                    "country" => "North America"
////                    "confirmed" => "696,905"
////                    "deaths" => "35,276"
////                    "recovered" => "61,446"
////                ]
//            $override['confirmed'] = (int) str_replace(',','',$override['confirmed']);
//            $override['deaths'] = (int) str_replace(',','',$override['deaths']);
//            $override['recovered'] = (int) str_replace(',','',$override['recovered']);
//
//            if(isset($this->worldometer_jh_map[$override['country']]))
//            {
//                $country = $this->worldometer_jh_map[$override['country']];
//                if(isset($country))
//                {
//                    if (isset($data[$country]))
//                    {
//                        $statename = '(Unspecified)';
//
//                        // Copy last record
//                        $last_daily_record = $data[$country]['daily'][array_key_last($data[$country]['daily'])];
//                        $new_daily_record = $data[$country]['daily'][array_key_last($data[$country]['daily'])];
//
//                        if($override['confirmed'] == 'N/A')
//                        {
//                            $confirmed = $last_daily_record['total']['c'];
//                        }
//                        else
//                        {
//                            if($override['confirmed'] > $last_daily_record['total']['c'])
//                                $confirmed = (int) str_replace(',','',$override['confirmed']);
//                            else
//                                $confirmed = $last_daily_record['total']['c'];
//                        }
//
//                        if($override['deaths'] == 'N/A')
//                        {
//                            $deaths = $last_daily_record['total']['d'];
//                        }
//                        else
//                        {
//                            if($override['deaths'] > $last_daily_record['total']['d'])
//                                $deaths = (int) str_replace(',','',$override['deaths']);
//                            else
//                                $deaths = $last_daily_record['total']['d'];
//                        }
//
//                        if($override['recovered'] == 'N/A')
//                        {
//                            $recovered = $last_daily_record['total']['r'];
//                        }
//                        else
//                        {
//                            if($override['recovered'] > $last_daily_record['total']['r'])
//                                $recovered = (int) str_replace(',','',$override['recovered']);
//                            else
//                                $recovered = $last_daily_record['total']['r'];
//                        }
//
//
//                        $temp_state_data = [
//                            'c' => 0,
//                            'd' => 0,
//                            'r' => 0
//                        ];
//                        foreach($last_daily_record['states'] AS $index=>$state)
//                        {
//
//                            if(!isset($state['name']))
//                            {
//                                $state['name'] = '(Unspecified)';
//                            }
//                            if($state['name'] != '(Unspecified)')
//                            {
//                                $temp_state_data['c'] += intval($state['c']);
//                                $temp_state_data['d'] += intval($state['d']);
//                                $temp_state_data['r'] += intval($state['r']);
//                            }
//
//                        }
//
//                        if(!isset($new_daily_record['states'][$statename]))
//                        {
//                            $new_daily_record['states'][$statename] = [
//                                'name' => $statename,
//                                'lat' => '',
//                                'lng' => '',
//                                'l' => $current_datetime,
//                                'c' => $confirmed - $temp_state_data['c'],
//                                'd' => $deaths - $temp_state_data['d'],
//                                'r' => $recovered - $temp_state_data['r'],
//                            ];
//                        }
//                        else
//                        {
//                            $new_daily_record['states'][$statename]['c'] = $confirmed - $temp_state_data['c'];
//                            $new_daily_record['states'][$statename]['d'] = $deaths - $temp_state_data['d'];
//                            $new_daily_record['states'][$statename]['r'] = $recovered - $temp_state_data['r'];
//                        }
//
//
//                        $new_daily_record['total'] = [
//                            'c' => $confirmed,
//                            'd' => $deaths,
//                            'r' => $recovered
//                        ];
//
//                        $data[$country]['total']['c'] = $confirmed;
//                        $data[$country]['total']['d'] = $deaths;
//                        $data[$country]['total']['r'] = $recovered;
//
//                        $data[$country]['daily'][$current_date] = $new_daily_record;
//
//                        if(!isset($global['daily'][$current_date]))
//                        {
//                            $global['daily'][$current_date] = [
//                                'confirmed' => 0,
//                                'deaths' => 0,
//                                'recovered' => 0,
//                            ];
//                        }
//
//                        $global['daily'][$current_date]['confirmed'] += $confirmed;
//                        $global['daily'][$current_date]['deaths'] += $deaths;
//                        $global['daily'][$current_date]['recovered'] += $recovered;
//                    }
//                }
//            }
//        }



        $wikipedia_override = $this->harvest_wikipedia();
        // Wikipedia
        foreach($wikipedia_override AS $override)
        {
//                array:4 [▼
//                    "country" => "North America"
//                    "confirmed" => "696,905"
//                    "deaths" => "35,276"
//                    "recovered" => "61,446"
//                ]
            $override['confirmed'] = (int) str_replace(',','',$override['confirmed']);
            $override['deaths'] = (int) str_replace(',','',$override['deaths']);
            $override['recovered'] = (int) str_replace(',','',$override['recovered']);

            if(isset($this->wikipedia_jh_map[$override['country']]))
            {
                $country = $this->wikipedia_jh_map[$override['country']];
                if(isset($country))
                {
                    if (isset($data[$country]))
                    {
                        $statename = '(Unspecified)';

                        // Copy last record
                        $last_daily_record = $data[$country]['daily'][array_key_last($data[$country]['daily'])];
                        $new_daily_record = $data[$country]['daily'][array_key_last($data[$country]['daily'])];

                        if($override['confirmed'] == 'N/A')
                        {
                            $confirmed = $last_daily_record['total']['c'];
                        }
                        else
                        {
                            if($override['confirmed'] > $last_daily_record['total']['c'])
                                $confirmed = (int) str_replace(',','',$override['confirmed']);
                            else
                                $confirmed = $last_daily_record['total']['c'];
                        }

                        if($override['deaths'] == 'N/A')
                        {
                            $deaths = $last_daily_record['total']['d'];
                        }
                        else
                        {
                            if($override['deaths'] > $last_daily_record['total']['d'])
                                $deaths = (int) str_replace(',','',$override['deaths']);
                            else
                                $deaths = $last_daily_record['total']['d'];
                        }

                        if($override['recovered'] == 'N/A')
                        {
                            $recovered = $last_daily_record['total']['r'];
                        }
                        else
                        {
                            if($override['recovered'] > $last_daily_record['total']['r'])
                                $recovered = (int) str_replace(',','',$override['recovered']);
                            else
                                $recovered = $last_daily_record['total']['r'];
                        }


                        $temp_state_data = [
                            'c' => 0,
                            'd' => 0,
                            'r' => 0
                        ];
                        foreach($last_daily_record['states'] AS $index=>$state)
                        {

                            if(!isset($state['name']))
                            {
                                $state['name'] = '(Unspecified)';
                            }
                            if($state['name'] != '(Unspecified)')
                            {
                                $temp_state_data['c'] += intval($state['c']);
                                $temp_state_data['d'] += intval($state['d']);
                                $temp_state_data['r'] += intval($state['r']);
                            }

                        }

                        if(!isset($new_daily_record['states'][$statename]))
                        {
                            $new_daily_record['states'][$statename] = [
                                'name' => $statename,
                                'lat' => '',
                                'lng' => '',
                                'l' => $current_datetime,
                                'c' => $confirmed - $temp_state_data['c'],
                                'd' => $deaths - $temp_state_data['d'],
                                'r' => $recovered - $temp_state_data['r'],
                            ];
                        }
                        else
                        {
                            $new_daily_record['states'][$statename]['c'] = $confirmed - $temp_state_data['c'];
                            $new_daily_record['states'][$statename]['d'] = $deaths - $temp_state_data['d'];
                            $new_daily_record['states'][$statename]['r'] = $recovered - $temp_state_data['r'];
                        }


                        $new_daily_record['total'] = [
                            'c' => $confirmed,
                            'd' => $deaths,
                            'r' => $recovered
                        ];

                        $data[$country]['total']['c'] = $confirmed;
                        $data[$country]['total']['d'] = $deaths;
                        $data[$country]['total']['r'] = $recovered;

                        $data[$country]['daily'][$current_date] = $new_daily_record;

                        if(!isset($global['daily'][$current_date]))
                        {
                            $global['daily'][$current_date] = [
                                'confirmed' => 0,
                                'deaths' => 0,
                                'recovered' => 0,
                            ];
                        }

                        $global['daily'][$current_date]['confirmed'] += $confirmed;
                        $global['daily'][$current_date]['deaths'] += $deaths;
                        $global['daily'][$current_date]['recovered'] += $recovered;
                    }
                }
            }
        }



        // Cleanup
        foreach($data AS $index=>$row)
        {
            // Remove state data from single state countries
            if(count($row['states']) == 1)
            {
                unset($data[$index]['states']['(Unspecified)']);
            }
            // Remove empty unknown states
            else if(!isset($row['states']['(Unspecified)']) || !isset($row['states']['(Unspecified)']['total']))
            {
                unset($data[$index]['states']['(Unspecified)']);
            }
        }
        unset($data['Cruise Ship']);

        $global['total'] = [
            'last_update' => $update_date,
            'confirmed' => 0,
            'deaths' => 0,
            'recovered' => 0,
        ];
//        foreach($data AS $country => $row)
//        {
//            $global['total']['confirmed'] += $row['total']['c'];
//            $global['total']['deaths'] += $row['total']['d'];
//            $global['total']['recovered'] += $row['total']['r'];
//        }


        echo '<table border="1">
            <tr>
                <td>Country</td>
                <td>Confirmed</td>
                <td>Deaths</td>
                <td>Recovered</td>

                <td>Cumulative Confirmed</td>
                <td>Cumulative Deaths</td>
                <td>Cumulative Recovered</td>
            </tr>
        ';

        $population = 0;
        foreach($data AS $country=> $row)
        {
            $global['total']['confirmed'] += $row['total']['c'];
            $global['total']['deaths'] += $row['total']['d'];
            $global['total']['recovered'] += $row['total']['r'];
            echo '
            <tr>
            <td>' . $country . '</td>
            <td>' . $row['total']['c'] . '</td>
            <td>' . $row['total']['d'] . '</td>
            <td>' . $row['total']['r'] . '</td>
            <td>' . $global['total']['confirmed'] . '</td>
            <td>' . $global['total']['deaths'] . '</td>
            <td>' . $global['total']['recovered'] . '</td>
            </tr>
            ';
            if(isset($row['population']))
                $population += (int)$row['population'];
        }

        echo '
        <tr>
            <td>GLOBAL TOTAL</td>
            <td></td>
            <td></td>
            <td></td>
            <td>' . $global['total']['confirmed'] . '</td>
            <td>' . $global['total']['deaths'] . '</td>
            <td>' . $global['total']['recovered'] . '</td>
        </tr>
        </table>';

        // Treat "Global" as a country
        $data['Global'] = [
            "admin2"=> "",
            "code3"=> "4",
            "daily"=> [],
            "fips"=> "",
            "iso2"=> "AF",
            "iso3"=> "AFG",
            "lat"=> "33.93911",
            "long"=> "67.709953",
            "name"=> "Global",
            "population"=> $population,
            "states"=> [],
            "total"=> [
                'l' => date('Y-m-d H:i:s'),
                'c' => $global['total']['confirmed'],
                'd' => $global['total']['deaths'],
                'r' => $global['total']['recovered'],
            ],
            "uid" => "0",
        ];

        foreach($global['daily'] AS $date => $row)
        {
            $data['Global']['daily'][$date] = [
                'states' => [
                    'Unspecified' => [
                        'c' => $row['confirmed'],
                        'd' => $row['deaths'],
                        'r' => $row['recovered'],
                    ]
                ],
                'total' => [
                    'c' => $row['confirmed'],
                    'd' => $row['deaths'],
                    'r' => $row['recovered'],
                ]
            ];
        }

        $data['Global']['daily'][array_key_last($data['Global']['daily'])]['total']['c'] = $data['Global']['total']['c'];
        $data['Global']['daily'][array_key_last($data['Global']['daily'])]['total']['d'] = $data['Global']['total']['d'];
        $data['Global']['daily'][array_key_last($data['Global']['daily'])]['total']['r'] = $data['Global']['total']['r'];

        // Write the file
        file_put_contents(STATS . 'master.json',json_encode($data));


        // Create daily json for states
        $states = [];

        foreach($data AS $country=>$row)
        {
            if($country != 'Global')
            {
                $states[$country] = [
                    'name' => $row['name'],
                    'states' => [],
                ];


                if(count($row['states']) > 0)
                {
                    foreach($row['states'] AS $state => $state_row)
                    {
                        if(isset($state_row['total']))
                        {
                            $states[$country]['states'][$state]['total'] = $state_row['total'];
                        }
                    }
                }

                foreach($row['daily'] AS $date => $daily_row)
                {
                    foreach($daily_row['states'] AS $state => $state_row)
                    {
                        $states[$country]['states'][$state]['daily'][$date] = $state_row;
                    }
                }
            }
        }

        // Write the file
        file_put_contents(STATS . 'states.json',json_encode($states));

        // Annotations
        // https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1Pov2AbAscAXUNphDrjd3ZmzlbuvMy_Pd195bXlylwgdDnu1OQ0CBKXfMeDAHBZWbtLL9t5McfIcD/pubhtml
        $url = 'https://spreadsheets.google.com/feeds/list/1XfndFdJ0VSJnLqY83s8ITmuRVgsUSWPhCm-Fvd_rNb4/oejzle4/public/values?alt=json';
        $file= file_get_contents($url);

        $json = json_decode($file,true);
        $rows = $json['feed']['entry'];
        $data = [];
        foreach($rows AS $row)
        {
            if($row['gsx$publish']['$t'] == 'Y')
            {
                $data[$row['gsx$country']['$t']][] = [
                    'country' => $row['gsx$country']['$t'],
                    'state' => $row['gsx$state']['$t'],
                    'date' => $row['gsx$date']['$t'],
                    'notes' => $row['gsx$notes']['$t'],
                    'url' => $row['gsx$url']['$t'],
                ];
            }
        }

        $global['total']['last_update'] = date('Y-m-d');
        file_put_contents(STATS . 'annotations.json',json_encode($data));
        file_put_contents(STATS . 'global.json',json_encode($global));

        $this->harvest_oxford();

        return response('Done harvesting data')->setStatusCode(Response::HTTP_OK);
    }

    public function annotations()
    {

        $filename = STATS . 'annotations.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }

    public function global()
    {

        $filename = STATS . 'global.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }

    protected function harvest_worldometer()
    {
        $client = new Client();
        $crawler = $client->request('GET', 'https://www.worldometers.info/coronavirus/');
        $data = $crawler->filter('#main_table_countries_today tbody tr')->each(function (Crawler $node, $i) {
            $children = [];
            $columns = $node->filter('td')->each(function(Crawler $column,$i){
                return $column->text();
            });
            return [
                'country' => $columns[0],
                'confirmed' => str_replace(',','',$columns[1]),
                'deaths' => str_replace(',','',$columns[3]),
                'recovered' => str_replace(',','',$columns[5]),
            ];
        });
        return $data;
    }

    public function harvest_wikipedia()
    {

//        $wikipedia_override = $this->harvest_wikipedia();
//        // Wikipedia
//        foreach($wikipedia_override AS $override)
//        {
////                array:4 [▼
////                    "country" => "North America"
////                    "confirmed" => "696,905"
////                    "deaths" => "35,276"
////                    "recovered" => "61,446"
////                ]
//            $override['confirmed'] = (int) str_replace(',','',$override['confirmed']);
//            $override['deaths'] = (int) str_replace(',','',$override['deaths']);
//            $override['recovered'] = (int) str_replace(',','',$override['recovered']);
//
//            if(isset($this->wikipedia_jh_map[$override['country']]))
//            {
//                $country = $this->wikipedia_jh_map[$override['country']];



        $data = [];
        $client = new Client();
        $crawler = $client->request('GET', 'https://en.m.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic');
        $source = $crawler->filter('#thetable tbody tr')->each(function (Crawler $node, $i) {
            $children = [];
            $col_headers = $node->filter('th')->each(function(Crawler $column,$i){
                return $column->text();
            });
            $col_body = $node->filter('td')->each(function(Crawler $column,$i){
                return $column->text();
            });
            if(count($col_headers) == 2)
            {
                $country = preg_replace('/\[.*?\]/','',$col_headers[1]);
                if(isset($this->wikipedia_jh_map[$country]))
                {
                    return [
                    'country' => $this->wikipedia_jh_map[$country],
                    'confirmed' => str_replace(',','',$col_body[0]),
                    'deaths' => str_replace(',','',$col_body[1]),
                    'recovered' => str_replace(',','',$col_body[2]),
                    ];
                }
            }
        });





        foreach($source AS $index=>$row)
        {
            if($row != null)
            {
                $data[] = $row;
            }
        }

        return $data;
    }

    public function harvest_annotations()
    {
        // Annotations
        // https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1Pov2AbAscAXUNphDrjd3ZmzlbuvMy_Pd195bXlylwgdDnu1OQ0CBKXfMeDAHBZWbtLL9t5McfIcD/pubhtml
        $url = 'https://spreadsheets.google.com/feeds/list/1XfndFdJ0VSJnLqY83s8ITmuRVgsUSWPhCm-Fvd_rNb4/oejzle4/public/values?alt=json';
        $file= file_get_contents($url);

        $json = json_decode($file,true);
        $rows = $json['feed']['entry'];
        $data = [];
        foreach($rows AS $row)
        {
            if($row['gsx$publish']['$t'] == 'Y')
            {
                $data[$row['gsx$country']['$t']][] = [
                    'country' => $row['gsx$country']['$t'],
                    'state' => $row['gsx$state']['$t'],
                    'date' => $row['gsx$date']['$t'],
                    'notes' => $row['gsx$notes']['$t'],
                    'url' => $row['gsx$url']['$t'],
                ];
            }
        }
        file_put_contents(STATS . 'annotations.json',json_encode($data));
        return response('Done harvesting data')->setStatusCode(Response::HTTP_OK);
    }

    protected function apply_overrides($countries,$data,$date,$source)
    {
        foreach($data AS $row)
        {
//            0 => array:4 [▼
//                "country" => "United States"
//                "confirmed" => "1064353"
//                "deaths" => "61504"
//                "recovered" => "126325"
//            ]
            if($source == 'wikipedia')
            {
                if(!isset($this->wikipedia_jh_map[$row['country']]))
                    continue;
                $row['country'] = $this->wikipedia_jh_map[$row['country']];
            }
            else if($source == 'worldometers')
            {
                if(!isset($this->worldometer_jh_map[$row['country']]))
                    continue;
                $row['country'] = $this->worldometer_jh_map[$row['country']];
            }

            if(array_key_exists($row['country'],$countries))
            {
                $states = State::where('country_id',$countries[$row['country']])->get()->all();
                if(count($states) > 1)
                {
                    $state = null;
                    foreach($states AS $index => $item)
                    {
                        if($item->name == '(Unspecified)')
                        {
                            $state = $item;
                            break;
                        }
                    }

                    if($state)
                    {
                        $total_states = DB::table('cases')
                            ->selectRaw('sum(cases.confirmed) as confirmed, sum(cases.deaths) as deaths, sum(cases.recovered) as recovered')
                            ->join('states','states.id','cases.state_id')
                            ->join('countries','countries.id','states.country_id')
                            ->where('date','=',$date)
                            ->where('countries.id','=',$state->country_id)
                            ->get()->first();

                        // If this is a multiple-state country, we need to take them into account and subtract them from the (Unspecified) number
                        $current_states = DB::table('cases')
                            ->selectRaw('sum(cases.confirmed) as confirmed, sum(cases.deaths) as deaths, sum(cases.recovered) as recovered')
                            ->join('states','states.id','cases.state_id')
                            ->join('countries','countries.id','states.country_id')
                            ->where('date','=',$date)
                            ->where('countries.id','=',$state->country_id)
                            ->where('states.name','!=','(Unspecified)')
                            ->get()->first();

                        if(isset($current_states->confirmed))
                        {

                            // There's an existing record so we only adjust the (Unspecified) state for this country
                            $input = [];
                            if(strlen($row['confirmed'])>0 && $total_states->confirmed < $row['confirmed'])
                            {
                                $input['confirmed'] = intval($row['confirmed']) - $current_states->confirmed;
                                $input['confirmed_source'] = $source;
                            }
                            if(strlen($row['deaths'])>0 && $total_states->deaths < $row['deaths'])
                            {
                                $input['deaths'] = intval($row['deaths']) - $current_states->deaths;
                                $input['deaths_source'] = $source;
                            }
                            if(strlen($row['recovered'])>0 && intval($row['recovered']) > 0 && $total_states->recovered < $row['recovered'])
                            {
                                $input['recovered'] = intval($row['recovered']) - $current_states->recovered;
                                $input['recovered_source'] = $source;
                            }
                            DB::table('cases')->updateOrInsert(
                                [
                                    'state_id' => $state->id,
                                    'date' => $date,
                                ],
                                $input
                            );
                        }
                        else
                        {
                            // Create a new record because this is empty
                            $input = [];
                            if(strlen($row['confirmed'])>0)
                            {
                                $input['confirmed'] = intval($row['confirmed']);
                                $input['confirmed_source'] = $source;
                            }
                            if(strlen($row['deaths'])>0)
                            {
                                $input['deaths'] = intval($row['deaths']);
                                $input['deaths_source'] = $source;
                            }
                            if(strlen($row['recovered'])>0)
                            {
                                $input['recovered'] = intval($row['recovered']);
                                $input['recovered_source'] = $source;
                            }
                            DB::table('cases')->updateOrInsert(
                                [
                                    'state_id' => $state->id,
                                    'date' => $date,
                                ],
                                $input
                            );
                        }
                    }
                }
                else if(count($states) == 1)
                {
                    // If this is a single-state country, we just insert or update the (Unspecified) record
                    $state = $states[0];
                    $input = [];
                    if(strlen($row['confirmed'])>0)
                    {
                        $input['confirmed'] = intval($row['confirmed']);
                        $input['confirmed_source'] = $source;
                    }
                    if(strlen($row['deaths'])>0)
                    {
                        $input['deaths'] = intval($row['deaths']);
                        $input['deaths_source'] = $source;
                    }
                    if(strlen($row['recovered'])>0)
                    {
                        $input['recovered'] = intval($row['recovered']);
                        $input['recovered_source'] = $source;
                    }

                    $case = Cases::where('state_id',$state->id)
                        ->where('date',$date)
                        ->get()->first();
                    if(isset($case->confirmed) && $case->confirmed > 0)
                    {
                        if(!isset($input['confirmed']) || $case->confirmed >= $input['confirmed'])
                        {
                            unset($input['confirmed']);
                            unset($input['confirmed_source']);
                        }
                        if(!isset($input['deaths']) || $case->deaths > $input['deaths'])
                        {
                            unset($input['deaths']);
                            unset($input['deaths_source']);
                        }
                        if(!isset($input['recovered']) || $case->recovered > $input['recovered'])
                        {
                            unset($input['recovered']);
                            unset($input['recovered_source']);
                        }
                        DB::table('cases')->updateOrInsert(
                            [
                                'state_id' => $state->id,
                                'date' => $date,
                            ],
                            $input
                        );
                    }
                    else
                    {
                        if(!isset($input['confirmed']))
                        {
                            unset($input['confirmed']);
                            unset($input['confirmed_source']);
                        }
                        if(!isset($input['deaths']))
                        {
                            unset($input['deaths']);
                            unset($input['deaths_source']);
                        }
                        if(!isset($input['recovered']))
                        {
                            unset($input['recovered']);
                            unset($input['recovered_source']);
                        }
                        if(count($input)>0)
                        {
                            DB::table('cases')->updateOrInsert(
                                [
                                    'state_id' => $state->id,
                                    'date' => $date,
                                ],
                                $input
                            );
                        }
                    }
                }
            }
        }
        return true;
    }

    public function data_overrides()
    {
        $result = Country::all();
        $countries = [];
        foreach($result AS $row)
        {
            $countries[$row->name] = $row->id;
        }

        $result = State::all();
        $states = [];
        foreach($result AS $row)
        {
            $states[$row->name] = $row->id;
        }

        $date = date('Y-m-d');

        $yesterday = new \DateTime($date);
        $yesterday = $yesterday->sub(new \DateInterval('P1D'));

        $records = [];
        $yesterday_cases = DB::table('cases')
            ->where('cases.date','=',$yesterday->format('Y-m-d'))
            ->get();
        foreach($yesterday_cases AS $row)
        {
            $records['yesterday'][$row->state_id] = $row;
        }
        $today_cases = DB::table('cases')
            ->where('cases.date','=',$date)
            ->get();

        foreach($today_cases AS $row)
        {
            $records['today'][$row->state_id] = clone $row;
        }

        foreach($records['yesterday'] AS $state_id => $row)
        {
            if(!isset($records['today'][$state_id]))
            {
                // Create new records for today based on yesterday's data
                DB::table('cases')->insert(
                    [
                        'date' => $date,
                        'state_id' => $state_id,
                        'confirmed' => $row->confirmed,
                        'deaths' => $row->deaths,
                        'recovered' => $row->recovered,
                        'confirmed_source' => $row->confirmed_source,
                        'deaths_source' => $row->deaths_source,
                        'recovered_source' => $row->recovered_source,
                    ]
                );
            }
        }

        // Do worldometers
        $data = $this->harvest_worldometer();
        $this->apply_overrides($countries,$data,$date,'worldometers');

        // Do wikipedia
        $data = $this->harvest_wikipedia();
        $this->apply_overrides($countries,$data,$date,'wikipedia');


        // Do manual override
        $data = $this->manual_override();
//        $data = [];
        foreach($data AS $country_name => $rows)
        {
            foreach($rows AS $date => $states)
            {
                foreach($states AS $state_name => $row)
                {
                    $state = DB::table('states')
                        ->where('country_id','=',$countries[$country_name])
                        ->where('name','=',$state_name)
                        ->get()
                        ->first();
                    if($state)
                    {
                        $update = [];

                        // If unspecified, this means we are updating the country's stats, so we subtract from existing states
                        if($state_name == '(Unspecified)')
                        {
                            $total = DB::table('cases')
                                ->selectRaw('sum(confirmed) AS confirmed, sum(deaths) AS deaths, sum(recovered) AS recovered')
                                ->join('states','states.id','cases.state_id')
                                ->join('countries','countries.id','states.country_id')
                                ->where('cases.state_id','!=',$state->id)
                                ->where('countries.id','=',$countries[$country_name])
                                ->where('date','=',$date)
                                ->get()->first();
                            if($total)
                            {
                                if(isset($row['confirmed']) && strlen($row['confirmed']) > 0)
                                {
                                    $update['confirmed'] = intval($row['confirmed']) - $total->confirmed;
                                    $update['confirmed_source'] = 'manual';
                                }
                                if(isset($row['deaths']) && strlen($row['deaths']) > 0)
                                {
                                    $update['deaths'] = intval($row['deaths']) - $total->deaths;
                                    $update['deaths_source'] = 'manual';
                                }
                                if(isset($row['recovered']) && strlen($row['recovered']) > 0)
                                {
                                    $update['recovered'] = intval($row['recovered']) - $total->recovered;
                                    $update['recovered_source'] = 'manual';
                                }
                            }
                            else
                            {
                                if(isset($row['confirmed']) && strlen($row['confirmed']) > 0)
                                {
                                    $update['confirmed'] = intval($row['confirmed']);
                                    $update['confirmed_source'] = 'manual';
                                }
                                if(isset($row['deaths']) && strlen($row['deaths']) > 0)
                                {
                                    $update['deaths'] = intval($row['deaths']);
                                    $update['deaths_source'] = 'manual';
                                }
                                if(isset($row['recovered']) && strlen($row['recovered']) > 0)
                                {
                                    $update['recovered'] = intval($row['recovered']);
                                    $update['recovered_source'] = 'manual';
                                }
                            }
                        }
                        else
                        {
                            if(isset($row['confirmed']) && strlen($row['confirmed']) > 0)
                            {
                                $update['confirmed'] = intval($row['confirmed']);
                                $update['confirmed_source'] = 'manual';
                            }
                            if(isset($row['deaths']) && strlen($row['deaths']) > 0)
                            {
                                $update['deaths'] = intval($row['deaths']);
                                $update['deaths_source'] = 'manual';
                            }
                            if(isset($row['recovered']) && strlen($row['recovered']) > 0)
                            {
                                $update['recovered'] = intval($row['recovered']);
                                $update['recovered_source'] = 'manual';
                            }
                        }

                        if(count($update)>0)
                        {
                            DB::table('cases')
                                ->where('date','=',$date)
                                ->where('state_id','=',$state->id)
                                ->update($update);
                        }
                    }
                }
            }
        }
        return response('Done overriding data')->setStatusCode(Response::HTTP_OK);
    }

    protected function manual_override()
    {
//        https://docs.google.com/spreadsheets/d/e/2PACX-1vThKLEaifDmgMxx4C1IgjXyRkJFIdr8rM5skPGo3frgrr775w1KWMlmor2a-0yIhuTfdqzwdMm50WX4/pubhtml
        $url = 'https://spreadsheets.google.com/feeds/list/14fyCtf-iXm6uSupPCiRvzIF--2KA6W7k8Mr9G0SiKb0/2/public/values?alt=json';
        $file= file_get_contents($url);


        $json = json_decode($file,true);
        $rows = $json['feed']['entry'];
        $sheets = [];
        foreach($rows AS $row)
        {
            $sheets[$row['gsx$country']['$t']] = [
                'id' => $row['gsx$sheetid']['$t'],
                'country' => $row['gsx$country']['$t'],
            ];
        }

        $data = [];
        foreach($sheets AS $country=>$sheet)
        {
            // Grab the list of state columns
            $url = 'https://spreadsheets.google.com/feeds/cells/14fyCtf-iXm6uSupPCiRvzIF--2KA6W7k8Mr9G0SiKb0/' . $sheet['id'] . '/public/full?alt=json';
            $file= file_get_contents($url);

            $json = json_decode($file,true);
            $rows = $json['feed']['entry'];
            $data[$country] = [];

            $states = [];
            foreach($rows AS $row)
            {
                if ($row['gs$cell']['row'] == 1)
                {
                    $states[] = $row['gs$cell']['inputValue'];
                }
                else
                {
                    break;
                }
            }

            // Grab contents
            $url = 'https://spreadsheets.google.com/feeds/list/14fyCtf-iXm6uSupPCiRvzIF--2KA6W7k8Mr9G0SiKb0/' . $sheet['id'] . '/public/full?alt=json';
            $file= file_get_contents($url);

            $json = json_decode($file,true);
            $result = $json['feed']['entry'];
            $data[$country] = [];

            $rows = [];
            foreach($result AS $row)
            {
                if(strlen($row['content']['$t'])>0)
                {
                    $rows[] = $row;
                }
            }

            // Create a map of the content columns
            $columns = [];
            $header = array_shift($rows);
            $x = 0;
            foreach($header AS $key => $value)
            {
                if(substr($key,0,3) == 'gsx')
                {
                    if($x>0)
                    {
                        $state = $states[floor(($x-1) / 3)];
                    }

                    if($x == 0)
                    {
                        $columns['date'] = $key;
                    }
                    else if($x % 3 == 1)
                    {
                        $columns[$state]['confirmed'] = $key;
                    }
                    else if($x % 3 == 2)
                    {
                        $columns[$state]['deaths'] = $key;
                    }
                    else if($x % 3 == 0)
                    {
                        $columns[$state]['recovered'] = $key;
                    }
                    $x++;
                }
            }

            foreach($rows AS $row)
            {
                $date = $row[$columns['date']]['$t'];

                foreach($states AS $state)
                {
                    if(
                        isset($row[$columns[$state]['confirmed']]['$t']) && strlen($row[$columns[$state]['confirmed']]['$t']) > 0
                        || isset($row[$columns[$state]['deaths']]['$t']) && strlen($row[$columns[$state]['deaths']]['$t']) > 0
                        || isset($row[$columns[$state]['recovered']]['$t']) && strlen($row[$columns[$state]['recovered']]['$t']) > 0
                    )
                    {
                        $data[$country][$date][$state] = [
                            'state' => $state,
                            'date' => $date,
                            'confirmed' => isset($row[$columns[$state]['confirmed']]['$t']) ? str_replace(',','',$row[$columns[$state]['confirmed']]['$t']) : '',
                            'deaths' => isset($row[$columns[$state]['deaths']]['$t']) ? str_replace(',','',$row[$columns[$state]['deaths']]['$t']) : '',
                            'recovered' => isset($row[$columns[$state]['recovered']]['$t']) ? str_replace(',','',$row[$columns[$state]['recovered']]['$t']) : '',
                        ];
                    }
                }

            }
        }
        return $data;
    }

    protected function harvest_oxford()
    {

        $filename = OXFORD_LATEST;
        $csv = array_map('str_getcsv', file($filename));
        $filename = str_replace(OXFORD_DATA,'',$filename);
        $filename = str_replace('.csv','',$filename);
//        $key[$file_id] = $filename;
        $header = array_shift($csv); # remove column header
        //dd($csv[0]);
//        [
//            0 => "CountryName"
//            1 => "CountryCode"
//            2 => "Date"
//            3 => "C1_School closing"
//            4 => "C1_Flag"
//            5 => "C1_Notes"
//            6 => "C2_Workplace closing"
//            7 => "C2_Flag"
//            8 => "C2_Notes"
//            9 => "C3_Cancel public events"
//            10 => "C3_Flag"
//            11 => "C3_Notes"
//            12 => "C4_Restrictions on gatherings"
//            13 => "C4_Flag"
//            14 => "C4_Notes"
//            15 => "C5_Close public transport"
//            16 => "C5_Flag"
//            17 => "C5_Notes"
//            18 => "C6_Stay at home requirements"
//            19 => "C6_Flag"
//            20 => "C6_Notes"
//            21 => "C7_Restrictions on internal movement"
//            22 => "C7_Flag"
//            23 => "C7_Notes"
//            24 => "C8_International travel controls"
//            25 => "C8_Notes"
//            26 => "E1_Income support"
//            27 => "E1_Flag"
//            28 => "E1_Notes"
//            29 => "E2_Debt/contract relief"
//            30 => "E2_Notes"
//            31 => "E3_Fiscal measures"
//            32 => "E3_Notes"
//            33 => "E4_International support"
//            34 => "E4_Notes"
//            35 => "H1_Public information campaigns"
//            36 => "H1_Flag"
//            37 => "H1_Notes"
//            38 => "H2_Testing policy"
//            39 => "H2_Notes"
//            40 => "H3_Contact tracing"
//            41 => "H3_Notes"
//            42 => "H4_Emergency investment in healthcare"
//            43 => "H4_Notes"
//            44 => "H5_Investment in vaccines"
//            45 => "H5_Notes"
//            46 => "M1_Wildcard"
//            47 => "M1_Notes"
//            48 => "ConfirmedCases"
//            49 => "ConfirmedDeaths"
//            50 => "StringencyIndex"
//            51 => "StringencyIndexForDisplay"
//            52 => "LegacyStringencyIndex"
//            53 => "LegacyStringencyIndexForDisplay"
//        ]

        $key = [
            'C1' => [
                'name' => 'School closing',
                'description' => 'Record closing of schools and universitiies',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend closing',
                    'Require closing (only some levels or categories)',
                    'Require closing all levels',
                ],
                'hasTarget' => true
            ],
            'C2' => [
                'name' => 'Workplace closing',
                'description' => 'Record closing of workplaces',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend closing (or work from home)',
                    'Require closing (or work from home) for some sectors or categories of workers',
                    'Require closing (or work from home) all but essential workplaces'
                ],
                'hasTarget' => true
            ],
            'C3' => [
                'name' => 'Cancel public events',
                'description' => 'Record cancelling public events',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend cancelling',
                    'Require cancelling',
                ],
                'hasTarget' => true
            ],
            'C4' => [
                'name' => 'Restrictions on gatherings',
                'description' => 'Record the cut-off size for bans on private gatherings',
                'type' => 'lookup',
                'values' => [
                    'No restrictions',
                    'Restrictions on very large gatherings (over 1000 people)',
                    'Restrictions on gatherings between 100-1000 people',
                    'Restrictions on gatherings between 10-100 people',
                    'Restrictions on gatherings of less than 10 people',
                ],
                'hasTarget' => true
            ],
            'C5' => [
                'name' => 'Close public transport',
                'description' => 'Record closing of public transport',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend closing (or significantly reduce volume/route/means of transport available)',
                    'Require closing (or prohibit most citizens from using it)',
                ],
                'hasTarget' => true
            ],
            'C6' => [
                'name' => 'Stay at home',
                'description' => 'Record orders to "shelter-in-place" and otherwise confine to home',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend not leaving house',
                    'Require not leaving house with exceptions for daily exercise, grocery shopping, and "essential trips"',
                    'Require not leaving house with minimal exceptions (e.g. allowing to leave only once every few days, or only one person can leave at a time, etc.)'
                ],
                'hasTarget' => true
            ],
            'C7' => [
                'name' => 'Restrictions on internal movement',
                'description' => 'Record restrictions on internal movement',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend closing (or significantly reduce volume/route/means of transport available)',
                    'Require closing (or prohibit most citizens from using it)',
                ],
                'hasTarget' => true
            ],
            'C8' => [
                'name' => 'International travel controls',
                'description' => 'Record restrictions on international travel',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Screening',
                    'Quarantine on high-risk regions',
                    'Ban on high-risk regions',
                    'Total border closure',
                ],
                'hasTarget' => false
            ],
            'E1' => [
                'name' => 'Income support',
                'description' => 'Is the government covering the salaries or providing direct cash payments, universal basic income, or similar, of people who lose their jobs or cannot work. (Includes payments to firms if explicitly linked to payroll/salaries)',
                'type' => 'lookup',
                'values' => [
                    'No income support',
                    'Government is replacing less than 50% of lost salary (or if a flat sum, it is less than 50% median salary)',
                    'Government is replacing more than 50% of lost salary (or if a flat sum, it is greater than 50% median salary)',
                ],
                'hasTarget' => true,
                'targets' => [
                    'Formal sector workers only',
                    'Transfers to informal sector workers too',
                ]
            ],
            'E2' => [
                'name' => 'Debt / contract relief for households',
                'description' => 'Record if government is freezing financial obligations (e.g. stopping loan repayments, preventing services like water from stopping, or banning evictions)',
                'type' => 'lookup',
                'values' => [
                    'No',
                    'Narrow relief, specific to one kind of contract',
                    'Broad debt/contract relief',
                ],
                'hasTarget' => false,
            ],
            'E3' => [
                'name' => 'Fiscal measures',
                'description' => 'Record monetary value of USD of fiscal stimuli, including spending or tax cuts NOT included in H4',
                'type' => 'custom',
                'values' => ['Value of fiscal stimuli, including spending or tax cuts'],
                'hasTarget' => false
            ],
            'E4' => [
                'name' => 'Providing support to other countries',
                'description' => 'Announced offers of COVID-19 related aid spending to other countries',
                'type' => 'custom',
                'values' => ['Monetary value announced if additional to previously announced spending'],
                'hasTarget' => false
            ],

            'H1' => [
                'name' => 'Public info campaigns',
                'description' => 'Record presence of public info campaigns',
                'type' => 'lookup',
                'values' => [
                    'No COVID-19 public information campaign',
                    'Public officials urging caution about COVID-19',
                    'Coordinated public information campaign (e.g. across traditional and social media)'
                ],
                'hasTarget' => true
            ],
            'H2' => [
                'name' => 'Testing policy',
                'description' => 'Who can get tested?',
                'type' => 'lookup',
                'values' => [
                    'No testing policy',
                    'Only testing those who both (a) have symptoms, and (b) meet specific criteria (e.g. key workers, admitted to hospital, came into contact with a known case, returned from overseas)',
                    'Testing of anyone showing, COVID-19 symptoms',
                    'Open public testing (e.g. "drive through" testing available to asymptomatic people)',
                ],
                'hasTarget' => false
            ],
            'H3' => [
                'name' => 'Contact tracing',
                'description' => 'Are governments doing contact tracing?',
                'type' => 'lookup',
                'values' => [
                    'No contact tracing',
                    'Limited contact tracing - not done for all cases',
                    'Comprehensive contact tracing - done for all cases',
                ],
                'hasTarget' => false
            ],
            'H4' => [

                'name' => 'Emergency investment in health care',
                'description' => 'Short-term spending on, e.g. hospitals, masks, etc',
                'type' => 'custom',
                'values' => ['Record value in USD of new short-term spending on health'],
                'hasTarget' => false
            ],
            'H5' => [
                'name' => 'Investment in vaccines',
                'description' => 'Announced public spending on vaccine development',
                'type' => 'custom',
                'values' => ['Record monetary value announced if additional to previously announced spending'],
                'hasTarget' => false
            ],



            'M1' => [
                'name' => 'Miscellaneous wild card',
                'description' => 'Record policy announcements that do not fit anywhere else',
                'type' => 'custom',
                'values' => ['Unusual or interesting interventions worth flagging.'],
                'hasTarget' => false
            ],




        ];


        $daily = [];
        $latest = [];
        foreach($csv AS $row)
        {
            if(isset($this->oxford_jh_map[$row[0]]))
            {
                $country = $this->oxford_jh_map[$row[0]];
                if(!isset($previous_country))
                {
                    $previous_country = $country;
                }
                $date = date('Y-m-d',strtotime($row[2]));
                if(!isset($previous_date))
                {
                    $previous_date = $date;
                }

                // Daily
                // data:  [country] [date] [stringencyindex]                             = value
                // data:  [country] [date] ['policies']      [policynumber] [policyname] = value

                // Latest
                // data: [country] [stringencyindex / policies]

//                if($country == 'Australia')
//                    dump($row);


                if(strlen($row[3]) > 0)
                {
                    $daily[$country][$date]['policies']['C1'] = [
                        'v' => $row[3],
                        't' => $row[4],
                        'n' => $row[5],
                    ];

                    if(isset($latest[$country]['policies']['C1']))
                    {
                        if(
                            $latest[$country]['policies']['C1']['v'] != $daily[$country][$date]['policies']['C1']['v']
                            || $latest[$country]['policies']['C1']['t'] != $daily[$country][$date]['policies']['C1']['t']
                        )
                        {
                            $latest[$country]['policies']['C1'] = [
                                'v' => $daily[$country][$date]['policies']['C1']['v'],
                                't' => $daily[$country][$date]['policies']['C1']['t'],
                                'n' => $daily[$country][$date]['policies']['C1']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['C1'] = [
                                'v' => $daily[$country][$date]['policies']['C1']['v'],
                                't' => $daily[$country][$date]['policies']['C1']['t'],
                                'n' => $daily[$country][$date]['policies']['C1']['n'],
                                's' => $latest[$country]['policies']['C1']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['C1'] = [
                            'v' => $daily[$country][$date]['policies']['C1']['v'],
                            't' => $daily[$country][$date]['policies']['C1']['t'],
                            'n' => $daily[$country][$date]['policies']['C1']['n'],
                            's' => $date,
                        ];
                    }

                }

                if(strlen($row[6]) > 0)
                {
                    $daily[$country][$date]['policies']['C2'] = [
                            'v' => $row[6],
                            't' => $row[7],
                            'n' => $row[8],
                    ];

                    if(isset($latest[$country]['policies']['C2']))
                    {
                        if(
                            $latest[$country]['policies']['C2']['v'] != $daily[$country][$date]['policies']['C2']['v']
                            || $latest[$country]['policies']['C2']['t'] != $daily[$country][$date]['policies']['C2']['t']
                        )
                        {
                            $latest[$country]['policies']['C2'] = [
                                'v' => $daily[$country][$date]['policies']['C2']['v'],
                                't' => $daily[$country][$date]['policies']['C2']['t'],
                                'n' => $daily[$country][$date]['policies']['C2']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['C2'] = [
                                'v' => $daily[$country][$date]['policies']['C2']['v'],
                                't' => $daily[$country][$date]['policies']['C2']['t'],
                                'n' => $daily[$country][$date]['policies']['C2']['n'],
                                's' => $latest[$country]['policies']['C2']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['C2'] = [
                            'v' => $daily[$country][$date]['policies']['C2']['v'],
                            't' => $daily[$country][$date]['policies']['C2']['t'],
                            'n' => $daily[$country][$date]['policies']['C2']['n'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[9]) > 0)
                {
                    $daily[$country][$date]['policies']['C3'] = [
                            'v' => $row[9],
                            't' => $row[10],
                            'n' => $row[11],
                    ];

                    if(isset($latest[$country]['policies']['C3']))
                    {
                        if(
                            $latest[$country]['policies']['C3']['v'] != $daily[$country][$date]['policies']['C3']['v']
                            || $latest[$country]['policies']['C3']['t'] != $daily[$country][$date]['policies']['C3']['t']
                        )
                        {
                            $latest[$country]['policies']['C3'] = [
                                'v' => $daily[$country][$date]['policies']['C3']['v'],
                                't' => $daily[$country][$date]['policies']['C3']['t'],
                                'n' => $daily[$country][$date]['policies']['C3']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['C3'] = [
                                'v' => $daily[$country][$date]['policies']['C3']['v'],
                                't' => $daily[$country][$date]['policies']['C3']['t'],
                                'n' => $daily[$country][$date]['policies']['C3']['n'],
                                's' => $latest[$country]['policies']['C3']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['C3'] = [
                            'v' => $daily[$country][$date]['policies']['C3']['v'],
                            't' => $daily[$country][$date]['policies']['C3']['t'],
                            'n' => $daily[$country][$date]['policies']['C3']['n'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[12]) > 0)
                {
                    $daily[$country][$date]['policies']['C4'] = [
                            'v' => $row[12],
                            't' => $row[13],
                            'n' => $row[14],
                    ];

                    if(isset($latest[$country]['policies']['C4']))
                    {
                        if(
                            $latest[$country]['policies']['C4']['v'] != $daily[$country][$date]['policies']['C4']['v']
                            || $latest[$country]['policies']['C4']['t'] != $daily[$country][$date]['policies']['C4']['t']
                        )
                        {
                            $latest[$country]['policies']['C4'] = [
                                'v' => $daily[$country][$date]['policies']['C4']['v'],
                                't' => $daily[$country][$date]['policies']['C4']['t'],
                                'n' => $daily[$country][$date]['policies']['C4']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['C4'] = [
                                'v' => $daily[$country][$date]['policies']['C4']['v'],
                                't' => $daily[$country][$date]['policies']['C4']['t'],
                                'n' => $daily[$country][$date]['policies']['C4']['n'],
                                's' => $latest[$country]['policies']['C4']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['C4'] = [
                            'v' => $daily[$country][$date]['policies']['C4']['v'],
                            't' => $daily[$country][$date]['policies']['C4']['t'],
                            'n' => $daily[$country][$date]['policies']['C4']['n'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[15]) > 0)
                {
                    $daily[$country][$date]['policies']['C5'] = [
                            'v' => $row[15],
                            't' => $row[16],
                            'n' => $row[17],
                    ];


                    if(isset($latest[$country]['policies']['C5']))
                    {
                        if(
                            $latest[$country]['policies']['C5']['v'] != $daily[$country][$date]['policies']['C5']['v']
                            || $latest[$country]['policies']['C5']['t'] != $daily[$country][$date]['policies']['C5']['t']
                        )
                        {
                            $latest[$country]['policies']['C5'] = [
                                'v' => $daily[$country][$date]['policies']['C5']['v'],
                                't' => $daily[$country][$date]['policies']['C5']['t'],
                                'n' => $daily[$country][$date]['policies']['C5']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['C5'] = [
                                'v' => $daily[$country][$date]['policies']['C5']['v'],
                                't' => $daily[$country][$date]['policies']['C5']['t'],
                                'n' => $daily[$country][$date]['policies']['C5']['n'],
                                's' => $latest[$country]['policies']['C5']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['C5'] = [
                            'v' => $daily[$country][$date]['policies']['C5']['v'],
                            't' => $daily[$country][$date]['policies']['C5']['t'],
                            'n' => $daily[$country][$date]['policies']['C5']['n'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[18]) > 0)
                {
                    $daily[$country][$date]['policies']['C6'] = [
                            'v' => $row[18],
                            't' => $row[19],
                            'n' => $row[20],
                    ];

                    if(isset($latest[$country]['policies']['C6']))
                    {
                        if(
                            $latest[$country]['policies']['C6']['v'] != $daily[$country][$date]['policies']['C6']['v']
                            || $latest[$country]['policies']['C6']['t'] != $daily[$country][$date]['policies']['C6']['t']
                        )
                        {
                            $latest[$country]['policies']['C6'] = [
                                'v' => $daily[$country][$date]['policies']['C6']['v'],
                                't' => $daily[$country][$date]['policies']['C6']['t'],
                                'n' => $daily[$country][$date]['policies']['C6']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['C6'] = [
                                'v' => $daily[$country][$date]['policies']['C6']['v'],
                                't' => $daily[$country][$date]['policies']['C6']['t'],
                                'n' => $daily[$country][$date]['policies']['C6']['n'],
                                's' => $latest[$country]['policies']['C6']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['C6'] = [
                            'v' => $daily[$country][$date]['policies']['C6']['v'],
                            't' => $daily[$country][$date]['policies']['C6']['t'],
                            'n' => $daily[$country][$date]['policies']['C6']['n'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[21]) > 0)
                {
                    $daily[$country][$date]['policies']['C7'] = [
                            'v' => $row[21],
                            't' => $row[22],
                            'n' => $row[23],
                    ];

                    if(isset($latest[$country]['policies']['C7']))
                    {
                        if(
                            $latest[$country]['policies']['C7']['v'] != $daily[$country][$date]['policies']['C7']['v']
                            || $latest[$country]['policies']['C7']['t'] != $daily[$country][$date]['policies']['C7']['t']
                        )
                        {
                            $latest[$country]['policies']['C7'] = [
                                'v' => $daily[$country][$date]['policies']['C7']['v'],
                                't' => $daily[$country][$date]['policies']['C7']['t'],
                                'n' => $daily[$country][$date]['policies']['C7']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['C7'] = [
                                'v' => $daily[$country][$date]['policies']['C7']['v'],
                                't' => $daily[$country][$date]['policies']['C7']['t'],
                                'n' => $daily[$country][$date]['policies']['C7']['n'],
                                's' => $latest[$country]['policies']['C7']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['C7'] = [
                            'v' => $daily[$country][$date]['policies']['C7']['v'],
                            't' => $daily[$country][$date]['policies']['C7']['t'],
                            'n' => $daily[$country][$date]['policies']['C7']['n'],
                            's' => $date,
                        ];
                    }
                }

                if($row[24] > 0)
                {
                    $daily[$country][$date]['policies']['C8'] = [
                            'v' => $row[24],
                            't' => '',
                            'n' => $row[25],
                    ];

                    if(isset($latest[$country]['policies']['C8']))
                    {
                        if(
                            $latest[$country]['policies']['C8']['v'] != $daily[$country][$date]['policies']['C8']['v']
                            || $latest[$country]['policies']['C8']['t'] != $daily[$country][$date]['policies']['C8']['t']
                        )
                        {
                            $latest[$country]['policies']['C8'] = [
                                'v' => $daily[$country][$date]['policies']['C8']['v'],
                                't' => $daily[$country][$date]['policies']['C8']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['C8'] = [
                                'v' => $daily[$country][$date]['policies']['C8']['v'],
                                't' => $daily[$country][$date]['policies']['C8']['t'],
                                's' => $latest[$country]['policies']['C8']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['C8'] = [
                            'v' => $daily[$country][$date]['policies']['C8']['v'],
                            't' => $daily[$country][$date]['policies']['C8']['t'],
                            's' => $date,
                        ];
                    }
                }

                if($row[26] > 0)
                {
                    $daily[$country][$date]['policies']['E1'] = [
                            'v' => $row[26],
                            't' => $row[27],
                            'n' => $row[28],
                    ];

                    if(isset($latest[$country]['policies']['E1']))
                    {
                        if(
                            $latest[$country]['policies']['E1']['v'] != $daily[$country][$date]['policies']['E1']['v']
                            || $latest[$country]['policies']['E1']['t'] != $daily[$country][$date]['policies']['E1']['t']
                        )
                        {
                            $latest[$country]['policies']['E1'] = [
                                'v' => $daily[$country][$date]['policies']['E1']['v'],
                                't' => $daily[$country][$date]['policies']['E1']['t'],
                                'n' => $daily[$country][$date]['policies']['E1']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['E1'] = [
                                'v' => $daily[$country][$date]['policies']['E1']['v'],
                                't' => $daily[$country][$date]['policies']['E1']['t'],
                                'n' => $daily[$country][$date]['policies']['E1']['n'],
                                's' => $latest[$country]['policies']['E1']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['E1'] = [
                            'v' => $daily[$country][$date]['policies']['E1']['v'],
                            't' => $daily[$country][$date]['policies']['E1']['t'],
                            'n' => $daily[$country][$date]['policies']['E1']['n'],
                            's' => $date,
                        ];
                    }
                }

                if($row[29] > 0)
                {
                    $daily[$country][$date]['policies']['E2'] = [
                            'v' => $row[29],
                            't' => '',
                            'n' => $row[30],
                    ];

                    if(isset($latest[$country]['policies']['E2']))
                    {
                        if(
                            $latest[$country]['policies']['E2']['v'] != $daily[$country][$date]['policies']['E2']['v']
                            || $latest[$country]['policies']['E2']['t'] != $daily[$country][$date]['policies']['E2']['t']
                        )
                        {
                            $latest[$country]['policies']['E2'] = [
                                'v' => $daily[$country][$date]['policies']['E2']['v'],
                                't' => $daily[$country][$date]['policies']['E2']['t'],
                                'n' => $daily[$country][$date]['policies']['E2']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['E2'] = [
                                'v' => $daily[$country][$date]['policies']['E2']['v'],
                                't' => $daily[$country][$date]['policies']['E2']['t'],
                                'n' => $daily[$country][$date]['policies']['E2']['n'],
                                's' => $latest[$country]['policies']['E2']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['E2'] = [
                            'v' => $daily[$country][$date]['policies']['E2']['v'],
                            't' => $daily[$country][$date]['policies']['E2']['t'],
                            'n' => $daily[$country][$date]['policies']['E2']['n'],
                            's' => $date,
                        ];
                    }
                }

                if($row[31] > 0)
                {
                    $daily[$country][$date]['policies']['E3'] = [
                            'v' => $row[31],
                            't' => '',
                            'n' => $row[32],
                    ];

                    if(isset($latest[$country]['policies']['E3']))
                    {
                        if(
                            $latest[$country]['policies']['E3']['v'] != $daily[$country][$date]['policies']['E3']['v']
                            || $latest[$country]['policies']['E3']['t'] != $daily[$country][$date]['policies']['E3']['t']
                        )
                        {
                            $latest[$country]['policies']['E3'] = [
                                'v' => $daily[$country][$date]['policies']['E3']['v'],
                                't' => $daily[$country][$date]['policies']['E3']['t'],
                                'n' => $daily[$country][$date]['policies']['E3']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['E3'] = [
                                'v' => $daily[$country][$date]['policies']['E3']['v'],
                                't' => $daily[$country][$date]['policies']['E3']['t'],
                                'n' => $daily[$country][$date]['policies']['E3']['n'],
                                's' => $latest[$country]['policies']['E3']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['E3'] = [
                            'v' => $daily[$country][$date]['policies']['E3']['v'],
                            't' => $daily[$country][$date]['policies']['E3']['t'],
                            'n' => $daily[$country][$date]['policies']['E3']['n'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[33]) > 0)
                {
                    $daily[$country][$date]['policies']['E4'] = [
                            'v' => $row[33],
                            't' => '',
                            'n' => $row[34],
                    ];

                    if(isset($latest[$country]['policies']['E4']))
                    {
                        if(
                            $latest[$country]['policies']['E4']['v'] != $daily[$country][$date]['policies']['E4']['v']
                            || $latest[$country]['policies']['E4']['t'] != $daily[$country][$date]['policies']['E4']['t']
                        )
                        {
                            $latest[$country]['policies']['E4'] = [
                                'v' => $daily[$country][$date]['policies']['E4']['v'],
                                't' => $daily[$country][$date]['policies']['E4']['t'],
                                'n' => $daily[$country][$date]['policies']['E4']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['E4'] = [
                                'v' => $daily[$country][$date]['policies']['E4']['v'],
                                't' => $daily[$country][$date]['policies']['E4']['t'],
                                'n' => $daily[$country][$date]['policies']['E4']['n'],
                                's' => $latest[$country]['policies']['E4']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['E4'] = [
                            'v' => $daily[$country][$date]['policies']['E4']['v'],
                            't' => $daily[$country][$date]['policies']['E4']['t'],
                            'n' => $daily[$country][$date]['policies']['E4']['n'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[35]) > 0)
                {
                    $daily[$country][$date]['policies']['H1'] = [
                            'v' => $row[35],
                            't' => $row[36],
                            'n' => $row[37],
                    ];

                    if(isset($latest[$country]['policies']['H1']))
                    {
                        if(
                            $latest[$country]['policies']['H1']['v'] != $daily[$country][$date]['policies']['H1']['v']
                            || $latest[$country]['policies']['H1']['t'] != $daily[$country][$date]['policies']['H1']['t']
                        )
                        {
                            $latest[$country]['policies']['H1'] = [
                                'v' => $daily[$country][$date]['policies']['H1']['v'],
                                't' => $daily[$country][$date]['policies']['H1']['t'],
                                'n' => $daily[$country][$date]['policies']['H1']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['H1'] = [
                                'v' => $daily[$country][$date]['policies']['H1']['v'],
                                't' => $daily[$country][$date]['policies']['H1']['t'],
                                'n' => $daily[$country][$date]['policies']['H1']['n'],
                                's' => $latest[$country]['policies']['H1']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['H1'] = [
                            'v' => $daily[$country][$date]['policies']['H1']['v'],
                            't' => $daily[$country][$date]['policies']['H1']['t'],
                            'n' => $daily[$country][$date]['policies']['H1']['n'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[38]) > 0)
                {
                    $daily[$country][$date]['policies']['H2'] = [
                        'v' => $row[38],
                        't' => '',
                        'n' => $row[39],
                    ];

                    if(isset($latest[$country]['policies']['H2']))
                    {
                        if(
                            $latest[$country]['policies']['H2']['v'] != $daily[$country][$date]['policies']['H2']['v']
                            || $latest[$country]['policies']['H2']['t'] != $daily[$country][$date]['policies']['H2']['t']
                        )
                        {
                            $latest[$country]['policies']['H2'] = [
                                'v' => $daily[$country][$date]['policies']['H2']['v'],
                                't' => $daily[$country][$date]['policies']['H2']['t'],
                                'n' => $daily[$country][$date]['policies']['H2']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['H2'] = [
                                'v' => $daily[$country][$date]['policies']['H2']['v'],
                                't' => $daily[$country][$date]['policies']['H2']['t'],
                                'n' => $daily[$country][$date]['policies']['H2']['n'],
                                's' => $latest[$country]['policies']['H2']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['H2'] = [
                            'v' => $daily[$country][$date]['policies']['H2']['v'],
                            't' => $daily[$country][$date]['policies']['H2']['t'],
                            'n' => $daily[$country][$date]['policies']['H2']['n'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[40]) > 0)
                {
                    $daily[$country][$date]['policies']['H3'] = [
                        'v' => $row[40],
                        't' => '',
                        'n' => $row[41],
                    ];

                    if(isset($latest[$country]['policies']['H3']))
                    {
                        if(
                            $latest[$country]['policies']['H3']['v'] != $daily[$country][$date]['policies']['H3']['v']
                            || $latest[$country]['policies']['H3']['t'] != $daily[$country][$date]['policies']['H3']['t']
                        )
                        {
                            $latest[$country]['policies']['H3'] = [
                                'v' => $daily[$country][$date]['policies']['H3']['v'],
                                't' => $daily[$country][$date]['policies']['H3']['t'],
                                'n' => $daily[$country][$date]['policies']['H3']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['H3'] = [
                                'v' => $daily[$country][$date]['policies']['H3']['v'],
                                't' => $daily[$country][$date]['policies']['H3']['t'],
                                'n' => $daily[$country][$date]['policies']['H3']['n'],
                                's' => $latest[$country]['policies']['H3']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['H3'] = [
                            'v' => $daily[$country][$date]['policies']['H3']['v'],
                            't' => $daily[$country][$date]['policies']['H3']['t'],
                            'n' => $daily[$country][$date]['policies']['H3']['n'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[42]) > 0)
                {
                    $daily[$country][$date]['policies']['H4'] = [
                        'v' => $row[42],
                        't' => '',
                        'n' => $row[43],
                    ];

                    if(isset($latest[$country]['policies']['H4']))
                    {
                        if(
                            $latest[$country]['policies']['H4']['v'] != $daily[$country][$date]['policies']['H4']['v']
                            || $latest[$country]['policies']['H4']['t'] != $daily[$country][$date]['policies']['H4']['t']
                        )
                        {
                            $latest[$country]['policies']['H4'] = [
                                'v' => $daily[$country][$date]['policies']['H4']['v'],
                                't' => $daily[$country][$date]['policies']['H4']['t'],
                                'n' => $daily[$country][$date]['policies']['H4']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['H4'] = [
                                'v' => $daily[$country][$date]['policies']['H4']['v'],
                                't' => $daily[$country][$date]['policies']['H4']['t'],
                                'n' => $daily[$country][$date]['policies']['H4']['n'],
                                's' => $latest[$country]['policies']['H4']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['H4'] = [
                            'v' => $daily[$country][$date]['policies']['H4']['v'],
                            't' => $daily[$country][$date]['policies']['H4']['t'],
                            'n' => $daily[$country][$date]['policies']['H4']['n'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[44]) > 0)
                {
                    $daily[$country][$date]['policies']['H5'] = [
                        'v' => $row[44],
                        't' => '',
                        'n' => $row[45],
                    ];

                    if(isset($latest[$country]['policies']['H5']))
                    {
                        if(
                            $latest[$country]['policies']['H5']['v'] != $daily[$country][$date]['policies']['H5']['v']
                            || $latest[$country]['policies']['H5']['t'] != $daily[$country][$date]['policies']['H5']['t']
                        )
                        {
                            $latest[$country]['policies']['H5'] = [
                                'v' => $daily[$country][$date]['policies']['H5']['v'],
                                't' => $daily[$country][$date]['policies']['H5']['t'],
                                'n' => $daily[$country][$date]['policies']['H5']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['H5'] = [
                                'v' => $daily[$country][$date]['policies']['H5']['v'],
                                't' => $daily[$country][$date]['policies']['H5']['t'],
                                'n' => $daily[$country][$date]['policies']['H5']['n'],
                                's' => $latest[$country]['policies']['H5']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['H5'] = [
                            'v' => $daily[$country][$date]['policies']['H5']['v'],
                            't' => $daily[$country][$date]['policies']['H5']['t'],
                            'n' => $daily[$country][$date]['policies']['H5']['n'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[46]) > 0)
                {
                    $daily[$country][$date]['policies']['M1'] = [
                        'v' => $row[46],
                        't' => '',
                        'n' => $row[47],
                    ];

                    if(isset($latest[$country]['policies']['M1']))
                    {
                        if(
                            $latest[$country]['policies']['M1']['v'] != $daily[$country][$date]['policies']['M1']['v']
                            || $latest[$country]['policies']['M1']['t'] != $daily[$country][$date]['policies']['M1']['t']
                        )
                        {
                            $latest[$country]['policies']['M1'] = [
                                'v' => $daily[$country][$date]['policies']['M1']['v'],
                                't' => $daily[$country][$date]['policies']['M1']['t'],
                                'n' => $daily[$country][$date]['policies']['M1']['n'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['M1'] = [
                                'v' => $daily[$country][$date]['policies']['M1']['v'],
                                't' => $daily[$country][$date]['policies']['M1']['t'],
                                'n' => $daily[$country][$date]['policies']['M1']['n'],
                                's' => $latest[$country]['policies']['M1']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['M1'] = [
                            'v' => $daily[$country][$date]['policies']['M1']['v'],
                            't' => $daily[$country][$date]['policies']['M1']['t'],
                            'n' => $daily[$country][$date]['policies']['M1']['n'],
                            's' => $date,
                        ];
                    }
                }

                $daily[$country][$date]['si'] = $row[51];
                $latest[$country]['si'] = $row[51];
            }
        }

        $data = [
            'key' => $key,
            'daily' => $daily,
            'latest' => $latest,
        ];

        $data = [
            'key' => $key,
            'daily' => $daily,
            'latest' => $latest,
        ];

        file_put_contents(STATS . 'oxford.json',json_encode($data));

        return response('Done harvesting data')->setStatusCode(Response::HTTP_OK);
    }

    public function oxford()
    {

        $filename = STATS . 'oxford.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
    }

    public function transform()
    {
        $filename = STATS . 'master.json';
        $file = fopen($filename,'r');
        $master = json_decode(fread($file,filesize($filename)),true);

        $country_index = [];
        foreach($master AS $country => $country_row)
        {
            $data = $country_row;
            $country_index[] = $country;

            $previous = false;

            foreach($data['daily'] AS $date => $row)
            {
                foreach($row['states'] AS $state => $state_row)
                {
                    $data['daily'][$date]['states'][$state]['active'] = $state_row['c'] - $state_row['d'] - $state_row['r'];
                    if(isset($data['daily'][$previous]['states'][$state]))
                    {
                        $data['daily'][$date]['states'][$state]['deltac'] =
                            $state_row['c'] - $data['daily'][$previous]['states'][$state]['c'];
                        $data['daily'][$date]['states'][$state]['deltad'] =
                            $state_row['d'] - $data['daily'][$previous]['states'][$state]['d'];
                        $data['daily'][$date]['states'][$state]['deltar'] =
                            $state_row['r'] - $data['daily'][$previous]['states'][$state]['r'];
                        $data['daily'][$date]['states'][$state]['deltaa'] = $data['daily'][$date]['states'][$state]['active'] - $data['daily'][$previous]['states'][$state]['active'];
                    }
                    else
                    {
                        $data['daily'][$date]['states'][$state]['deltac'] = $state_row['c'];
                        $data['daily'][$date]['states'][$state]['deltad'] = $state_row['d'];
                        $data['daily'][$date]['states'][$state]['deltar'] = $state_row['r'];
                        $data['daily'][$date]['states'][$state]['deltaa'] = $data['daily'][$date]['states'][$state]['active'];
                    }
                }

                $previous = $date;
            }


            file_put_contents(STATS . 'countries/' . (count($country_index) - 1 ) . '.json',json_encode($data));
        }

        file_put_contents(STATS . 'country_index.json',json_encode($country_index));
        return response($country_index)->setStatusCode(Response::HTTP_OK);
    }

    public function generate_daily_ranking()
    {
//  This is probably more efficient, but I got the old code working so I'll abandon this for now
        
//        $dates = DB::table('cases')
//            ->select('date')
//            ->groupBy('date')
//            ->orderBy('date','desc')
//            ->limit(4)
//            ->get();
//
//        $date1 = $dates[0]->date;
//        $date2 = $dates[1]->date;
//        $date3 = $dates[2]->date;
//        $date4 = $dates[3]->date;
//
//
//        $today = [];
//
//        // Today - Confirmed surge
//        $result = DB::select('
//            SELECT
//                today.id, today.name, today.confirmed,
//                (yesterday.confirmed - two_days_ago.confirmed) AS confirmedDelta,
//                (yesterday.confirmed - two_days_ago.confirmed)/two_days_ago.confirmed AS confirmedDeltaPC
//            FROM
//                (SELECT co.id, co.name, SUM(ca.confirmed) AS confirmed
//                FROM cases ca
//                INNER JOIN states s
//                ON s.id = ca.state_id
//                INNER JOIN countries co
//                ON co.id = s.country_id
//                WHERE ca.date = "'.$date1.'"
//                AND co.name != "Global"
//                GROUP BY co.id, co.name) today
//            INNER JOIN
//                (SELECT co.id, co.name, SUM(ca.confirmed) AS confirmed
//                FROM cases ca
//                INNER JOIN states s
//                ON s.id = ca.state_id
//                INNER JOIN countries co
//                ON co.id = s.country_id
//                WHERE ca.date = "'.$date2.'"
//                AND co.name != "Global"
//                GROUP BY co.id, co.name) yesterday
//            ON today.id = yesterday.id
//            INNER JOIN
//                (SELECT co.id, co.name, SUM(ca.confirmed) AS confirmed
//                FROM cases ca
//                INNER JOIN states s
//                ON s.id = ca.state_id
//                INNER JOIN countries co
//                ON co.id = s.country_id
//                WHERE ca.date = "' . $date3 . '"
//                AND co.name != "Global"
//                GROUP BY co.id, co.name) two_days_ago
//            ON yesterday.id = two_days_ago.id
//            WHERE today.confirmed > 100
//            ORDER BY confirmedDeltaPC desc
//        ');
//
//        foreach($result AS $index=>$row)
//        {
//            $today['confirmedSurge'][$row->name] = [
//                'rank' => $index,
//                'id' => $row->id,
//                'name' => $row->name,
//                'confirmed' => $row->confirmed,
//                'confirmedDelta' => $row->confirmedDelta,
//                'confirmedDeltaPC' => $row->confirmedDeltaPC,
//            ];
//        }
//
//        // Today - Deaths surge
//        $result = DB::select('
//            SELECT
//                today.id, today.name, today.deaths,
//                (yesterday.deaths - two_days_ago.deaths) AS deathsDelta,
//                (yesterday.deaths - two_days_ago.deaths)/two_days_ago.deaths AS deathsDeltaPC
//            FROM
//                (SELECT co.id, co.name, SUM(ca.deaths) AS deaths
//                FROM cases ca
//                INNER JOIN states s
//                ON s.id = ca.state_id
//                INNER JOIN countries co
//                ON co.id = s.country_id
//                WHERE ca.date = "'.$date1.'"
//                AND co.name != "Global"
//                GROUP BY co.id, co.name) today
//            INNER JOIN
//                (SELECT co.id, co.name, SUM(ca.deaths) AS deaths
//                FROM cases ca
//                INNER JOIN states s
//                ON s.id = ca.state_id
//                INNER JOIN countries co
//                ON co.id = s.country_id
//                WHERE ca.date = "'.$date2.'"
//                AND co.name != "Global"
//                GROUP BY co.id, co.name) yesterday
//            ON today.id = yesterday.id
//            INNER JOIN
//                (SELECT co.id, co.name, SUM(ca.deaths) AS deaths
//                FROM cases ca
//                INNER JOIN states s
//                ON s.id = ca.state_id
//                INNER JOIN countries co
//                ON co.id = s.country_id
//                WHERE ca.date = "' . $date3 . '"
//                AND co.name != "Global"
//                GROUP BY co.id, co.name) two_days_ago
//            ON yesterday.id = two_days_ago.id
//            WHERE today.deaths > 100
//            ORDER BY deathsDeltaPC desc
//        ');
//
//        foreach($result AS $index=>$row)
//        {
//            $today['deathsSurge'][$row->name] = [
//                'rank' => $index,
//                'id' => $row->id,
//                'name' => $row->name,
//                'deaths' => $row->deaths,
//                'deathsDelta' => $row->deathsDelta,
//                'deathsDeltaPC' => $row->deathsDeltaPC,
//            ];
//        }
//
//        dump($today);
//
//
//
//
//        $yesterday = [];
//
//        // Today - Confirmed surge
//        $result = DB::select('
//            SELECT
//                today.id, today.name, today.confirmed,
//                (yesterday.confirmed - two_days_ago.confirmed) AS confirmedDelta,
//                (yesterday.confirmed - two_days_ago.confirmed)/two_days_ago.confirmed AS confirmedDeltaPC
//            FROM
//                (SELECT co.id, co.name, SUM(ca.confirmed) AS confirmed
//                FROM cases ca
//                INNER JOIN states s
//                ON s.id = ca.state_id
//                INNER JOIN countries co
//                ON co.id = s.country_id
//                WHERE ca.date = "'.$date1.'"
//                AND co.name != "Global"
//                GROUP BY co.id, co.name) today
//            INNER JOIN
//                (SELECT co.id, co.name, SUM(ca.confirmed) AS confirmed
//                FROM cases ca
//                INNER JOIN states s
//                ON s.id = ca.state_id
//                INNER JOIN countries co
//                ON co.id = s.country_id
//                WHERE ca.date = "'.$date3.'"
//                AND co.name != "Global"
//                GROUP BY co.id, co.name) yesterday
//            ON today.id = yesterday.id
//            INNER JOIN
//                (SELECT co.id, co.name, SUM(ca.confirmed) AS confirmed
//                FROM cases ca
//                INNER JOIN states s
//                ON s.id = ca.state_id
//                INNER JOIN countries co
//                ON co.id = s.country_id
//                WHERE ca.date = "' . $date4 . '"
//                AND co.name != "Global"
//                GROUP BY co.id, co.name) two_days_ago
//            ON yesterday.id = two_days_ago.id
//            WHERE today.confirmed > 100
//            ORDER BY confirmedDeltaPC desc
//        ');
//
//        foreach($result AS $index=>$row)
//        {
//            $yesterday['confirmedSurge'][$row->name] = [
//                'rank' => $index,
//                'id' => $row->id,
//                'name' => $row->name,
//                'confirmed' => $row->confirmed,
//                'confirmedDelta' => $row->confirmedDelta,
//                'confirmedDeltaPC' => $row->confirmedDeltaPC,
//            ];
//        }
//
//        // Today - Deaths surge
//        $result = DB::select('
//            SELECT
//                today.id, today.name, today.deaths,
//                (yesterday.deaths - two_days_ago.deaths) AS deathsDelta,
//                (yesterday.deaths - two_days_ago.deaths)/two_days_ago.deaths AS deathsDeltaPC
//            FROM
//                (SELECT co.id, co.name, SUM(ca.deaths) AS deaths
//                FROM cases ca
//                INNER JOIN states s
//                ON s.id = ca.state_id
//                INNER JOIN countries co
//                ON co.id = s.country_id
//                WHERE ca.date = "'.$date1.'"
//                AND co.name != "Global"
//                GROUP BY co.id, co.name) today
//            INNER JOIN
//                (SELECT co.id, co.name, SUM(ca.deaths) AS deaths
//                FROM cases ca
//                INNER JOIN states s
//                ON s.id = ca.state_id
//                INNER JOIN countries co
//                ON co.id = s.country_id
//                WHERE ca.date = "'.$date3.'"
//                AND co.name != "Global"
//                GROUP BY co.id, co.name) yesterday
//            ON today.id = yesterday.id
//            INNER JOIN
//                (SELECT co.id, co.name, SUM(ca.deaths) AS deaths
//                FROM cases ca
//                INNER JOIN states s
//                ON s.id = ca.state_id
//                INNER JOIN countries co
//                ON co.id = s.country_id
//                WHERE ca.date = "' . $date4 . '"
//                AND co.name != "Global"
//                GROUP BY co.id, co.name) two_days_ago
//            ON yesterday.id = two_days_ago.id
//            WHERE today.deaths > 100
//            ORDER BY deathsDeltaPC desc
//        ');
//
//        foreach($result AS $index=>$row)
//        {
//            $yesterday['deathsSurge'][$row->name] = [
//                'rank' => $index,
//                'id' => $row->id,
//                'name' => $row->name,
//                'deaths' => $row->deaths,
//                'deathsDelta' => $row->deathsDelta,
//                'deathsDeltaPC' => $row->deathsDeltaPC,
//            ];
//        }
//
//        dump($yesterday);
//
//
//        foreach($)
//
//        dd('done');
        $current_date = date('Y-m-d');
        $dates = DB::table('cases')
            ->select('date')
            ->groupBy('date')
//            ->where('date','!=',$current_date)
            ->orderBy('date','desc')
            ->limit(4)
            ->get();

        $date1 = $dates[0]->date;
        $date2 = $dates[1]->date;
        $date3 = $dates[2]->date;
        $date4 = $dates[3]->date;

//SELECT co.id, co.name, SUM(c.confirmed) AS confirmed,SUM(c.deaths) AS deaths, SUM(c.recovered) AS recovered
//FROM cases c
//INNER JOIN states s
//ON s.id = c.state_id
//INNER JOIN countries co
//ON co.id = s.country_id
//WHERE c.date = '2020-04-29'
//GROUP BY co.id
//ORDER BY co.name

        $records = DB::table('cases')
            ->selectRaw('countries.id, countries.name, sum(cases.confirmed) as confirmed, sum(cases.deaths) as deaths, sum(cases.recovered) as recovered')
            ->join('states','states.id','cases.state_id')
            ->join('countries','countries.id','states.country_id')
            ->where('cases.date','=',$date1)
            ->where('countries.name','!=','Global')
            ->groupBy('countries.id')
            ->groupBy('countries.name')
            ->orderBy('countries.name')
            ->get()->all();

        $records = (array) $records;
        $display = [];
        foreach($records AS $row)
        {
            $display[$row->name] = $row;
        }

        $records = DB::table('cases')
            ->selectRaw('countries.id, countries.name, sum(cases.confirmed) as confirmed, sum(cases.deaths) as deaths, sum(cases.recovered) as recovered')
            ->join('states','states.id','cases.state_id')
            ->join('countries','countries.id','states.country_id')
            ->where('cases.date','=',$date2)
            ->where('countries.name','!=','Global')
            ->groupBy('countries.id')
            ->groupBy('countries.name')
            ->orderBy('countries.name')
            ->get()->all();
        $records = (array) $records;
        $today = [];
        foreach($records AS $row)
        {
            $today[$row->name] = $row;
        }

        $yesterday = [];

        $records = DB::table('cases')
            ->selectRaw('countries.id, countries.name, sum(cases.confirmed) as confirmed, sum(cases.deaths) as deaths, sum(cases.recovered) as recovered')
            ->join('states','states.id','cases.state_id')
            ->join('countries','countries.id','states.country_id')
            ->where('cases.date','=',$date3)
            ->where('countries.name','!=','Global')
            ->groupBy('countries.id')
            ->groupBy('countries.name')
            ->orderBy('countries.name')
            ->get()->all();
        $records = (array) $records;
        foreach($records AS $row)
        {
            $yesterday[$row->name] = $row;
        }

        $two_days_ago = [];
        $records = DB::table('cases')
            ->selectRaw('countries.id, countries.name, sum(cases.confirmed) as confirmed, sum(cases.deaths) as deaths, sum(cases.recovered) as recovered')
            ->join('states','states.id','cases.state_id')
            ->join('countries','countries.id','states.country_id')
            ->where('cases.date','=',$date4)
            ->where('countries.name','!=','Global')
            ->groupBy('countries.id')
            ->groupBy('countries.name')
            ->orderBy('countries.name')
            ->get()->all();
        $records = (array) $records;
        foreach($records AS $row)
        {
            $two_days_ago[$row->name] = $row;
        }

        $today_sorted = [];
        foreach($today AS $index=>$row)
        {
            $data = [
                'id' => $row->id,
                'name' => $row->name
            ];

            $data['confirmed'] = $row->confirmed;
            $data['deaths'] = $row->deaths;
            $data['recovered'] = $row->recovered;
            $data['confirmedYesterday'] = $yesterday[$index]->confirmed;
            $data['deathsYesterday'] = $yesterday[$index]->deaths;
            $data['recoveredYesterday'] = $yesterday[$index]->recovered;
            $data['confirmedDelta'] = $row->confirmed - $yesterday[$index]->confirmed;
            $data['deathsDelta'] = $row->deaths - $yesterday[$index]->deaths;
            $data['recoveredDelta'] = $row->recovered - $yesterday[$index]->recovered;
            $data['confirmedSurge'] = $data['confirmedDelta'] / ($yesterday[$index]->confirmed > 0 ? $yesterday[$index]->confirmed : 1);
            $data['deathsSurge'] = $data['deathsDelta'] / ($yesterday[$index]->deaths > 0 ? $yesterday[$index]->deaths : 1);
            $data['recoveredSurge'] = $data['recoveredDelta'] / ($yesterday[$index]->recovered > 0 ? $yesterday[$index]->recovered : 1);
            $today_sorted[] = $data;
        }

        $yesterday_sorted = [];
        foreach($yesterday AS $index=>$row)
        {
            $data = [
                'id' => $row->id,
                'name' => $row->name
            ];

            $data['confirmed'] = $row->confirmed;
            $data['deaths'] = $row->deaths;
            $data['recovered'] = $row->recovered;
            $data['confirmedYesterday'] = $two_days_ago[$index]->confirmed;
            $data['deathsYesterday'] = $two_days_ago[$index]->deaths;
            $data['recoveredYesterday'] = $two_days_ago[$index]->recovered;
            $data['confirmedDelta'] = $row->confirmed - $two_days_ago[$index]->confirmed;
            $data['deathsDelta'] = $row->deaths - $two_days_ago[$index]->deaths;
            $data['recoveredDelta'] = $row->recovered - $two_days_ago[$index]->recovered;
            $data['confirmedSurge'] = $data['confirmedDelta'] / ($two_days_ago[$index]->confirmed >0 ? $two_days_ago[$index]->confirmed : 1);
            $data['deathsSurge'] = $data['deathsDelta'] / ($two_days_ago[$index]->deaths > 0 ? $two_days_ago[$index]->deaths : 1);
            $data['recoveredSurge'] = $data['recoveredDelta'] / ($two_days_ago[$index]->recovered > 0 ? $two_days_ago[$index]->recovered : 1);
            $yesterday_sorted[] = $data;
        }

        $sorted = [];


        $sorted['today'] = [
            'confirmedDelta' => $today_sorted,
            'deathsDelta' => $today_sorted,
            'recoveredDelta' => $today_sorted,
            'confirmedSurge' => $today_sorted,
            'deathsSurge' => $today_sorted,
        ];

        $sorted['yesterday'] = [
            'confirmedDelta' => $yesterday_sorted,
            'deathsDelta' => $yesterday_sorted,
            'recoveredDelta' => $yesterday_sorted,
            'confirmedSurge' => $yesterday_sorted,
            'deathsSurge' => $yesterday_sorted,
        ];

        // Remove countries with less than 100 confirmed cases and less than 20 deaths
        foreach($sorted['today']['confirmedSurge'] AS $index => $row)
        {
            if($row['confirmed'] < 100)
            {
                unset($sorted['today']['confirmedSurge'][$index]);
            }
        }

        foreach($sorted['today']['deathsSurge'] AS $index => $row)
        {
            if($row['deaths'] < 20)
            {
                unset($sorted['today']['deathsSurge'][$index]);
            }
        }



        // Sort today's records
        $confirmed = array_column($sorted['today']['confirmedDelta'],'confirmedDelta');
        $deaths = array_column($sorted['today']['deathsDelta'],'deathsDelta');
        $recovered = array_column($sorted['today']['recoveredDelta'],'recoveredDelta');
        $confirmedSurge = array_column($sorted['today']['confirmedSurge'],'confirmedSurge');
        $deathsSurge = array_column($sorted['today']['deathsSurge'],'deathsSurge');

        array_multisort($confirmed,SORT_DESC,$sorted['today']['confirmedDelta']);
        array_multisort($deaths,SORT_DESC,$sorted['today']['deathsDelta']);
        array_multisort($recovered,SORT_DESC,$sorted['today']['recoveredDelta']);
        array_multisort($confirmedSurge,SORT_DESC,$sorted['today']['confirmedSurge']);
        array_multisort($deathsSurge,SORT_DESC,$sorted['today']['deathsSurge']);


        // Sort yesterday's records
        $confirmed = array_column($sorted['yesterday']['confirmedDelta'],'confirmedDelta');
        $deaths = array_column($sorted['yesterday']['deathsDelta'],'deathsDelta');
        $recovered = array_column($sorted['yesterday']['recoveredDelta'],'recoveredDelta');
        $confirmedSurge = array_column($sorted['yesterday']['confirmedSurge'],'confirmedSurge');
        $deathsSurge = array_column($sorted['yesterday']['deathsSurge'],'deathsSurge');

        array_multisort($confirmed,SORT_DESC,$sorted['yesterday']['confirmedDelta']);
        array_multisort($deaths,SORT_DESC,$sorted['yesterday']['deathsDelta']);
        array_multisort($recovered,SORT_DESC,$sorted['yesterday']['recoveredDelta']);
        array_multisort($confirmedSurge,SORT_DESC,$sorted['yesterday']['confirmedSurge']);
        array_multisort($deathsSurge,SORT_DESC,$sorted['yesterday']['deathsSurge']);


        // Add rank to each record
        foreach($sorted AS $day => $sorted_row)
        {
            foreach(['confirmedDelta','deathsDelta','recoveredDelta','confirmedSurge','deathsSurge'] AS $field)
            {
                foreach($sorted[$day][$field] AS $index => $row)
                {
                    $sorted[$day][$field][$index]['rank'] = $index;
                }
            }
        }



        $result = [];
        foreach(['confirmedDelta','deathsDelta','recoveredDelta','confirmedSurge','deathsSurge'] AS $field)
        {
            foreach(array_slice($sorted['today'][$field],0,10) AS $record)
            {
                $result[$field][] = $record;
            }

            foreach($result[$field] AS $index => $row)
            {
                $result[$field][$index]['movement'] = '';
                $yesterday_rank = $row['rank'];
                foreach($sorted['yesterday'][$field] AS $y_index => $y_row)
                {
                    if($y_row['id'] == $row['id'])
                    {
                        $yesterday_rank = $y_row['rank'];
                        break;
                    }
                }
                if($yesterday_rank < $row['rank'])
                {
                    $result[$field][$index]['movement'] = 'down';
                }
                else if($yesterday_rank > $row['rank'])
                {
                    $result[$field][$index]['movement'] = 'up';
                }
                else
                {
                    $result[$field][$index]['movement'] = 'eq';
                }
            }
        }

        file_put_contents(STATS . 'daily_ranking.json',json_encode($result));
        return response($result)->setStatusCode(Response::HTTP_OK);

    }

    public function daily_ranking()
    {
        $filename = STATS . 'daily_ranking.json';
        $file = fopen($filename,'r');
        $data = json_decode(fread($file,filesize($filename)),true);
        return response($data)->setStatusCode(Response::HTTP_OK);
    }


    public function generate_global_summary()
    {
//        $filename = STATS . 'global.json';
//        $file = fopen($filename,'r');
//        $data = json_decode(fread($file,filesize($filename)),true);

        $data = DB::table('cases')
            ->join('states','states.id','cases.state_id')
            ->join('countries','countries.id','states.country_id')
            ->where('countries.name','=','Global')
            ->where('states.name','=','(Unspecified)')
            ->orderBy('cases.date','desc')
            ->get()->first();

        $result = [
            'last_update' => $data->date,
            'confirmed' => (int)$data->confirmed,
            'deaths' => (int)$data->deaths,
            'recovered' => (int)$data->recovered,
            'active' => (int)$data->confirmed - (int)$data->deaths - (int)$data->recovered,
        ];

        file_put_contents(STATS . 'global_summary.json',json_encode($result));
        return response($result)->setStatusCode(Response::HTTP_OK);
    }

    public function global_summary()
    {
        $filename = STATS . 'global_summary.json';
        $file = fopen($filename,'r');
        $data = json_decode(fread($file,filesize($filename)),true);
        return response($data)->setStatusCode(Response::HTTP_OK);
    }

    public function countries_list_map()
    {
        $filename = STATS . 'master.json';
        $file = fopen($filename,'r');
        $data = json_decode(fread($file,filesize($filename)),true);
        $result = [];
        foreach($data AS $country_name => $row)
        {
            $result[$country_name] = [
                'name' => $row['name'],
                'lat' => $row['lat'],
                'long' => $row['long'],
                'confirmed' => $row['total']['c']
            ];
        }
        return response($result)->setStatusCode(Response::HTTP_OK);
    }

    public function generate_at_a_glance()
    {
        $result = [];
        $date = DB::table('cases')
            ->select('date')
            ->groupBy('date')
            ->orderBy('date','desc')
            ->limit(3)
            ->get();

        $date1 = $date[0]->date;
        $date2 = $date[1]->date;
        $date3 = $date[2]->date;

        $result['confirmed'] = DB::table('cases')
            ->selectRaw('countries.id, countries.name, sum(cases.confirmed) AS confirmed')
            ->join('states','states.id','cases.state_id')
            ->join('countries','countries.id','states.country_id')
            ->where('countries.name','!=','Global')
            ->where('cases.date','=',$date1)
            ->groupBy('countries.id')
            ->groupBy('countries.name')
            ->orderBy('confirmed','desc')
            ->limit(5)
            ->get();


        foreach($result['confirmed'] AS $key => $row)
        {
            $temp = DB::table('cases')
                ->selectRaw('sum(cases.confirmed) AS confirmed')
                ->join('states','states.id','cases.state_id')
                ->join('countries','countries.id','states.country_id')
                ->where('countries.name','!=','Global')
                ->where('cases.date','=',$date2)
                ->where('countries.id','=',$row->id)
                ->groupBy('countries.id')
                ->groupBy('countries.name')
                ->orderBy('confirmed','desc')
                ->get()->first();



            $result['confirmed'][$key]->confirmed = intval($row->confirmed);
            $temp->confirmed = intval($temp->confirmed);

            $result['confirmed'][$key]->delta = $row->confirmed - $temp->confirmed;
            $result['confirmed'][$key]->percent = $result['confirmed'][$key]->delta / $temp->confirmed;

            if($result['confirmed'][$key]->delta == 0)
            {
                $temp = DB::table('cases')
                    ->selectRaw('sum(cases.confirmed) AS confirmed')
                    ->join('states','states.id','cases.state_id')
                    ->join('countries','countries.id','states.country_id')
                    ->where('countries.name','!=','Global')
                    ->where('cases.date','=',$date3)
                    ->where('countries.id','=',$row->id)
                    ->groupBy('countries.id')
                    ->groupBy('countries.name')
                    ->orderBy('confirmed','desc')
                    ->get()->first();

                $result['confirmed'][$key]->confirmed = intval($row->confirmed);
                $temp->confirmed = intval($temp->confirmed);

                $result['confirmed'][$key]->delta = $row->confirmed - $temp->confirmed;
                $result['confirmed'][$key]->percent = $result['confirmed'][$key]->delta / $temp->confirmed;
            }
        }

        $result['deaths'] = DB::table('cases')
            ->selectRaw('countries.id, countries.name, sum(cases.deaths) AS deaths')
            ->join('states','states.id','cases.state_id')
            ->join('countries','countries.id','states.country_id')
            ->where('countries.name','!=','Global')
            ->where('cases.date','=',$date1)
            ->groupBy('countries.id')
            ->groupBy('countries.name')
            ->orderBy('deaths','desc')
            ->limit(5)
            ->get();

        foreach($result['deaths'] AS $key => $row)
        {
            $temp = DB::table('cases')
                ->selectRaw('sum(cases.deaths) AS deaths')
                ->join('states','states.id','cases.state_id')
                ->join('countries','countries.id','states.country_id')
                ->where('countries.name','!=','Global')
                ->where('cases.date','=',$date2)
                ->where('countries.id','=',$row->id)
                ->groupBy('countries.id')
                ->groupBy('countries.name')
                ->orderBy('deaths','desc')
                ->get()->first();



            $result['deaths'][$key]->deaths = intval($row->deaths);
            $temp->deaths = intval($temp->deaths);

            $result['deaths'][$key]->delta = $row->deaths - $temp->deaths;
            $result['deaths'][$key]->percent = $result['deaths'][$key]->delta / $temp->deaths;

            if($result['deaths'][$key]->delta == 0)
            {
                $temp = DB::table('cases')
                    ->selectRaw('sum(cases.deaths) AS deaths')
                    ->join('states','states.id','cases.state_id')
                    ->join('countries','countries.id','states.country_id')
                    ->where('countries.name','!=','Global')
                    ->where('cases.date','=',$date3)
                    ->where('countries.id','=',$row->id)
                    ->groupBy('countries.id')
                    ->groupBy('countries.name')
                    ->orderBy('deaths','desc')
                    ->get()->first();

                $result['deaths'][$key]->deaths = intval($row->deaths);
                $temp->deaths = intval($temp->deaths);

                $result['deaths'][$key]->delta = $row->deaths - $temp->deaths;
                $result['deaths'][$key]->percent = $result['deaths'][$key]->delta / $temp->deaths;
            }
        }

        $result['recovered'] = DB::table('cases')
            ->selectRaw('countries.id, countries.name, sum(cases.recovered) AS recovered')
            ->join('states','states.id','cases.state_id')
            ->join('countries','countries.id','states.country_id')
            ->where('countries.name','!=','Global')
            ->where('cases.date','=',$date1)
            ->groupBy('countries.id')
            ->groupBy('countries.name')
            ->orderBy('recovered','desc')
            ->limit(5)
            ->get();

        foreach($result['recovered'] AS $key => $row)
        {
            $temp = DB::table('cases')
                ->selectRaw('sum(cases.recovered) AS recovered')
                ->join('states','states.id','cases.state_id')
                ->join('countries','countries.id','states.country_id')
                ->where('countries.name','!=','Global')
                ->where('cases.date','=',$date2)
                ->where('countries.id','=',$row->id)
                ->groupBy('countries.id')
                ->groupBy('countries.name')
                ->orderBy('recovered','desc')
                ->get()->first();



            $result['recovered'][$key]->recovered = intval($row->recovered);
            $temp->recovered = intval($temp->recovered);

            $result['recovered'][$key]->delta = $row->recovered - $temp->recovered;
            $result['recovered'][$key]->percent = $result['recovered'][$key]->delta / $temp->recovered;

            if($result['recovered'][$key]->delta == 0)
            {
                $temp = DB::table('cases')
                    ->selectRaw('sum(cases.recovered) AS recovered')
                    ->join('states','states.id','cases.state_id')
                    ->join('countries','countries.id','states.country_id')
                    ->where('countries.name','!=','Global')
                    ->where('cases.date','=',$date3)
                    ->where('countries.id','=',$row->id)
                    ->groupBy('countries.id')
                    ->groupBy('countries.name')
                    ->orderBy('recovered','desc')
                    ->get()->first();



                $result['recovered'][$key]->recovered = intval($row->recovered);
                $temp->recovered = intval($temp->recovered);

                $result['recovered'][$key]->delta = $row->recovered - $temp->recovered;
                $result['recovered'][$key]->percent = $result['recovered'][$key]->delta / $temp->recovered;
            }
        }


        file_put_contents(STATS . 'at_a_glance.json',json_encode($result));
        return response($result)->setStatusCode(Response::HTTP_OK);
    }

    public function at_a_glance()
    {
        $filename = STATS . 'at_a_glance.json';
        $file = fopen($filename,'r');
        $data = json_decode(fread($file,filesize($filename)),true);
        return response($data)->setStatusCode(Response::HTTP_OK);
    }

    public function harvest_countries_and_states()
    {
        // Generate master country list
        $csv = array_map('str_getcsv', file(MASTER_LIST));
        array_walk($csv, function(&$a) use ($csv) {
            $a = array_combine($csv[0], $a);
        });
        array_shift($csv); # remove column header

        $states = [];
        $data = [];
        $global = [
            'daily' => [],
            'total' => [
                'confirmed' => 0,
                'deaths' => 0,
                'recovered' => 0,
            ],
        ];

        foreach($csv AS $row)
        {
            if(isset($this->rename[$row['Country_Region']]))
            {
//                dump('Found ' . $row['Country_Region'] . ' rename to ' . $this->rename[$row['Country_Region']]);
                $row['Country_Region'] = $this->rename[$row['Country_Region']];

            }
            // Get a list of countries
            if(strlen($row['Province_State']) == 0 )
            {
                if(!isset($data[ $row['Country_Region'] ]))
                {
                    $data[$row['Country_Region']] = [
                        'name' => $row['Country_Region'],
                        'uid' => $row['UID'],
                        'iso2' => $row['iso2'],
                        'iso3' => $row['iso3'],
                        'code3' => $row['code3'],
                        'fips' => $row['FIPS'],
                        'admin2' => $row['Admin2'],
                        'lat' => $row['Lat'],
                        'long' => $row['Long_'],
                        'population' => $row['Population'],
                        'states' => [],
                        'daily' => [],
                        'total' => [
                            'l' => '',
                            'c' => '0',
                            'd' => '0',
                            'r' => '0',
                        ]
                    ];


                }

                // Create country record

                $record = [
                    'lat' => $row['Lat'],
                    'lng' => $row['Long_'],
                    'population' => $row['Population'] > 0 ? $row['Population'] : 0
                ];

                $country = Country::where('name',$row['Country_Region'])->first();
                if(!$country)
                {
                    $country = Country::create(array_merge($record,['name'=>$row['Country_Region']]));
                }
                else
                {
                    $country->update($record);
                }

                // Create unspecified state inside country

                $state = State::where(['country_id'=>$country->id,'name'=>'(Unspecified)'])->first();
                if(!$state)
                {
                    State::create([
                        'country_id' => $country->id,
                        'name' => '(Unspecified)',
                        'lat' => $country->lat,
                        'lng' => $country->lng,
                        'population' => $country->population,
                    ]);
                }
                else
                {
                    $state->update($record);
                }
            }

            // Get a list of states inside countries
            else
            {
                if(isset($data[$row['Country_Region']]) && strlen($row['Admin2']) == 0 && strlen($row['Province_State']) > 0) {
                    if(!isset($data[$row['Country_Region']]['states'][$row['Province_State']]))
                    {
                        $data[$row['Country_Region']]['states'][$row['Province_State']] = [
                            'uid' => $row['UID'],
                            'name' => $row['Province_State'],
                            'lat' => $row['Lat'],
                            'long' => $row['Long_'],
                            'population' => $row['Population'],
                            'total' => [
                                'l' => '',
                                'c' => '0',
                                'd' => '0',
                                'r' => '0',
                            ]
                        ];

                        // Create state record

                        $record = [
                            'country_id' => Country::where('name',$row['Country_Region'])->value('id'),
                            'lat' => strlen($row['Lat']) > 0 ? $row['Lat'] : 0,
                            'lng' => strlen($row['Long_']) > 0 ? $row['Long_'] : 0,
                            'population' => $row['Population'] > 0 ? $row['Population'] : 0,
                        ];

                        $state = State::where('name',$row['Province_State'])->first();
                        if(!$state)
                        {
                            $state = State::create(array_merge($record,['name'=>$row['Province_State']]));
                        }
                        else
                        {
                            $state->update($record);
                        }
                    }
                }
            }
        }





        $population = DB::table('countries')
            ->selectRaw('sum(population) as total_population')
            ->where('name','!=','Global')
            ->get()->first();

        $global = DB::table('countries')->updateOrInsert([
                'name' => 'Global',
            ],
            [
                'lat' => 0,
                'lng' => 0,
                'population' => $population->total_population,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        $global = Country::where('name','Global')->first();

        DB::table('states')->updateOrInsert([
            'country_id' => $global->id,
            'name' => '(Unspecified)',
        ],
            [
                'lat' => 0,
                'lng' => 0,
                'population' => $population->total_population,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        );
    }

    public function harvest_cases_from_jh_timeline_global(Request $request)
    {
        $first_date = '2020-01-22';

        $files = COVID_DATA_TIME_SERIES;

        unset($files['confirmedUS']);
        unset($files['deathsUS']);

        $time_series = [
        ];
        foreach($files AS $type => $file)
        {

            $csv = array_map('str_getcsv', file($file));

            foreach($csv AS $key=>$row)
            {

                if($key == 0)
                {
                    // Remove the non-date columns
                    array_splice($row,0,4);
                    continue;
                }
                /*
                 * Global
                 * 0 => "Province/State"
                 * 1 => "Country/Region"
                 * 2 => "Lat"
                 * 3 => "Long"
                */

                $state = strlen($row[0]) == 0 ? '(Unspecified)' : $row[0];
                $country = strlen($row[1]) == 0 ? '(Unspecified)' : $row[1];

                // Remove the non-date columns
                array_splice($row,0,4);

                $new_date = new \DateTime($first_date);

                // Further trim to grab last day
//                dump('Country: ' . $country . ' State: ' . $state);
                if($request->full) {
                }
                else
                {
                    $total = count($row) - 1;
                    array_splice($row,0, $total);
                    $new_date = $new_date->add(new \DateInterval('P' . $total . 'D'));
                }

                foreach ($this->combine AS $key => $combine) {
                    if (in_array($country, $combine)) {
                        $country = $key;
                        break;
                    }
                }

                // Move countries into states
                if (in_array($country, array_keys($this->transfer))) {
                    $state = $country;
                    $country = $this->transfer[$country];
                }

                // Skip things that we do not know where to put
                if (in_array($country, $this->skip)) {
                    break;
                }


                // We have already done United States separately...
                if($country == 'United States' && ($type == 'confirmed' || $type == 'deaths'))
                {
                    continue;
                }



                if($type == 'confirmed')
                {
                    $current_date = new \DateTime($new_date->format('Y-m-d'));
                    for($x = 0; $x < count($row); $x++) {
                        $date = $current_date->format('Y-m-d');
                        if(isset($time_series[$country][$state][$date]['confirmed']))
                        {
                            $time_series[$country][$state][$date]['confirmed'] += $row[$x];
                        }
                        else
                        {
                            $time_series[$country][$state][$date]['confirmed'] = $row[$x];
                        }
                        $current_date->add(new \DateInterval('P1D'))->format('Y-m-d');
                    }
                }
                else if($type == 'deaths')
                {
                    $current_date = new \DateTime($new_date->format('Y-m-d'));
                    for($x = 0; $x < count($row); $x++) {
                        $date = $current_date->format('Y-m-d');
                        if(isset($time_series[$country][$state][$date]['deaths']))
                        {
                            $time_series[$country][$state][$date]['deaths'] += $row[$x];
                        }
                        else
                        {
                            $time_series[$country][$state][$date]['deaths'] = $row[$x];
                        }
                        $current_date->add(new \DateInterval('P1D'))->format('Y-m-d');
                    }
                }
                else if($type == 'recovered')
                {
                    $current_date = new \DateTime($new_date->format('Y-m-d'));
                    for($x = 0; $x < count($row); $x++) {
                        $date = $current_date->format('Y-m-d');
                        if(isset($time_series[$country][$state][$date]['recovered']))
                        {
                            $time_series[$country][$state][$date]['recovered'] += $row[$x];
                        }
                        else
                        {
                            $time_series[$country][$state][$date]['recovered'] = $row[$x];
                        }
                        $current_date->add(new \DateInterval('P1D'))->format('Y-m-d');
                    }
                }
            }
        }


        foreach($time_series AS $country_name => $state_data)
        {
            $country = Country::where('name',$country_name)->first();
            if($country)
            {
                foreach($state_data AS $state_name => $dates)
                {
                    foreach($dates AS $date => $values)
                    {
                        $state = State::where([
                            'name' => $state_name,
                            'country_id' => $country->id,
                        ])->first();
                        if($state) {

                            $input = [];
                            if(isset($values['confirmed']))
                            {
                                $input['confirmed'] = $values['confirmed'];
                                $input['confirmed_source'] = 'JH';
                            }
                            if(isset($values['deaths']))
                            {
                                $input['deaths'] = $values['deaths'];
                                $input['deaths_source'] = 'JH';
                            }
                            if(isset($values['recovered']))
                            {
                                $input['recovered'] = $values['recovered'];
                                $input['recovered_source'] = 'JH';
                            }
                            DB::table('cases')->updateOrInsert(
                                [
                                    'state_id' => $state->id,
                                    'date' => $date,
                                ],
                                $input
                            );
                        }
                    }
                }
            }
        }
        return response('Done harvesting from JH global data')->setStatusCode(Response::HTTP_OK);
    }

    public function harvest_cases_from_jh_timeline_us(Request $request)
    {
        $first_date = '2020-01-22';

         // Special preparation for the US time series data...
        $files = COVID_DATA_TIME_SERIES;

        unset($files['confirmed']);
        unset($files['deaths']);
        unset($files['recovered']);

        $country = Country::where('name','United States')->first();

        $time_series = [
        ];
        foreach($files AS $type => $file)
        {

            $csv = array_map('str_getcsv', file($file));

//            if($request->full) {
//                echo '<h1>Fully rebuilding ' . $type . '</h1>';
//            }
//            else
//            {
//                echo '<h1>Partially rebuilding ' . $type . '</h1>';
//            }

            foreach($csv AS $key=>$row)
            {

                if($key == 0)
                {
                    continue;
                }
                /*
                 * Global
                 * 0 => "Province/State"
                 * 1 => "Country/Region"
                 * 2 => "Lat"
                 * 3 => "Long"
                 *
                 * US
                 * 0 => UID
                 * 1 => iso2
                 * 2 => iso3
                 * 3 => code3
                 * 4 => FIPS
                 * 5 => Admin2
                 * 6 => Province/State
                 * 7 => Country/Region
                 * 8 => Lat
                 * 9 => Long
                 * 10 => Combined
                */

                $state = strlen($row[6]) == 0 ? '(Unspecified)' : $row[6];

                if($type == 'confirmedUS')
                {
                    array_splice($row,0,11);
                }
                else if($type == 'deathsUS')
                {
                    array_splice($row,0,12);
                }

                $new_date = new \DateTime($first_date);

                // Further trim to grab last day
                if($request->full) {
                }
                else
                {
                    $total = count($row) - 1;
                    array_splice($row,0, $total);
                    $new_date = $new_date->add(new \DateInterval('P' . $total . 'D'));
                }


                if($type == 'confirmedUS')
                {
                    $current_date = new \DateTime($new_date->format('Y-m-d'));
                    for($x = 0; $x < count($row); $x++) {
                        $date = $current_date->format('Y-m-d');
                        if(isset($time_series[$state][$date]['confirmed']))
                        {
                            $time_series[$state][$date]['confirmed'] += $row[$x];
                        }
                        else
                        {
                            $time_series[$state][$date]['confirmed'] = $row[$x];
                        }
                        $current_date->add(new \DateInterval('P1D'))->format('Y-m-d');
                    }
                }
                else if($type == 'deathsUS')
                {
                    $current_date = new \DateTime($new_date->format('Y-m-d'));
                    for($x = 0; $x < count($row); $x++) {
                        $date = $current_date->format('Y-m-d');
                        if(isset($time_series[$state][$date]['deaths']))
                        {
                            $time_series[$state][$date]['deaths'] += $row[$x];
                        }
                        else
                        {
                            $time_series[$state][$date]['deaths'] = $row[$x];
                        }
                        $current_date->add(new \DateInterval('P1D'))->format('Y-m-d');
                    }
                }
            }
        }

        $country = Country::where('name','United States')->first();

        foreach($time_series AS $state_name => $dates)
        {
//            echo 'Rebuilding: ' . $state_name . '<br />';
            foreach($dates AS $date => $values)
            {
                $state = State::where([
                    'name' => $state_name,
                    'country_id' => $country->id,
                ])->first();
                if($state) {
                    DB::table('cases')->updateOrInsert([
                        'state_id' => $state->id,
                        'date' => $date,
                    ],
                        [
                            'confirmed' => $values['confirmed'],
                            'confirmed_source' => 'JH',
                            'deaths' => $values['deaths'],
                            'deaths_source' => 'JH',
                        ]
                    );
                }
            }
        }
        return response('Done harvesting from JH US data')->setStatusCode(Response::HTTP_OK);
    }

    public function recalculate_global()
    {
        $country = Country::where('name','Global')->first();
        $state = State::where('country_id',$country->id)->first();


        $days = DB::table('cases')
            ->selectRaw('date, SUM(confirmed) AS total_confirmed, SUM(deaths) AS total_deaths, SUM(recovered) AS total_recovered')
            ->join('states','states.id','cases.state_id')
            ->join('countries','countries.id','states.country_id')
            ->where('countries.name','!=','Global')
            ->groupBy('date')
            ->orderBy('cases.date')
            ->get();

        foreach($days AS $day)
        {
            DB::table('cases')->updateOrInsert(
                [
                    'state_id' => $state->id,
                    'date' => $day->date,
                ],
                [
                    'confirmed' => $day->total_confirmed,
                    'deaths' => $day->total_deaths,
                    'recovered' => $day->total_recovered,
                ]
            );
        }

        return $this->compute_daily(Country::where('name','Global')->first());
    }

    public function generate_all_countries_daily()
    {
        $data = [];

        $countries = Country::all();
        foreach($countries AS $country)
        {
            $data[$country->id] = $this->compute_daily($country);
        }

        file_put_contents(STATS . 'countries_daily.json',json_encode($data));
        return response($data)->setStatusCode(Response::HTTP_OK);

    }

    public function generate_all_states_daily()
    {
        $data = [];

        $states = State::all();

        $countries = DB::table('countries')
            ->selectRaw('countries.id, countries.name, count(states.id) AS total_states')
            ->join('states','states.country_id','countries.id')
            ->where('countries.name','!=','Global')
            ->groupBy('countries.id')
            ->groupBy('countries.name')
            ->having('total_states','>',1)
            ->get();


        foreach($countries AS $country)
        {

            $states = State::where('country_id',$country->id)->get();
            foreach($states AS $state)
            {
                $data[$state->id] = $this->compute_daily($state->country,$state);
            }
        }

        file_put_contents(STATS . 'states_daily.json',json_encode($data));
        return response('Done generating all states data')->setStatusCode(Response::HTTP_OK);
    }

    public function generate_all_daily()
    {
        $data = [];

        $countries = Country::all();
        foreach($countries AS $country)
        {
            $data[$country->name] = $this->compute_daily($country);
        }

        file_put_contents(STATS . 'countries_daily.json',json_encode($data));

        $data = [];

        $states = State::all();

        $countries = DB::table('countries')
            ->selectRaw('countries.id, countries.name, count(states.id) AS states')
            ->join('states','states.country_id','countries.id')
            ->where('countries.name','!=','Global')
            ->groupBy('countries.id')
            ->groupBy('countries.name')
            ->having('states','>',1)
            ->get();


        foreach($countries AS $country)
        {

            $states = State::where('country_id',$country->id)->get();
            foreach($states AS $state)
            {
                $data[$state->id] = $this->compute_daily($state->country,$state);
            }
        }

        file_put_contents(STATS . 'states_daily.json',json_encode($data));
        return response('Done generating all states data')->setStatusCode(Response::HTTP_OK);

    }

    public function get_daily(Request $request)
    {
        $country_name = $request->country_name ? $request->country_name : 'Global';
        $state_name = $request->state_name ? $request->state_name : false;

        $country = Country::where('name',$country_name)->first();
        $state = State::where('name',$state_name)->first();
        if(!$state)
        {
            $state = false;
        }

        if(!$country || (strlen($state_name)>0 && !$state))
        {
            return response('false', Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        return $this->compute_daily($country,$state);
    }

    private function compute_daily($country, $state = false)
    {
        $population = $country->population;

        if($state)
        {
            $data = DB::table('cases')
//                ->select('cases.*')
                ->selectRaw('date, SUM(confirmed) AS confirmed, SUM(deaths) AS deaths, SUM(recovered) AS recovered')
                ->join('states','states.id','=','cases.state_id')
                ->join('countries','countries.id','=','states.country_id')
                ->where('countries.name','=',$country->name)
                ->where('states.name','=',$state->name)
                ->groupBy('date')
                ->orderBy('cases.date')
                ->get();
        }
        else
        {
            $data = DB::table('cases')
//                ->select('cases.*')
                ->selectRaw('date, SUM(confirmed) AS confirmed, SUM(deaths) AS deaths, SUM(recovered) AS recovered')
                ->join('states','states.id','=','cases.state_id')
                ->join('countries','countries.id','=','states.country_id')
                ->where('countries.name',$country->name)
                ->groupBy('date')
                ->orderBy('cases.date')
                ->get();
        }
        if(count($data) == 0)
        {
            return [];
        }

        // Double check that the days are complete
        $first = $data[0];
        $last = $data[count($data)-1];


        $datetime1 = date_create($first->date);
        $datetime2 = date_create($last->date);

        $interval = date_diff($datetime1, $datetime2)->format('%a');

        $temp = [];
        $current_date = new \DateTime($first->date);

        $result = [];
        $yesterday = [];

        // Fill up gaps in days using the previous day's numbers
        foreach($data AS $index => $row){
//            $data[$index]->active = $row->confirmed - $row->deaths - $row->recovered;
            if($row->date != $current_date->format('Y-m-d'))
            {
                $yesterday->date = $current_date->format('Y-m-d');
                $result[] = $yesterday;
            }
            $result[] = $row;
            $current_date->add(new \DateInterval('P1D'));
            $yesterday = clone $row;
        }

        // Compute everything else
        $x = 0;
        $yesterday = new \stdClass();
        $yesterday->confirmed = 0;
        $yesterday->deaths = 0;
        $yesterday->recovered = 0;

        $five_days_average = [
            'confirmed' => [],
            'deaths' => [],
            'recovered' => [],
        ];
        foreach($result AS $index=>$row)
        {


            // All computations here
            $result[$index]->active = $row->confirmed - $row->deaths - $row->recovered;
            $result[$index]->delta = [];
            $result[$index]->delta['confirmed'] = $row->confirmed - $yesterday->confirmed;
            $result[$index]->delta['deaths'] = $row->deaths - $yesterday->deaths;
            $result[$index]->delta['recovered'] = $row->recovered - $yesterday->recovered;
            $result[$index]->capita = [];
            $result[$index]->capita['confirmed'] = $row->confirmed / ($population > 0 ? $population : 1) * 1000000;
            $result[$index]->capita['deaths'] = $row->deaths / ($population > 0 ? $population : 1) * 1000000;
            $result[$index]->capita['recovered'] = $row->recovered / ($population > 0 ? $population : 1) * 1000000;

            // 5D average and growth factor
            if(count($five_days_average['confirmed']) > 5)
            {
                array_shift($five_days_average['confirmed']);
            }
            $five_days_average['confirmed'][] = $result[$index]->delta['confirmed'];

            if(count($five_days_average['deaths']) > 5)
            {
                array_shift($five_days_average['deaths']);
            }
            $five_days_average['deaths'][] = $result[$index]->delta['deaths'];

            if(count($five_days_average['recovered']) > 5)
            {
                array_shift($five_days_average['recovered']);
            }
            $five_days_average['recovered'][] = $result[$index]->delta['recovered'];

            $result[$index]->average = [];
            $result[$index]->average['confirmed'] = array_sum($five_days_average['confirmed']) / count($five_days_average['confirmed']);
            $result[$index]->average['deaths'] = array_sum($five_days_average['deaths']) / count($five_days_average['deaths']);
            $result[$index]->average['recovered'] = array_sum($five_days_average['recovered']) / count($five_days_average['recovered']);

            $result[$index]->growthfactor = [
                'confirmed' => 0,
                'deaths' => 0,
                'recovered' => 0,
            ];
            if(isset($yesterday->average))
            {
                $result[$index]->growthfactor['confirmed'] = $result[$index]->average['confirmed'] / ($yesterday->average['confirmed'] > 0 ? $yesterday->average['confirmed'] : 1);
                $result[$index]->growthfactor['deaths'] = $result[$index]->average['deaths'] / ($yesterday->average['deaths'] > 0 ? $yesterday->average['deaths'] : 1);
                $result[$index]->growthfactor['recovered'] = $result[$index]->average['recovered'] / ($yesterday->average['recovered'] > 0 ? $yesterday->average['recovered'] : 1);
            }


            // Prepare for next loop
            $yesterday = clone $result[$index];
            $x++;
        }

        return new CasesCollection($result);
    }

    public function get_all_countries_and_states()
    {
        $countries = new CountryCollection(Country::with('state')->get());
        $states = new  StateCollection(State::get());

        $data = [
            'countries' => $countries,
            'states' => $states,
        ];

        return $data;
    }

    public function generate_all_countries()
    {

        $data = new CountryCollection(Country::with('state')->get());

        file_put_contents(STATS . 'countries_summary.json',json_encode($data));
        return response($data)->setStatusCode(Response::HTTP_OK);

    }

    public function get_all_countries()
    {
        $filename = STATS . 'countries_summary.json';
        $file = fopen($filename,'r');
        $data = json_decode(fread($file,filesize($filename)),true);
        return response($data)->setStatusCode(Response::HTTP_OK);
    }

    public function get_states_daily()
    {
        $filename = STATS . 'states_daily.json';
        $file = fopen($filename,'r');
        $data = json_decode(fread($file,filesize($filename)),true);
        return response($data)->setStatusCode(Response::HTTP_OK);
    }

    public function get_countries_daily()
    {
        $filename = STATS . 'countries_daily.json';
        $file = fopen($filename,'r');
        $data = json_decode(fread($file,filesize($filename)),true);
        return response($data)->setStatusCode(Response::HTTP_OK);
    }

    public function get_all_states()
    {
        return new  StateCollection(State::get());
    }
}
