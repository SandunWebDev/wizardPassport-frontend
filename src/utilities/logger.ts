import log from 'loglevel';

import globalValues from '../configs/globalValues';

const isDevelopment = globalValues.environment.IS_DEVELOPMENT;

// Differentiate displaying log levels depending on stage.
if (isDevelopment) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	log.setLevel('TRACE');
} else {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	log.setLevel('SILENT');
}

// For convenience adding "log" object as global variable. So we can easily do logging (Ex. log.info("AAA")), without importing 'log' every time.
// Also note that to avoid ESLint complaining "no-undef", we have added "log" as global in ".eslintrc.js" too.
// But note that in typescript we have to do like "window.log.warn()" instead of just "log.warn()".

// This is just TypeScript stuff.
declare global {
	interface Window {
		log: log.Logger;
	}
}

window.log = log;

/**
 * SIDENOTE : To use this logger just use it like below in anywhere.
 *
      - log.trace(msg)
      - log.debug(msg) / log.log(msg)
      - log.info(msg)
      - log.warn(msg)
      - log.error(msg)
 */

// eslint-disable-next-line no-restricted-exports
export { default } from 'loglevel';
