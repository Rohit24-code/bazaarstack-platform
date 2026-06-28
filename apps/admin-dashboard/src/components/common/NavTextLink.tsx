import { Link } from "react-router-dom";

import { NavItem } from "@/components/common/types";

export function NavTextLink({ label, href, icon: Icon }: NavItem) {
  return (
    <Link
      to={href}
      className={
        "inline-flex h-10 items-center gap-2 rounded-xl px-3 text-[15px] font-medium text-foreground/90 transition hover:bg-white/5 hover:text-foreground"
      }
    >
      <Icon className={"h-4.5 w-4.5"} />
      <span>{label}</span>
    </Link>
  );
}
