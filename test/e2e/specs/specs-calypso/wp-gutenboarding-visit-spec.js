/**
 * External dependencies
 */
import config from 'config';

/**
 * Internal dependencies
 */
import LoginFlow from '../../lib/flows/login-flow.js';
import NewPage from '../../lib/pages/gutenboarding/new-page.js';

import * as driverManager from '../../lib/driver-manager.js';

const mochaTimeOut = config.get( 'mochaTimeoutMS' );
const screenSize = driverManager.currentScreenSize();

describe( 'Gutenboarding: (' + screenSize + ')', function () {
	this.timeout( mochaTimeOut );
	const driver = global.__BROWSER__;

	describe( 'Visit Gutenboarding page as a logged in user @parallel', function () {
		it( 'Can log in as user', async function () {
			await new LoginFlow( driver ).login();
		} );

		it( 'Can visit Gutenboarding', async function () {
			await NewPage.Visit( driver );
		} );
	} );
} );
