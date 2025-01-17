/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */
import Main from 'calypso/components/main';
import SidebarNavigation from 'calypso/my-sites/sidebar-navigation';
import ThemesSiteSelectorModal from './themes-site-selector-modal';
import { connectOptions } from './theme-options';
import ThemeShowcase from './theme-showcase';
import InstallThemeButton from './install-theme-button';

const MultiSiteThemeShowcase = connectOptions( ( props ) => (
	<Main fullWidthLayout className="themes">
		<SidebarNavigation />
		<InstallThemeButton />
		<ThemesSiteSelectorModal { ...props }>
			<ThemeShowcase source="showcase" showUploadButton={ false } />
		</ThemesSiteSelectorModal>
	</Main>
) );

export default ( props ) => (
	<MultiSiteThemeShowcase
		{ ...props }
		origin="wpcom"
		defaultOption="activate"
		secondaryOption="tryandcustomize"
		getScreenshotOption={ function () {
			return 'info';
		} }
	/>
);
