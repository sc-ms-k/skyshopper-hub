
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle 
      aria-label="Toggle theme" 
      className="p-2 rounded-full hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors"
      onPressedChange={toggleTheme}
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] text-foreground/70" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-foreground/70" />
      )}
    </Toggle>
  );
}
