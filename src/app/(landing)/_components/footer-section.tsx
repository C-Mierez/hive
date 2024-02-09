import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="sticky bottom-0 z-[0] flex flex-col gap-4 bg-foreground px-global  text-background">
      <div className="grid grid-cols-2 pb-vertical50 pt-vertical">
        <div>
          <h1 className="text-5xl leading-tight">
            Subscribe to our newsletter to stay up to date.
          </h1>
          <form className="my-6 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-bl-sm rounded-tl-sm border-global bg-background px-8 py-4 text-2xl text-foreground "
            />
            <button className="brutalHover whitespace-nowrap text-nowrap rounded-br-sm rounded-tr-sm border-global border-l-global bg-accent px-8 py-4 text-2xl font-bold text-foreground hover:bg-primary">
              {"->"}
            </button>
          </form>
        </div>
        <ul className="flex h-full flex-col items-end justify-center gap-4 text-lg">
          <li className="underlineHover before:bg-primary">
            <Link href="/">Home</Link>
          </li>
          <li className="underlineHover before:bg-primary">
            <Link href="/">Features</Link>
          </li>
          <li className="underlineHover before:bg-primary">
            <Link href="/">Pricing</Link>
          </li>
          <li className="underlineHover before:bg-primary">
            <Link href="/">Blog</Link>
          </li>
          <li className="underlineHover before:bg-primary">
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="flex w-full justify-between py-12">
        <Link href={"/"} className="text-xl font-black">
          HIVE
        </Link>
        <ul className="flex gap-4 text-lg">
          <li className="brutalHover_sm rounded-sm border-global_sm p-2 shadow-background hover:shadow-primary">
            <Link href="https://github.com/C-Mierez/hive">
              <GitHubLogoIcon className="h-6 w-6" />
            </Link>
          </li>
          <li className="brutalHover_sm rounded-sm border-global_sm p-2 shadow-background hover:shadow-primary">
            <Link href="https://twitter.com/CMierez_">
              <TwitterLogoIcon className="h-6 w-6" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
