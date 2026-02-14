-- Enable extensions
create extension if not exists pgcrypto;

create table if not exists public.merchant_configs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  acleda_merchant_id text,
  acleda_store_id text,
  encrypted_secret_key text,
  api_key text unique not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  status text not null check (status in ('PENDING', 'SUCCESS')),
  created_at timestamptz not null default now()
);

create or replace function public.generate_ahnajak_api_key()
returns text
language plpgsql
as $$
declare
  generated text;
begin
  generated := 'aj_live_' || encode(gen_random_bytes(18), 'hex');
  return generated;
end;
$$;

create or replace function public.set_merchant_config_defaults()
returns trigger
language plpgsql
as $$
begin
  if new.api_key is null or length(trim(new.api_key)) = 0 then
    new.api_key := public.generate_ahnajak_api_key();
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_set_merchant_config_defaults on public.merchant_configs;
create trigger trg_set_merchant_config_defaults
before insert or update on public.merchant_configs
for each row execute function public.set_merchant_config_defaults();

alter table public.merchant_configs enable row level security;
alter table public.transactions enable row level security;

create policy "merchant configs are only visible to owner"
  on public.merchant_configs
  for select
  using (auth.uid() = user_id);

create policy "merchant configs can be inserted by owner"
  on public.merchant_configs
  for insert
  with check (auth.uid() = user_id);

create policy "merchant configs can be updated by owner"
  on public.merchant_configs
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "transactions visible to owner"
  on public.transactions
  for select
  using (auth.uid() = user_id);

create policy "transactions inserted by owner"
  on public.transactions
  for insert
  with check (auth.uid() = user_id);
