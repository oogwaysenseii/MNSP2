'use client';

import React, { useState } from 'react';
import { Facebook, Linkedin, Link2, Mail, Check } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const lnUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const mailUrl = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-zinc-200">
      <span className="text-sm font-bold text-zinc-900">Zdieľať článok:</span>
      <a href={fbUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-100 hover:bg-amber-100 hover:text-amber-700 text-zinc-600 rounded-full transition-colors" aria-label="Zdieľať na Facebooku">
        <Facebook className="w-4 h-4" />
      </a>
      <a href={lnUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-100 hover:bg-amber-100 hover:text-amber-700 text-zinc-600 rounded-full transition-colors" aria-label="Zdieľať na LinkedIn">
        <Linkedin className="w-4 h-4" />
      </a>
      <a href={mailUrl} className="p-2 bg-zinc-100 hover:bg-amber-100 hover:text-amber-700 text-zinc-600 rounded-full transition-colors" aria-label="Poslať e-mailom">
        <Mail className="w-4 h-4" />
      </a>
      <button onClick={copyToClipboard} className="p-2 bg-zinc-100 hover:bg-amber-100 hover:text-amber-700 text-zinc-600 rounded-full transition-colors" aria-label="Kopírovať odkaz">
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
