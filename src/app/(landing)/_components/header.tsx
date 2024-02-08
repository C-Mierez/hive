import { SignUpButton } from "@clerk/nextjs";
import css from "./landing.module.css";

export default function Header() {
  const items = [
    { label: "Features" },
    { label: "Pricing" },
    { label: "Blog" },
    { label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background">
      <nav className="flex items-stretch justify-between border-y-global text-lg">
        <ul className="flex gap-12 py-4 pl-global">
          {items.map((item) => (
            <NavItem key={item.label} label={item.label} />
          ))}
        </ul>
        <ul className="flex items-stretch ">
          <li>
            <SignUpButton>
              <button
                type="button"
                className="grid h-full place-items-center border-l-global px-global hover:bg-primary"
              >
                Login
              </button>
            </SignUpButton>
          </li>
          <li>
            <a
              href="/hives"
              className="grid h-full place-items-center border-l-global bg-foreground px-global text-background  hover:bg-primary hover:text-foreground"
            >
              Get Started
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function NavItem({ label }: { label: string }) {
  return <li className={css.navItem}>{label}</li>;
}
