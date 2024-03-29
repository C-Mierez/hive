import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { env } from "~/env";
import type { Id } from "@/convex/_generated/dataModel";

const convex = new ConvexHttpClient(env.NEXT_PUBLIC_CONVEX_URL);

const liveblocks = new Liveblocks({
  secret: env.LIVEBLOCKS_SECRET_KEY,
});

export async function POST(request: Request) {
  const authorization = auth();

  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const r = (await request.json()) as { room: Id<"hive"> };
  const room = r.room;

  const hive = await convex.query(api.hive.get, { id: room });

  if (!hive || hive.colonyId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.username ?? "Fellow Bee",
    picture: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, {
    userInfo,
  });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
