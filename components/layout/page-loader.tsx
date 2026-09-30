'use client';

import { useEffect, useState } from 'react';
import { LOADER_SESSION_KEY } from '@/lib/page-loader';

// The inline monogram-white SVG, split into one path per stripe so each can draw in
// turn. The three short bars belong to the first stripe. Geometry is unchanged.
const stripes = [
  [
    'M601 323 H831 V717 A60 60 0 0 1 771 777 H601',
    'M601 375 H831',
    'M601 427 H831',
    'M601 479 H831',
  ],
  ['M884 310.5 V717 A113 113 0 0 1 771 830 H601'],
  ['M937 310.5 V717 A166 166 0 0 1 771 883 H601'],
  ['M990 310.5 V717 A219 219 0 0 1 771 936 H601'],
];

/**
 * Black intro screen: the four monogram stripes draw in (~1.2s), then it fades out.
 * The animation is pure CSS (see .page-loader in globals.css); this component only
 * records that it played and removes itself afterwards.
 */
export function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('no-loader')) {
      setDone(true);
      return;
    }
    try {
      sessionStorage.setItem(LOADER_SESSION_KEY, '1');
    } catch {
      // Storage blocked: the loader simply plays again next time.
    }
    const timer = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div className="page-loader" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="580 290 444 680"
        className="h-40 w-auto lg:h-52"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={25}
        strokeLinejoin="miter"
        strokeLinecap="butt"
      >
        {stripes.map((paths, i) =>
          paths.map((d) => (
            <path key={d} d={d} pathLength={1} style={{ '--stripe': i } as React.CSSProperties} />
          )),
        )}
      </svg>
    </div>
  );
}
