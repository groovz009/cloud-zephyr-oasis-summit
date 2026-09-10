import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-Bs5V1WYo.mjs";
import { t as authMiddleware } from "./middleware-DNAHkllt.mjs";
import { randomUUID } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/server-BtypgY5f.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadWorkbookState_createServerFn_handler = createServerRpc({
	id: "b4ab9db9e97af5a036810f7b636d3cfc65ab7e686d03101ac18834225945309e",
	name: "loadWorkbookState",
	filename: "src/lib/workbook/server.ts"
}, (opts) => loadWorkbookState.__executeServer(opts));
var loadWorkbookState = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadWorkbookState_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const [journal, checkins, completedDays, profile] = await Promise.all([
		sql`
        select day_number, field_key, value from journal_entry
        where user_id = ${context.userId}
        order by day_number, field_key`,
		sql`
        select checkpoint, q_how_are_we, q_need_right_now, q_next_step
        from checkin_card where user_id = ${context.userId}
        order by checkpoint`,
		sql`
        select day_number from day_progress
        where user_id = ${context.userId} order by day_number`,
		sql`
        select current_day, solo_mode from workbook_profile
        where user_id = ${context.userId}`
	]);
	return {
		journal,
		checkins,
		completedDays: completedDays.map((r) => r.day_number),
		profile: profile[0] ?? null
	};
});
var saveJournalEntry_createServerFn_handler = createServerRpc({
	id: "8d15ec6e00fcbf7ba37fd94bf83c0d98f34cc9e1252ba5fcd7a1dd71af623aa0",
	name: "saveJournalEntry",
	filename: "src/lib/workbook/server.ts"
}, (opts) => saveJournalEntry.__executeServer(opts));
var saveJournalEntry = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(saveJournalEntry_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      insert into journal_entry (id, user_id, day_number, field_key, value)
      values (${randomUUID()}, ${context.userId}, ${data.day}, ${data.key}, ${data.value})
      on conflict (user_id, day_number, field_key)
      do update set value = ${data.value}, updated_at = now()`;
	return { ok: true };
});
var saveCheckin_createServerFn_handler = createServerRpc({
	id: "903e6d363189793e36406b5cd3bbdaa4e3733ba775df1d18bb6d18150f5ae49d",
	name: "saveCheckin",
	filename: "src/lib/workbook/server.ts"
}, (opts) => saveCheckin.__executeServer(opts));
var saveCheckin = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(saveCheckin_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      insert into checkin_card (id, user_id, checkpoint, q_how_are_we, q_need_right_now, q_next_step)
      values (${randomUUID()}, ${context.userId}, ${data.checkpoint}, ${data.howAreWe}, ${data.needRightNow}, ${data.nextStep})
      on conflict (user_id, checkpoint)
      do update set q_how_are_we = ${data.howAreWe}, q_need_right_now = ${data.needRightNow}, q_next_step = ${data.nextStep}`;
	return { ok: true };
});
var toggleDayComplete_createServerFn_handler = createServerRpc({
	id: "69e2f7970b445ff43bba82817f0c07adceb3c5a679e5b8e08189b59bc23c6bed",
	name: "toggleDayComplete",
	filename: "src/lib/workbook/server.ts"
}, (opts) => toggleDayComplete.__executeServer(opts));
var toggleDayComplete = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(toggleDayComplete_createServerFn_handler, async ({ context, data }) => {
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
var unmarkDayComplete_createServerFn_handler = createServerRpc({
	id: "4e09f71f74a23b393f984e6df6254bf3fe47647235bfcf2bf89cfe75bf9c31d4",
	name: "unmarkDayComplete",
	filename: "src/lib/workbook/server.ts"
}, (opts) => unmarkDayComplete.__executeServer(opts));
var unmarkDayComplete = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(unmarkDayComplete_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`delete from day_progress where user_id = ${context.userId} and day_number = ${data.day}`;
	return { ok: true };
});
var saveSoloMode_createServerFn_handler = createServerRpc({
	id: "aa03d203f369b82c13cd7621ea8c5035c1e098a0f17213bc7818834ab6207ea1",
	name: "saveSoloMode",
	filename: "src/lib/workbook/server.ts"
}, (opts) => saveSoloMode.__executeServer(opts));
var saveSoloMode = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(saveSoloMode_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      insert into workbook_profile (user_id, current_day, solo_mode)
      values (${context.userId}, 1, ${data.solo})
      on conflict (user_id)
      do update set solo_mode = ${data.solo}, updated_at = now()`;
	return { ok: true };
});
var setCurrentDay_createServerFn_handler = createServerRpc({
	id: "4b1598c541bd6cf0b85b57bc4e4cdbb66e4eedde0df77762d09726df1060206e",
	name: "setCurrentDay",
	filename: "src/lib/workbook/server.ts"
}, (opts) => setCurrentDay.__executeServer(opts));
var setCurrentDay = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(setCurrentDay_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      insert into workbook_profile (user_id, current_day, solo_mode)
      values (${context.userId}, ${Math.min(30, Math.max(1, data.day))}, true)
      on conflict (user_id)
      do update set current_day = ${Math.min(30, Math.max(1, data.day))}, updated_at = now()`;
	return { ok: true };
});
var loadPrayerState_createServerFn_handler = createServerRpc({
	id: "764dcc09ac7c0a77e4fffbe0dfd17a9d36c6ede1ff9c17038dad604ef5ff5024",
	name: "loadPrayerState",
	filename: "src/lib/workbook/server.ts"
}, (opts) => loadPrayerState.__executeServer(opts));
var loadPrayerState = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadPrayerState_createServerFn_handler, async ({ context }) => {
	return { prayers: (await (await getSql())`
      select habit_key, check_date, done from habit_streak
      where user_id = ${context.userId} and habit_key like 'prayer-%'
      order by habit_key`).map((r) => ({
		night: Number(r.habit_key.replace("prayer-", "")),
		read: r.done
	})) };
});
var togglePrayerRead_createServerFn_handler = createServerRpc({
	id: "6bd732f3cb5e0fbe0042f4708c2ebb6455fb2f896617991dd3d195430d56e077",
	name: "togglePrayerRead",
	filename: "src/lib/workbook/server.ts"
}, (opts) => togglePrayerRead.__executeServer(opts));
var togglePrayerRead = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(togglePrayerRead_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	if (data.read) await sql`
        insert into habit_streak (user_id, habit_key, check_date, done)
        values (${context.userId}, ${`prayer-${data.night}`}, ${today}, true)
        on conflict (user_id, habit_key, check_date)
        do update set done = true`;
	else await sql`
        delete from habit_streak
        where user_id = ${context.userId} and habit_key = ${`prayer-${data.night}`}`;
	return { ok: true };
});
var loadHabitCheckoffs_createServerFn_handler = createServerRpc({
	id: "249b9ffe49bf3781f66ea31c5f4f59be25f0a5e2fc12742a708c3d1c0cd48dfe",
	name: "loadHabitCheckoffs",
	filename: "src/lib/workbook/server.ts"
}, (opts) => loadHabitCheckoffs.__executeServer(opts));
var loadHabitCheckoffs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadHabitCheckoffs_createServerFn_handler, async ({ context }) => {
	return (await getSql())`
      select habit_key, check_date, done from habit_streak
      where user_id = ${context.userId}
      order by check_date desc`;
});
var setHabitCheckoff_createServerFn_handler = createServerRpc({
	id: "5bf07b3912cd68f0c4a8435cc7341acbf6e14a83c7f2ce8c8394b8d37f5b821c",
	name: "setHabitCheckoff",
	filename: "src/lib/workbook/server.ts"
}, (opts) => setHabitCheckoff.__executeServer(opts));
var setHabitCheckoff = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(setHabitCheckoff_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      insert into habit_streak (user_id, habit_key, check_date, done)
      values (${context.userId}, ${data.habitKey}, ${data.date}, ${data.done})
      on conflict (user_id, habit_key, check_date)
      do update set done = ${data.done}`;
	return { ok: true };
});
//#endregion
export { loadHabitCheckoffs_createServerFn_handler, loadPrayerState_createServerFn_handler, loadWorkbookState_createServerFn_handler, saveCheckin_createServerFn_handler, saveJournalEntry_createServerFn_handler, saveSoloMode_createServerFn_handler, setCurrentDay_createServerFn_handler, setHabitCheckoff_createServerFn_handler, toggleDayComplete_createServerFn_handler, togglePrayerRead_createServerFn_handler, unmarkDayComplete_createServerFn_handler };
