-- Run this once against your Neon database (Neon SQL Editor, or
-- `psql "$DATABASE_URL" -f src/db/schema.sql`). Safe to re-run — every
-- statement is idempotent.

create extension if not exists pgcrypto;

create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  name text,
  created_at timestamptz not null default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text not null,
  appointment_date date not null,
  -- Display-ready label, e.g. "09:00 AM" — kept alongside the sortable
  -- minutes value below since the site's TimePicker uses a 12-hour
  -- {hour, minute, period} shape rather than a native SQL time.
  appointment_time_label text not null,
  appointment_time_minutes smallint not null,
  status text not null default 'new'
    check (status in ('new', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists appointments_date_time_idx
  on appointments (appointment_date, appointment_time_minutes);

create index if not exists appointments_status_idx
  on appointments (status);