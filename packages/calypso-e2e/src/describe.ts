/* eslint-disable jest/valid-describe, jest/valid-title */

/**
 * External dependencies
 */
import { describe as mochaDescribe } from 'mocha';
import type { Suite } from 'mocha';

export const describe = (
	name: string,
	fn: ( this: Suite ) => void
): ReturnType< typeof mochaDescribe > => {
	// const f = ( suite: Suite ) => {};
	return mochaDescribe( name, fn );
};
