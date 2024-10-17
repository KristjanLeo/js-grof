# For contributors:
**By submitting a pull request to this project, 
you agree to license your contribution under the MIT license 
to this project.**


# 1. Hvað er JS Gröf
JS Gröf er einfalt og þægilegt viðmót til að búa til gröf á vefsíðum. Viðmótið notar canvas nóðuna til þess að teikna **línurit**, **punktarit**, **skífurit**, **súlurit** og **tíðnirit**. Aðeins þarf að taka fram id á canvas nóðu úr HTML skjalinu og gögn sem birta á á grafinu ásamt einhverjum sniðugum aukastillingum sem viðmótið leyfir. Hægt er að 'animate'-a gröfin og bíður viðmótið uppá ýmsa valmöguleika hvað það varðar.

# 2. Síður sem nota JS Gröf
Eins og er þá eru engar síður að nota JS Gröf sem við vitum um.

*Ert þú að nota JS Gröf á síðunni þinni og vilt að hún birtist hér? Endilega láttu okkur vita!*

# 3. Einfalt sýnidæmi
Hér fyrir neðan er einfalt dæmi um hvernig hægt væri að birta súlurit með þremur súlum. 
Súluritin eru búin til með ```BarChart``` smiðnum sem tekur inn **id á canvas nóðu**, **gögn**, og nokkra **aukavalmöguleika**.

```javascript
let chart = new Charts.BarChart(
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

# 4. Fleira
Til eru ýmsar aðrar stillingar fyrir gröfin. T.d. er hægt að animate-a gröfin og gera línuritin/punktaritin og súluritin gagnvirk á einfaldan hátt. En nánari skjölun kemur síðar.

# 5. Nánari skjölun
Hægt verður að skoða nánari skjölun inná vefsíðunni okkar sem verður líklega sett upp innan skamms.
