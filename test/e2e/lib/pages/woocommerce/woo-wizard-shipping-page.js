/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';

/**
 * Internal dependencies
 */
import * as driverHelper from '../../driver-helper';
import AsyncBaseContainer from '../../async-base-container';

export default class WooWizardShippingPage extends AsyncBaseContainer {
	constructor( driver ) {
		super( driver, By.css( 'div.wc-setup-content ul.shipping' ) );
	}

	async selectContinue() {
		const continueButtonLocator = By.css( 'button.button-next' );
		return await driverHelper.clickWhenClickable( this.driver, continueButtonLocator );
	}

	async fillFlatRates( price = 20 ) {
		const domesticCostLocator = By.css( 'input[name="shipping_zones[domestic][flat_rate][cost]"]' );
		const intlCostLocator = By.css( 'input[name="shipping_zones[intl][flat_rate][cost]"]' );

		await this.driver.findElement( domesticCostLocator ).sendKeys( price );
		return await this.driver.findElement( intlCostLocator ).sendKeys( price );
	}
}
