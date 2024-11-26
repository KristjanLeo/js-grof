const JSGrof = {};

JSGrof.CHART_CONSTANTS = {
	BG_COLOR: '#222222',
	STROKE_COLOR: '#FFFFFF',
	DATA_COLORS: [
		'#FFFFFF',
		'#FF77FF',
		'#9900FF',
		'#AA4499',
		'#333399',
		'#7777FF',
		'#BBBBFF'
	],
	CHART_PADDING_LEFT: 0.1,
	CHART_PADDING_RIGHT: 0.1,
	CHART_PADDING_TOP: 0.1,
	CHART_PADDING_BOTTOM: 0.1,
	FONT_SIZE: 10,
	DYNAMIC_FONTSIZE_CENTER: 400,
	RESOLUTION_UPSCALE: 2,
	TITLE_SIZE: 2.5,
	LINE_WIDTH: 1,
	FLOAT_FORMAT: '.'
}

JSGrof.ChartPrototype = {

	_initOptions(options) {

		if(this.error) return;

		if(!options.constructor || options.constructor.name !== 'Object') {
			this._errorMessage('_initOptions', 'options must be of type Object.');
		}

		// Padding
		this.chartPaddingLeft = options.chartPaddingLeft ?? JSGrof.CHART_CONSTANTS.CHART_PADDING_LEFT;
		if(!this._checkFloat(this.chartPaddingLeft, 0, 1)) {
			this._errorMessage('_initOptions', 'chartPaddingLeft must be a number between 0 and 1.');
			return;
		}
		this.chartPaddingRight = options.chartPaddingRight ?? JSGrof.CHART_CONSTANTS.CHART_PADDING_RIGHT;
		if(!this._checkFloat(this.chartPaddingRight, 0, 1)) {
			this._errorMessage('_initOptions', 'chartPaddingRight must be a number between 0 and 1.');
			return;
		}
		this.chartPaddingTop = options.chartPaddingTop ?? JSGrof.CHART_CONSTANTS.CHART_PADDING_TOP;
		if(!this._checkFloat(this.chartPaddingTop, 0, 1)) {
			this._errorMessage('_initOptions', 'chartPaddingTop must be a number between 0 and 1.');
			return;
		}
		this.chartPaddingBottom = options.chartPaddingBottom ?? JSGrof.CHART_CONSTANTS.CHART_PADDING_BOTTOM;
		if(!this._checkFloat(this.chartPaddingBottom, 0, 1)) {
			this._errorMessage('_initOptions', 'chartPaddingBottom must be a number between 0 and 1.');
			return;
		}
		if(this.type === 'barchart') {
			this.chartPaddingBottom += 0.05;
		}

		// Colors
		this.bgColor = options.bgColor === undefined ? JSGrof.CHART_CONSTANTS.BG_COLOR : options.bgColor;
		if(this.bgColor !== null && !this._checkSixDigitHex(this.bgColor)) {
			this._errorMessage('_initOptions', 'bgColor must be either null or a six digit hex value string, for example ("#AA9999")');
			return;
		}
		this.strokeColor = options.strokeColor === undefined ? JSGrof.CHART_CONSTANTS.STROKE_COLOR : options.strokeColor;
		if(!this._checkSixDigitHex(this.strokeColor)) {
			this._errorMessage('_initOptions', 'strokeColor must be a six digit hex value string, for example ("#AA9999")');
			return;
		}
		this.axisColor = options.axisColor === undefined ? this.strokeColor : options.axisColor;
		if(!this._checkSixDigitHex(this.axisColor)) {
			this._errorMessage('_initOptions', 'axisColor must be a six digit hex value string, for example ("#AA9999")');
			return;
		}
		this.dataColors = options.dataColors === undefined ? JSGrof.CHART_CONSTANTS.DATA_COLORS : options.dataColors;
		if(!this.dataColors) {
			this._errorMessage('_initOptions', 'Missing dataColors.');
			return;
		} else if(!this.dataColors.constructor || this.dataColors.constructor.name !== 'Array') {
			this._errorMessage('_initOptions', 'dataColors must be an array of hex value strings.');
			return;
		} else if(this.dataColors.length === 0) {
			this._errorMessage('_initOptions', 'dataColors cannot be empty.');
			return;
		} else {
			for(let i = 0; i < this.dataColors.length; i++) {
				if(!this._checkSixDigitHex(this.dataColors[i])) {
					this._errorMessage('_initOptions', 'Incorrect string in dataColors. Values must be a six digit hex value string, for example ("#AA9999")');
					return;
				}
			}
		}

		// Scaling
		this.fontSize = options.fontSize ?? JSGrof.CHART_CONSTANTS.FONT_SIZE;
		if(!this._checkFloat(this.fontSize, 0, 100)) {
			this._errorMessage('_initOptions', 'fontSize must be a number between 0 and 100.');
			return;
		}
		this.fontSizeConstant = this.fontSize;

		this.resolutionUpscale = options.resolutionUpscale ?? JSGrof.CHART_CONSTANTS.RESOLUTION_UPSCALE;
		if(!this._checkFloat(this.resolutionUpscale, 0, 4)) {
			this._errorMessage('_initOptions', 'resolutionUpscale must be a number between 0 and 4.');
			return;
		}
		this.lineWidth = options.lineWidth ?? JSGrof.CHART_CONSTANTS.LINE_WIDTH;
		if(!this._checkFloat(this.lineWidth, 0.01, 100)) {
			this._errorMessage('_initOptions', 'lineWidth must be a number between 0.01 and 100.');
			return;
		}
		this.resizeListener = options.resizeListener;
		if(this.resizeListener !== undefined && !this._checkBoolean(this.resizeListener)) {
			this._errorMessage('_initOptions', 'resizeListener must be a boolean.');
			return;
		}

		// Title
		this.title = options.title;
		if(this.title !== undefined && !this._checkString(this.title)) {
			this._errorMessage('_initOptions', 'title must be a string.');
			return;
		}
		if(this.title && this.title.length > 0 && options.chartPaddingTop === undefined) {
			this.chartPaddingTop += 0.1;
		}
		this.titleSize = options.titleSize ?? JSGrof.CHART_CONSTANTS.TITLE_SIZE;
		if(!this._checkFloat(this.titleSize, 0, 10)) {
			this._errorMessage('_initOptions', 'titleSize must be a number between 0 and 10.');
			return;
		}

		// Axis labels
		this.labelX = options.labelX;
		if(this.labelX !== undefined && !this._checkString(this.labelX)) {
			this._errorMessage('_initOptions', 'labelX must be a string.');
			return;
		}
		if(this.labelX && options.chartPaddingBottom === undefined) {
			this.chartPaddingBottom += 0.05;
		}
		this.labelY = options.labelY;
		if(this.labelY !== undefined && !this._checkString(this.labelY)) {
			this._errorMessage('_initOptions', 'labelY must be a string.');
			return;
		}
		if(this.labelY && options.chartPaddingLeft === undefined) {
			this.chartPaddingLeft += 0.05;
		}
		this.axisLabels = options.axisLabels;
		if(this.axisLabels === undefined) {
			
		} else if(!this.axisLabels.constructor || this.axisLabels.constructor.name !== 'Array') {
			this._errorMessage('_initOptions', 'axisLabels must be an array of strings.');
			return;
		} else if(this.axisLabels.length === 0) {
			this._errorMessage('_initOptions', 'axisLabels cannot be empty.');
			return;
		} else {
			for(let i = 0; i < this.axisLabels.length; i++) {
				if(!this._checkString(this.axisLabels[i])) {
					this._errorMessage('_initOptions', 'axisLabels values must be strings.');
					return;
				}
			}
		}
		this.tickSuffixX = options.tickSuffixX;
		if(this.tickSuffixX !== undefined && !this._checkString(this.tickSuffixX)) {
			this._errorMessage('_initOptions', 'tickSuffixX must be a string.');
			return;
		}
		this.tickSuffixY = options.tickSuffixY;
		if(this.tickSuffixY !== undefined && !this._checkString(this.tickSuffixY)) {
			this._errorMessage('_initOptions', 'tickSuffixY must be a string.');
			return;
		}
		this.tickSuffix = options.tickSuffix;
		if(this.tickSuffix !== undefined && !this._checkString(this.tickSuffix)) {
			this._errorMessage('_initOptions', 'tickSuffix must be a string.');
			return;
		}


		// Grid
		this.grid = options.grid;
		if(this.grid !== undefined && !this._checkBoolean(this.grid)) {
			this._errorMessage('_initOptions', 'grid must be a boolean.');
			return;
		}
		this.gridX = options.gridX;
		if(this.gridX !== undefined && !this._checkBoolean(this.gridX)) {
			this._errorMessage('_initOptions', 'gridX must be a boolean.');
			return;
		}
		this.gridY = options.gridY;
		if(this.gridY !== undefined && !this._checkBoolean(this.gridY)) {
			this._errorMessage('_initOptions', 'gridY must be a boolean.');
			return;
		}

		// Legend
		this.legend = options.legend;
		if(this.legend !== undefined && !this._checkBoolean(this.legend)) {
			this._errorMessage('_initOptions', 'legend must be a boolean.');
			return;
		}
		this.legendType = options.legendType;
		if(this.legendType !== undefined && !this._checkString(this.legendType)) {
			this._errorMessage('_initOptions', 'legendType must be a string.');
			return;
		}
		if(this.legend) {
			if(this.type === 'linechart') {
				if(this.legendType && this.legendType === 'topRight') {
					this.chartPaddingTop += 0.1;
					this.chartPaddingRight += 0.1;
				} else if(this.legendType) {
					this._errorMessage('_initOptions', 'Incorrect legendType');
				} else { // Default to bottom legend
					this.chartPaddingBottom += 0.05;
				}
			}
			if(this.type === 'piechart') {
				if(this.legendType && this.legendType === 'bottom') {
					this.chartPaddingBottom += 0.05;
				} else if(this.legendType) {
					this._errorMessage('_initOptions', 'Incorrect legendType');
				} else { // Default to topRight legend
					this.chartPaddingTop += 0.1;
					this.chartPaddingRight += 0.1;
				}
			}
		}

		// LineChart lines and points
		this.lines = options.lines !== undefined ? options.lines : true;
		if(this.lines !== undefined) {
			if(!this._checkBoolean(this.lines) && (!this.lines.constructor || this.lines.constructor.name !== 'Array')) {
				this._errorMessage('_initOptions', 'lines must be either a boolean or an array of booleans.');
				return;
			}
			if(typeof(this.lines) === 'object') {
				if(this.lines.length === 0) {
					this._errorMessage('_initOptions', 'lines cannot be an empty array.');
					return;
				}
				for(let i = 0; i < this.lines.length; i++) {
					if(!this._checkBoolean(this.lines[i])) {
						this._errorMessage('_initOptions', 'All elements in lines must be booleans.');
						return;
					}
				}
			}
		}
		this.points = options.points  !== undefined ? options.points : true;
		if(this.points !== undefined) {
			if(!this._checkBoolean(this.points) && (!this.points.constructor || this.points.constructor.name !== 'Array')) {
				this._errorMessage('_initOptions', 'points must be either a boolean or an array of booleans.');
				return;
			}
			if(typeof(this.points) === 'object') {
				if(this.points.length === 0) {
					this._errorMessage('_initOptions', 'points cannot be an empty array.');
					return;
				}
				for(let i = 0; i < this.points.length; i++) {
					if(!this._checkBoolean(this.points[i])) {
						this._errorMessage('_initOptions', 'All elements in points must be booleans.');
						return;
					}
				}
			}
		}

		// Data labels
		this.dataLabels = options.dataLabels;
		if(this.dataLabels !== undefined && !this._checkBoolean(this.dataLabels)) {
			this._errorMessage('_initOptions', 'dataLabels must be a boolean.');
			return;
		}
		this.innerLabels = options.innerLabels;
		if(this.innerLabels !== undefined && !this._checkBoolean(this.innerLabels)) {
			this._errorMessage('_initOptions', 'innerLabels must be a boolean.');
			return;
		}
		this.percentage = options.percentage;
		if(this.percentage !== undefined && !this._checkBoolean(this.percentage)) {
			this._errorMessage('_initOptions', 'percentage must be a boolean.');
			return;
		}
		this.percentagePrecision = options.percentagePrecision;
		if(this.percentage && !this._checkInteger(this.percentagePrecision, 0, 100)) {
			this._errorMessage('_initOptions', 'Missing or incorrect percentagePrecision for percentages (must be an integer between 0 and 100).');
		}

		// Dynamic font size
		this.dynamicFontSize = options.dynamicFontSize === undefined ? true : options.dynamicFontSize;
		if(this.dynamicFontSize !== undefined && !this._checkBoolean(this.dynamicFontSize)) {
			this._errorMessage('_initOptions', 'dynamicFontSize must be a boolean.');
			return;
		}
		this.dynamicFontSizeCenter = options.dynamicFontSizeCenter ?? JSGrof.CHART_CONSTANTS.DYNAMIC_FONTSIZE_CENTER;
		if(!this._checkFloat(this.dynamicFontSizeCenter, 1, 10000)) {
			this._errorMessage('_initOptions', 'dynamicFontSizeCenter must be a number between 1 and 10000.');
			return;
		}

		// Ticks min, max, spacing
		this.min = options.min;
		if(this.min !== undefined && !this._checkFloat(this.min, -Infinity, Infinity)) {
			this._errorMessage('_initOptions', 'min must be a number between -Infinity and Infinity.');
			return;
		}
		this.max = options.max;
		if(this.max !== undefined && !this._checkFloat(this.max, -Infinity, Infinity)) {
			this._errorMessage('_initOptions', 'max must be a number between -Infinity and Infinity.');
			return;
		}
		this.minX = options.minX;
		if(this.minX !== undefined && !this._checkFloat(this.minX, -Infinity, Infinity)) {
			this._errorMessage('_initOptions', 'minX must be a number between -Infinity and Infinity.');
			return;
		}
		this.maxX = options.maxX;
		if(this.maxX !== undefined && !this._checkFloat(this.maxX, -Infinity, Infinity)) {
			this._errorMessage('_initOptions', 'maxX must be a number between -Infinity and Infinity.');
			return;
		}
		this.minY = options.minY;
		if(this.minY !== undefined && !this._checkFloat(this.minY, -Infinity, Infinity)) {
			this._errorMessage('_initOptions', 'minY must be a number between -Infinity and Infinity.');
			return;
		}
		this.maxY = options.maxY;
		if(this.maxY !== undefined && !this._checkFloat(this.maxY, -Infinity, Infinity)) {
			this._errorMessage('_initOptions', 'maxY must be a number between -Infinity and Infinity.');
			return;
		}
		this.tickSpacingX = options.tickSpacingX;
		if(this.tickSpacingX !== undefined && !this._checkFloat(this.tickSpacingX, -Infinity, Infinity)) {
			this._errorMessage('_initOptions', 'tickSpacingX must be a number between -Infinity and Infinity.');
			return;
		}
		this.tickSpacingY = options.tickSpacingY;
		if(this.tickSpacingY !== undefined && !this._checkFloat(this.tickSpacingY, -Infinity, Infinity)) {
			this._errorMessage('_initOptions', 'tickSpacingY must be a number between -Infinity and Infinity.');
			return;
		}

		this.areaUnder = options.areaUnder;
		if(this.areaUnder !== undefined && !this._checkBoolean(this.areaUnder)) {
			this._errorMessage('_initOptions', 'areaUnder must be a boolean.');
			return;
		}

		// Interactivity
		this.interactive = options.interactive;
		if(this.interactive !== undefined && !this._checkBoolean(this.interactive)) {
			this._errorMessage('_initOptions', 'interactive must be a boolean.');
			return;
		}
		this.interactivityPrecisionX = options.interactivityPrecisionX ?? JSGrof.CHART_CONSTANTS.DYNAMIC_FONTSIZE_CENTER;
		if(this.interactive && this.type === 'linechart' && !this._checkFloat(this.interactivityPrecisionX, 0, 100)) {
			this._errorMessage('_initOptions', 'interactivityPrecisionX must be a number between 0 and 100.');
			return;
		}
		this.interactivityPrecisionY = options.interactivityPrecisionY ?? JSGrof.CHART_CONSTANTS.DYNAMIC_FONTSIZE_CENTER;
		if(this.interactive && this.type === 'linechart' && !this._checkFloat(this.interactivityPrecisionY, 0, 100)) {
			this._errorMessage('_initOptions', 'interactivityPrecisionY must be a number between 0 and 100.');
			return;
		}
		this.interactivityPercentagePrecision = options.interactivityPercentagePrecision ?? JSGrof.CHART_CONSTANTS.DYNAMIC_FONTSIZE_CENTER;
		if(this.interactive && this.type === 'piechart' && !this._checkFloat(this.interactivityPercentagePrecision, 0, 100)) {
			this._errorMessage('_initOptions', 'interactivityPercentagePrecision must be a number between 0 and 100.');
			return;
		}

		// Animations
		this.animated = options.animated;
		if(this.animated !== undefined && !this._checkBoolean(this.animated)) {
			this._errorMessage('_initOptions', 'animated must be a boolean.');
			return;
		}

		// Float formatting
		this.floatFormat = options.floatFormat ?? JSGrof.CHART_CONSTANTS.FLOAT_FORMAT;
		if(this.floatFormat !== undefined && !this._checkString(this.floatFormat)) {
			this._errorMessage('_initOptions', 'floatFormat must be a string.');
			return;
		}

		// Histochart bucket size
		this.bucketSize = options.bucketSize;
		if(!this._checkFloat(this.bucketSize, -Infinity, Infinity) && this.type === 'histochart') {
			this._errorMessage('_initOptions', 'bucketSize must be a number.');
			return;
		}

		// Histochart portion
		this.portion = options.portion;
		if(this.portion !== undefined && !this._checkBoolean(this.portion)) {
			this._errorMessage('_initOptions', 'portion must be a boolean.');
			return;
		}

		this.includeMaxValueInLastBar = options.includeMaxValueInLastBar;
		if(this.includeMaxValueInLastBar !== undefined && !this._checkBoolean(this.includeMaxValueInLastBar)) {
			this._errorMessage('_initOptions', 'includeMaxValueInLastBar must be a boolean.');
			return;
		}
	},

	_checkSixDigitHex(hex) {
		if(hex === undefined) return false;
		if(typeof(hex) !== 'string') return false;
		if(hex.length !== 7) return false;
		if(hex[0] !== '#') return false;
		for(let i = 1; i < hex.length; i++) {
			if(!['A','B','C','D','E','F',
				'a', 'b', 'c', 'd', 'e', 'f',
				'1','2','3','4','5','6','7','8','9','0'
			].includes(hex[i])) return false;
		}
		return true;
	},

	_checkInteger(num, min, max) {
		return !(
			num === undefined 
			||  typeof(num) !== 'number'
			|| !Number.isInteger(num)
			||	num < min
			||  num > max
		);
	},

	_checkFloat(num, min, max) {
		return !(
			num === undefined 
			||  typeof(num) !== 'number'
			||	num < min
			||  num > max
		);
	},

	_checkString(str) {
		return !(
			str === undefined
			|| typeof(str) !== 'string'
		);
	},

	_checkBoolean(bool) {
		return !(
			bool === undefined
			|| typeof(bool) !== 'boolean'
		);
	},

	_initCanvas(canvasId) {
		
		if(this.error) return;

		if(!this._checkString(canvasId)) {
			this._errorMessage('_initCanvas', 'canvasId must be a string.');
			return;
		}

		this.canvas = document.getElementById(canvasId);
		if(!this.canvas) {
			this._errorMessage('_initCanvas', 'Missing element with id: "' + canvasId + '"');
			return;
		}
		if(this.canvas.nodeName !== 'CANVAS') {
			this._errorMessage('_initCanvas', 'Element with id "' + canvasId + '" is not a canvas');
			return;
		}

		if(this.canvas.getAttribute('width') !== null) {
			if(isNaN(this.canvas.getAttribute('width'))) {
				this.canvas.style.width = this.canvas.getAttribute('width');
			} else {
				this.canvas.style.width = this.canvas.getAttribute('width') + 'px';
			}
		}
		this.canvas.width = null;
		if(this.canvas.getAttribute('height') !== null) {
			if(isNaN(this.canvas.getAttribute('height'))) {
				this.canvas.style.height = this.canvas.getAttribute('height');
			} else {
				this.canvas.style.height = this.canvas.getAttribute('height') + 'px';
			}
		}
		this.canvas.height = null;

		this.ctx = this.canvas.getContext('2d');

		this.resize();
		if(this.resizeListener) {
			window.addEventListener('resize', (e) => {
				this.draw();
			});
		}

		if(this.interactive) {
			this.canvas.onmousemove = (e) => {

				if(this.error) return;

				let [x, y] = this._inverseChartCoords(this.resolutionUpscale*e.offsetX, this.resolutionUpscale*e.offsetY);
				if(x < 0 || x > 1 || y < 0 || y > 1) {
					this.draw();
					return;
				};
				this._mousemove(x, y);
			}
		}
	},

	_errorMessage(f, msg) {
		this.error = true;
		console.error(this.type, '>', f, '>', msg);
	},

	_warningMessage(f, msg) {
		this.warning = true;
		console.warn(this.type, '>', f, '>', msg);
	},

	_canvasCoords(x, y) {
		return [this.canvas.width*x, this.canvas.height*(1-y)];
	},

	_inverseChartCoords(x, y) {
		return [
			(x/this.canvas.width-this.chartPaddingLeft)/(1 - this.chartPaddingRight - this.chartPaddingLeft),
			(1 - y/this.canvas.height - this.chartPaddingBottom)/(1 - this.chartPaddingTop - this.chartPaddingBottom)
		]
	},

	_chartCoords(x, y) {
		return [
			this.canvas.width*(x*(1 - this.chartPaddingRight - this.chartPaddingLeft)+this.chartPaddingLeft),
			this.canvas.height*(1 - y*(1 - this.chartPaddingTop - this.chartPaddingBottom) - this.chartPaddingBottom)
		]
	},

	_dataToTicks(min, max) {
		
		let d = this._integerAddition(max, -min);
		let fix = d < 1 ? -1 : 0;

		let r = Math.round(d/Math.pow(10, parseInt(Math.log10(d)) + fix));

		let ll = this._integerAddition(parseInt(Math.log10(d)), fix)
		let l = 10**ll;
		if(ll < 0) {
			l = parseFloat(l.toFixed(Math.abs(ll)));
		}

		let spacing;
		if(r > 9) {
			spacing = this._integerMultiplication(2, l);
		} else if(r > 8) {
			spacing = this._integerMultiplication(1.5, l);
		} else if (r > 4) {
			spacing = this._integerMultiplication(1.0, l)
		} else if (r > 2) {
			spacing = this._integerMultiplication(0.5, l)
		} else if (r > 1) {
			spacing = this._integerMultiplication(0.25, l)
		} else {
			spacing = this._integerMultiplication(0.125, l)
		}

		let start = this._integerAddition(min, -this._integerModulo(min, spacing));
		if(start > min) start = this._integerAddition(start, -spacing);

		let end = this._integerAddition(max, -this._integerModulo(max, spacing));
		if(end < max) end = this._integerAddition(end, spacing) + 1e-16;

		return {start, spacing, end};
	},

	resize() {
		
		if(this.error) return;

		if(
			this.canvas.clientWidth*this.resolutionUpscale > 10000
		||	this.canvas.clientHeight*this.resolutionUpscale > 10000) {
			this._errorMessage('resize', 'canvas is too large for this resolutionUpscale');
			return;
		}

		if(this.dynamicFontSize) {
        	this.fontSize = this.fontSizeConstant*Math.min(this.canvas.clientWidth, this.canvas.clientHeight) / this.dynamicFontSizeCenter;
        }

		this.canvas.width = this.canvas.clientWidth*this.resolutionUpscale;
        this.canvas.height = this.canvas.clientHeight*this.resolutionUpscale;
	},

	_drawTopRightLegend() {

		for(let i = 0; i < Object.keys(this.data).length; i++) {

			this.ctx.fillStyle = this.dataColors[i % this.dataColors.length];
			this.ctx.fillRect(
				...this._canvasCoords(
					0.9,
					1 - 0.14 - this.fontSize*this.resolutionUpscale*2*i / this.canvas.height
				),
				this.fontSize*this.resolutionUpscale, this.fontSize*this.resolutionUpscale
			);
			this.ctx.fillStyle = this.axisColor;
			this.ctx.font = this.fontSize*this.resolutionUpscale + 'px system-ui';
			this.ctx.textAlign = 'right';
			this.ctx.textBaseline = 'top';
			let [x, y] = this._canvasCoords(
				0.9,
				1 - 0.14 - this.fontSize*this.resolutionUpscale*2*i / this.canvas.height
			);
			this.ctx.fillText(
				Object.keys(this.data)[i], 
				x - this.fontSize * this.resolutionUpscale, y
			);
		}
	},

	_drawBottomLegend() {

		let nKeys = Object.keys(this.data).length;
		let longestNameLength = Object.keys(this.data).reduce((a, b) => this.ctx.measureText(b).width > a ? this.ctx.measureText(b).width : a, 0);
		let legendNameSpacing = (longestNameLength + this.fontSize*1.5*this.resolutionUpscale) / this.canvas.width;
		let margin = 1/nKeys - legendNameSpacing;

		if(margin < 0) {
			this._warningMessage('_drawBottomLegend', 'Name/s too long for a bottom legend');
			margin = 0;
		}
		
		/* (0.5*m) | (m) | (m) | (0.5*m) */
		for(let i = 0; i < Object.keys(this.data).length; i++) {
			this.ctx.fillStyle = this.dataColors[i % this.dataColors.length];
			this.ctx.fillRect(
				...this._canvasCoords(
					0.5*margin + i*(legendNameSpacing + margin),
					0.05
				),
				this.fontSize*this.resolutionUpscale, this.fontSize*this.resolutionUpscale
			);
			this.ctx.fillStyle = this.axisColor;
			this.ctx.font = this.fontSize*this.resolutionUpscale + 'px system-ui';
			this.ctx.textAlign = 'left';
			this.ctx.textBaseline = 'top';
			let [x, y] = this._canvasCoords(
				0.5*margin + i*(legendNameSpacing + margin),
				0.05
			);
			this.ctx.fillText(
				Object.keys(this.data)[i], 
				x + this.fontSize*1.5*this.resolutionUpscale, y
			);
		}
	},

	draw() {

		if(this.error) return;
		this.resize();
		
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if(this.bgColor) {
			this.ctx.fillStyle = this.bgColor;
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}

		this._drawSelf();

		if(this.title) {
			this.ctx.fillStyle = this.strokeColor;
			this.ctx.font = this.titleSize*this.fontSize*this.resolutionUpscale + 'px system-ui';
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'middle';
			this.ctx.fillText(
				this.title, 
				...this._canvasCoords(0.5, (1 - 0.1))
			);
		}

		if(this.labelX) {
			this.ctx.fillStyle = this.axisColor;
			this.ctx.font = 1.0*this.fontSize*this.resolutionUpscale + 'px system-ui';
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'middle';
			this.ctx.fillText(
				this.labelX, 
				...this._canvasCoords(0.5, (this.legendType === 'bottom' || (this.legend && this.legendType !== 'topRight' && this.type === 'linechart')) ? 0.10 : 0.05)
			);
		}

		if(this.labelY) {
			this.ctx.fillStyle = this.axisColor;
			this.ctx.font = 1.0*this.fontSize*this.resolutionUpscale + 'px system-ui';
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'middle';
			let [x, y] = this._canvasCoords(0.05, 0.5);
			this.ctx.translate(x, y);
			this.ctx.rotate(-Math.PI*0.5);
			this.ctx.fillText(
				this.labelY, 
				0, 0
			);
			this.ctx.translate(-x, -y);
			this.ctx.resetTransform();
		}

		if(this.legend) {
			if(this.type === 'linechart') {
				switch(this.legendType) {
					case 'topRight':
						if(!['linechart', 'piechart'].includes(this.type)) break;
						this._drawTopRightLegend();
						break;

					default:
						if(!['linechart', 'piechart'].includes(this.type)) break;
						this._drawBottomLegend();
						break;
				}
			} else if(this.type === 'piechart') {
				switch(this.legendType) {
					case 'bottom':
						if(!['linechart', 'piechart'].includes(this.type)) break;
						this._drawBottomLegend();
						break;

					default:
						if(!['linechart', 'piechart'].includes(this.type)) break;
						this._drawTopRightLegend();
						break;
				}
			}
		}
	},

	_getBase10Value(hex) {
			
		if(typeof(hex) !== 'string') {
			this._errorMessage('_getBase10Value', 'Not a hex value.');
			return 0;
		}

		hex = hex.split('');
		if(hex[0] === '#') hex = hex.splice(1);

		let sum = 0;
		for(let i = 0; i < hex.length; i++) {
			
			if(
				!['A','B','C','D','E','F','a','b','c','d','e','f',
				'1','2','3','4','5','6','7','8','9','0'
				].includes(hex[i])
			) {
				this._errorMessage('_getBase10Value', 'Not a hex value.');
				return 0;
			}

			let v;
			switch(hex[i]) {
				case 'A': case 'a': v = 10; break;
				case 'B': case 'b': v = 11; break;
				case 'C': case 'c': v = 12; break;
				case 'D': case 'd': v = 13; break;
				case 'E': case 'e': v = 14; break;
				case 'F': case 'f': v = 15; break;
				default: v = hex[i]; break;
			}
			sum += v*Math.pow(16, hex.length - i - 1);
		}

		return sum;
	},

	_getBWContrasting(hexColor) {
		
		if(typeof(hexColor) !== 'string' || hexColor.length !== 7 || hexColor[0] !== '#') {
			this._errorMessage('_getBWContrasting', 'All colors must be hex values. Example: #555555 .');
			return '#000000';
		}
		
		let v = hexColor.split('').splice(1);
		let r = this._getBase10Value(v[0]+v[1]);
		let g = this._getBase10Value(v[2]+v[3]);
		let b = this._getBase10Value(v[4]+v[5]);

		if(r+g+b > 3*128*1.25) return '#000000';
		return '#FFFFFF';
	},

	animate(options) {

		if(this.error) return;

		if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			this.draw();
			return;
		}

		// Already animating
		if(this.animationPCT && this.animationPCT !== 1) return;

		if(options === undefined) options = { duration: 1 };
		if(!options.constructor || options.constructor.name !== 'Object') {
			this._errorMessage('animate', 'options must be of type Object.');
			return;
		}

		this.animationType = options.type;
		if(this.animationType !== undefined && !this._checkString(this.animationType)) {
			this._errorMessage('animate', 'type must be a string.');
			return;
		}
		this.animationDuration = options.duration;
		if(!this._checkFloat(this.animationDuration, 0.01, 1000)) {
			this._errorMessage('animate', 'duration must be a number between 0.01 and 1000.');
			return;
		}
		this.finalData = this.data;

		requestAnimationFrame((t) => this._setAnimationStartTime(t));
		requestAnimationFrame((t) => this._animation(t));
	},

	_setAnimationStartTime(timestamp) {
		this.animationStartTime = timestamp;
	},

	_animation(timestamp) {

		this.animationPCT = (timestamp - this.animationStartTime) / (this.animationDuration*1000);
		
		// Finish animation
		if(this.animationPCT >= 1) {
			this.animationPCT = 1;
			this._animateSelf();
			this.draw();
			return;
		}

		// Keep animating
		this._animateSelf();
		requestAnimationFrame((t) => this._animation(t));
	},

	_integerAddition(a, b) {
		
		let splitA = a.toString().split('.');
		let splitB = b.toString().split('.');

		if(splitA.length < 2 && splitB.length < 2) return a + b;
		if(splitA.length < 2) return parseFloat((a+b).toFixed(splitB[1].length));
		if(splitB.length < 2) return parseFloat((a+b).toFixed(splitA[1].length));

		let maxPrecision = splitA[1].length > splitB[1].length ? splitA[1].length : splitB[1].length;
		return parseFloat((a+b).toFixed(maxPrecision));
	},

	_integerMultiplication(a, b) {
		
		let splitA = a.toString().split('.');
		let splitB = b.toString().split('.');
		
		if(splitA.length < 2 && splitB.length < 2) return a*b;
		if(splitA.length < 2) return parseFloat((a*b).toFixed(splitB[1].length));
		if(splitB.length < 2) return parseFloat((a*b).toFixed(splitA[1].length));

		return parseFloat((a*b).toFixed(splitA[1].length+splitB[1].length));
	},

	_integerModulo(a, b) {
		return this._integerAddition(a, -this._integerMultiplication(parseInt(a/b), b));
	},

	_formatFloat(num) {
		
		if(this.floatFormat === undefined) return num;
		
		num = num.toString();
		let idxOfPoint = num.indexOf('.');

		if(this.floatFormat === ',.') {
			
			for(let i = idxOfPoint - 3; i > 0; i -= 3) {
				num = num.slice(0, i) + ',' + num.slice(i);
			}

			if(idxOfPoint === -1) {
				for(let i = num.length - 3; i > 0; i -= 3) {
					num = num.slice(0, i) + ',' + num.slice(i);
				}
			}

		} else if(this.floatFormat === '.,') {
			
			num = num.replace('.', ',')
			for(let i = idxOfPoint - 3; i > 0; i -= 3) {
				num = num.slice(0, i) + '.' + num.slice(i);
			}

			if(idxOfPoint === -1) {
				for(let i = num.length - 3; i > 0; i -= 3) {
					num = num.slice(0, i) + '.' + num.slice(i);
				}
			}

		} else if(this.floatFormat === ',') {
			num = num.replace('.', ',');
		}

		return num;
	},

	_withOpacity(color, opacity) {
		this.v = color.split('').splice(1);
		this.r = this._getBase10Value(this.v[0]+this.v[1]);
		this.g = this._getBase10Value(this.v[2]+this.v[3]);
		this.b = this._getBase10Value(this.v[4]+this.v[5]);
		return `rgba(${this.r},${this.g},${this.b},${opacity})`;
	}
}

