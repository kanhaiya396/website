import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const btn = (active: boolean) =>
    cn(
      "relative flex h-7 w-7 items-center justify-center rounded-full transition-[background-color,color,border-color,box-shadow] duration-[280ms] ease-in-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
      active
        ? "bg-background text-foreground shadow-md ring-1 ring-border"
        : "text-muted-foreground hover:bg-primary hover:text-primary-foreground"
    );

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 p-1 shadow-sm backdrop-blur",
        className
      )}
    >
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="Switch to light mode"
            aria-pressed={theme === "light"}
            onClick={() => setTheme("light")}
            className={btn(theme === "light")}
          >
            <Sun className="h-3.5 w-3.5" strokeWidth={2.25} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          Light mode
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="Switch to dark mode"
            aria-pressed={theme === "dark"}
            onClick={() => setTheme("dark")}
            className={btn(theme === "dark")}
          >
            <Moon className="h-3.5 w-3.5" strokeWidth={2.25} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          Dark mode
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
