# For contributors:
**By submitting a pull request to this project, 
you agree to license your contribution under the MIT license 
to this project.**


# 1. Hvað er JS Gröf?
JS Gröf er einfalt og þægilegt viðmót til að búa til gröf á vefsíðum. Viðmótið notar canvas nóðuna til þess að teikna **línurit**, **punktarit**, **skífurit**, **súlurit** og **tíðnirit**. Aðeins þarf að taka fram id á canvas nóðu úr HTML skjalinu og gögn sem birta á á grafinu ásamt einhverjum sniðugum aukastillingum sem viðmótið leyfir. Hægt er að 'animate'-a gröfin og bíður viðmótið uppá ýmsa valmöguleika hvað það varðar.

# 2. Aðgengni (accessibility)
## Munum að huga að aðgengnismálum. 
Forðast ætti að nota JS Gröf á aðgengilegum (accessible) vefum og
að minnsta kosti ætti að gera það sem notað er aðgengilegra með t.d. lýsingum, andstæðum litum, og fleiru.

# 3. Síður sem nota JS Gröf
Eins og er þá eru engar síður að nota JS Gröf sem við vitum um.

*Ert þú að nota JS Gröf á síðunni þinni og vilt að hún birtist hér? Endilega láttu okkur vita!*

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

Eins og er þá er þetta kannski ekki svo spennandi graf en við getum breytt því með því að taka fram einhverjar stillingar, t.d. svona:

```javascript
let chart = new LineChart(
	canvasId,
	data,
	{
		title: 'Dæmi',
		labelY: 'y ás',
		labelX: 'x ás',
		bgColor: '#222222',
		dataColors: ['#FF9999'],
		legend: true,
		resizeListener: true,
		tickSuffixY: ' þús.',
		chartPaddingLeft: 0.2
	}
);
```

# 6. Línurit (```LineChart```)

Línuritin geta birt bæði punkta og línur milli hnita. Ásarnir eru skalaðir sjálfkrafa og eru þau því mjög þægileg í notkun.

## 6.1. Dæmi
```javascript
let linurit = new LineChart(
	'linurit-canvas',
	data,
	{
		points: false,
		legend: true,
		title: 'Hornaföll',
		labelY: 'f(x)',
		tickSpacingX: Math.PI / 2,
		maxX: Math.PI * 2,
		axisLabels: [
			'0', '1/2 pi',
			'pi', '3/2 pi', '2pi'
		],
		areaUnder: true,
		resizeListener: true,
		interactive: true,
		interactivityPrecisionX: 2,
		interactivityPrecisionY: 2
	}
);
```

## 6.2. ```LineChart``` smiðurinn

```LineChart```smiðurinn tekur inn 


| Nafn breytu   |	Tegund  |	Lýsing			| Form	|
|:--------------|:--------------|:------------------------------|:------|
| ```id``` 	| String	| id á canvas nóðu	| ```'canvas-id'```	|
| ```data```	| Object	| Gögn sem á að teikna línurit af. | ```{'fall1': [[x1, y1], [x_2, y_2], ...], 'fall2': ...}``` |
| ```options``` (valkvæmt) | Object	| Stillingar á grafinu. | ```{stilling1: ..., stilling2: ..., ...}``` |



## 6.3 Mögulegar stillingar

Mögulegar stillingar eru

