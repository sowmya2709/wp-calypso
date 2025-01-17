/**
 * External dependencies
 */
import { createElement } from 'react';
import page from 'page';
import { translate } from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import MarketingTools from './tools';
import MarketingBusinessTools from './business-tools';
import Sharing from './main';
import SharingButtons from './buttons/buttons';
import SharingConnections from './connections/connections';
import Traffic from './traffic/';
import UltimateTrafficGuide from './ultimate-traffic-guide';
import { requestSite } from 'calypso/state/sites/actions';
import { getSiteSlug, isJetpackSite, isJetpackModuleActive } from 'calypso/state/sites/selectors';
import { errorNotice } from 'calypso/state/notices/actions';
import { getSelectedSiteId } from 'calypso/state/ui/selectors';
import { fetchPreferences } from 'calypso/state/preferences/actions';
import { getPreference, hasReceivedRemotePreferences } from 'calypso/state/preferences/selectors';
import canCurrentUser from 'calypso/state/selectors/can-current-user';
import { setExpandedService } from 'calypso/state/sharing/actions';

export const redirectConnections = ( context ) => {
	const serviceParam = context.params.service ? `?service=${ context.params.service }` : '';
	page.redirect( `/marketing/connections/${ context.params.domain }${ serviceParam }` );
};

export const redirectDefaultConnectionsDomain = async ( context ) => {
	const { getState, dispatch } = context.store;

	if ( ! hasReceivedRemotePreferences( getState() ) ) {
		await dispatch( fetchPreferences() );
	}
	const state = getState();

	const recentSiteId = getPreference( state, 'recentSites' )[ 0 ];

	let recentSiteSlug = getSiteSlug( state, recentSiteId );
	if ( ! recentSiteSlug ) {
		await dispatch( requestSite( recentSiteId ) );
		recentSiteSlug = getSiteSlug( getState(), recentSiteId );
		if ( ! recentSiteSlug ) {
			// TODO Maybe get the primary site slug, but for now redirect to site selection.
			page.redirect( '/marketing/connections' );
		}
	}
	context.params.domain = recentSiteSlug;
	redirectConnections( context );
};

export const redirectMarketingTools = ( context ) => {
	page.redirect( '/marketing/tools/' + context.params.domain );
};

export const redirectMarketingBusinessTools = ( context ) => {
	page.redirect( '/marketing/business-tools/' + context.params.domain );
};

export const redirectSharingButtons = ( context ) => {
	page.redirect( '/marketing/sharing-buttons/' + context.params.domain );
};

export const layout = ( context, next ) => {
	const { contentComponent, pathname } = context;

	context.primary = createElement( Sharing, { contentComponent, pathname } );

	next();
};

export const connections = ( context, next ) => {
	const { store } = context;
	const { dispatch } = store;
	dispatch( setExpandedService( context.query.service ) );

	const state = store.getState();
	const siteId = getSelectedSiteId( state );

	if ( siteId && ! canCurrentUser( state, siteId, 'publish_posts' ) ) {
		dispatch(
			errorNotice( translate( 'You are not authorized to manage sharing settings for this site.' ) )
		);
	}

	context.contentComponent = createElement( SharingConnections );

	next();
};

export const marketingTools = ( context, next ) => {
	context.contentComponent = createElement( MarketingTools );

	next();
};

export const marketingBusinessTools = ( context, next ) => {
	context.contentComponent = createElement( MarketingBusinessTools );

	next();
};

export const sharingButtons = ( context, next ) => {
	const { store } = context;
	const state = store.getState();
	const siteId = getSelectedSiteId( state );

	if ( siteId && ! canCurrentUser( state, siteId, 'manage_options' ) ) {
		store.dispatch(
			errorNotice( translate( 'You are not authorized to manage sharing settings for this site.' ) )
		);
	}

	if (
		siteId &&
		isJetpackSite( state, siteId ) &&
		! isJetpackModuleActive( state, siteId, 'sharedaddy' )
	) {
		store.dispatch(
			errorNotice(
				translate(
					'This page is only available to Jetpack sites running version 3.4 or higher with the Sharing module activated.'
				)
			)
		);
	}

	context.contentComponent = createElement( SharingButtons );

	next();
};

export const traffic = ( context, next ) => {
	context.contentComponent = createElement( Traffic );

	next();
};

export const ultimateTrafficGuide = ( context, next ) => {
	context.contentComponent = createElement( UltimateTrafficGuide );

	next();
};
