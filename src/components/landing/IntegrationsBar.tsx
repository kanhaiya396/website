import { XeroLogo } from "@/components/brand-logos/XeroLogo";
import { QuickBooksLogo } from "@/components/brand-logos/QuickBooksLogo";
import { SageLogo } from "@/components/brand-logos/SageLogo";
import { NomiLogo } from "@/components/brand-logos/NomiLogo";

export function IntegrationsBar() {
  const items = [
    { Logo: XeroLogo, sizeClass: "max-h-6" },
    { Logo: QuickBooksLogo, sizeClass: "max-h-[26px]" },
    { Logo: SageLogo, sizeClass: "max-h-5" },
    { Logo: NomiLogo, sizeClass: "max-h-5" },
  ];

  return (
    <section className="border-y border-border py-7">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:gap-x-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground/70">
            Connects with
          </span>

          {items.map(({ Logo, sizeClass }, i) => (
            <div
              key={i}
              className="flex h-9 items-center justify-center rounded-lg bg-white px-3 ring-1 ring-black/5"
            >
              <Logo className={`${sizeClass} w-auto`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