JSGrof.LineChart = function (canvasId, data, options) {
	
	this.type = 'linechart';

	this._initOptions(options === undefined ? {} : options);
	this._initCanvas(canvasId);
	
	/* Data validation */
	if(!data.constructor || data.constructor.name !== 'Object') {
		this._errorMessage('linechart', 'data must be of type object.');
		return;
	}
	if(Object.keys(data).length === 0) {
		this._errorMessage('linechart', 'No function in data.');
		return;
	}
	for(let i = 0; i < Object.keys(data).length; i++) {
		let values = Object.values(data)[i];
		if(!values.constructor || values.constructor.name !== 'Array') {
			this._errorMessage('linechart', 'Incorrect function in data. Values must be of type Array.');
			return;
		}
		if(values.length === 0) {
			this._errorMessage('linechart', 'Empty function in data.');
			return;
		}
		for(let j = 0; j < values.length; j++) {
			let point = values[j];
			if(!point.constructor || point.constructor.name !== 'Array') {
				this._errorMessage('linechart', 'Incorrect datapoint in function. datapoint must be of type Array.');
				return;
			}
			if(point.length !== 2) {
				this._errorMessage('linechart', 'Incorrect datapoint in function. Length must be 2 (x and y value).');
				return;
			}
			if(
				!this._checkFloat(point[0], -Infinity, Infinity)
				|| !this._checkFloat(point[1], -Infinity, Infinity)
			) {
				this._errorMessage('linechart', 'Incorrect datapoint in function. All values should be numbers.');
				return;
			}
		}
	}
	this.data = data;

	let yMin = Infinity;
	let yMax = -Infinity;
	let xMin = Infinity;
	let xMax = -Infinity;
	Object.values(this.data).forEach((f) => {
		for(let i = 0; i < f.length; i++) {
			if(f[i][1] < yMin) yMin = f[i][1];
			if(f[i][1] > yMax) yMax = f[i][1];
			if(f[i][0] < xMin) xMin = f[i][0];
			if(f[i][0] > xMax) xMax = f[i][0];
		}
	});
	if(this.minX !== undefined) xMin = this.minX;
	if(this.minY !== undefined) yMin = this.minY;
	if(this.maxX !== undefined) xMax = this.maxX;
	if(this.maxY !== undefined) yMax = this.maxY;


	/* Draw the chart */
	this._drawSelf = () => {

		/* y axis */
		this.ctx.lineWidth = this.resolutionUpscale*this.lineWidth;
		this.ctx.strokeStyle = this.axisColor;
		this.ctx.beginPath();
		this.ctx.moveTo(...this._chartCoords(0, 0));
		this.ctx.lineTo(...this._chartCoords(0, 1));
		this.ctx.closePath();
		this.ctx.stroke();

		/* x axis */
		this.ctx.strokeStyle = this.axisColor;
		this.ctx.beginPath();
		this.ctx.moveTo(...this._chartCoords(0, 0));
		this.ctx.lineTo(...this._chartCoords(1, 0));
		this.ctx.closePath();
		this.ctx.stroke();

		/* y and x ticks */
		let {
			start: startY,
			spacing: spacingY,
			end: endY
		} = this._dataToTicks(yMin, yMax);
		let {
			start: startX,
			spacing: spacingX,
			end: endX
		} = this._dataToTicks(xMin, xMax);

		if(this.minX !== undefined) startX = this.minX;
		if(this.minY !== undefined) startY = this.minY;
		if(this.maxX !== undefined) endX = this.maxX;
		if(this.maxY !== undefined) endY = this.maxY;
		if(this.tickSpacingX !== undefined) spacingX = this.tickSpacingX;
		if(this.tickSpacingY !== undefined) spacingY = this.tickSpacingY;

		// y ticks
		let nTicksY = (endY - startY) / spacingY;
		let tickSpacingY = 1/nTicksY;
		let endIdxY = startY + Math.ceil(nTicksY)*spacingY > endY ? nTicksY : nTicksY+1;

		for(let i = 0; i < endIdxY; i++) {
			
			// Line
			this.ctx.beginPath();
			this.ctx.moveTo(...this._chartCoords(-0.02, tickSpacingY*i));
			this.ctx.lineTo(...this._chartCoords(0, tickSpacingY*i));
			this.ctx.closePath();
			this.ctx.stroke();

			if(this.grid || this.gridY) {
				this.ctx.strokeStyle = this._withOpacity(this.strokeColor, 0.3);
				this.ctx.beginPath();
				this.ctx.moveTo(...this._chartCoords(0, tickSpacingY*i));
				this.ctx.lineTo(...this._chartCoords(1.0, tickSpacingY*i));
				this.ctx.closePath();
				this.ctx.stroke();
				this.ctx.strokeStyle = this.strokeColor;
			}
			

			// Text
			this.ctx.fillStyle = this.strokeColor;
			this.ctx.font = this.fontSize*this.resolutionUpscale + 'px system-ui';
			this.ctx.textAlign = 'right';
			this.ctx.textBaseline = 'middle';
			this.ctx.fillText(
				this._formatFloat(this._integerAddition(startY, this._integerMultiplication(i,spacingY))) + (this.tickSuffixY ?? ''),
				...this._chartCoords(-0.03, tickSpacingY*i)
			);
		}

		// x ticks
		let nTicksX = (endX - startX) / spacingX;
		let tickSpacingX = 1/nTicksX;
		let endIdxX = startX + Math.ceil(nTicksX)*spacingX > endX ? nTicksX : nTicksX+1;
		if(this.axisLabels) {
			if(this.axisLabels.length !== Math.ceil(endIdxX)) {
				this._errorMessage('_drawSelf', 'Missing or too many labels in axisLabels');
				return;
			}
		}

		for(let i = 0; i < endIdxX; i++) {
			
			// Line
			this.ctx.beginPath();
			this.ctx.moveTo(...this._chartCoords(tickSpacingX*i, -0.02));
			this.ctx.lineTo(...this._chartCoords(tickSpacingX*i, 0));
			this.ctx.closePath();
			this.ctx.stroke();


			if(this.grid || this.gridX) {
				this.ctx.strokeStyle = this._withOpacity(this.strokeColor, 0.3);
				this.ctx.beginPath();
				this.ctx.moveTo(...this._chartCoords(tickSpacingX*i, 0));
				this.ctx.lineTo(...this._chartCoords(tickSpacingX*i, 1.0));
				this.ctx.closePath();
				this.ctx.stroke();
				this.ctx.strokeStyle = this.strokeColor;
			}


			// Text
			this.ctx.fillStyle = this.strokeColor;
			this.ctx.font = this.fontSize*this.resolutionUpscale + 'px system-ui';
			if(this.axisLabels) {
				this.ctx.textAlign = 'right';
				this.ctx.textBaseline = 'top';
				let [x, y] = this._chartCoords(tickSpacingX*i, -0.03);
				this.ctx.translate(x, y);
				this.ctx.rotate(-Math.PI*0.25);
				this.ctx.fillText(this.axisLabels[i], 0,0);
				this.ctx.translate(-x, -y);
				this.ctx.resetTransform();
			} else {
				this.ctx.textAlign = 'center';
				this.ctx.textBaseline = 'top';
				this.ctx.fillText(
					this._formatFloat(this._integerAddition(startX, this._integerMultiplication(i,spacingX))) + (this.tickSuffixX ?? ''),
					...this._chartCoords(tickSpacingX*i, -0.03)
				);
			}
		}

		// Functions
		Object.entries(this.data).forEach(([functionName, points], i) => {

			this.ctx.fillStyle = this.dataColors[i % this.dataColors.length];
			this.ctx.strokeStyle = this.dataColors[i % this.dataColors.length];
			
			if(
				(typeof(this.points) === 'boolean' && this.points) ||
				(typeof(this.points) === 'object' && this.points[i])
			) {
				points.forEach(([x, y]) => {
					this.ctx.beginPath();
					this.ctx.arc(
						...this._chartCoords(
							(x - startX) / (endX - startX),
							(y - startY) / (endY - startY)
						),					
						this.resolutionUpscale*3*(this.fontSize/JSGrof.CHART_CONSTANTS.FONT_SIZE),
						0,
						360 
					)
					this.ctx.closePath();
					this.ctx.fill();
				});
			}

			if(
				((typeof(this.lines) === 'boolean' && this.lines) ||
				(typeof(this.lines) === 'object' && this.lines[i]))
				&& points.length > 0
			) {
				this.ctx.beginPath();
				this.ctx.moveTo(
					...this._chartCoords(
						(points[0][0] - startX) / (endX - startX),
						(points[0][1] - startY) / (endY - startY)
					)
				);
				for(let j = 1; j < points.length; j++) {
					this.ctx.lineTo(
						...this._chartCoords(
							(points[j][0] - startX) / (endX - startX),
							(points[j][1] - startY) / (endY - startY)
						)
					);
				}
				this.ctx.stroke();

				if(this.areaUnder) {
					this.ctx.lineTo(...this._chartCoords((points[points.length-1][0] - startX) / (endX - startX), 0));
					this.ctx.lineTo(...this._chartCoords((points[0][0] - startX) / (endX - startX), 0));
					this.ctx.closePath();
					this.ctx.fillStyle = this._withOpacity(this.dataColors[i % this.dataColors.length], 0.1);
					this.ctx.fill();
				} else {
					this.ctx.closePath();
				}
			}
		});
	}
	if(!this.animated) {this.draw(); this.draw();}

	this._animateSelf = () => {
		
		if(this.animationPCT == 1) {
			this.data = this.finalData;
			return;
		}

		let newData = {};
		switch(this.animationType) {

			case 'left-to-right':

				Object.entries(this.finalData).forEach(([key, val]) => {
					newData[key] = [];
					for(let i = 0; i < val.length * this.animationPCT; i++) {
						newData[key].push(val[i]);
					}
				});
				break;

			default: // y-scale

				Object.entries(this.finalData).forEach(([key, val]) => {
					newData[key] = [];
					for(let i = 0; i < val.length; i++) {
						newData[key].push([val[i][0], val[i][1]*this.animationPCT]);
					}
				});
				break;
		}
		this.data = newData;
		this.draw();
	}

	this._mousemove = (x, y) => {
		
		this.draw();
		
		// Closest point in x for each function
		let {
			start: startY,
			spacing: spacingY,
			end: endY
		} = this._dataToTicks(yMin, yMax);
		let {
			start: startX,
			spacing: spacingX,
			end: endX
		} = this._dataToTicks(xMin, xMax);

		if(this.minX !== undefined) startX = this.minX;
		if(this.minY !== undefined) startY = this.minY;
		if(this.maxX !== undefined) endX = this.maxX;
		if(this.maxY !== undefined) endY = this.maxY;
		if(this.tickSpacingX !== undefined) spacingX = this.tickSpacingX;
		if(this.tickSpacingY !== undefined) spacingY = this.tickSpacingY;

		Object.values(this.data).forEach((points, j) => {
			
			let closestD = Infinity;
			let closest;
			
			for(let i = 0; i < points.length; i++) {
				if(Math.abs(points[i][0] - x*(endX-startX) - startX) < closestD) {
					closestD = Math.abs(points[i][0] - x*(endX-startX) - startX);
					closest = points[i];
				}
			}

			let pos = this._chartCoords(
				(closest[0] - startX) / (endX - startX),
				(closest[1] - startY) / (endY - startY)
			);
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'middle';
			this.ctx.fillStyle = this.strokeColor;
			this.ctx.font = this.fontSize*this.resolutionUpscale + 'px system-ui';
			let txt;
			if(this.axisLabels && parseInt(closest[0]) === closest[0]) {
				let xValue = spacingX === 1 ? (this.axisLabels[parseInt(closest[0])]) : '?';
				txt = `${xValue}; ${this._formatFloat((closest[1]).toFixed(this.interactivityPrecisionY)) + (this.tickSuffixY ?? '')}`;
			} else {
				txt = `${this._formatFloat((closest[0]).toFixed(this.interactivityPrecisionX)) + (this.tickSuffixX ?? '')}; ${this._formatFloat((closest[1]).toFixed(this.interactivityPrecisionY)) + (this.tickSuffixY ?? '')}`;
			}
			let txtWidth = this.ctx.measureText(txt).width;
			this.ctx.fillStyle = this.bgColor ?? this._getBWContrasting(this.strokeColor);
			this.ctx.strokeStyle = this.strokeColor;
			this.ctx.beginPath();
			this.ctx.roundRect ? this.ctx.roundRect(
					pos[0] - txtWidth/2 - this.fontSize*this.resolutionUpscale/2, 
					pos[1] - 3.5*this.resolutionUpscale*5*(this.fontSize/JSGrof.CHART_CONSTANTS.FONT_SIZE) - this.fontSize*this.resolutionUpscale/2 - this.fontSize*this.resolutionUpscale/2,
					txtWidth + this.fontSize*this.resolutionUpscale,
					this.fontSize*this.resolutionUpscale + this.fontSize*this.resolutionUpscale,
					this.fontSize*this.resolutionUpscale/2
			) : this.ctx.rect(
					pos[0] - txtWidth/2 - this.fontSize*this.resolutionUpscale/2, 
					pos[1] - 3.5*this.resolutionUpscale*5*(this.fontSize/JSGrof.CHART_CONSTANTS.FONT_SIZE) - this.fontSize*this.resolutionUpscale/2 - this.fontSize*this.resolutionUpscale/2,
					txtWidth + this.fontSize*this.resolutionUpscale,
					this.fontSize*this.resolutionUpscale + this.fontSize*this.resolutionUpscale
			);
			this.ctx.closePath();
			this.ctx.fill();
			this.ctx.stroke();

			this.ctx.fillStyle = this.strokeColor;
			this.ctx.fillText(
				txt,
				pos[0], pos[1] - 3.5*this.resolutionUpscale*5*(this.fontSize/JSGrof.CHART_CONSTANTS.FONT_SIZE)
			);
			this.ctx.beginPath();
			this.ctx.arc(
				pos[0],
				pos[1],
				this.resolutionUpscale*5*(this.fontSize/JSGrof.CHART_CONSTANTS.FONT_SIZE), 
				0,
				360
			);
			this.ctx.fillStyle = this.dataColors[j % this.dataColors.length];
			this.ctx.fill();
		});

	}
}
Object.assign(JSGrof.LineChart.prototype, JSGrof.ChartPrototype);

