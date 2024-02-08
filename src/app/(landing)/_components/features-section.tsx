import { ClassValue } from "clsx";
import React from "react";
import { cn } from "~/lib/utils";

export default function FeaturesSection() {
  return (
    <section>
      <div className="py-vertical container grid gap-8">
        <h1 className="text-center text-7xl">Dive into our features</h1>
        <h2 className="text-center text-4xl leading-tight">
          Discover the aspects that make Hive your ultimate go-to platform for
          seamless and dynamic collaboration.
        </h2>
      </div>
      <FeatureDiv
        feature={{
          title: "Real-Time Collaboration",
          description:
            "Bring your team together effortlessly. With Hive, collaboration happens in real-time, no delays, just a hive of synchronized creativity.",
        }}
      >
        <div className="border-global shadow-brutal relative min-h-[40vh] overflow-clip rounded-sm bg-background">
          <div className="absolute left-0 top-0 flex h-[10%] w-full items-center gap-2 bg-foreground px-4">
            <div className="h-4 w-4 rounded-full bg-background" />
            <div className="h-4 w-4 rounded-full bg-background" />
            <div className="h-4 w-4 rounded-full bg-background" />
          </div>
        </div>
      </FeatureDiv>
      <Testimonial
        quote={`“Hive has completely transformed the way my team collaborates. It's like having a digital playground for creativity. Thanks to Hive, our projects have reached new heights, and our design process has become a smooth, collaborative journey. I can't imagine working without it!”`}
        name="Sarah Anderson, Graphic Designer at Pixel Studios"
        avatar={<div className="h-24 w-24 rounded-full bg-foreground" />}
      />
      <FeatureDiv
        flipped
        bg="bg-accent"
        feature={{
          title: "Infinite Canvas",
          description:
            "Break free from constraints. Hive offers an infinite canvas, letting your ideas flow without limits. Your creativity knows no bounds on Hive.",
        }}
      >
        <div className="border-global shadow-brutal relative min-h-[40vh] overflow-clip rounded-sm bg-background">
          <div className="absolute left-0 top-0 flex h-[10%] w-full items-center gap-2 bg-foreground px-4">
            <div className="h-4 w-4 rounded-full bg-background" />
            <div className="h-4 w-4 rounded-full bg-background" />
            <div className="h-4 w-4 rounded-full bg-background" />
          </div>
        </div>
      </FeatureDiv>
      <Testimonial
        flipped
        quote={`“Time is of the essence and Hive has become our secret weapon for efficient collaboration at Quantum Solutions. The intuitive tools and secure sharing options make it easy to keep everyone on the same page. Hive ensures our team stays connected, organized, and always one step ahead.”`}
        name="Alex Thompson, Project Manager at Quantum Solutions"
        avatar={<div className="h-24 w-24 rounded-full bg-foreground" />}
      />
      <FeatureDiv
        feature={{
          title: "Secure Sharing",
          description:
            "Share your hive securely. Hive ensures your collaborative work is shared seamlessly and with the utmost privacy, fostering trust among your team.",
        }}
      >
        <div className="border-global shadow-brutal relative min-h-[40vh] overflow-clip rounded-sm bg-background">
          <div className="absolute left-0 top-0 flex h-[10%] w-full items-center gap-2 bg-foreground px-4">
            <div className="h-4 w-4 rounded-full bg-background" />
            <div className="h-4 w-4 rounded-full bg-background" />
            <div className="h-4 w-4 rounded-full bg-background" />
          </div>
        </div>
      </FeatureDiv>
    </section>
  );
}
interface FeatureDivParams {
  flipped?: boolean;
  feature: {
    title: string;
    description: string;
    className?: ClassValue;
    bg?: ClassValue;
  };
  children?: React.ReactNode;
  bg?: ClassValue;
}

function FeatureDiv(params: FeatureDivParams) {
  const image = (
    <div
      className={cn(
        "px-global py-vertical50",
        params.flipped ? "border-l-global" : "border-r-global",
        params.bg ? params.bg : "bg-accent",
      )}
    >
      {params.children}
    </div>
  );
  const feature = (
    <div className="px-global py-vertical50 grid h-fit gap-8">
      <h3 className="text-5xl">{params.feature.title}</h3>
      <p className="text-2xl">{params.feature.description}</p>
    </div>
  );
  return (
    <div className="border-y-global grid grid-cols-2">
      {params.flipped ? feature : image}
      {params.flipped ? image : feature}
    </div>
  );
}

interface TestimonialParams {
  flipped?: boolean;
  quote: string;
  name: string;
  avatar: React.ReactNode;
}

function Testimonial(params: TestimonialParams) {
  const avatar = (
    <div
      className={cn(
        "px-global py-vertical50 grid h-full w-full place-items-center",
      )}
    >
      {params.avatar}
    </div>
  );
  const quote = (
    <div className="py-vertical px-global2 grid h-fit gap-32">
      <h3 className="text-5xl leading-tight">{params.quote}</h3>
      <p className="text-2xl">
        {"- "}
        {params.name}
      </p>
    </div>
  );
  return (
    <div className="grid min-h-[50vh] grid-cols-2 bg-primary">
      {params.flipped ? avatar : quote}
      {params.flipped ? quote : avatar}
    </div>
  );
}
