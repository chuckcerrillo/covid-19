<?php

namespace App\Http\Controllers;

use App\Http\Resources\Ward as WardResource;
use Goutte\Client;
use Illuminate\Http\Request;
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
        'S. Korea' => 'South Korea',
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
//        'Taiwan' => 'Taiwan*',
        'Tanzania' => 'Tanzania',
        'Thailand' => 'Thailand',
        'Togo' => 'Togo',
        'Trinidad and Tobago' => 'Trinidad and Tobago',
        'Tunisia' => 'Tunisia',
        'Turkey' => 'Turkey',
        'UAE' => 'United Arab Emirates',
        'Uganda' => 'Uganda',
        'UK' => 'United Kingdom',
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
//        'Albania' => 'Albania',
        'Algeria' => 'Algeria',
        'Andorra' => 'Andorra',
        'Angola' => 'Angola',
//        'Antigua and Barbuda' => 'Antigua and Barbuda',
        'Argentina' => 'Argentina',
//        'Armenia' => 'Armenia',
        'Australia' => 'Australia',
        'Austria' => 'Austria',
        'Azerbaijan' => 'Azerbaijan',
//        'Bahamas' => 'Bahamas',
//        'Bahrain' => 'Bahrain',
        'Bangladesh' => 'Bangladesh',
        'Barbados' => 'Barbados',
//        'Belarus' => 'Belarus',
        'Belgium' => 'Belgium',
        'Belize' => 'Belize',
//        'Benin' => 'Benin',
//        'Bhutan' => 'Bhutan',
        'Bolivia' => 'Bolivia',
        'Bosnia and Herzegovina' => 'Bosnia and Herzegovina', // 22
        'Botswana' => 'Botswana',
        'Brazil' => 'Brazil',
        'Brunei' => 'Brunei',
        'Bulgaria' => 'Bulgaria',
        'Burkina Faso' => 'Burkina Faso',
        'Myanmar' => 'Burma',
        'Burundi' => 'Burundi',
//        'Cabo Verde' => 'Cabo Verde', // 30
//        'Cambodia' => 'Cambodia',
        'Cameroon' => 'Cameroon',
        'Canada' => 'Canada',
//        'CAR' => 'Central African Republic',
        'Chad' => 'Chad',
        'Chile' => 'Chile',
        'China' => 'China',
        'Colombia' => 'Colombia',
//        'Congo (Brazzaville)' => 'Congo (Brazzaville)',
        'Democratic Republic of Congo' => 'Congo (Kinshasa)',
        'Costa Rica' => 'Costa Rica',
//        'Ivory Coast' => 'Cote d\'Ivoire',
        'Croatia' => 'Croatia',
        'Cuba' => 'Cuba',
        'Cyprus' => 'Cyprus',
        'Czech Republic' => 'Czechia',
        'Denmark' => 'Denmark',
//        'Diamond Princess' => 'Diamond Princess',
        'Djibouti' => 'Djibouti',
//        'Dominica' => 'Dominica',
        'Dominican Republic' => 'Dominican Republic',
        'Ecuador' => 'Ecuador',
        'Egypt' => 'Egypt',
        'El Salvador' => 'El Salvador',
//        'Equatorial Guinea' => 'Equatorial Guinea',
//        'Eritrea' => 'Eritrea',
        'Estonia' => 'Estonia',
        'Eswatini' => 'Eswatini',
//        'Ethiopia' => 'Ethiopia',
//        'Fiji' => 'Fiji',
        'Finland' => 'Finland',
        'France' => 'France',
        'Gabon' => 'Gabon',
        'Gambia' => 'Gambia',
//        'Georgia' => 'Georgia',
        'Germany' => 'Germany',
        'Ghana' => 'Ghana',
        'Greece' => 'Greece',
//        'Grenada' => 'Grenada',
        'Guatemala' => 'Guatemala',
//        'Guinea' => 'Guinea',
//        'Guinea-Bissau' => 'Guinea-Bissau',
        'Guyana' => 'Guyana',
//        'Haiti' => 'Haiti',
//        'Vatican City' => 'Holy See',
        'Honduras' => 'Honduras',
//        'Hungary' => 'Hungary',
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
        'South Korea' => 'Korea, South',
        'Kosovo' => 'Kosovo',
        'Kuwait' => 'Kuwait',
        'Kyrgyz Republic' => 'Kyrgyzstan',
        'Laos' => 'Laos',
