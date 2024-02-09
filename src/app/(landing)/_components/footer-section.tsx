export default function FooterSection() {
  return (
    <footer className="grid grid-cols-2 bg-foreground px-global py-vertical text-background">
      <div>
        <h1 className="text-5xl leading-tight">
          Subscribe to our newsletter to stay up to date.
        </h1>
        <form className="my-6 flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-bl-sm rounded-tl-sm border-global bg-background px-8 py-4 text-2xl text-foreground"
          />
          <button className="brutalHover whitespace-nowrap text-nowrap rounded-br-sm rounded-tr-sm border-global border-l-global bg-accent px-8 py-4 text-2xl font-bold text-foreground hover:bg-primary">
            {"->"}
          </button>
        </form>
      </div>
      <div></div>
    </footer>
  );
}
