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
	{
		'sin(x)': Array.from(Array(101).keys()).map((i) => [i/100 * Math.PI*2, Math.sin(i*Math.PI*2/100)]),
		'cos(x)': Array.from(Array(101).keys()).map((i) => [i/100 * Math.PI*2, Math.cos(i*Math.PI*2/100)])
	},
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
|dynamicFontSize|Boolean|Hvort leturstærðin eigi að ákvarðast af stærð grafsins þegar teiknað er (sjálfgefið true).|
|dynamicFontSizeCenter|Number|Hver á breidd grafsins að vera þegar leturstærðin er fontSize.|
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

# 7. Skífurit (```PieChart```)

## 7.1. Dæmi

```javascript
let skifurit = new PieChart(
	'skifurit-canvas',
	{
		'Bananar': 10,
		'Epli': 30,
		'Appelsínur': 25,
		'Ananas': 20,
		'Mangó': 30,
		'Ferskjur': 15
	},
	{
		title: 'Ávextir',
		legend: true,
		dataLabels: true,
		innerLabels: true,
		fontSize: 12,
		chartPaddingLeft: 0,
		chartPaddingBottom: 0.05,
		resizeListener: true,
		interactive: true,
		interactivityPercentagePrecision: 2
	}
);
```

## 7.2. ```PieChart``` smiðurinn

```PieChart```smiðurinn tekur inn 


| Nafn breytu   |	Tegund  |	Lýsing			| Form	|
|:--------------|:--------------|:------------------------------|:------|
| ```id``` 	| String	| id á canvas nóðu	| ```'canvas-id'```	|
| ```data```	| Object	| Gögn sem á að teikna skífurit af. | ```{'Hópur 1': x1, 'Hópur 2': x2, ...}``` |
| ```options``` (valkvæmt) | Object	| Stillingar á grafinu. | ```{stilling1: ..., stilling2: ..., ...}``` |

## 7.3 Mögulegar stillingar

Mögulegar stillingar eru

| 	Stilling   	|	Tegund  	|		Lýsing			|
|:----------------------|:----------------------|:--------------------------------------|
|title|String|Titill á grafinu|
|legend|Boolean|Hvort hafa eigi með legend|
|legendType|String|Hvaða tegund af legend. Möguleikar eru "topRight" (sjálfgefið) og "bottom"|
|fontSize|Number|Leturstærð grafsins þegar breidd þess er jöfn dynamicFontSizeCenter ef kveikt er á dynamicFontSize, annars föst leturstærð grafsins.|
|dynamicFontSize|Boolean|Hvort leturstærðin eigi að ákvarðast af stærð grafsins þegar teiknað er (sjálfgefið true).|
|dynamicFontSizeCenter|Number|Hver á breidd grafsins að vera þegar leturstærðin er fontSize.|
|titleSize|Number|Margfaldast við leturstærðina til að mynda nýja leturstærð fyrir titils grafsins.|
|chartPaddingLeft, chartPaddingRight, chartPaddingTop, chartPaddingBottom|Number|Gildi milli 0 og 1 sem segir til um hve mikið pláss verður utan við grafið á tiltekinni hlið.|
|bgColor|String|Hex gildi með 6 tölustöfum (t.d. '#FFFFFF') sem segir til um bakgrunnslit grafsins. Sé þessi stiki null þá verður ekki teiknaður bakgrunnur.|
|dataColors|Array|Fylki með hex strengjum með 6 tölustöfum (t.d. '#FFFFFF') sem segir til um liti fallana á grafinu.|
|strokeColor|String|Hex gildi með 6 tölustöfum (t.d. '#FFFFFF') sem segir til um liti strika grafinu.|
|resolutionUpscale|Number|Stiki sem segir til um hve mikið á að margfalda upplausn grafsins (í öðru veldi). Alls ekki hafa þennan stika of háan.|
|animated|Boolean|Hvort það eigi að animate-a grafið.|
|lineWidth|Number|Gildi milli 0.01 og 100 sem segir til um þykkt lína grafsins|
|resizeListener|Boolean|Segir til um hvort hlusta eigi eftir ```resize```atburðum á glugganum og bregðast við því með því að skala og teikna grafið aftur.|
|interactive|Boolean|Hvort grafið eigi að vera gagnvirkt.|
|interactivityPercentagePrecision|Number|Gildi milli 0 og 100 sem segir til um hve margir aukastafir eiga að vera með í prósentunni þegar gagnvirknin sýnir hana.|
|floatFormat|String|Hvernig á að hafa formið á fleytitölum. Möguleikar eru ```','```(, fyrir framan aukastafina) ```',.'```((. fyrir framan aukastafina og , í þúsundaskiptingum)) ```'.,'```(, fyrir framan aukastafina og . í þúsundaskiptingum) og ```'.'```(. fyrir framan aukastafina) |
|dataLabels|Boolean|Hvort hafa eigi gildi hvers hóps með inná grafinu.|
|innerLabels|Boolean|Hvort gildin eigi að vera innan eða utan skífunar.|
|percentage|Boolean|Hvort hafa eigi með hlutfall gildi hópsins af heildinni.|
|percentagePrecision|Number|Gildi milli 0 og 100 sem segir til um hve margir aukastafir eiga að vera með í prósentunni.|