JSGrof.PieChart = function(canvasId, data, options) {

	this.type = 'piechart';

	this._initOptions(options === undefined ? {} : options);
	this._initCanvas(canvasId);
	
	// Data validation
	if(!data.constructor || data.constructor.name !== 'Object') {
		this._errorMessage('piechart', 'data must be of type Object.');
		return;
	}
	if(Object.keys(data).length === 0) {
		this._errorMessage('piechart', 'data object cannot be empty.');
		return;
	}
	for(let i = 0; i < Object.keys(data).length; i++) {
		if(!this._checkString(Object.keys(data)[i])) {
			this._errorMessage('piechart', 'Incorrect key in data (must be of type string).');
			return;
		}
		if(!this._checkFloat(Object.values(data)[i], 0, Infinity)) {
			this._errorMessage('piechart', 'Incorrect value in data (must be a non-negative number).');
			return;
		}
	}
	this.data = data;

	this._drawSelf = () => {

		this.ctx.lineWidth = this.resolutionUpscale*this.lineWidth;

		let currentAngle = 0;
		let total = Object.values(this.data).reduce((a, b) => a+b, 0);
		let r = Math.min(
			(1 - this.chartPaddingLeft - this.chartPaddingRight) * this.canvas.width * 0.5,
			(1 - this.chartPaddingTop - this.chartPaddingBottom) * this.canvas.height * 0.5
		);
		let [cx, cy] = this._chartCoords(0.5, 0.5);

		for(let i = 0; i < Object.keys(this.data).length; i++) {
			
			this.ctx.fillStyle = this.dataColors[i % this.dataColors.length];
			let pct = Object.values(this.data)[i] / total;
			this.ctx.beginPath();
			this.ctx.moveTo(...this._chartCoords(0.5, 0.5));
			this.ctx.arc(
				cx, cy,
				r,
				currentAngle + Math.PI*1.5,
				currentAngle + (this.animationPCT === undefined ? 1 : this.animationPCT)*pct*Math.PI*2 + Math.PI*1.5
			);
			this.ctx.closePath();
			this.ctx.fill();
			
			if(this.dataLabels) {

				let theText = this._formatFloat(Object.values(this.data)[i]) + (this.percentage ? ' (' + this._formatFloat((100*Object.values(this.data)[i] / total).toFixed(this.percentagePrecision)) + '%)' : '');
				this.ctx.font = this.fontSize*this.resolutionUpscale + 'px system-ui';

				this.ctx.textAlign = 'center';
				this.ctx.textBaseline = 'middle';

				let cosHalfAngle = Math.cos(currentAngle + Math.PI*1.5 + 0.5*pct*Math.PI*2);
				let sinHalfAngle = Math.sin(currentAngle + Math.PI*1.5 + 0.5*pct*Math.PI*2);

				if(this.innerLabels) {

					// Inner label text
					this.ctx.fillStyle = this._getBWContrasting(this.dataColors[i % this.dataColors.length]);
					this.ctx.fillText(theText, cx+r*0.75*cosHalfAngle, cy+r*0.75*sinHalfAngle);

				} else {

					// Outer label line
					this.ctx.strokeStyle = this.axisColor;
					this.ctx.fillStyle = this.axisColor;
					this.ctx.beginPath();
					this.ctx.moveTo(cx+r*cosHalfAngle, cy+r*sinHalfAngle);
					this.ctx.lineTo(cx+r*1.1*cosHalfAngle, cy+r*1.1*sinHalfAngle);
					this.ctx.closePath();
					this.ctx.stroke();

					// Outer label text
					let [x, y] = [cx+r*1.15*cosHalfAngle, cy+r*1.15*sinHalfAngle];
					this.ctx.translate(x, y);
					this.ctx.rotate(currentAngle + 0.5*pct*Math.PI*2);
					this.ctx.fillText(theText, 0, 0);
					this.ctx.translate(-x, -y);
					this.ctx.resetTransform();
				}
				
			}
			
			currentAngle += pct * Math.PI * 2;
		}
	}
	if(!this.animated) {this.draw(); this.draw();}

	this._animateSelf = () => {
		
		if(this.animationPCT == 1) {
			this.data = this.finalData;
			return;
		}

		switch(this.animationType) {
			default: // circular-scale
				break;
		}

		this.draw();
	}

	this._mousemove = (x, y) => {

		this.draw();

		// Check to see if in circle
		let r = Math.min(
			(1 - this.chartPaddingLeft - this.chartPaddingRight) * this.canvas.width * 0.5,
			(1 - this.chartPaddingTop - this.chartPaddingBottom) * this.canvas.height * 0.5
		);
		let [chartX, chartY] = this._chartCoords(x, y);
		let [cx, cy] = this._chartCoords(0.5, 0.5);
		if(Math.sqrt(Math.pow(chartX - cx, 2) + Math.pow(chartY - cy, 2)) > r || this.percentage !== undefined) return;

		// Find the angle of the point
		let angle = -Math.atan((chartY - cy)/(chartX - cx));
		if(chartX - cx < 0) angle += Math.PI;
		angle = (450 - angle*180/Math.PI) % 360;


		// Find the right part
		let currentAngle = 0;
		let total = Object.values(this.data).reduce((a, b) => a+b, 0);
		for(let i = 0; i < Object.keys(this.data).length; i++) {
			
			let pct = Object.values(this.data)[i] / total;
			if(!(currentAngle < angle && currentAngle + pct * 360 > angle)) {
				currentAngle += pct * 360;
				continue;
			}

			this.ctx.fillStyle = this.dataColors[i % this.dataColors.length];
			this.ctx.beginPath();
			this.ctx.moveTo(...this._chartCoords(0.5, 0.5));
			this.ctx.arc(
				cx, cy,
				r*1.05,
				currentAngle*Math.PI/180 + Math.PI*1.5,
				currentAngle*Math.PI/180 + (this.animationPCT === undefined ? 1 : this.animationPCT)*pct*Math.PI*2 + Math.PI*1.5
			);
			this.ctx.closePath();
			this.ctx.fill();

			// Show percentage
			let theText = this._formatFloat((100*Object.values(this.data)[i] / total).toFixed(this.interactivityPercentagePrecision)) + '%';
			this.ctx.font = this.fontSize*this.resolutionUpscale + 'px system-ui';
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'middle';
			let cosHalfAngle = Math.cos(currentAngle*Math.PI/180 + Math.PI*1.5 + 0.5*pct*Math.PI*2);
			let sinHalfAngle = Math.sin(currentAngle*Math.PI/180 + Math.PI*1.5 + 0.5*pct*Math.PI*2);
			this.ctx.fillStyle = this._getBWContrasting(this.dataColors[i % this.dataColors.length]);
			this.ctx.fillText(theText, cx+0.8*r*cosHalfAngle, cy+0.8*r*sinHalfAngle);

			break;
		}
	}
}
Object.assign(JSGrof.PieChart.prototype, JSGrof.ChartPrototype);

