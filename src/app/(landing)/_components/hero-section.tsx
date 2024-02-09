import Arrow1 from "~/components/svg/arrow-1";

export default function HeroSection() {
  return (
    <section className="relative grid grid-cols-2 border-b-global">
      <div className="flex flex-col justify-between gap-16 border-r-global bg-primary px-global py-vertical">
        <div>
          <h1 className="text-8xl">Buzzing ideas.</h1>
          <h1 className="text-8xl">Blooming creativity.</h1>
        </div>
        <p className="text-4xl">
          Join Hive and experience the sweet harmony of collaboration in
          real-time!
        </p>
        <a
          href="/"
          className="brutalHover w-fit cursor-pointer rounded-sm border-global bg-foreground px-global py-4 text-2xl text-background hover:bg-accent hover:text-foreground"
        >
          Get Started
        </a>
      </div>
      <div className="bg-accent p-vertical">
        <div className="relative h-full overflow-clip rounded-sm border-global bg-background shadow-brutal">
          <div className="absolute left-0 top-0 flex h-[10%] w-full items-center gap-2 bg-foreground px-4">
            <div className="h-4 w-4 rounded-full bg-background" />
            <div className="h-4 w-4 rounded-full bg-background" />
            <div className="h-4 w-4 rounded-full bg-background" />
          </div>
        </div>
        {/* Create a couple mock cursors of real-time users */}
      </div>
      <div className="absolute left-1/2 top-0 mt-vertical h-52 w-52 -translate-x-1/3">
        <Arrow1 />
      </div>
    </section>
  );
}