# 8. Súlurit (```BarChart```)

## 8.1. Dæmi
```javascript
let sulurit = new BarChart(
	'sulurit-canvas',
	{
		'Bananar': 10,
		'Epli': 30,
		'Appelsínur': 25,
		'Ananas': 20,
		'Mangó': 30,
		'Ferskjur': 15
	},
	{
		title: 'Ávextir',
		labelY: 'Fjöldi',
		min: 0,
		resizeListener: true,
		dataLabels: true
	}
);

sulurit.canvas.onclick = (e) => {
	sulurit.animate({'duration': 1});
};
```

## 8.2 ```BarChart``` smiðurinn

```BarChart```smiðurinn tekur inn 


| Nafn breytu   |	Tegund  |	Lýsing			| Form	|
|:--------------|:--------------|:------------------------------|:------|
| ```id``` 	| String	| id á canvas nóðu	| ```'canvas-id'```	|
| ```data```	| Object	| Gögn sem á að teikna súlurit af. | ```{'Hópur 1': x1, 'Hópur 2': x2, ...}``` |
| ```options``` (valkvæmt) | Object	| Stillingar á grafinu. | ```{stilling1: ..., stilling2: ..., ...}``` |

## 8.3 Mögulegar stillingar

Mögulegar stillingar eru

| 	Stilling   	|	Tegund  	|		Lýsing			|
|:----------------------|:----------------------|:--------------------------------------|
|title|String|Titill á grafinu|
|labelX|String|Nafn á x-ás|
|labelY|String|Nafn á y-ás|
|grid|Boolean|Hvort framlengja eigi stikur á y-ás yfir grafið|
|gridY|Boolean|Hvort framlengja eigi stikur á y-ás yfir grafið|
|min, max |Number|Stillir lágmörk og hámörk á y-ás grafsins.|
|tickSpacingY|Number|Bil milli stika á y-ás.|
|fontSize|Number|Leturstærð grafsins þegar breidd þess er jöfn dynamicFontSizeCenter ef kveikt er á dynamicFontSize, annars föst leturstærð grafsins.|
|dynamicFontSize|Boolean|Hvort leturstærðin eigi að ákvarðast af stærð grafsins þegar teiknað er (sjálfgefið true).|
|dynamicFontSizeCenter|Number|Hver á breidd grafsins að vera þegar leturstærðin er fontSize.|
|titleSize|Number|Margfaldast við leturstærðina til að mynda nýja leturstærð fyrir titils grafsins.|
|chartPaddingLeft, chartPaddingRight, chartPaddingTop, chartPaddingBottom|Number|Gildi milli 0 og 1 sem segir til um hve mikið pláss verður utan við grafið á tiltekinni hlið.|
|bgColor|String|Hex gildi með 6 tölustöfum (t.d. '#FFFFFF') sem segir til um bakgrunnslit grafsins. Sé þessi stiki null þá verður ekki teiknaður bakgrunnur.|
|dataColors|Array|Fylki með hex strengjum með 6 tölustöfum (t.d. '#FFFFFF') sem segir til um liti fallana á grafinu.|
|axisColor|String|Hex gildi með 6 tölustöfum (t.d. '#FFFFFF') sem segir til um liti ása grafsins.|
|strokeColor|String|Hex gildi með 6 tölustöfum (t.d. '#FFFFFF') sem segir til um liti strika grafinu.|
|resolutionUpscale|Number|Stiki sem segir til um hve mikið á að margfalda upplausn grafsins (í öðru veldi). Alls ekki hafa þennan stika of háan.|
|animated|Boolean|Hvort það eigi að animate-a grafið.|
|lineWidth|Number|Gildi milli 0.01 og 100 sem segir til um þykkt lína grafsins|
|resizeListener|Boolean|Segir til um hvort hlusta eigi eftir ```resize```atburðum á glugganum og bregðast við því með því að skala og teikna grafið aftur.|
|tickSuffixY|String|Viðskeyti aftan á stika y-áss|
|tickSuffix|String|Viðskeyti aftan á stika y-áss|
|interactive|Boolean|Hvort grafið eigi að vera gagnvirkt.|
|floatFormat|String|Hvernig á að hafa formið á fleytitölum. Möguleikar eru ```','```(, fyrir framan aukastafina) ```',.'```((. fyrir framan aukastafina og , í þúsundaskiptingum)) ```'.,'```(, fyrir framan aukastafina og . í þúsundaskiptingum) og ```'.'```(. fyrir framan aukastafina) |
|dataLabels|Boolean|Hvort hafa eigi gildi hvers hóps með inná grafinu.|
|innerLabels|Boolean|Hvort gildin eigi að vera innan eða utan súlnana.|


