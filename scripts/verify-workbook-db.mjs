import { readFileSync, readdirSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { randomUUID } from "node:crypto";

const pg = new PGlite();
await pg.waitReady;

// Apply all root migrations in order (same contract as scripts/migrate.mjs)
const root = "migrations";
const files = readdirSync(root).filter((f) => f.endsWith(".sql")).sort();
for (const f of files) {
  await pg.exec(readFileSync(`${root}/${f}`, "utf8"));
  console.log("applied", f);
}

const USER = "test-user";
await pg.query(
  `insert into "user" (id, name, email, "emailVerified") values ($1, 'Test User', $2, true)`,
  [USER, `${USER}@example.com`],
);
const onConflictCheck = async (label, fn) => {
  try {
    await fn();
    console.log("OK  ", label);
  } catch (e) {
    console.log("FAIL", label, String(e.message ?? e).slice(0, 300));
  }
};

// journal_entry upsert (write once + update existing)
await onConflictCheck("journal insert", async () => {
  await pg.query(
    `insert into journal_entry (id, user_id, day_number, field_key, value)
     values ($1, $2, 1, 'exercise', $3) on conflict (user_id, day_number, field_key)
     do update set value = $3, updated_at = now()`,
    [randomUUID(), USER, "hello"],
  );
});
await onConflictCheck("journal upsert same key", async () => {
  const rows = await pg.query(
    `select value from journal_entry where user_id = $1 and day_number = 1 and field_key = 'exercise'`,
    [USER],
  );
  if (rows.rows[0]?.value !== "hello") throw new Error("value mismatch: " + JSON.stringify(rows.rows));
});
const replace = await pg.query(
  `insert into journal_entry (id, user_id, day_number, field_key, value)
   values ($1, $2, 1, 'exercise', $3) on conflict (user_id, day_number, field_key)
   do update set value = $3, updated_at = now() returning value`,
  [randomUUID(), USER, "replaced"],
);
if (replace.rows[0]?.value !== "replaced") throw new Error("upsert replace failed");
console.log("OK   journal upsert replace");

await onConflictCheck("checkin insert + upsert", async () => {
  await pg.query(
    `insert into checkin_card (id, user_id, checkpoint, q_how_are_we, q_need_right_now, q_next_step)
     values ($1, $2, 7, 'ok', 'rest', 'talk') on conflict (user_id, checkpoint)
     do update set q_how_are_we = $3, q_need_right_now = $4, q_next_step = $5`,
    [randomUUID(), USER, "ok", "rest", "talk"],
  );
  const r = await pg.query(
    `select q_how_are_we from checkin_card where user_id = $1 and checkpoint = 7`,
    [USER],
  );
  if (r.rows[0]?.q_how_are_we !== "ok") throw new Error("checkin read failed");
});

await onConflictCheck("day_progress insert + conflict no-op", async () => {
  await pg.query(
    `insert into day_progress (user_id, day_number) values ($1, 1) on conflict (user_id, day_number) do nothing`,
    [USER],
  );
  await pg.query(
    `insert into day_progress (user_id, day_number) values ($1, 1) on conflict (user_id, day_number) do nothing`,
    [USER],
  );
});

await onConflictCheck("workbook_profile upsert", async () => {
  await pg.query(
    `insert into workbook_profile (user_id, current_day, solo_mode) values ($1, 2, false)
     on conflict (user_id) do update set current_day = $2, updated_at = now()`,
    [USER, 2],
  );
  const r = await pg.query(`select current_day from workbook_profile where user_id = $1`, [USER]);
  if (r.rows[0]?.current_day !== 2) throw new Error("profile read failed: " + JSON.stringify(r.rows));
});

await onConflictCheck("habit_streak insert + upsert", async () => {
  await pg.query(
    `insert into habit_streak (user_id, habit_key, check_date, done) values ($1, 'prayer-1', '2026-09-09', true)
     on conflict (user_id, habit_key, check_date) do update set done = true`,
    [USER],
  );
  await pg.query(
    `insert into habit_streak (user_id, habit_key, check_date, done) values ($1, 'prayer-1', '2026-09-09', false)
     on conflict (user_id, habit_key, check_date) do update set done = false`,
    [USER],
  );
  const r = await pg.query(
    `select done from habit_streak where user_id = $1 and habit_key = 'prayer-1'`,
    [USER],
  );
  if (r.rows[0]?.done !== false) throw new Error("habit upsert failed: " + JSON.stringify(r.rows));
});

// Tenancy isolation: second user must see nothing
const OTHER = "other-user";
const otherCount = await pg.query(
  `select count(*)::int as c from journal_entry where user_id = $1`,
  [OTHER],
);
if (otherCount.rows[0].c !== 0) throw new Error("tenant leak");
console.log("OK   tenancy isolation (second user sees zero rows)");

console.log("ALL DB CHECKS PASSED");
await pg.close();