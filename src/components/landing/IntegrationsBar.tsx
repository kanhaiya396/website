import { XeroLogo } from "@/components/brand-logos/XeroLogo";
import { QuickBooksLogo } from "@/components/brand-logos/QuickBooksLogo";
import { SageLogo } from "@/components/brand-logos/SageLogo";
import { NomiLogo } from "@/components/brand-logos/NomiLogo";

type Chip = {
  name: string;
  abbr: string;
  color: string;
};

const CHIPS: Chip[] = [
  { name: "HMRC", abbr: "H", color: "#007C32" },
  { name: "VIES", abbr: "EU", color: "#003399" },
  { name: "Slack", abbr: "S", color: "#611f69" },
  { name: "WhatsApp", abbr: "W", color: "#25D366" },
];

export function IntegrationsBar() {
  return (
    <section className="border-y border-border py-7">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:gap-x-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground/70">
            Connects with
          </span>

          {[
            { Logo: XeroLogo, sizeClass: "max-h-6" },
            { Logo: QuickBooksLogo, sizeClass: "max-h-[26px]" },
            { Logo: SageLogo, sizeClass: "max-h-5" },
            { Logo: NomiLogo, sizeClass: "max-h-5" },
          ].map(({ Logo, sizeClass }, i) => (
            <div
              key={i}
              className="flex h-9 items-center justify-center rounded-lg bg-white px-3 ring-1 ring-black/5 opacity-90 transition-opacity hover:opacity-100"
            >
              <Logo className={`${sizeClass} w-auto`} />
            </div>
          ))}

          {CHIPS.map((l) => (
            <div
              key={l.name}
              className="group flex items-center gap-2.5 opacity-50 transition-opacity hover:opacity-90"
            >
              <span
                className="grid h-7 w-7 place-items-center rounded-md text-[11px] font-bold text-white"
                style={{ backgroundColor: l.color }}
              >
                {l.abbr}
              </span>
              <span className="text-[14px] font-semibold text-foreground">{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
