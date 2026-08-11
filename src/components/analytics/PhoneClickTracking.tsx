'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Replaces the GTM "Link Click - Phone Numbers" trigger.
 *
 * The GTM container existed to load GA4 and fire this one event. Loading GA4
 * directly saves the 119 KB gtm.js wrapper; this listener costs a few hundred
 * bytes and does the same job.
 *
 * Events appear in GA4 under `phone_click`, with the number as a parameter.
 */
export function PhoneClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="tel:"]');
      if (!link) return;

      const href = link.getAttribute('href') ?? '';
      window.gtag?.('event', 'phone_click', {
        phone_number: href.replace('tel:', ''),
        link_url: href,
        page_path: window.location.pathname,
      });
    };

    // Capture phase so the event fires even if something stops propagation.
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
