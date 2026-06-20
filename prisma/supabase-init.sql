create table if not exists public."Lead" (
  id text primary key,
  "fullName" text not null,
  email text not null,
  phone text not null,
  "serviceInterest" text not null,
  message text not null,
  status text not null default 'new',
  "createdAt" timestamp(3) without time zone not null default current_timestamp,
  "updatedAt" timestamp(3) without time zone not null default current_timestamp
);

create index if not exists "Lead_createdAt_idx" on public."Lead" ("createdAt" desc);
create index if not exists "Lead_email_idx" on public."Lead" (email);