# 9. Stöplarit
Skjölun á stöplaritunum kemur síðar...


# 10. Skalanleiki grafa
Til eru nokkrar stillingar sem segja til um stærð hlutana á grafinu. Tvær þeirra hafa að gera með skalanleika.

## 10.1 ```dynamicFontSize```
Stillingin ```dynamicFontSize``` segir til um hvort að leturstærð grafsins eigi að skalast skv. vídd canvas nóðunar. Þegar leturstærðin er reiknuð er miðað við stillingarnar ```dynamicFontSizeCenter``` og ```fontSize```.

```
stærð = fontSize * (vídd / dynamicFontSizeCenter)
```

Þegar víddin er jöfn ```dynamicFontSizeCenter``` er stærðin jöfn ```fontSize```.

Sjálfkrafa eru stikarnir:

```javascript
dynamicFontSize = true
dynamicFontSizeCenter = 400
fontSize = 10
```

## 10.2 ```resizeListener```

Stillingin ```resizeListener``` er ekki kveikt sjálfkrafa en hægt er að kveikja á henni með

```javascript
resizeListener: true
```

Þegar hún er kveikt þá er hlustað eftir því hvort að lögun gluggans breytist og grafið teiknað aftur miðað við ný hlutföll og stærðir þegar það gerist.

# 11. Animations (kvikun?)

Hægt er að animate-a gröfin með því að kalla á ```animate``` fallið. Fallið tekur inn tvær stillingar, ```type``` og ```duration```. ```type``` segir til um tegund á animation og ```duration``` lengd hennar í sekúndum.

```javascript
chart.animate({ type: 'left-to-right', duration: 1 });
```

Hér fyrir neðan er dæmi um animation á línuriti þar sem ```animate``` fallið er notað. Þegar smellt er á grafið ætti það að animate-a. Athugið að ef animations virðast ekki virka gæti verið að "prefers-reduced-motion" sé stillt á "reduce".

```javascript
let linurit = new LineChart(
	'linurit-animated',
	{'f': Array.from(Array(11).keys()).map((i) => [i, i])}
);

linurit.canvas.onclick = (e) => {
	linurit.animate({'duration': 1});
};
```

Stundum vill maður ekki að grafið birtist fyrr en það er kallað á ```animate``` eða ```draw``` föllin en þá er hægt að stilla

```javascript
animated: true
```

í smiðnum. Einnig er hægt að búa til ný animation með því að kalla nokkrum sinnum á ```draw``` fallið og uppfæra gögnin með einhverju millibili.

# 12 Fastar (```CHART_CONSTANTS```)

Fyrirfram eru skilgreindir nokkrir fastar í ```CHART_CONSTANTS```. Þessa fasta er hægt að stilla og eiga þeir þá við öll gröfin sem teiknuð eru á síðunni eftir að þeim er breytt. T.d. ef breytt væri

```javascript
CHART_CONSTANTS.FONT_SIZE = 12;
```

Myndi það láta leturstærðina vera sjálfkrafa 12 fyrir öll gröf sem búin eru til með smiðunum eftir breytinguna. Hins vegar er hægt að eiga ennþá við stakt graf með því að nota stillinguna ```fontSize```.

```javascript
fontSize: 8
```

Hér fyrir neðan eru allir þeir fastar sem hægt er að stilla:

