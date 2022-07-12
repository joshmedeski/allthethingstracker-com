import { Link } from "@remix-run/react";
import React from "react";
import Logo from "~/components/Logo";
import { useOptionalUser } from "~/utils";
import { CtaLink } from "./CtaLink";

export const LayoutHeaderNavItem: React.FC<{
  name: string;
  href: string;
}> = ({ name, href }) => (
  <a href={href} className="group flex items-center font-medium">
    <span className="text-lg transition group-hover:text-primary">{name}</span>
  </a>
);

const LayoutHeader: React.FC = () => {
  const user = useOptionalUser();

  return (
    <header className="p-4">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="ml-4 mt-1 flex items-center gap-6">
            <LayoutHeaderNavItem name="Pricing" href="/pricing" />
            <LayoutHeaderNavItem name="Demo" href="/demo" />
            <LayoutHeaderNavItem name="About" href="/about" />
            <LayoutHeaderNavItem name="Blog" href="/blog" />
            <LayoutHeaderNavItem name="Help" href="/help" />
          </div>
        </div>

        {user ? (
          <LayoutHeaderNavItem name="Go to Dashboard" href="/dashboard" />
        ) : (
          <div className="flex items-center gap-6">
            <LayoutHeaderNavItem name="Login" href="/login" />
            <CtaLink />
          </div>
        )}
      </div>
    </header>
  );
};

export default LayoutHeader;
