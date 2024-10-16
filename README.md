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

# 6. Nánari skjölun
Nánari skjölun á **línuritum**, **súluritum**, **skífuritum**, **animations**, **gagnvirkni**, **föstum**, og **skalanleika** má sjá undir **Wiki** flipanum.
