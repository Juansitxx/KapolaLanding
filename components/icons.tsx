type IconProps = React.SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.97 1-3.62-.24-.37a9.8 9.8 0 0 1-1.5-5.22c0-5.42 4.41-9.83 9.84-9.83a9.77 9.77 0 0 1 9.82 9.84c0 5.42-4.41 9.83-9.83 9.83m8.37-18.2A11.76 11.76 0 0 0 12.05.13C5.5.13.17 5.46.17 12c0 2.1.55 4.14 1.59 5.94L.07 24.1l6.3-1.65a11.87 11.87 0 0 0 5.68 1.45h.01c6.54 0 11.87-5.33 11.87-11.88 0-3.17-1.23-6.16-3.48-8.4" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Trazo tipo firma, como el swoosh debajo del logo */
export function Swoosh(props: IconProps) {
  return (
    <svg viewBox="0 0 300 30" fill="none" aria-hidden="true" preserveAspectRatio="none" {...props}>
      <path
        d="M4 22C70 8 170 2 296 14c-90-4-190 0-292 14z"
        fill="currentColor"
      />
    </svg>
  );
}
