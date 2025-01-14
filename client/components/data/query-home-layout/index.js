/**
 * External dependencies
 */
import React from 'react';
import { useDispatch } from 'react-redux';

/**
 * Internal dependencies
 */
import { requestHomeLayout } from 'calypso/state/home/actions';

export default function QueryHomeLayout( { isDev, forcedView, siteId, shuffle } ) {
	const dispatch = useDispatch();
	React.useEffect( () => {
		dispatch( requestHomeLayout( siteId, isDev, forcedView, shuffle ) );
	}, [ dispatch, siteId ] );

	return null;
}
