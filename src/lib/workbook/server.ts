import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { randomUUID } from "node:crypto";

export type JournalEntry = {
  day_number: number;
  field_key: string;
  value: string;
};

export type CheckinCard = {
  checkpoint: number;
  q_how_are_we: string;
  q_need_right_now: string;
  q_next_step: string;
};

export type WorkbookState = {
  journal: JournalEntry[];
  checkins: CheckinCard[];
  completedDays: number[];
  profile: { current_day: number; solo_mode: boolean } | null;
};

export const loadWorkbookState = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<WorkbookState> => {
    const sql = await getSql();
    const [journal, checkins, completedDays, profile] = await Promise.all([
      sql<JournalEntry>`
        select day_number, field_key, value from journal_entry
        where user_id = ${context.userId}
        order by day_number, field_key`,
      sql<CheckinCard>`
        select checkpoint, q_how_are_we, q_need_right_now, q_next_step
        from checkin_card where user_id = ${context.userId}
        order by checkpoint`,
      sql<{ day_number: number }>`
        select day_number from day_progress
        where user_id = ${context.userId} order by day_number`,
      sql<{ current_day: number; solo_mode: boolean }>`
        select current_day, solo_mode from workbook_profile
        where user_id = ${context.userId}`,
    ]);
    return {
      journal,
      checkins,
      completedDays: completedDays.map((r) => r.day_number),
      profile: profile[0] ?? null,
    };
  });

export const saveJournalEntry = createServerFn({ method: "POST" })
  .validator((input: { day: number; key: string; value: string }) => input)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into journal_entry (id, user_id, day_number, field_key, value)
      values (${randomUUID()}, ${context.userId}, ${data.day}, ${data.key}, ${data.value})
      on conflict (user_id, day_number, field_key)
      do update set value = ${data.value}, updated_at = now()`;
    return { ok: true };
  });

export const saveCheckin = createServerFn({ method: "POST" })
  .validator((input: { checkpoint: number; howAreWe: string; needRightNow: string; nextStep: string }) => input)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into checkin_card (id, user_id, checkpoint, q_how_are_we, q_need_right_now, q_next_step)
      values (${randomUUID()}, ${context.userId}, ${data.checkpoint}, ${data.howAreWe}, ${data.needRightNow}, ${data.nextStep})
      on conflict (user_id, checkpoint)
      do update set q_how_are_we = ${data.howAreWe}, q_need_right_now = ${data.needRightNow}, q_next_step = ${data.nextStep}`;
    return { ok: true };
  });

export const toggleDayComplete = createServerFn({ method: "POST" })
  .validator((input: { day: number }) => input)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into day_progress (user_id, day_number) values (${context.userId}, ${data.day})
      on conflict (user_id, day_number) do nothing`;
    await sql`
      insert into workbook_profile (user_id, current_day, solo_mode)
      values (${context.userId}, ${Math.min(30, data.day + 1)}, true)
      on conflict (user_id)
      do update set current_day = ${Math.min(30, data.day + 1)}, updated_at = now()`;
    return { ok: true };
  });

export const unmarkDayComplete = createServerFn({ method: "POST" })
  .validator((input: { day: number }) => input)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`delete from day_progress where user_id = ${context.userId} and day_number = ${data.day}`;
    return { ok: true };
  });

export const saveSoloMode = createServerFn({ method: "POST" })
  .validator((input: { solo: boolean }) => input)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into workbook_profile (user_id, current_day, solo_mode)
      values (${context.userId}, 1, ${data.solo})
      on conflict (user_id)
      do update set solo_mode = ${data.solo}, updated_at = now()`;
    return { ok: true };
  });

export const setCurrentDay = createServerFn({ method: "POST" })
  .validator((input: { day: number }) => input)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into workbook_profile (user_id, current_day, solo_mode)
      values (${context.userId}, ${Math.min(30, Math.max(1, data.day))}, true)
      on conflict (user_id)
      do update set current_day = ${Math.min(30, Math.max(1, data.day))}, updated_at = now()`;
    return { ok: true };
  });

export type PrayerState = {
  prayers: { night: number; read: boolean }[];
};

export const loadPrayerState = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<PrayerState> => {
    const sql = await getSql();
    const rows = await sql<{ habit_key: string; check_date: string; done: boolean }>`
      select habit_key, check_date, done from habit_streak
      where user_id = ${context.userId} and habit_key like 'prayer-%'
      order by habit_key`;
    return { prayers: rows.map((r) => ({ night: Number(r.habit_key.replace("prayer-", "")), read: r.done })) };
  });

export const togglePrayerRead = createServerFn({ method: "POST" })
  .validator((input: { night: number; read: boolean }) => input)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const today = new Date().toISOString().slice(0, 10);
    if (data.read) {
      await sql`
        insert into habit_streak (user_id, habit_key, check_date, done)
        values (${context.userId}, ${`prayer-${data.night}`}, ${today}, true)
        on conflict (user_id, habit_key, check_date)
        do update set done = true`;
    } else {
      await sql`
        delete from habit_streak
        where user_id = ${context.userId} and habit_key = ${`prayer-${data.night}`}`;
    }
    return { ok: true };
  });

export type HabitCheckoff = {
  habit_key: string;
  check_date: string;
  done: boolean;
};

export const loadHabitCheckoffs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<HabitCheckoff[]> => {
    const sql = await getSql();
    return sql<HabitCheckoff>`
      select habit_key, check_date, done from habit_streak
      where user_id = ${context.userId}
      order by check_date desc`;
  });

export const setHabitCheckoff = createServerFn({ method: "POST" })
  .validator((input: { habitKey: string; date: string; done: boolean }) => input)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into habit_streak (user_id, habit_key, check_date, done)
      values (${context.userId}, ${data.habitKey}, ${data.date}, ${data.done})
      on conflict (user_id, habit_key, check_date)
      do update set done = ${data.done}`;
    return { ok: true };
  });