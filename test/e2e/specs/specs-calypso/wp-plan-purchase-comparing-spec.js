/**
 * External dependencies
 */
import config from 'config';
import assert from 'assert';

/**
 * Internal dependencies
 */
import * as driverManager from '../../lib/driver-manager.js';
import * as dataHelper from '../../lib/data-helper';

import LoginFlow from '../../lib/flows/login-flow.js';
import PlansPage from '../../lib/pages/plans-page.js';
import SidebarComponent from '../../lib/components/sidebar-component.js';

const mochaTimeOut = config.get( 'mochaTimeoutMS' );
const startBrowserTimeoutMS = config.get( 'startBrowserTimeoutMS' );
const screenSize = driverManager.currentScreenSize();
const host = dataHelper.getJetpackHost();

describe( `[${ host }] Plans: (${ screenSize })`, function () {
	this.timeout( mochaTimeOut );
	let driver;

	before( 'Start browser', async function () {
		this.timeout( startBrowserTimeoutMS );
		driver = await driverManager.startBrowser();
	} );

	describe( 'Comparing Plans:  @parallel @jetpack', function () {
		it( 'Login and Select My Site', async function () {
			const loginFlow = new LoginFlow( driver );
			return await loginFlow.loginAndSelectMySite();
		} );

		it( 'Can Select Plans', async function () {
			const sideBarComponent = await SidebarComponent.Expect( driver );
			return await sideBarComponent.selectPlans();
		} );

		it( 'Can Compare Plans', async function () {
			const plansPage = await PlansPage.Expect( driver );
			await plansPage.openPlansTab();
			return await plansPage.waitForComparison();
		} );

		if ( host === 'WPCOM' ) {
			it( 'Can Verify Current Plan', async function () {
				const planName = 'premium';
				const plansPage = await PlansPage.Expect( driver );
				const present = await plansPage.confirmCurrentPlan( planName );
				return assert( present, `Failed to detect correct plan (${ planName })` );
			} );

			it( 'Can See Exactly One Primary CTA Button', async function () {
				const plansPage = await PlansPage.Expect( driver );
				return assert(
					await plansPage.onePrimaryButtonShown(),
					'Incorrect number of primary buttons'
				);
			} );
		} else {
			it( 'Can Verify Current Plan', async function () {
				// Jetpack
				const plansPage = await PlansPage.Expect( driver );
				const displayed = await plansPage.planTypesShown( 'jetpack' );
				return assert( displayed, 'The Jetpack plans are NOT displayed' );
			} );
		}
	} );
} );
