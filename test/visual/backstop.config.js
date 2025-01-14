const scenarios = [];

const templates = [
	'bowen',
	'doyle',
	'reynolds',
	'rivington',
	'blog',
	'team',
	'services-2',
	'portfolio-3',
	'portfolio',
	'about-5',
	'about-4',
	'about-3',
	'about-2',
	'menu',
	'about',
	'edison',
	'cassel',
	'seedlet',
	'blog-2',
	'blog-3',
	'blog-4',
	'blog-5',
	'blog-6',
	'overton',
	'maywood',
	'easley',
	'camdem',
	'brice',
	'barnsbury',
	'vesta',
	'stratford',
	'rockfield',
	'leven',
	'gibbs',
	'coutoire',
	'balasana',
	'alves',
	'twenty-twenty',
	'shawburn',
	'exford',
	'morden',
	'stow',
	'hever',
	'portfolio-8',
	'portfolio-7',
	'portfolio-6',
	'portfolio-5',
	'portfolio-4',
	'portfolio-2',
	'services',
	'contact-10',
	'contact-9',
	'contact-8',
	'contact-6',
];

for ( let i = 0; i < templates.length; i++ ) {
	scenarios.push( {
		label: templates[ i ],
		url: 'https://wordpress.com/page/e2eflowtesting3.wordpress.com',
		referenceUrl: '',
		readyEvent: '',
		readySelector: '.edit-post-visual-editor',
		delay: 2000,
		hideSelectors: [],
		removeSelectors: [],
		hoverSelector: '',
		clickSelector: '',
		postInteractionWait: 0,
		selectors: [ '.edit-post-visual-editor' ],
		selectorExpansion: true,
		expect: 0,
		misMatchThreshold: 0.1,
		requireSameDimensions: true,
		onBeforeScript: 'puppeteer/set-cookies.js',
		onReadyScript: 'puppeteer/select-layout.js',
	} );
}

const asyncCaptureLimit = process.env.CAPTURE_LIMIT ? process.env.CAPTURE_LIMIT : 5;
const asyncCompareLimit = process.env.COMPARE_LIMIT ? process.env.COMPARE_LIMIT : 50;

module.exports = {
	id: 'backstop_default',
	viewports: [
		{
			label: 'desktop',
			width: 1200,
			height: 1000,
		},
	],
	scenarios: scenarios,
	paths: {
		bitmaps_reference: 'test/visual/backstop_data/bitmaps_reference',
		bitmaps_test: 'test/visual/backstop_data/bitmaps_test',
		engine_scripts: 'test/visual/backstop_data/engine_scripts',
		html_report: 'test/visual/backstop_data/html_report',
		ci_report: 'test/visual/backstop_data/ci_report',
	},
	report: [ 'browser' ],
	engine: 'puppeteer',
	engineOptions: {
		args: [
			'--no-sandbox',
			'--user-agent=Mozilla/5.0 (wp-e2e-tests) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
		],
	},
	asyncCaptureLimit: asyncCaptureLimit,
	asyncCompareLimit: asyncCompareLimit,
	debug: false,
	debugWindow: false,
	dockerCommandTemplate:
		'docker run --rm -i --mount type=bind,source="{cwd}",target=/src backstopjs/backstopjs:{version} {backstopCommand} {args}',
};
