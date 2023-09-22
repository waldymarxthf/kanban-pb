import "@mantine/dates/styles.css";
import { AppShell } from "@mantine/core";
import { Board } from "~widgets/board";
import { Header } from "~widgets/header";
import { Navbar } from "~widgets/navbar";
import { getSessionFx } from "~shared/lib/supabase/model";
import { useEffect } from "react";

export function Dashboard() {
  useEffect(() => {
    getSessionFx();
  }, []);

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <Header />
      <Navbar />
      <AppShell.Main maw="auto">
        <Board />
      </AppShell.Main>
    </AppShell>
  );
}