JSGrof.BarChart = function(canvasId, data, options) {

	this.type = 'barchart';

	this._initOptions(options === undefined ? {} : options);
	this._initCanvas(canvasId);
	
	// Data validation
	if(!data.constructor || data.constructor.name !== 'Object') {
		this._errorMessage('barchart', 'data must be of type object.');
		return;
	}
	if(Object.keys(data).length === 0) {
		this._errorMessage('barchart', 'data object cannot be empty.');
		return;
	}
	for(let i = 0; i < Object.keys(data).length; i++) {
		if(!this._checkString(Object.keys(data)[i])) {
			this._errorMessage('barchart', 'Incorrect key in data (must be of type string).');
			return;
		}
		if(!this._checkFloat(Object.values(data)[i], 0, Infinity)) {
			this._errorMessage('barchart', 'Incorrect value in data (must be a non-negative number).');
			return;
		}
	}
	this.data = data;

	let yMin = Infinity;
	let yMax = -Infinity;
	Object.values(this.data).forEach((val) => {
		if(val < yMin) yMin = val;
		if(val > yMax) yMax = val;
	})
	if(this.min !== undefined) yMin = this.min;
	if(this.max !== undefined) yMax = this.max;

	this._drawSelf = () => {

		/* y axis */
		this.ctx.lineWidth = this.resolutionUpscale*this.lineWidth;
		this.ctx.strokeStyle = this.axisColor;
		this.ctx.moveTo(...this._chartCoords(0, 0));
		this.ctx.lineTo(...this._chartCoords(0, 1));
		this.ctx.stroke();

		/* x axis */
		this.ctx.strokeStyle = this.axisColor;
		this.ctx.moveTo(...this._chartCoords(0, 0));
		this.ctx.lineTo(...this._chartCoords(1, 0));
		this.ctx.stroke();

		/* y ticks */
		let {
			start: startY,
			spacing: spacingY,
			end: endY
		} = this._dataToTicks(yMin, yMax);
		if(this.min !== undefined) startY = this.min;
		if(this.max !== undefined) endY = this.max;

		let nTicksY = (endY - startY) / spacingY;
		let tickSpacingY = 1/nTicksY;

		// y ticks
		let endIdxY = startY + Math.ceil(nTicksY)*spacingY > endY ? nTicksY : nTicksY+1;
		for(let i = 0; i < endIdxY; i++) {
			
			// Line
			this.ctx.strokeStyle = this.axisColor;
			this.ctx.beginPath();
			this.ctx.moveTo(...this._chartCoords(-0.02, tickSpacingY*i));
			this.ctx.lineTo(...this._chartCoords(0, tickSpacingY*i));
			this.ctx.closePath();
			this.ctx.stroke();

			if(this.grid || this.gridY) {
				this.ctx.strokeStyle = this._withOpacity(this.strokeColor, 0.3);
				this.ctx.beginPath();
				this.ctx.moveTo(...this._chartCoords(0, tickSpacingY*i));
				this.ctx.lineTo(...this._chartCoords(1.0, tickSpacingY*i));
				this.ctx.closePath();
				this.ctx.stroke();
				this.ctx.strokeStyle = this.axisColor;
			}

			// Text
			this.ctx.fillStyle = this.strokeColor;
			this.ctx.font = this.fontSize*this.resolutionUpscale + 'px system-ui';
			this.ctx.textAlign = 'right';
			this.ctx.textBaseline = 'middle';
			this.ctx.fillText(
				this._formatFloat(this._integerAddition(startY, this._integerMultiplication(i,spacingY))) + (this.tickSuffix ?? this.tickSuffixY ?? ''),
				...this._chartCoords(-0.03, tickSpacingY*i)
			);
		}

		// x ticks & bars
		let barPlusSpaceSize = 1/Object.keys(this.data).length;
		let barSize = 0.5*barPlusSpaceSize;
		let barSpaceSize = barPlusSpaceSize-barSize;
		for(let i = 0; i < Object.keys(this.data).length; i++) {
			
			// Tick line
			this.ctx.strokeStyle = this.axisColor;
			this.ctx.beginPath();
			this.ctx.moveTo(...this._chartCoords(barSpaceSize*0.5+barSize*0.5+barPlusSpaceSize*i, -0.02));
			this.ctx.lineTo(...this._chartCoords(barSpaceSize*0.5+barSize*0.5+barPlusSpaceSize*i, 0));
			this.ctx.closePath();
			this.ctx.stroke();

			// Tick text
			this.ctx.fillStyle = this.axisColor;
			this.ctx.font = this.fontSize*this.resolutionUpscale + 'px system-ui';
			this.ctx.textAlign = 'right';
			this.ctx.textBaseline = 'top';
			let [x, y] = this._chartCoords(barSpaceSize*0.5+barSize*0.5+barPlusSpaceSize*i, -0.03);
			this.ctx.translate(x, y);
			this.ctx.rotate(-Math.PI*0.25);
			this.ctx.fillText(Object.keys(this.data)[i], 0, 0);
			this.ctx.translate(-x, -y);
			this.ctx.resetTransform();
		
			// Bar
			let [barXMin, barYMin] = this._chartCoords(barSpaceSize*0.5+barPlusSpaceSize*i, 0);
			let [barXMax, barYMax] = this._chartCoords(
				barSpaceSize*0.5+barSize+barPlusSpaceSize*i,
				(Object.values(this.data)[i] - startY) / (endY - startY)
			);
			this.ctx.fillStyle = this.dataColors[i % this.dataColors.length];
			this.ctx.fillRect(
				barXMin, barYMin,
				barXMax-barXMin, barYMax-barYMin
			);

			if(this.dataLabels) {

				this.ctx.textAlign = 'center';
				this.ctx.textBaseline = 'top';

				if(this.innerLabels) {
					this.ctx.fillStyle = this._getBWContrasting(this.dataColors[i % this.dataColors.length]);
					this.ctx.fillText(
						this._formatFloat(Object.values(this.finalData ?? this.data)[i]) + (this.tickSuffix ?? (this.tickSuffixY ?? '')),
						...this._chartCoords(
							barSpaceSize*0.5+barSize*0.5+barPlusSpaceSize*i, 
							(Object.values(this.data)[i] - startY) / (endY - startY) - 0.05
						)
					);
				} else {
					this.ctx.fillStyle = this.strokeColor;
					this.ctx.fillText(
						this._formatFloat(Object.values(this.finalData ?? this.data)[i]) + (this.tickSuffix ?? (this.tickSuffixY ?? '')), 
						...this._chartCoords(
							barSpaceSize*0.5+barSize*0.5+barPlusSpaceSize*i, 
							(Object.values(this.data)[i] - startY) / (endY - startY) + 0.05
						)
					);
				}
			}
		}
	}
	if(!this.animated) {this.draw(); this.draw();}


	this._animateSelf = () => {
		
		if(this.animationPCT == 1) {
			this.data = this.finalData;
			return;
		}

		let newData = {};
		switch(this.animationType) {

			case 'left-to-right':

				for(let i = 0; i < Object.keys(this.finalData).length*this.animationPCT; i++) {
					newData[Object.keys(this.finalData)[i]] = Object.values(this.finalData)[i];
				}
				break;

			default: // y-scale

				for(let i = 0; i < Object.keys(this.finalData).length; i++) {
					newData[Object.keys(this.finalData)[i]] = Object.values(this.finalData)[i]*this.animationPCT;
				}
				break;
		}
		this.data = newData;
		this.draw();
	}


	this._mousemove = (x, y) => {
		
		this.draw();

		if(this.dataLabels) return;

		let barPlusSpaceSize = 1/Object.keys(this.data).length;
		let barSize = 0.5*barPlusSpaceSize;
		let barSpaceSize = barPlusSpaceSize-barSize;
		let {
			start: startY,
			spacing: spacingY,
			end: endY
		} = this._dataToTicks(yMin, yMax);
		if(this.min !== undefined) startY = this.min;
		if(this.max !== undefined) endY = this.max;

		for(let i = 0; i < Object.keys(this.data).length; i++) {
			
			if(x >= barSpaceSize*0.5+barPlusSpaceSize*i && x <= barSpaceSize*0.5+barSize+barPlusSpaceSize*i && y < (Object.values(this.data)[i] - startY) / (endY - startY)) {

				this.ctx.font = this.fontSize*this.resolutionUpscale + 'px system-ui';
				this.ctx.fillStyle = this._getBWContrasting(this.dataColors[i % this.dataColors.length]);
				this.ctx.fillText(
					this._formatFloat(Object.values(this.finalData ?? this.data)[i]) + (this.tickSuffix ?? (this.tickSuffixY ?? '')),
					...this._chartCoords(
						barSpaceSize*0.5+barSize*0.5+barPlusSpaceSize*i, 
						(Object.values(this.data)[i] - startY) / (endY - startY) - 0.05
					)
				);

				break;
			}
		}

	}
}
Object.assign(JSGrof.BarChart.prototype, JSGrof.ChartPrototype);

