import { createEffect, createEvent, createStore, sample } from "effector";
import type { MouseEventHandler } from "react";
import type { Session } from "@supabase/gotrue-js";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type Nullable<T> = T | null;

export const loginGoogle = createEvent<void>();

export const $session = createStore<Nullable<Session>>(null);
export const $user = createStore<Nullable<User>>(null);

export const loginGoogleFx = createEffect<MouseEventHandler<HTMLButtonElement>>(
  async () => {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    return data;
  },
);

export const getSessionFx = createEffect(async () => {
  const { data } = await supabase.auth.getSession();
  return data;
});

$session.on(getSessionFx.doneData, (_, { session }) => session);

sample({
  clock: $session,
  fn: (session) => session?.user ?? null,
  target: $user,
});
