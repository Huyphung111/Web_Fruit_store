create extension if not exists pgcrypto;

create table if not exists public.fruits (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  price numeric(12, 0) not null check (price >= 0),
  unit text not null default 'kg' check (unit in ('kg', 'trái', 'hộp', 'túi')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_fruits_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists fruits_set_updated_at on public.fruits;
create trigger fruits_set_updated_at
before update on public.fruits
for each row execute function public.set_fruits_updated_at();

alter table public.fruits enable row level security;

grant select, insert, update, delete on table public.fruits to anon;

drop policy if exists "Public can read fruits" on public.fruits;
create policy "Public can read fruits"
on public.fruits for select
to anon
using (true);

drop policy if exists "Public can add fruits" on public.fruits;
create policy "Public can add fruits"
on public.fruits for insert
to anon
with check (true);

drop policy if exists "Public can update fruits" on public.fruits;
create policy "Public can update fruits"
on public.fruits for update
to anon
using (true)
with check (true);

drop policy if exists "Public can delete fruits" on public.fruits;
create policy "Public can delete fruits"
on public.fruits for delete
to anon
using (true);
