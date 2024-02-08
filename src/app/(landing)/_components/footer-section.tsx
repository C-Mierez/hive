export default function FooterSection() {
  return (
    <footer className="py-vertical px-global grid grid-cols-2 bg-foreground text-background">
      <div>
        <h1 className="text-5xl leading-tight">
          Subscribe to our newsletter to stay up to date.
        </h1>
        <form className="my-6 flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-bl-sm rounded-tl-sm bg-background px-8 py-4 text-2xl text-foreground"
          />
          <button className="whitespace-nowrap text-nowrap rounded-br-sm rounded-tr-sm bg-accent px-8 py-4 text-2xl font-bold text-foreground">
            {"->"}
          </button>
        </form>
      </div>
      <div></div>
    </footer>
  );
}
