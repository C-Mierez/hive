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
      <nav className="border-y-global flex items-stretch justify-between text-lg">
        <ul className="pl-global flex gap-12 py-4">
          {items.map((item) => (
            <NavItem key={item.label} label={item.label} />
          ))}
        </ul>
        <ul className="flex items-stretch ">
          <li>
            <a
              href="/"
              className="px-global border-l-global grid h-full place-items-center"
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="/"
              className="px-global grid h-full place-items-center bg-foreground text-background "
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
