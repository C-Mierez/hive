import { Button } from "~/components/ui/button";

export default function EndSection() {
  return (
    <section className="border-y-global bg-primary py-vertical">
      <div className="container grid place-items-center">
        <h1 className="text-[10rem] font-black leading-none">HIVE</h1>
        <h2 className="mb-vertical50 text-6xl">Where ideas swarm to life</h2>
        <a
          href="/"
          className="brutalHover rounded-sm border-global bg-accent px-16 py-4 text-3xl text-background"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
