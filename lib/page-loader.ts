/** sessionStorage flag set once the intro loader has played. */
export const LOADER_SESSION_KEY = 'jb-loader-shown';

/**
 * Runs in <head> before paint: skips the loader when it has already played this
 * session or the visitor prefers reduced motion, so it never flashes on screen.
 */
export const loaderGateScript = `try{if(sessionStorage.getItem('${LOADER_SESSION_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('no-loader')}catch(e){document.documentElement.classList.add('no-loader')}`;