JSGrof.HistoChart = function(canvasId, data, options) {
    // Data validation

    this.type = 'histochart';

    // If data is not a list
    if(!data.constructor || data.constructor.name !== 'Array') {
        this._errorMessage('Histochart', 'Data must be an array of numbers');
        return;
    }

    // If list items are not numbers
    for(let i = 0; i < data.length; i++) {
    	if(!this._checkFloat(data[i], -Infinity, Infinity)) {
    		 this._errorMessage('Histochart', 'All items in data must be numbers.');
        	return;
    	}
    }

    // If data is empty
    if(data.length <= 0) {
        this._errorMessage('Histochart', 'List must contain more than 0 numbers');
        return;
    }

    this._initOptions(options === undefined ? {} : options);
	this._initCanvas(canvasId);

	this.data = data;


	this._drawSelf = () => {


	    let minX = Infinity;
		let maxX = -Infinity;
		this.data.forEach((val) => {
			if(val < minX) minX = val;
			if(val > maxX) maxX = val;
		})
		if(this.minX !== undefined) minX = this.minX;
		if(this.maxX !== undefined) maxX = this.maxX;



		if(parseInt((maxX - minX) / this.bucketSize)*this.bucketSize !== this._integerAddition(maxX, -minX)) {
			this._errorMessage('Histochart', 'bucketSize does not fit min and max x values');
	        return;
		}

		// Group data into buckets and count them
	    let buckets = Array(parseInt((maxX - minX) / this.bucketSize)+1).fill(0);
	    for(let i = 0; i < this.data.length; i++) {
	        buckets[parseInt((this.data[i] - minX) / this.bucketSize)]++;
	    }

	    if(this.includeMaxValueInLastBar) {
	    	buckets[buckets.length-2] += buckets[buckets.length-1];
	    }

	    if(this.portion) {
	    	buckets = buckets.map((i) => 100*i/data.length);
	    	this.tickSuffixY = ' %';
	    }


	    let minY = Infinity;
		let maxY = -Infinity;
		buckets.forEach((val) => {
			if(val < minY) minY = val;
			if(val > maxY) maxY = val;
		})
		if(this.minY !== undefined) minY = this.minY;
		if(this.maxY !== undefined) maxY = this.maxY;

		/* y axis */
		this.ctx.lineWidth = this.resolutionUpscale*this.lineWidth;
		this.ctx.strokeStyle = this.axisColor;
		this.ctx.moveTo(...this._chartCoords(0, 0));
		this.ctx.lineTo(...this._chartCoords(0, 1));
		this.ctx.stroke();

		/* x axis */
		this.ctx.strokeStyle = this.axisColor;
		this.ctx.moveTo(...this._chartCoords(0, 0));
		this.ctx.lineTo(...this._chartCoords(1, 0));
		this.ctx.stroke();

		/* y ticks */
		let {
			start: startY,
			spacing: spacingY,
			end: endY
		} = this._dataToTicks(minY, maxY);
		if(this.minY !== undefined) startY = this.minY;
		if(this.maxY !== undefined) endY = this.maxY;
		if(this.tickSpacingY !== undefined) spacingY = this.tickSpacingY;

		let nTicksY = (endY - startY) / spacingY;
		let tickSpacingY = 1/nTicksY;

		// y ticks
		let endIdxY = startY + Math.ceil(nTicksY)*spacingY > endY ? nTicksY : nTicksY+1;
		for(let i = 0; i < endIdxY; i++) {
			
			// Line
			this.ctx.strokeStyle = this.axisColor;
			this.ctx.beginPath();
			this.ctx.moveTo(...this._chartCoords(-0.02, tickSpacingY*i));
			this.ctx.lineTo(...this._chartCoords(0, tickSpacingY*i));
			this.ctx.closePath();
			this.ctx.stroke();

			if(this.grid || this.gridY) {
				this.ctx.strokeStyle = this._withOpacity(this.strokeColor, 0.3);
				this.ctx.beginPath();
				this.ctx.moveTo(...this._chartCoords(0, tickSpacingY*i));
				this.ctx.lineTo(...this._chartCoords(1.0, tickSpacingY*i));
				this.ctx.closePath();
				this.ctx.stroke();
				this.ctx.strokeStyle = this.axisColor;
			}

			// Text
			this.ctx.fillStyle = this.strokeColor;
			this.ctx.font = this.fontSize*this.resolutionUpscale + 'px system-ui';
			this.ctx.textAlign = 'right';
			this.ctx.textBaseline = 'middle';
			this.ctx.fillText(
				this._formatFloat(this._integerAddition(startY, this._integerMultiplication(i,spacingY))) + (this.tickSuffix ?? this.tickSuffixY ?? ''),
				...this._chartCoords(-0.03, tickSpacingY*i)
			);
		}

		// x ticks
		let {
			start: startX,
			spacing: spacingX,
			end: endX
		} = this._dataToTicks(minX, maxX);
		if(this.minX !== undefined) startX = this.minX;
		if(this.maxX !== undefined) endX = this.maxX;
		if(this.tickSpacingX !== undefined) spacingX = this.tickSpacingX;

		let nTicksX = (endX - startX) / spacingX;
		let tickSpacingX = 1/nTicksX;
		let endIdxX = startX + Math.ceil(nTicksX)*spacingX > endX ? nTicksX : nTicksX+1;
		
		for(let i = 0; i < endIdxX; i++) {
			
			// Line
			this.ctx.beginPath();
			this.ctx.moveTo(...this._chartCoords(tickSpacingX*i, -0.02));
			this.ctx.lineTo(...this._chartCoords(tickSpacingX*i, 0));
			this.ctx.closePath();
			this.ctx.stroke();


			if(this.grid || this.gridX) {
				this.ctx.strokeStyle = this._withOpacity(this.strokeColor, 0.3);
				this.ctx.beginPath();
				this.ctx.moveTo(...this._chartCoords(tickSpacingX*i, 0));
				this.ctx.lineTo(...this._chartCoords(tickSpacingX*i, 1.0));
				this.ctx.closePath();
				this.ctx.stroke();
				this.ctx.strokeStyle = this.strokeColor;
			}

			// Text
			this.ctx.fillStyle = this.strokeColor;
			this.ctx.font = this.fontSize*this.resolutionUpscale + 'px system-ui';
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'top';
			this.ctx.fillText(
				this._formatFloat(this._integerAddition(startX, this._integerMultiplication(i,spacingX))) + (this.tickSuffixX ?? ''),
				...this._chartCoords(tickSpacingX*i, -0.03)
			);
		}

		// Bars
		let barSize = 1/(buckets.length-1);
		for(let i = 0; i < buckets.length-1; i++) {

			// draw bucket
			let [barXMin, barYMin] = this._chartCoords(barSize*i, 0);
			let [barXMax, barYMax] = this._chartCoords(
				barSize*(i+1),
				(buckets[i] - startY) / (endY - startY)
			);
			this.ctx.fillStyle = this.dataColors[0];
			this.ctx.fillRect(
				barXMin, barYMin,
				barXMax-barXMin, barYMax-barYMin
			);
			this.ctx.strokeStyle = this._getBWContrasting(this.dataColors[0]);
			this.ctx.strokeRect(
				barXMin, barYMin,
				barXMax-barXMin, barYMax-barYMin
			);
		}
	}
	if(!this.animated) {this.draw(); this.draw();}

	this._animateSelf = () => {
		
		if(this.animationPCT == 1) {
			this.data = this.finalData;
			return;
		}

		let newData = [];
		switch(this.animationType) {

			default: // 'left-to-right'

				newData = this.finalData.slice(0, parseInt(this.finalData.length*this.animationPCT));
				break;
		}
		this.data = newData;
		this.draw();
	}

	this._mousemove = (x, y) => {

	}
}
Object.assign(JSGrof.HistoChart.prototype, JSGrof.ChartPrototype);