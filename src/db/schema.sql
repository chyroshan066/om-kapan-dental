-- Run this once against your Neon database (via the Neon SQL Editor,
-- or `psql "$DATABASE_URL" -f src/db/schema.sql`).

create extension if not exists pgcrypto;

create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  name text,
  created_at timestamptz not null default now()
);