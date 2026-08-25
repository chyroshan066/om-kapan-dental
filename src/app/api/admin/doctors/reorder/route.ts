import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/utils/db";
import { getAdminSession } from "@/utils/auth";

// Client sends the doctor ids in the exact order they should appear in
// the carousel; the index in this array becomes the new display_order.
// Simpler than a swap-two-neighbors PATCH, and it's one request no
// matter how far an item moved.
const reorderSchema = z.object({
  ids: z.array(z.string().uuid()).min(1),
});

export async function PATCH(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = reorderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input." },
      { status: 400 }
    );
  }

  // Neon's http driver (used here, see utils/db.ts) doesn't expose a
  // multi-statement transaction for a plain tagged-template client, and
  // the doctor list is small (a handful of rows), so this just awaits
  // each update in turn rather than reaching for a Pool-based
  // transaction. Fine for this scale; worth revisiting if the roster
  // grows a lot or reorders become high-frequency.
  await Promise.all(
    parsed.data.ids.map(
      (id, index) => sql`update doctors set display_order = ${index} where id = ${id}`
    )
  );

  return NextResponse.json({ success: true });
}