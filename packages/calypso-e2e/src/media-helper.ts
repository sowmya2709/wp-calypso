/**
 * External dependencies
 */
import path from 'path';

/**
 * Internal dependencies
 */
import { getTargetLocale, getTargetScreenSize } from './browser-helper';

/**
 * Returns the base asset directory.
 *
 * @returns {string} Absolute path to the directory.
 */
export function getAssetDir(): string {
	return path.resolve( process.env.TEMP_ASSET_PATH || path.join( __dirname, '..' ) );
}

/**
 * Returns the screenshot save directory.
 *
 * @returns {string} Absolute path to the directory.
 */
export function getScreenshotDir(): string {
	return path.resolve( getAssetDir(), process.env.SCREENSHOTDIR || 'screenshots' );
}

/**
 * Returns the video save directory.
 *
 * @returns {string} Absolute path to the directory.
 */
export function getVideoDir(): string {
	return path.resolve( getAssetDir(), process.env.VIDEODIR || 'screenshots/videos' );
}

/**
 * Returns a descriptive file name for the screenshot file.
 *
 * @param {string} name Name of the test case that failed.
 * @returns {string} A Path-like string.
 */
export function getScreenshotName( name: string ): string {
	const shortTestFileName = name.replace( /[^a-z0-9]/gi, '-' ).toLowerCase();
	const screenSize = getTargetScreenSize().toUpperCase();
	const locale = getTargetLocale().toUpperCase();
	const date = getDateString();
	const fileName = `FAILED-${ locale }-${ screenSize }-${ shortTestFileName }-${ date }`;
	const screenshotDir = getScreenshotDir();
	return `${ screenshotDir }/${ fileName }.png`;
}

/**
 * Returns a descriptive file name for video recording file.
 *
 * @param {string} name Name of the suite and test case that failed.
 * @returns {string} A Path-like string.
 */
export function getVideoName( name: string ): string {
	const suiteName = name.replace( /[^a-z0-9]/gi, '-' ).toLowerCase();
	const locale = getTargetLocale().toUpperCase();
	const screenSize = getTargetScreenSize().toUpperCase();
	const date = getDateString();
	const fileName = `FAILED-${ locale }-${ screenSize }-${ suiteName }-${ date }`;
	const videoDir = getVideoDir();
	return `${ videoDir }/${ fileName }.webm`;
}

/**
 * Returns the current date as a time stamp.
 *
 * @returns {string} Date represented as a timestamp.
 */
export function getDateString(): string {
	return new Date().getTime().toString();
}