//        'Latvia' => 'Latvia',
        'Lebanon' => 'Lebanon',
//        'Liberia' => 'Liberia',
        'Libya' => 'Libya',
//        'Liechtenstein' => 'Liechtenstein',
//        'Lithuania' => 'Lithuania',
        'Luxembourg' => 'Luxembourg',
        'Madagascar' => 'Madagascar',
        'Malawi' => 'Malawi',
        'Malaysia' => 'Malaysia',
//        'Maldives' => 'Maldives',
        'Mali' => 'Mali',
//        'Malta' => 'Malta',
        'Mauritania' => 'Mauritania',
        'Mauritius' => 'Mauritius',
        'Mexico' => 'Mexico',
        'Moldova' => 'Moldova',
//        'Monaco' => 'Monaco',
        'Mongolia' => 'Mongolia',
//        'Montenegro' => 'Montenegro',
        'Morocco' => 'Morocco',
        'Mozambique' => 'Mozambique',
//        'MS Zaandam' => 'MS Zaandam',
        'Namibia' => 'Namibia',
//        'Nepal' => 'Nepal',
        'Netherlands' => 'Netherlands',
        'New Zealand' => 'New Zealand',
        'Nicaragua' => 'Nicaragua',
        'Niger' => 'Niger',
        'Nigeria' => 'Nigeria',
//        'North Macedonia' => 'North Macedonia',
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
//        'Saint Kitts and Nevis' => 'Saint Kitts and Nevis',
//        'Saint Lucia' => 'Saint Lucia',
//        'St. Vincent Grenadines' => 'Saint Vincent and the Grenadines',
        'San Marino' => 'San Marino',
//        'Sao Tome and Principe' => 'Sao Tome and Principe',
        'Saudi Arabia' => 'Saudi Arabia',
//        'Senegal' => 'Senegal',
        'Serbia' => 'Serbia',
        'Seychelles' => 'Seychelles',
        'Sierra Leone' => 'Sierra Leone',
        'Singapore' => 'Singapore',
        'Slovak Republic' => 'Slovakia',
        'Slovenia' => 'Slovenia',
//        'Somalia' => 'Somalia',
        'South Africa' => 'South Africa',
        'South Sudan' => 'South Sudan',
        'Spain' => 'Spain',
        'Sri Lanka' => 'Sri Lanka',
        'Sudan' => 'Sudan',
//        'Suriname' => 'Suriname',
        'Sweden' => 'Sweden',
        'Switzerland' => 'Switzerland',
        'Syria' => 'Syria',
        'Taiwan' => 'Taiwan*',
        'Tanzania' => 'Tanzania',
        'Thailand' => 'Thailand',