| 	Stilling   	|	Tegund  	|		Lýsing			|
|:----------------------|:----------------------|:--------------------------------------|
|title|String|Titill á grafinu|
|labelX|String|Nafn á x-ás|
|labelY|String|Nafn á y-ás|
|legend|Boolean|Hvort hafa eigi með legend|
|legendType|String|Hvaða tegund af legend. Möguleikar eru "topRight" og "bottom" (sjálfgefið)|
|grid|Boolean|Hvort framlengja eigi stikur á x-ás og y-ás yfir grafið|
|gridX, gridY|Boolean|Hvort framlengja eigi stikur á x-ás eða y-ás yfir grafið|
|minX, maxX, minY, maxY|Number|Stillir lágmörk og hámörk á ásum grafsins.|
|tickSpacingX, tickSpacingY|Number|Bil milli stika á ásum.|
|fontSize|Number|Leturstærð grafsins þegar breidd þess er jöfn dynamicFontSizeCenter ef kveikt er á dynamicFontSize, annars föst leturstærð grafsins.|
|dynamicFontSize|Boolean|Hvort leturstærðin eigi að ákvarðast af stærð grafsins þegar teiknað er (sjálfgefið true).|dynamicFontSizeCenter|Number|Hver á breidd grafsins að vera þegar leturstærðin er fontSize.|
|titleSize|Number|Margfaldast við leturstærðina til að mynda nýja leturstærð fyrir titils grafsins.|
|chartPaddingLeft, chartPaddingRight, chartPaddingTop, chartPaddingBottom|Number|Gildi milli 0 og 1 sem segir til um hve mikið pláss verður utan við grafið á tiltekinni hlið.|
|bgColor|String|Hex gildi með 6 tölustöfum (t.d. '#FFFFFF') sem segir til um bakgrunnslit grafsins. Sé þessi stiki null þá verður ekki teiknaður bakgrunnur.|
|dataColors|Array|Fylki með hex strengjum með 6 tölustöfum (t.d. '#FFFFFF') sem segir til um liti fallana á grafinu.|
|axisColor|String|Hex gildi með 6 tölustöfum (t.d. '#FFFFFF') sem segir til um liti ása grafsins.|
|strokeColor|String|Hex gildi með 6 tölustöfum (t.d. '#FFFFFF') sem segir til um liti strika grafinu.|
|resolutionUpscale|Number|Stiki sem segir til um hve mikið á að margfalda upplausn grafsins (í öðru veldi). Alls ekki hafa þennan stika of háan.|
|lines|Boolean eða Array|Segir til um hvort teikna eigi línur milli hnita fallana. Getur verið annað hvort Boolean gildi og gildir þá um öll föllin eða fylki þar sem hvert Boolean stak nr. i gildir um fall nr. i.|
|points|Boolean eða Array|Segir til um hvort teikna eigi punkta á hnitum fallana. Getur verið annað hvort Boolean gildi og gildir þá um öll föllin eða fylki þar sem hvert Boolean stak nr. i gildir um fall nr. i.|
|axisLabels|Array|Strengja fylki sem verður notað til merkinga stika á x-ás. Getur verið smá vesen að fá þetta til að virka rétt. Það þarf að stilla minX, maxX og tickSpacingX rétt (maxX - minX = tickSpacingX * (length(axisLabels)-1)).|
|animated|Boolean|Hvort það eigi að animate-a grafið.|
|lineWidth|Number|Gildi milli 0.01 og 100 sem segir til um þykkt lína grafsins|
|resizeListener|Boolean|Segir til um hvort hlusta eigi eftir ```resize```atburðum á glugganum og bregðast við því með því að skala og teikna grafið aftur.|
|tickSuffixX|String|Viðskeyti aftan á stika x-áss|
|tickSuffixY|String|Viðskeyti aftan á stika y-áss|
|tickSuffix|String|Viðskeyti aftan á stika grafsins|
|areaUnder|Boolean|Hvort fylla eigi svæðið undir ferlinum|
|interactive|Boolean|Hvort grafið eigi að vera gagnvirkt.|
|interactivityPrecisionX|Number|Hver er nákvæmnin sem gagnvirknin sýnir fyrir hvern punkt í x-stefnu|
|interactivityPrecisionY|Number|Hver er nákvæmnin sem gagnvirknin sýnir fyrir hvern punkt í y-stefnu|
|floatFormat|String|Hvernig á að hafa formið á fleytitölum. Möguleikar eru ```','```(, fyrir framan aukastafina) ```',.'```((. fyrir framan aukastafina og , í þúsundaskiptingum)) ```'.,'```(, fyrir framan aukastafina og . í þúsundaskiptingum) og ```'.'```(. fyrir framan aukastafina) |


## 6.4 ```axisLabels``` stillingin

Með ```axisLabels``` stillingunni er hægt að birta sérsniðnar merkingar á x-ásnum. Það getur verið smá maus að fá stillinguna til að virka en hér dæmi:

```javascript
let theLinechart = new LineChart(
	'linechart-id',
	{
		'heitt': Array.from(Array(12).keys()).map((i) =>
			[i, 20*Math.sin((i+0.5)/24 * Math.PI*2) - 5]
		),
		'kalt': Array.from(Array(12).keys()).map((i) =>
			[i, 20*Math.sin((i+0.5)/24 * Math.PI*2) - 10]
		)
	},
	{
		title: 'Hitastig',
		labelX: 'Mánuður',
		labelY: 'Hitastig [C°]',
		axisLabels: [
			'Jan', 'Feb', 'Mar', 'Apr',
			'Maí', 'Jún', 'Júl', 'Ágú',
			'Sep', 'Okt', 'Nóv', 'Des'
		],
		dataColors: ['#FF0000', '#0000FF'],
		minX: 0,
		maxX: 11,
		tickSpacingX: 1,
		resizeListener: true,
		interactive: true,
		interactivityPrecisionX: 0,
		interactivityPrecisionY: 1
	}
);
```


Athugið að hér ættu gögnin þá að hafa x-gildi milli 0 og 11. Í þessu tilfelli er t.d. fyrsti punkturinn með x-gildið 0 sem samsvarar Jan í axisLabels fylkinu. Til þess að fá punkt með x-gildi milli Jan og Feb væri hægt að nota x-gildið 0.5.
