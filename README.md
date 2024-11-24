# For contributors:
**By submitting a pull request to this project, 
you agree to license your contribution under the MIT license 
to this project.**


# 1. Hvað er JS Gröf?
JS Gröf er einfalt og þægilegt library til að búa til gröf með Javascript. Library-ið notar canvas nóðuna til þess að teikna **línurit**, **punktarit**, **skífurit**, **súlurit** og **tíðnirit**. Aðeins þarf að taka fram id á canvas nóðu úr HTML skjalinu og gögn sem birta á á grafinu ásamt einhverjum sniðugum aukastillingum sem library-ið leyfir. Hægt er að 'animate'-a gröfin og bíður library-ið uppá ýmsa valmöguleika hvað það varðar.

# 2. Aðgengni (accessibility)
## Munum að huga að aðgengnismálum. 
JS Gröf er ekki útbúið sérstaklega fyrir aðgengilegar síður og því ekki ætlað fyrir slíkt.

# 3. Verkefni sem nota JS Gröf
Eins og er þá eru engin verkefni sem nota JS Gröf sem við vitum um.

*Ert þú að nota JS Gröf í verkefninu þínu og vilt að það birtist hér? Endilega láttu okkur vita!*

# 4. Einfalt sýnidæmi
Hér fyrir neðan er einfalt dæmi um hvernig hægt væri að birta súlurit með þremur súlum. 
Súluritin eru búin til með ```BarChart``` smiðnum sem tekur inn **id á canvas nóðu**, **gögn**, og nokkra **aukavalmöguleika**.

```javascript
let chart = new JSGrof.BarChart(
	'canvas-id',
	{
		'Eitt': 10,
		'Tvö': 15,
		'Þrjú': 20
	},
	{
		title: 'Súlurit',
		min: 0,
		labelY: 'y gildi',
		resizeListener: true
	}
);
```

Hér eru teknir fram aukavalmöguleikarnir ```title``` sem segir til um titil grafsins, ```min``` sem segir til um minnsta gildi á y-ás, ```labelY``` sem segir til um merkingu/breytu á y-ás, og ```resizeListener``` sem segir til um hvort það eigi að hlusta eftir ```resize``` atburðum á glugganum og skala/teikna grafið aftur eftir þörfum.

<img width="300" alt="Súlurit með þremur súlum sem hafa nöfnin og gildin 'Eitt': 10, 'Tvö': 15 og 'Þrjú': 20. Súluritið hefur titilinn 'Súlurit', y ásinn fer frá 0 og uppí 20 og er merktur sem 'y gildi'" src="https://github.com/user-attachments/assets/857636d6-964f-46d6-a26f-94d2fd71797a">


# 5. Hvernig er best að byrja?
Einfaldast er að byrja með einföld HTML, CSS og Javascript skjöl (t.d. index.html, styles.css og main.js). Næst er að tengja skrárnar í HTML skjalinu. Í index.html er búin til canvas nóða með eitthvað id og henni gefin einhver breidd og hæð í styles.css. Í main.js er síðan náð í einhverja af smiðunum eða breytunum úr gröf.js, t.d. svona:

```javascript
const {
	LineChart,
	BarChart,
	PieChart,
	HistoChart,
	CHART_CONSTANTS
} = JSGrof;
```

Athugið að orðið ```JSGrof``` er hér frátekið í gröf.js og því þarf að passa að nota það ekki í annað. Þegar búið er að sækja smiðinn er einfalt að byrja að nota hann en fyrst þurfum við að útbúa einhver gögn. ```LineChart``` smiðurinn tekur við gögnum á forminu:

```javascript
{
	'fall1': [[x1, y1], [x2, y2]...],
	'fall2': [[x1, y1], [x2, y2]...],
	...
}
```

Við getum t.d. notað:

```javascript
let data = {
	'f': [
		[ 0, 0 ],
		[ 1, 1.5 ],
		[ 2, 2.5 ]
	]
};
```

Að lokum er kallað á smiðinn. Án þess að taka fram neinar aukastillingar væri það gert svona:

```javascript
let chart = new LineChart(
	canvasId,
	data
);
```

<img width="300" alt="Línurit sem sýnir fallið f í data sem skilgreint var fyrir ofan. y ás fer frá 0 uppí 2,5. x ás fer frá 0 og uppí 2." src="https://github.com/user-attachments/assets/383a23e5-23af-407f-ba2a-422391b51ade">


Eins og er þá er þetta kannski ekki svo spennandi graf en við getum breytt því með því að taka fram einhverjar stillingar, t.d. svona:



```javascript
let chart = new LineChart(
	canvasId,
	data,
	{
		title: 'Línurit (dæmi)',
		labelY: 'y ás',
		labelX: 'x ás',
		bgColor: '#F9F9F9',
		strokeColor: '#000000',
		dataColors: ['#0077FF'],
		legend: true,
		resizeListener: true,
		interactive: true,
		interactivityPrecisionX: 2,
		interactivityPrecisionY: 1,
		tickSuffixY: ' þús.',
		floatFormat: '.,',
		gridY: true,
		fontSize: 9,
		chartPaddingLeft: 0.2,
		areaUnder: true
	}
);
```

<img width="300" alt="Línurit sem sýnir fallið f í data sem skilgreint var fyrir ofan. y ás fer frá 0 uppí 2,5 og er talinn í þúsundum. x ás fer frá 0 uppí 2. y ás hefur merkinguna 'y ás' og x ás merkinguna 'x ás'. Grafið hefur titilinn 'Línurit (dæmi)'. Undir grafinu er legend þar sem sýnt er að fallið f sé teiknað með bláum lit. Einnig er svæðið undir f ljósblátt. Stikur y áss eru framlengdar yfir grafið. Línuritið hefur bakgrunnslit sem er ljósgrár og línurnar eru svartar. Fleytitölur hafa punkt sem þúsundaskiptingu og kommu til að skilja milli heiltölu og brots." src="https://github.com/user-attachments/assets/770c5a99-81f2-43d9-a080-a40942379048">



Athugið að hér er línuritið gert gagnvirkt með ```interactive``` stikanum og þá er hlustað eftir ```mousemove``` atburðum á ```canvas``` nóðunni og brugðist við þeim með því að sýna gildi viðeigandi punkta línuritsins.

# 6. Nánari skjölun
Nánari skjölun á **línuritum**, **súluritum**, **skífuritum**, **animations**, **gagnvirkni**, **föstum**, og **skalanleika** má sjá undir **Wiki** flipanum.