//        'Timor-Leste' => 'Timor-Leste',
//        'Togo' => 'Togo',
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
//        'West Bank and Gaza' => 'West Bank and Gaza',
//        'Western Sahara' => 'Western Sahara',
//        'Yemen' => 'Yemen',
        'Zambia' => 'Zambia',
        'Zimbabwe' => 'Zimbabwe',
    ];

    protected $wikipedia_jh_map = [
        'Afghanistan' => 'Afghanistan',
        'Algeria' => 'Algeria',
        'Albania' => 'Albania',
        'Argentina' => 'Argentina',
        'Armenia' => 'Armenia',
        'Andorra' => 'Andorra',
        'Angola' => 'Angola',
        'Antigua & Barbuda' => 'Antigua and Barbuda',
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
        'Reupblic of the Congo' => 'Congo (Brazzaville)',
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
        'UK' => 'United Kingdom',
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
        define('OXFORD_LATEST','../oxford/data/OxCGRT_latest.csv');
        define('STATS','./stats/');


    }

    public function index()
    {
        $filename = STATS . 'countries.json';
        $file = fopen($filename,'r');
        $countries = fread($file,filesize($filename));
        return response($countries)->setStatusCode(Response::HTTP_OK);
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
                'confirmed' => $columns[1],
                'deaths' => $columns[3],
                'recovered' => $columns[5],
            ];
        });
        return $data;
    }

    public function harvest_wikipedia()
    {
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
                return [
                'country' => preg_replace('/\[.*?\]/','',$col_headers[1]),
                'confirmed' => str_replace(',','',$col_body[0]),
                'deaths' => str_replace(',','',$col_body[1]),
                'recovered' => str_replace(',','',$col_body[2]),
                ];
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

    protected function manual_override()
    {
//        https://docs.google.com/spreadsheets/d/e/2PACX-1vThKLEaifDmgMxx4C1IgjXyRkJFIdr8rM5skPGo3frgrr775w1KWMlmor2a-0yIhuTfdqzwdMm50WX4/pubhtml
        $url = 'https://spreadsheets.google.com/feeds/list/14fyCtf-iXm6uSupPCiRvzIF--2KA6W7k8Mr9G0SiKb0/1/public/values?alt=json';
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

//        [
//            0 => "CountryName"
//            1 => "CountryCode"
//            2 => "Date"
//            3 => "S1_School closing"
//            4 => "S1_IsGeneral"
//            5 => "S2_Workplace closing"
//            6 => "S2_IsGeneral"
//            7 => "S3_Cancel public events"
//            8 => "S3_IsGeneral"
//            9 => "S4_Close public transport"
//            10 => "S4_IsGeneral"
//            11 => "S5_Public information campaigns"
//            12 => "S5_IsGeneral"
//            13 => "S6_Restrictions on internal movement"
//            14 => "S6_IsGeneral"
//            15 => "S7_International travel controls"
//            16 => "S8_Fiscal measures"
//            17 => "S9_Monetary measures"
//            18 => "S10_Emergency investment in health care"
//            19 => "S11_Investment in Vaccines"
//            20 => "S12_Testing framework"
//            21 => "S13_Contact tracing"
//            22 => "ConfirmedCases"
//            23 => "ConfirmedDeaths"
//            24 => "StringencyIndex"
//            25 => "StringencyIndexForDisplay"
//            26 => ""
//        ]

        $key = [
            's1' => [
                'name' => 'School closing',
                'description' => 'Record closings of schools and universities',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend closing',
                    'Require closing',
                ],
                'hasTarget' => true
            ],
            's2' => [
                'name' => 'Workplace closing',
                'description' => 'Record closings of workplaces',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend closing',
                    'Require closing',
                ],
                'hasTarget' => true
            ],
            's3' => [
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
            's4' => [
                'name' => 'Close public transport',
                'description' => 'Record closing of public transport',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend closing',
                    'Require closing',
                ],
                'hasTarget' => true
            ],
            's5' => [
                'name' => 'Public info campaigns',
                'description' => 'Record presence of public info campaigns',
                'type' => 'lookup',
                'values' => [
                    'No COVID-19 public information campaign',
                    'COVID-19 public information campaign',
                ],
                'hasTarget' => true
            ],
            's6' => [
                'name' => 'Restrictions on internal movement',
                'description' => 'Record restrictions on internal movement',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Recommend movement restriction',
                    'Restrict movement',
                ],
                'hasTarget' => true
            ],
            's7' => [
                'name' => 'International travel controls',
                'description' => 'Record restrictions on international travel',
                'type' => 'lookup',
                'values' => [
                    'No measures',
                    'Screening',
                    'Quarantine on high-risk regions',
                    'Ban on high-risk regions',
                ],
                'hasTarget' => false
            ],
            's8' => [
                'name' => 'Fiscal measures',
                'description' => 'What economic stimulus policies are adopted',
                'type' => 'custom',
                'values' => ['Value of fiscal stimuli, including spending or tax cuts'],
                'hasTarget' => false
            ],
            's9' => [
                'name' => 'Monetary measures',
                'description' => 'What monetary policy interventions?',
                'type' => 'custom',
                'values' => ['Value of interest rate'],
                'hasTarget' => false
            ],
            's10' => [

                'name' => 'Emergency investment in health care',
                'description' => 'Short-term spending on, e.g. hospitals, masks, etc',
                'type' => 'custom',
                'values' => ['Value of new short-term spending on health'],
                'hasTarget' => false
            ],
            's11' => [
                'name' => 'Investment in vaccines',
                'description' => 'Announced public spending on vaccine development',
                'type' => 'custom',
                'values' => ['Value of investment'],
                'hasTarget' => false
            ],
            's12' => [
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
            's13' => [
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
                    $daily[$country][$date]['policies']['s1'] = [
                        'v' => $row[3],
                        't' => $row[4],
                    ];

                    if(isset($latest[$country]['policies']['s1']))
                    {
                        if(
                            $latest[$country]['policies']['s1']['v'] != $daily[$country][$date]['policies']['s1']['v']
                            || $latest[$country]['policies']['s1']['t'] != $daily[$country][$date]['policies']['s1']['t']
                        )
                        {
                            $latest[$country]['policies']['s1'] = [
                                'v' => $daily[$country][$date]['policies']['s1']['v'],
                                't' => $daily[$country][$date]['policies']['s1']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s1'] = [
                                'v' => $daily[$country][$date]['policies']['s1']['v'],
                                't' => $daily[$country][$date]['policies']['s1']['t'],
                                's' => $latest[$country]['policies']['s1']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s1'] = [
                            'v' => $daily[$country][$date]['policies']['s1']['v'],
                            't' => $daily[$country][$date]['policies']['s1']['t'],
                            's' => $date,
                        ];
                    }

                }

                if(strlen($row[5]) > 0)
                {
                    $daily[$country][$date]['policies']['s2'] = [
                            'v' => $row[5],
                            't' => $row[6],
                    ];

                    if(isset($latest[$country]['policies']['s2']))
                    {
                        if(
                            $latest[$country]['policies']['s2']['v'] != $daily[$country][$date]['policies']['s2']['v']
                            || $latest[$country]['policies']['s2']['t'] != $daily[$country][$date]['policies']['s2']['t']
                        )
                        {
                            $latest[$country]['policies']['s2'] = [
                                'v' => $daily[$country][$date]['policies']['s2']['v'],
                                't' => $daily[$country][$date]['policies']['s2']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s2'] = [
                                'v' => $daily[$country][$date]['policies']['s2']['v'],
                                't' => $daily[$country][$date]['policies']['s2']['t'],
                                's' => $latest[$country]['policies']['s2']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s2'] = [
                            'v' => $daily[$country][$date]['policies']['s2']['v'],
                            't' => $daily[$country][$date]['policies']['s2']['t'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[7]) > 0)
                {
                    $daily[$country][$date]['policies']['s3'] = [
                            'v' => $row[7],
                            't' => $row[8],
                    ];

                    if(isset($latest[$country]['policies']['s3']))
                    {
                        if(
                            $latest[$country]['policies']['s3']['v'] != $daily[$country][$date]['policies']['s3']['v']
                            || $latest[$country]['policies']['s3']['t'] != $daily[$country][$date]['policies']['s3']['t']
                        )
                        {
                            $latest[$country]['policies']['s3'] = [
                                'v' => $daily[$country][$date]['policies']['s3']['v'],
                                't' => $daily[$country][$date]['policies']['s3']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s3'] = [
                                'v' => $daily[$country][$date]['policies']['s3']['v'],
                                't' => $daily[$country][$date]['policies']['s3']['t'],
                                's' => $latest[$country]['policies']['s3']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s3'] = [
                            'v' => $daily[$country][$date]['policies']['s3']['v'],
                            't' => $daily[$country][$date]['policies']['s3']['t'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[9]) > 0)
                {
                    $daily[$country][$date]['policies']['s4'] = [
                            'v' => $row[9],
                            't' => $row[10],
                    ];

                    if(isset($latest[$country]['policies']['s4']))
                    {
                        if(
                            $latest[$country]['policies']['s4']['v'] != $daily[$country][$date]['policies']['s4']['v']
                            || $latest[$country]['policies']['s4']['t'] != $daily[$country][$date]['policies']['s4']['t']
                        )
                        {
                            $latest[$country]['policies']['s4'] = [
                                'v' => $daily[$country][$date]['policies']['s4']['v'],
                                't' => $daily[$country][$date]['policies']['s4']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s4'] = [
                                'v' => $daily[$country][$date]['policies']['s4']['v'],
                                't' => $daily[$country][$date]['policies']['s4']['t'],
                                's' => $latest[$country]['policies']['s4']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s4'] = [
                            'v' => $daily[$country][$date]['policies']['s4']['v'],
                            't' => $daily[$country][$date]['policies']['s4']['t'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[11]) > 0)
                {
                    $daily[$country][$date]['policies']['s5'] = [
                            'v' => $row[11],
                            't' => $row[12],
                    ];


                    if(isset($latest[$country]['policies']['s5']))
                    {
                        if(
                            $latest[$country]['policies']['s5']['v'] != $daily[$country][$date]['policies']['s5']['v']
                            || $latest[$country]['policies']['s5']['t'] != $daily[$country][$date]['policies']['s5']['t']
                        )
                        {
                            $latest[$country]['policies']['s5'] = [
                                'v' => $daily[$country][$date]['policies']['s5']['v'],
                                't' => $daily[$country][$date]['policies']['s5']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s5'] = [
                                'v' => $daily[$country][$date]['policies']['s5']['v'],
                                't' => $daily[$country][$date]['policies']['s5']['t'],
                                's' => $latest[$country]['policies']['s5']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s5'] = [
                            'v' => $daily[$country][$date]['policies']['s5']['v'],
                            't' => $daily[$country][$date]['policies']['s5']['t'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[13]) > 0)
                {
                    $daily[$country][$date]['policies']['s6'] = [
                            'v' => $row[13],
                            't' => $row[14],
                    ];

                    if(isset($latest[$country]['policies']['s6']))
                    {
                        if(
                            $latest[$country]['policies']['s6']['v'] != $daily[$country][$date]['policies']['s6']['v']
                            || $latest[$country]['policies']['s6']['t'] != $daily[$country][$date]['policies']['s6']['t']
                        )
                        {
                            $latest[$country]['policies']['s6'] = [
                                'v' => $daily[$country][$date]['policies']['s6']['v'],
                                't' => $daily[$country][$date]['policies']['s6']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s6'] = [
                                'v' => $daily[$country][$date]['policies']['s6']['v'],
                                't' => $daily[$country][$date]['policies']['s6']['t'],
                                's' => $latest[$country]['policies']['s6']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s6'] = [
                            'v' => $daily[$country][$date]['policies']['s6']['v'],
                            't' => $daily[$country][$date]['policies']['s6']['t'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[15]) > 0)
                {
                    $daily[$country][$date]['policies']['s7'] = [
                            'v' => $row[15],
                            't' => '',
                    ];

                    if(isset($latest[$country]['policies']['s7']))
                    {
                        if(
                            $latest[$country]['policies']['s7']['v'] != $daily[$country][$date]['policies']['s7']['v']
                            || $latest[$country]['policies']['s7']['t'] != $daily[$country][$date]['policies']['s7']['t']
                        )
                        {
                            $latest[$country]['policies']['s7'] = [
                                'v' => $daily[$country][$date]['policies']['s7']['v'],
                                't' => $daily[$country][$date]['policies']['s7']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s7'] = [
                                'v' => $daily[$country][$date]['policies']['s7']['v'],
                                't' => $daily[$country][$date]['policies']['s7']['t'],
                                's' => $latest[$country]['policies']['s7']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s7'] = [
                            'v' => $daily[$country][$date]['policies']['s7']['v'],
                            't' => $daily[$country][$date]['policies']['s7']['t'],
                            's' => $date,
                        ];
                    }
                }

                if($row[16] > 0)
                {
                    $daily[$country][$date]['policies']['s8'] = [
                            'v' => $row[16],
                            't' => '',
                    ];

                    if(isset($latest[$country]['policies']['s8']))
                    {
                        if(
                            $latest[$country]['policies']['s8']['v'] != $daily[$country][$date]['policies']['s8']['v']
                            || $latest[$country]['policies']['s8']['t'] != $daily[$country][$date]['policies']['s8']['t']
                        )
                        {
                            $latest[$country]['policies']['s8'] = [
                                'v' => $daily[$country][$date]['policies']['s8']['v'],
                                't' => $daily[$country][$date]['policies']['s8']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s8'] = [
                                'v' => $daily[$country][$date]['policies']['s8']['v'],
                                't' => $daily[$country][$date]['policies']['s8']['t'],
                                's' => $latest[$country]['policies']['s8']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s8'] = [
                            'v' => $daily[$country][$date]['policies']['s8']['v'],
                            't' => $daily[$country][$date]['policies']['s8']['t'],
                            's' => $date,
                        ];
                    }
                }

                if($row[17] > 0)
                {
                    $daily[$country][$date]['policies']['s9'] = [
                            'v' => $row[17],
                            't' => '',
                    ];

                    if(isset($latest[$country]['policies']['s9']))
                    {
                        if(
                            $latest[$country]['policies']['s9']['v'] != $daily[$country][$date]['policies']['s9']['v']
                            || $latest[$country]['policies']['s9']['t'] != $daily[$country][$date]['policies']['s9']['t']
                        )
                        {
                            $latest[$country]['policies']['s9'] = [
                                'v' => $daily[$country][$date]['policies']['s9']['v'],
                                't' => $daily[$country][$date]['policies']['s9']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s9'] = [
                                'v' => $daily[$country][$date]['policies']['s9']['v'],
                                't' => $daily[$country][$date]['policies']['s9']['t'],
                                's' => $latest[$country]['policies']['s9']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s9'] = [
                            'v' => $daily[$country][$date]['policies']['s9']['v'],
                            't' => $daily[$country][$date]['policies']['s9']['t'],
                            's' => $date,
                        ];
                    }
                }

                if($row[18] > 0)
                {
                    $daily[$country][$date]['policies']['s10'] = [
                            'v' => $row[18],
                            't' => '',
                    ];

                    if(isset($latest[$country]['policies']['s10']))
                    {
                        if(
                            $latest[$country]['policies']['s10']['v'] != $daily[$country][$date]['policies']['s10']['v']
                            || $latest[$country]['policies']['s10']['t'] != $daily[$country][$date]['policies']['s10']['t']
                        )
                        {
                            $latest[$country]['policies']['s10'] = [
                                'v' => $daily[$country][$date]['policies']['s10']['v'],
                                't' => $daily[$country][$date]['policies']['s10']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s10'] = [
                                'v' => $daily[$country][$date]['policies']['s10']['v'],
                                't' => $daily[$country][$date]['policies']['s10']['t'],
                                's' => $latest[$country]['policies']['s10']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s10'] = [
                            'v' => $daily[$country][$date]['policies']['s10']['v'],
                            't' => $daily[$country][$date]['policies']['s10']['t'],
                            's' => $date,
                        ];
                    }
                }

                if($row[19] > 0)
                {
                    $daily[$country][$date]['policies']['s11'] = [
                            'v' => $row[19],
                            't' => '',
                    ];

                    if(isset($latest[$country]['policies']['s11']))
                    {
                        if(
                            $latest[$country]['policies']['s11']['v'] != $daily[$country][$date]['policies']['s11']['v']
                            || $latest[$country]['policies']['s11']['t'] != $daily[$country][$date]['policies']['s11']['t']
                        )
                        {
                            $latest[$country]['policies']['s11'] = [
                                'v' => $daily[$country][$date]['policies']['s11']['v'],
                                't' => $daily[$country][$date]['policies']['s11']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s11'] = [
                                'v' => $daily[$country][$date]['policies']['s11']['v'],
                                't' => $daily[$country][$date]['policies']['s11']['t'],
                                's' => $latest[$country]['policies']['s11']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s11'] = [
                            'v' => $daily[$country][$date]['policies']['s11']['v'],
                            't' => $daily[$country][$date]['policies']['s11']['t'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[20]) > 0)
                {
                    $daily[$country][$date]['policies']['s12'] = [
                            'v' => $row[20],
                            't' => '',
                    ];

                    if(isset($latest[$country]['policies']['s12']))
                    {
                        if(
                            $latest[$country]['policies']['s12']['v'] != $daily[$country][$date]['policies']['s12']['v']
                            || $latest[$country]['policies']['s12']['t'] != $daily[$country][$date]['policies']['s12']['t']
                        )
                        {
                            $latest[$country]['policies']['s12'] = [
                                'v' => $daily[$country][$date]['policies']['s12']['v'],
                                't' => $daily[$country][$date]['policies']['s12']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s12'] = [
                                'v' => $daily[$country][$date]['policies']['s12']['v'],
                                't' => $daily[$country][$date]['policies']['s12']['t'],
                                's' => $latest[$country]['policies']['s12']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s12'] = [
                            'v' => $daily[$country][$date]['policies']['s12']['v'],
                            't' => $daily[$country][$date]['policies']['s12']['t'],
                            's' => $date,
                        ];
                    }
                }

                if(strlen($row[21]) > 0)
                {
                    $daily[$country][$date]['policies']['s13'] = [
                            'v' => $row[21],
                            't' => '',
                    ];

                    if(isset($latest[$country]['policies']['s13']))
                    {
                        if(
                            $latest[$country]['policies']['s13']['v'] != $daily[$country][$date]['policies']['s13']['v']
                            || $latest[$country]['policies']['s13']['t'] != $daily[$country][$date]['policies']['s13']['t']
                        )
                        {
                            $latest[$country]['policies']['s13'] = [
                                'v' => $daily[$country][$date]['policies']['s13']['v'],
                                't' => $daily[$country][$date]['policies']['s13']['t'],
                                's' => $date,
                            ];
                        }
                        else {
                            $latest[$country]['policies']['s13'] = [
                                'v' => $daily[$country][$date]['policies']['s13']['v'],
                                't' => $daily[$country][$date]['policies']['s13']['t'],
                                's' => $latest[$country]['policies']['s13']['s'],
                            ];
                        }
                    }
                    else
                    {
                        $latest[$country]['policies']['s13'] = [
                            'v' => $daily[$country][$date]['policies']['s13']['v'],
                            't' => $daily[$country][$date]['policies']['s13']['t'],
                            's' => $date,
                        ];
                    }
                }

                $daily[$country][$date]['si'] = $row[25];
                $latest[$country]['si'] = $row[25];
            }
        }

        $data = [
            'key' => $key,
            'daily' => $daily,
            'latest' => $latest,
        ];
//
//
//
//        $result = array_diff(scandir(OXFORD_DATA), array('..', '.','README.md','.gitignore'));
//
//
//        $daily = [];
//        $key = [];
//        foreach($result AS $file_id => $file) {
//            if(substr($file,0,1) == 's')
//            {
//                $filename = OXFORD_DATA . $file;
//                $csv = array_map('str_getcsv', file($filename));
//                $filename = str_replace(OXFORD_DATA,'',$filename);
//                $filename = str_replace('.csv','',$filename);
//                $key[$file_id] = $filename;
//                $header = array_shift($csv); # remove column header
//                $csv = array_slice($csv,0,count($csv) - 3);
//
//                foreach ($csv AS $row) {
//                    foreach($row AS $index=>$value)
//                    {
//
//                        if($value > 0)
//                        {
//                            // Data - filename - country name - date = value
////                            $daily[$filename][$row[0]][$header[$index]] = $value;
//
//                            // data:  [country] [date] [stringencyindex]              = value
//                            // data:  [country] [date] [policynumber]    [policyname] = value
//                            $date = date('Y-m-d',strtotime($header[$index]));
//                            if($filename == 'stringencyindex')
//                            {
//                                $daily[$row[0]][$date]['stringencyindex'] = $value;
//                            }
//                            else
//                            {
//                                $policy = explode('_',$filename);
//                                $daily[$row[0]][$date]['policy'][$policy[0]][$policy[1]] = $value;
//                            }
//                        }
//                    }
//                }
//            }
//        }
//
//        $latest = [];
//        foreach($daily AS $country=>$country_row)
//        {
//            $last_date = array_slice($country_row,-1,1);
//            foreach($last_date AS $date => $date_row)
//            {
//                foreach($date_row['policy'] AS $policy_number=>$policy_row)
//                {
//                    foreach($policy_row AS $policy => $value)
//                    {
//                        $latest[$country]['policy'][$policy_number][$policy] = $value;
//                    }
//
//                }
//                if(isset($date_row['stringencyindex']))
//                {
//                    $latest[$country]['stringencyindex'] =
//                        $date_row['stringencyindex'];
//                }
//            }
//        }


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

    public function daily_ranking()
    {
        $filename = STATS . 'master.json';
        $file = fopen($filename,'r');
        $countries = json_decode(fread($file,filesize($filename)),true);
        $sort_yesterday = [];
        $sort_today = [];

        $data = [];
        $delta = true;
        foreach($countries AS $country_name => $country_row)
        {
            $today1 = array_pop($country_row['daily']);
            $today = array_pop($country_row['daily']);
            $yesterday = array_pop($country_row['daily']);
            $threedaysago = array_pop($country_row['daily']);

            if($country_name != 'Global')
            {
                $sort_3daysago['confirmed'][] = $threedaysago['total']['c'];
                $sort_3daysago['deaths'][] = $threedaysago['total']['d'];
                $sort_3daysago['recovered'][] = $threedaysago['total']['r'];


                if($delta)
                {
                    $sort_yesterday['confirmed'][] = $yesterday['total']['c'] - $threedaysago['total']['c'];
                    $sort_yesterday['deaths'][] = $yesterday['total']['d'] - $threedaysago['total']['d'];
                    $sort_yesterday['recovered'][] = $yesterday['total']['r'] - $threedaysago['total']['r'];
                    $sort_yesterday['confirmedSurge'][] = ($yesterday['total']['c'] - $threedaysago['total']['c'])/($threedaysago['total']['c'] != 0 ? $threedaysago['total']['c'] : 1);
                    $sort_yesterday['deathsSurge'][] = ($yesterday['total']['d'] - $threedaysago['total']['d'])/($threedaysago['total']['d'] != 0 ? $threedaysago['total']['d'] : 1);

                    $sort_today['confirmed'][] = $today['total']['c'] - $yesterday['total']['c'];
                    $sort_today['deaths'][] = $today['total']['d'] - $yesterday['total']['d'];
                    $sort_today['recovered'][] = $today['total']['r'] - $yesterday['total']['r'];
                    $sort_today['confirmedSurge'][] = ($today['total']['c'] - $yesterday['total']['c']) / ($yesterday['total']['c'] != 0 ? $yesterday['total']['c'] : 1);
                    $sort_today['deathsSurge'][] = ($today['total']['d'] - $yesterday['total']['d']) / ($yesterday['total']['d'] != 0 ? $yesterday['total']['d'] : 1);

                    $data[] = [
                        'name' => $country_name,
                        'confirmed' => $today1['total']['c'] - ($today1['total']['c'] == $today['total']['c'] ? $yesterday['total']['c'] : $today['total']['c']),
                        'confirmedTotal' => $today1['total']['c'],
                        'deaths' => $today1['total']['d'] - ($today1['total']['d'] == $today['total']['d'] ? $yesterday['total']['d'] : $today['total']['d']),
                        'deathsTotal' => $today1['total']['d'],
                        'recovered' => $today1['total']['r'] - ($today1['total']['r'] == $today['total']['r'] ? $yesterday['total']['r'] : $today['total']['r']),
                        'confirmedSurge' => ($today['total']['c'] - $yesterday['total']['c'])/($yesterday['total']['c'] != 0 ? $yesterday['total']['c'] : 1),
                        'deathsSurge' => ($today['total']['d'] - $yesterday['total']['d'])/($yesterday['total']['d'] != 0 ? $yesterday['total']['d'] : 1),
                        'movement' => [
                            'confirmed' => '',
                            'deaths' => '',
                            'recovered' => '',
                            'confirmedSurge' => '',
                            'deathsSurge' => '',
                        ]
                    ];
                }
                else
                {
                    $sort_yesterday['confirmed'][] = $yesterday['total']['c'];
                    $sort_yesterday['deaths'][] = $yesterday['total']['d'];
                    $sort_yesterday['recovered'][] = $yesterday['total']['r'];

                    $sort_today['confirmed'][] = $today['total']['c'];
                    $sort_today['deaths'][] = $today['total']['d'];
                    $sort_today['recovered'][] = $today['total']['r'];

                    $data[] = [
                        'name' => $country_name,
                        'confirmed' => $today['total']['c'],
                        'deaths' => $today['total']['d'],
                        'recovered' => $today['total']['r'],
                        'movement' => [
                            'confirmed' => '',
                            'deaths' => '',
                            'recovered' => '',
                        ]
                    ];
                }






            }
        }


        foreach(['confirmed','deaths','recovered','confirmedSurge','deathsSurge'] AS $field)
        {
            $sorted_yesterday = $data;
            $sorted_today = $data;

            // sorting magic
            array_multisort($sort_yesterday[$field], SORT_DESC,$sorted_yesterday);
            array_multisort($sort_today[$field], SORT_DESC,$sorted_today);



            foreach($data AS $index=>$row)
            {
                $key1 = array_search($row['name'],array_column($sorted_yesterday,'name'));

                $key2 = array_search($row['name'],array_column($sorted_today,'name'));

                // Yesterday is greater than today, i.e. went up in rank
                if($key1 > $key2)
                {
                    $data[$index]['movement'][$field] = 'up';
                }
                // Yesterday is less than today, i.e. went down in rank
                else if($key1 < $key2)
                {
                    $data[$index]['movement'][$field] = 'down';
                }
                // No movement
                else
                {
                    $data[$index]['movement'][$field] = 'equal';
                }
            }
        }



        return response($data)->setStatusCode(Response::HTTP_OK);
    }
}
