export default function StatsSection() {
  return (
    <section className="relative z-[1] bg-background">
      <div className="container grid gap-8 py-vertical">
        <h1 className="text-center text-7xl">Notice all the buzz?</h1>
        <h2 className="text-center text-4xl leading-tight">
          {
            "Our community has transformed ideas into success stories, and we're so thrilled to have them share their experiences with you. This could not be possible without our dear users."
          }
        </h2>
      </div>
      <div className="relative">
        <Stats value="60,000+" label={"Registered users"} />
        <Stats value="410,000+" label={"Hives created"} />
        <Stats value="35,000+" label={"Daily users"} />
        <Stats value="Immeasurable" label={"Love for you all"} />
      </div>
    </section>
  );
}

interface StatsParams {
  label: string;
  value: string;
}

function Stats(params: StatsParams) {
  return (
    <div className=" sticky top-[3.75rem] w-full border-t-global bg-background py-vertical50 odd:bg-muted">
      <div className="container grid place-items-center gap-6">
        <h3 className="text-9xl">{params.value}</h3>
        <p className="text-3xl">{params.label}</p>
      </div>
    </div>
  );
}
