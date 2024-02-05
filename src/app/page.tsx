import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold">
        The quick brown fox jumps over the lazy dog.
      </h1>
      <h1 className="text-4xl font-bold">0123456789.</h1>
      <h1 className="text-4xl font-bold">Q.</h1>
      <div>
        <UserButton />
      </div>
    </main>
  );
}
