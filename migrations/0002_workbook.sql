-- The Marriage Reset — workbook data model.
-- Per-user tables for journaling, progress tracking, and interactive exercises.

create table if not exists workbook_profile (
  user_id       text primary key references "user" ("id") on delete cascade,
  started_at    timestamptz not null default now(),
  current_day   integer not null default 1 check (current_day between 1 and 30),
  solo_mode     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists journal_entry (
  id            text primary key,
  user_id       text not null references "user" ("id") on delete cascade,
  day_number    integer not null check (day_number between 1 and 30),
  field_key     text not null,
  value         text not null default '',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique(user_id, day_number, field_key)
);

create table if not exists checkin_card (
  id            text primary key,
  user_id       text not null references "user" ("id") on delete cascade,
  checkpoint    integer not null check (checkpoint in (0, 7, 14, 21, 30)),
  q_how_are_we  text not null default '',
  q_need_right_now text not null default '',
  q_next_step   text not null default '',
  created_at    timestamptz not null default now(),
  unique(user_id, checkpoint)
);

create table if not exists day_progress (
  user_id       text not null references "user" ("id") on delete cascade,
  day_number    integer not null check (day_number between 1 and 30),
  completed_at  timestamptz not null default now(),
  primary key(user_id, day_number)
);

create table if not exists habit_streak (
  user_id       text not null references "user" ("id") on delete cascade,
  habit_key     text not null,
  check_date    date not null,
  done          boolean not null default false,
  primary key(user_id, habit_key, check_date)
);

create index if not exists idx_journal_user_day on journal_entry(user_id, day_number);
create index if not exists idx_checkin_user on checkin_card(user_id);
create index if not exists idx_habit_user on habit_streak(user_id, habit_key);
