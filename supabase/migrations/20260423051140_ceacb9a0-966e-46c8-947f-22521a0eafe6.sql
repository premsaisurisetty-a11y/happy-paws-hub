
-- Profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  city text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Pets table
create table public.pets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  breed text,
  age_years numeric,
  photo_url text,
  next_vaccine text,
  next_vaccine_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.pets enable row level security;

create policy "Pets viewable by owner"
  on public.pets for select using (auth.uid() = user_id);
create policy "Pets insert by owner"
  on public.pets for insert with check (auth.uid() = user_id);
create policy "Pets update by owner"
  on public.pets for update using (auth.uid() = user_id);
create policy "Pets delete by owner"
  on public.pets for delete using (auth.uid() = user_id);

-- Bookings table
create type public.booking_status as enum ('confirmed', 'completed', 'cancelled');

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pet_id uuid references public.pets(id) on delete set null,
  provider_id text not null,
  provider_name text not null,
  category text not null,
  booking_date date not null,
  booking_time text,
  end_date date,
  status public.booking_status not null default 'confirmed',
  price_estimate numeric,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

create policy "Bookings viewable by owner"
  on public.bookings for select using (auth.uid() = user_id);
create policy "Bookings insert by owner"
  on public.bookings for insert with check (auth.uid() = user_id);
create policy "Bookings update by owner"
  on public.bookings for update using (auth.uid() = user_id);
create policy "Bookings delete by owner"
  on public.bookings for delete using (auth.uid() = user_id);

-- Updated_at trigger function
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger set_pets_updated_at before update on public.pets
  for each row execute function public.set_updated_at();
create trigger set_bookings_updated_at before update on public.bookings
  for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Prevent same provider double-booking on same date+time
create unique index bookings_no_double_book
  on public.bookings (provider_id, booking_date, booking_time)
  where status = 'confirmed' and booking_time is not null;
