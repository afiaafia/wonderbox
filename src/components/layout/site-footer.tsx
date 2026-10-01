import Link from 'next/link';

import { navigation, siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-sm font-semibold tracking-tight">
            {siteConfig.name}
          </Link>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
