import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Outworx — AI Autopilot for Accountants" },
      {
        name: "description",
        content:
          "AI-powered bookkeeping automation for accountants and bookkeepers — from data capture to financial close.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <main className="min-h-screen bg-bg-dark" />;
}
