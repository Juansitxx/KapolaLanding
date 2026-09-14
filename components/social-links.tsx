import { cn } from "cn";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons";
import { site } from "@/lib/site";

export const socials = [
  { label: `Instagram ${site.instagramHandle}`, href: site.instagramUrl, Icon: InstagramIcon },
  { label: "TikTok @kapola_ibague", href: site.tiktokUrl, Icon: TikTokIcon },
  { label: "Facebook Kapola", href: site.facebookUrl, Icon: FacebookIcon },
];

export function SocialLinks({
  className,
  linkClassName,
}: {
  className?: string;
  linkClassName?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map(({ label, href, Icon }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn("grid size-11 place-items-center rounded-full transition", linkClassName)}
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
