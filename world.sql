--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: world; Type: TABLE; Schema: public; Owner: joel
--

CREATE TABLE public.world (
    name character varying(50) NOT NULL,
    region character varying(60),
    area bigint,
    population bigint,
    gdp bigint,
    capital character varying(60)
);


ALTER TABLE public.world OWNER TO joel;

--
-- Data for Name: world; Type: TABLE DATA; Schema: public; Owner: joel
--

COPY public.world (name, region, area, population, gdp, capital) FROM stdin;
Afghanistan	Asia	652230	25500100	20364000000	Kabul
Albania	Europe	28748	2821977	12044000000	Tirana
Algeria	Africa	2381741	38700000	207021000000	Algiers
Andorra	Europe	468	76098	3222000000	Andorra la Vella
Angola	Africa	1246700	19183590	116308000000	Luanda
Antigua and Barbuda	Caribbean	442	86295	1176000000	St. John's
Argentina	South America	2780400	42669500	477028000000	Buenos Aires
Armenia	Eurasia	29743	3017400	9950000000	Yerevan
Australia	Oceania	7692024	23545500	1564419000000	Canberra
Austria	Europe	83871	8504850	394458000000	Vienna
Azerbaijan	Asia	86600	9477100	68727000000	Baku
Bahamas	Caribbean	\N	351461	8043000000	Nassau
Bahrain	Asia	765	1234571	30362000000	Manama
Bangladesh	Asia	147570	156557000	127195000000	Dhaka
Barbados	Caribbean	430	285000	4533000000	Bridgetown
Belarus	Europe	207600	9467000	63259000000	Minsk
Belgium	Europe	30528	11198638	483402000000	City of Brussels
Belize	North America	22966	349728	1554000000	Belmopan
Benin	Africa	112622	9988068	7557000000	Porto-Novo
Bhutan	Asia	38394	749090	1861000000	Thimphu
Bolivia	South America	1098581	10027254	27035000000	Sucre
Bosnia and Herzegovina	Europe	51209	3791622	17319000000	Sarajevo
Botswana	Africa	582000	2024904	14410000000	Gaborone
Brazil	South America	8515767	202794000	2254109000000	Brasília
Brunei	Asia	5765	393162	16954000000	Bandar Seri Begawan
Bulgaria	Europe	110879	7245677	50972000000	Sofia
Burkina Faso	Africa	272967	17322796	10687000000	Ouagadougou
Burundi	Africa	27834	9420248	2257000000	Bujumbura
Cambodia	Asia	181035	15184116	14038000000	Phnom Penh
Cameroon	Africa	475442	20386799	26094000000	Yaoundé
Canada	North America	9984670	35427524	1585000000000	Ottowa
Cape Verde	Africa	4033	491875	1903000000	Praia
Central African Republic	Africa	622984	4709000	2184000000	Bangui
Chad	Africa	1284000	13211000	10183000000	N'Djamena
Chile	South America	756102	17773000	268314000000	Santiago
China	Asia	9596961	1365370000	8358400000000	Beijing
Colombia	South America	1141748	47662000	369813000000	Bogotá
Comoros	Africa	1862	743798	616000000	Moroni
Congo, Democratic Republic of	Africa	\N	69360000	\N	Kinshasa
Congo, Republic of	Africa	342000	4559000	\N	Brazzaville
Costa Rica	North America	51100	4667096	45107000000	San José
Croatia	Europe	56594	4290612	56447000000	Zagreb
Cuba	Caribbean	109884	11167325	71017000000	Havana
Cyprus	Asia	9251	865878	22768000000	Nicosia
Czech Republic	Europe	78865	10517400	196446000000	Prague
Côte d'Ivoire	Africa	\N	\N	\N	Yamoussoukro
Denmark	Europe	43094	5634437	314889000000	Copenhagen
Djibouti	Africa	23200	886000	1361000000	Djibouti
Dominica	Caribbean	751	71293	499000000	Roseau
Dominican Republic	Caribbean	48671	9445281	58898000000	Santo Domingo
Ecuador	South America	276841	15774200	87495000000	Quito
Egypt	Asia	1002450	86736900	254671000000	Cairo
El Salvador	North America	21041	6384000	23864000000	San Salvador
Equatorial Guinea	Africa	28051	1622000	14491000000	Malabo
Eritrea	Africa	117600	6536000	3108000000	Asmara
Estonia	Europe	45227	1315819	22376000000	Tallinn
Ethiopia	Africa	1104300	87952991	41605000000	Addis Ababa
Fiji	Oceania	18272	858038	3999000000	Suva
Finland	Europe	338424	5458038	247389000000	Helsinki
France	Europe	640679	65906000	2611221000000	Paris
Gabon	Africa	267668	1711000	24076000000	Libreville
Gambia	Africa	11295	1882450	\N	Banjul
Georgia	Asia	69700	4490500	15830000000	Tbilisi
Germany	Europe	357114	80716000	3425956000000	Bonn
Ghana	Africa	238533	27043093	40711000000	Accra
Greece	Europe	131990	11123034	248941000000	Athens
Grenada	Caribbean	344	103328	783000000	St. George's
Guatemala	North America	108889	15806675	50377000000	Guatemala City
Guinea	Africa	245857	10824200	6092000000	Conakry
Guinea-Bissau	Africa	36125	1746000	849000000	Bissau
Guyana	South America	214969	784894	2851000000	Georgetown
Haiti	Caribbean	27750	10413211	7187000000	Port-au-Prince
Honduras	North America	112492	8555072	18564000000	Tegucigalpa
Hungary	Europe	93028	9879000	124600000000	Budapest
Iceland	Europe	103000	326340	13579000000	Reykjavík
India	Asia	3166414	1246160000	1875213000000	New Delhi
Indonesia	Asia	1904569	252164800	878043000000	Jakarta
Iran	Asia	1648195	77552000	551588000000	Tehran
Iraq	Asia	438317	36004552	149370000000	Baghdad
Ireland	Europe	70273	4593100	210638000000	Dublin
Israel	Asia	20770	8193900	241069000000	Jerusalem
Italy	Europe	301336	60782668	2013392000000	Rome
Jamaica	Caribbean	10991	2717991	14795000000	Kingston
Japan	Asia	377930	127090000	5960180000000	Imperial Tokyo
Jordan	Asia	89342	6602190	30937000000	Amman
Kazakhstan	Europe	2724900	17244000	202656000000	Astana
Kenya	Africa	580367	45546000	40697000000	Nairobi
Kiribati	Oceania	811	106461	176000000	South Tarawa
Kuwait	Asia	17818	3065850	183219000000	Kuwait City
Kyrgyzstan	Asia	199951	5776570	6475000000	Bishkek
Laos	Asia	236800	6580800	9100000000	Vientiane
Latvia	Europe	64559	1996500	28379000000	Riga
Lebanon	Asia	10452	4966000	42490000000	Beirut
Lesotho	Africa	30355	2098000	2443000000	Maseru
Liberia	Africa	111369	4397000	1491000000	Monrovia
Libya	Africa	1759540	6253000	95802000000	Tripoli
Liechtenstein	Europe	160	37132	5827000000	Vaduz
Lithuania	Europe	65300	2939431	42339000000	Vilnius
Luxembourg	Europe	2586	549700	55143000000	Luxembourg
Macedonia	Europe	25713	2062294	\N	Skopje
Madagascar	Africa	587041	21263403	9968000000	Antananarivo
Malawi	Africa	118484	16829000	5653000000	Lilongwe
Malaysia	Asia	330803	30177000	304726000000	Kuala Lumpur
Maldives	Asia	300	317280	2606000000	Malé
Mali	Africa	1240192	15768000	10262000000	Bamako
Malta	Europe	316	416055	8775000000	Valletta
Marshall Islands	Oceania	181	56086	198000000	Majuro
Mauritania	Africa	1030700	3461041	3866000000	Nouakchott
Mauritius	Africa	2040	1257900	11452000000	Port Louis
Mexico	North America	1964375	119713203	1183655000000	Mexico City
Micronesia, Federated States of	Oceania	\N	101351	327000000	Palikir
Moldova	Europe	33846	3557600	7253000000	Chișinău
Monaco	Europe	2	36950	5707000000	Monaco-Ville
Mongolia	Asia	1564110	2931300	10271000000	Ulaanbaatar
Montenegro	Europe	13812	620029	4046000000	Podgorica
Morocco	Africa	446550	33307500	95992000000	Rabat
Mozambique	Africa	801590	23700715	14605000000	Maputo
Myanmar	Asia	676578	61120000	59444000000	Naypyidaw
Namibia	Africa	825615	2113077	12807000000	Windhoek
Nauru	Oceania	21	9945	121000000	Yaren District
Nepal	Asia	147181	26494504	18029000000	Kathmandu
Netherlands	Europe	41543	16857500	800535000000	Amsterdam
New Zealand	Oceania	270467	4538520	171256000000	Wellington
Nicaragua	North America	130373	6071045	10508000000	Managua
Niger	Africa	1267000	17138707	6773000000	Niamey
Nigeria	Africa	923768	178517000	286470000000	Abuja
North Korea	Asia	120538	25027000	14411000000	Pyongyang
Norway	Europe	323802	5124383	499667000000	Oslo
Oman	Asia	309500	4020000	78111000000	Muscat
Pakistan	Asia	881912	188020000	215117000000	Islamabad
Palau	Oceania	459	20901	213000000	Ngerulmud
Panama	North America	75417	3405813	36253000000	Panama City
Papua New Guinea	Oceania	462840	7398500	15677000000	Port Moresby
Paraguay	South America	406752	6783374	25935000000	Asunción
Peru	South America	1285216	30475144	204681000000	Lima
Philippines	Asia	342353	99804200	250182000000	Manila
Poland	Europe	312679	38496000	489852000000	Warsaw
Portugal	Europe	92090	10477800	212139000000	Lisbon
Qatar	Asia	11586	2174035	192402000000	Doha
Romania	Europe	238391	19942642	169396000000	Bucharest
Russia	Eurasia	17125242	146000000	2029812000000	Moscow
Rwanda	Africa	26338	10537222	7103000000	Kigali
Saint Kitts and Nevis	North America	261	55000	765000000	Basseterre
Saint Lucia	Caribbean	616	180000	1318000000	Castries
Saint Vincent and the Grenadines	South America	389	109000	694000000	Kingstown
Samoa	Oceania	2842	187820	681000000	Apia
San Marino	Europe	61	32637	1853000000	San Marino
Sao Tomé and Príncipe	Africa	\N	\N	\N	São Tomé
Saudi Arabia	Asia	2149690	29994272	711050000000	Riyadh
Senegal	Africa	196722	12873601	13962000000	Dakar
Serbia	Europe	88361	7181505	38491000000	Belgrade
Seychelles	Africa	452	90945	1031000000	Victoria
Sierra Leone	Africa	71740	6190280	43366000000	Freetown
Singapore	Asia	710	5399200	276520000000	Singapore
Slovakia	Europe	49037	5415949	91349000000	Bratislava
Slovenia	Europe	20273	2063151	45380000000	Ljubljana
Solomon Islands	Oceania	28896	581344	1010000000	Honiara
Somalia	Africa	637657	10806000	1306000000	Mogadishu
South Africa	Africa	1221037	52981991	384313000000	Pretoria
South Korea	Asia	100210	50423955	1129598000000	Seoul
South Sudan	Africa	619745	11739000	10060000000	Juba
Spain	Europe	505992	46609700	1322126000000	Madrid
Sri Lanka	Asia	65610	20277597	59421000000	Sri Jayawardenepura Kotte
Sudan	Africa	1886068	37289406	51453000000	Khartoum
Suriname	South America	163820	534189	5012000000	Paramaribo
Swaziland	Africa	17364	1268000	3861000000	Lobamba
Sweden	Europe	450295	9675885	523804000000	Stockholm
Switzerland	Europe	41284	8160900	631183000000	Bern
Syria	Asia	185180	21987000	46540000000	Damascus
Taiwan	Asia	36193	23386883	\N	Taipei
Tajikistan	Asia	143100	8160000	7633000000	Dushanbe
Tanzania	Africa	945087	44928923	28249000000	Dodoma
Thailand	Asia	513120	64456700	385694000000	Bangkok
Timor-Leste	Asia	14874	1212107	5387000000	Dili
Togo	Africa	56785	6993000	3917000000	Lomé
Tonga	Oceania	747	103036	465000000	Nuku'alofa
Trinidad and Tobago	Caribbean	5130	1328019	23225000000	Port of Spain
Tunisia	Africa	163610	10886500	45132000000	Tunis
Turkey	Asia	783562	76667864	788299000000	Ankara
Turkmenistan	Asia	488100	5307000	33466000000	Aşgabat
Tuvalu	Oceania	26	11323	40000000	Funafuti
Uganda	Africa	241550	35357000	21736000000	Kampala
Ukraine	Europe	603500	43009258	176309000000	Kiev
United Arab Emirates	Asia	83600	9446000	383799000000	Abu Dhabi
United Kingdom	Europe	242900	64105700	2471600000000	London
United States	North America	9826675	318320000	16244600000000	Washington, D.C.
Uruguay	South America	181034	3286314	49919000000	Montevideo
Uzbekistan	Asia	447400	30492800	51414000000	Tashkent
Vanuatu	Oceania	12189	264652	752000000	Port Vila
Vatican City	Europe	0	839	\N	\N
Venezuela	South America	916445	28946101	382424000000	Caracas
Vietnam	Asia	331212	89708900	155820000000	Hanoi
Yemen	Asia	527968	25235000	32831000000	Sana‘a
Zambia	Africa	752612	15023315	21490000000	Lusaka
Zimbabwe	Africa	390757	13061239	9802000000	Harare
\.


--
-- Name: world world_pkey; Type: CONSTRAINT; Schema: public; Owner: joel
--

ALTER TABLE ONLY public.world
    ADD CONSTRAINT world_pkey PRIMARY KEY (name);


--
-- Name: world_region_idx; Type: INDEX; Schema: public; Owner: joel
--

CREATE INDEX world_region_idx ON public.world USING btree (region);


--
-- PostgreSQL database dump complete
--

