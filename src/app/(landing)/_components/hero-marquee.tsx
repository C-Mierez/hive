import { cn } from "~/lib/utils";
import css from "./landing.module.css";

export default function HeroMarquee() {
  return (
    <section className="flex flex-nowrap overflow-clip whitespace-nowrap bg-foreground">
      <div
        className={cn(
          "flex min-w-max flex-nowrap text-nowrap  py-16",
          css.marquee,
        )}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <p key={i} className="min-w-max text-8xl text-background">
            {"Where ideas swarm to life -"}
            &nbsp;
          </p>
        ))}
      </div>
      <div
        aria-hidden={true}
        className={cn(
          "flex min-w-max flex-nowrap text-nowrap  py-16",
          css.marqueeCopy,
        )}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <p key={i} className="min-w-max text-8xl text-background">
            {"Where ideas swarm to life -"}
            &nbsp;
          </p>
        ))}
      </div>
    </section>
  );
}