| 	Fasti   	|	Tegund  	|		Áhrif			|
|:----------------------|:----------------------|:--------------------------------------|
|BG_COLOR|String|Hex strengur með sex tölustöfum sem segir til um bakgrunn grafana. Sjálfkrafa er gildið '#222222'.|
|STROKE_COLOR|String|Hex strengur með sex tölustöfum sem segir til um línu liti grafana. Sjálfkrafa er gildið '#FFFFFF'.|
|DATA_COLORS|Array|Fylki af hex strengjum með sex tölustöfum sem segja til um liti á gagnahópum grafana.|
|CHART_PADDING_LEFT, CHART_PADDING_RIGHT, CHART_PADDING_TOP, CHART_PADDING_BOTTOM|Number|Gildi milli 0 og 1 sem segja til um hve mikið pláss verður utan við grafið á tiltekinni hlið. Sjálfkrafa er gildið 0,1.|
|FONT_SIZE|Number|Gildi sem segir til um leturstærð grafana þegar breidd þeirra er jöfn dynamicFontSizeCenter ef kveikt er á dynamicFontSize, annars föst leturstærð þeirra. Sjálfkrafa 10.|
|DYNAMIC_FONTSIZE_CENTER|Number|Hver á breidd grafsins að vera þegar leturstærðin er fontSize. Sjálfkrafa 400.|
|RESOLUTION_UPSCALE|Number|Stiki sem segir til um hve mikið á að margfalda upplausn grafsins (í öðru veldi). Alls ekki hafa þennan stika of háan. Sjálfkrafa 2.|
|TITLE_SIZE|Number|Margfaldast við leturstærðina til að mynda nýja leturstærð fyrir titil grafsins. Sjálfkrafa 2,5.|
|LINE_WIDTH|Number|Þykkt lína grafsins. Sjálfkrafa 1.|
|FLOAT_FORMAT|String|Hvernig á að hafa formið á fleytitölum. Möguleikar eru ```','```(, fyrir framan aukastafina) ```',.'```((. fyrir framan aukastafina og , í þúsundaskiptingum)) ```'.,'```(, fyrir framan aukastafina og . í þúsundaskiptingum) og ```'.'```(. fyrir framan aukastafina). Sjálfkrafa er gildið ```'.'```|

# 13 Gagnvirkni

Með því að nota eftirfarandi stillingu er hægt að búa til gröf sem eru gagnvirk.

```javascript
interactive: true
```

Hlustað er eftir ```mousemove``` atburðum á canvas nóðunni og brugðist við á mismunandi hátt eftir því hver tegund grafsins er.

## 13.1 Línurit

Þegar fært er bendilinn yfir línuritin sjást (x, y) gildin á þeim punkti sem er næstur bendlinum í x-stefnu í hverju falli. Þegar stikinn ```interactive``` er ```true``` þá er mikilvægt að taka einnig fram stikana ```interactivityPrecisionX``` og ```interactivityPrecisionY``` en þeir segja til um fjölda aukastafa í hvorri vídd þegar birt er gildi punktana á grafinu. Hér er dæmi um graf sem er gagnvirkt:

```javascript
let linurit = new LineChart(
	'linurit-interactive',
	{
		'sin(x)': Array.from(Array(101).keys()).map((i) => [i/100 * 2, Math.sin(i*Math.PI*2/100)]),
		'cos(x)': Array.from(Array(101).keys()).map((i) => [i/100 * 2, Math.cos(i*Math.PI*2/100)])
	},
	{
		interactive: true,
		interactivityPrecisionX: 2,
		interactivityPrecisionY: 4,
		resizeListener: true,
		points: false,
		areaUnder: true,
		tickSuffixX: ' pi'
	}
);
```

## 13.2 Skífurit

Þegar fært er bendilinn yfir skífuritin stækkar viðeigandi partur skífunar og hlutfall hans af heildinni birtist. Athugið að þetta mun aðeins virka ef ekki er þegar verið að sýna prósentuna. Þegar stikinn ```interactive``` er ```true``` þá er mikilvægt að taka einnig fram stikann ```interactivityPercentagePrecision``` en hann segir til um fjölda aukastafa þegar hlutfallið er birt. Hér er dæmi um graf sem er gagnvirkt:

```javascript
let skifuritInteractive = new PieChart(
	'skifurit-interactive',
	{
		'Blár': 10,
		'Hvítur': 10,
		'Grár': 30
	},
	{
		interactive: true,
		interactivityPercentagePrecision: 0,
		fontSize: 17,
		legend: true,
		dataColors: [
			'#77AAFF',
			'#FFFFFF',
			'#777777'
		],
		resizeListener: true
	}
);
```

## 13.3 Súlu og stöplarit

Þegar fært er bendilinn yfir súlurnar birtist gildi tilheyrandi súlu/hóps. Athugið að þetta mun aðeins virka ef ekki er þegar verið að sýna gildið. Hér er dæmi um graf sem er gagnvirkt:

```javascript
let suluritInteractive = new BarChart(
	'sulurit-interactive',
	{
		'Blár': 10,
		'Hvítur': 10,
		'Grár': 30
	},
	{
		interactive: true,
		dataColors: [
			'#77AAFF',
			'#FFFFFF',
			'#777777'
		],
		resizeListener: true,
		min: 0
	}
);
```
