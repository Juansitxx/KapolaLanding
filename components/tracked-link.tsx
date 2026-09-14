"use client";

import { track } from "@vercel/analytics";

export function TrackedLink({
  event,
  source,
  ...props
}: React.ComponentProps<"a"> & { event: string; source: string }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, { origen: source });
        props.onClick?.(e);
      }}
    />
  );
}
