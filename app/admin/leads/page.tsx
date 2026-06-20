import { Prisma, type Lead } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

const statuses = ["new", "contacted", "closed"] as const;

type LeadStatus = (typeof statuses)[number];

function isLeadStatus(status: FormDataEntryValue | null): status is LeadStatus {
  return typeof status === "string" && statuses.includes(status as LeadStatus);
}

async function requireAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("Admin authentication is not configured.");
  }

  const authorization = (await headers()).get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    throw new Error("Unauthorized");
  }

  const credentials = atob(authorization.slice("Basic ".length));
  const separator = credentials.indexOf(":");

  if (separator === -1) {
    throw new Error("Unauthorized");
  }

  const suppliedUsername = credentials.slice(0, separator);
  const suppliedPassword = credentials.slice(separator + 1);

  if (suppliedUsername !== username || suppliedPassword !== password) {
    throw new Error("Unauthorized");
  }
}

async function updateLeadStatus(formData: FormData) {
  "use server";

  await requireAdmin();

  const id = formData.get("id");
  const status = formData.get("status");

  if (typeof id !== "string" || !isLeadStatus(status)) {
    return;
  }

  await prisma.lead.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/leads");
}

async function deleteLead(formData: FormData) {
  "use server";

  await requireAdmin();

  const id = formData.get("id");

  if (typeof id !== "string") {
    return;
  }

  await prisma.lead.delete({
    where: { id },
  });

  revalidatePath("/admin/leads");
}

function statusClasses(status: string) {
  if (status === "closed") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  }

  if (status === "contacted") {
    return "bg-sky-50 text-sky-700 ring-sky-200";
  }

  return "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200";
}

export default async function Admin({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; status?: string }>;
}) {
  await connection();

  const params = await searchParams;
  const q = params?.q?.trim() ?? "";
  const status = params?.status ?? "all";

  const where: Prisma.LeadWhereInput = {};

  if (q) {
    where.OR = [
      { fullName: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
      { serviceInterest: { contains: q, mode: "insensitive" } },
      { message: { contains: q, mode: "insensitive" } },
    ];
  }

  if (statuses.includes(status as LeadStatus)) {
    where.status = status;
  }

  let leads: Lead[] = [];
  let totalLeads = 0;
  let newLeads = 0;
  let contactedLeads = 0;
  let closedLeads = 0;
  let databaseError = "";

  try {
    [leads, totalLeads, newLeads, contactedLeads, closedLeads] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "new" } }),
      prisma.lead.count({ where: { status: "contacted" } }),
      prisma.lead.count({ where: { status: "closed" } }),
    ]);
  } catch (error) {
    console.error("Admin lead query failed", error);
    databaseError =
      "The admin panel could not connect to the database. Check your Supabase connection string, project status, and network access.";
  }

  const statCards = [
    { label: "Total leads", value: totalLeads },
    { label: "New", value: newLeads },
    { label: "Contacted", value: contactedLeads },
    { label: "Closed", value: closedLeads },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef6ff_0%,#f8fbff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-[var(--brand-dark)] p-6 text-white shadow-[0_22px_65px_rgba(7,8,39,0.22)] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-cyan)]">
                Innersolv Admin
              </p>
              <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Lead Dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-white/68">
                Review inquiries, track follow-up status, and keep every
                conversation moving.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/18 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Site
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => (
              <div key={card.label} className="rounded-xl border border-white/10 bg-white/[0.07] p-4">
                <p className="text-sm text-white/62">{card.label}</p>
                <p className="mt-2 text-3xl font-extrabold">{card.value}</p>
              </div>
            ))}
          </div>
        </div>

        {databaseError ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">
            <p className="font-bold">Database connection failed</p>
            <p className="mt-2 leading-7">{databaseError}</p>
            <p className="mt-3 text-sm">
              Your app is currently trying to reach Supabase at{" "}
              <code className="rounded bg-red-100 px-1 py-0.5">
                aws-0-eu-west-1.pooler.supabase.com
              </code>
              . If this continues, copy a fresh pooler URL from Supabase and
              restart the dev server.
            </p>
          </div>
        ) : null}

        <form className="mt-6 grid gap-3 rounded-xl border border-[#dfe8ff] bg-white p-4 shadow-sm lg:grid-cols-[1fr_220px_auto]">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search name, email, phone, service, message"
            className="min-h-11 rounded-lg border border-black/12 px-4 outline-none transition focus:border-[var(--brand-blue)]"
          />
          <select
            name="status"
            defaultValue={status}
            className="min-h-11 rounded-lg border border-black/12 bg-white px-4 outline-none transition focus:border-[var(--brand-blue)]"
          >
            <option value="all">All statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button className="min-h-11 rounded-lg bg-[linear-gradient(135deg,var(--brand-cyan),var(--brand-blue),var(--brand-magenta))] px-6 text-sm font-semibold text-white">
            Filter
          </button>
        </form>

        <div className="mt-6 overflow-hidden rounded-xl border border-[#dfe8ff] bg-white shadow-sm">
          <div className="hidden grid-cols-[1.1fr_1.1fr_1fr_130px_160px] gap-4 border-b border-black/8 bg-[#f7f9ff] px-5 py-3 text-xs font-bold uppercase tracking-wide text-black/50 lg:grid">
            <p>Lead</p>
            <p>Contact</p>
            <p>Interest</p>
            <p>Status</p>
            <p className="text-right">Actions</p>
          </div>

          <div className="divide-y divide-black/8">
            {leads.map((lead) => (
              <article key={lead.id} className="grid gap-4 px-5 py-5 lg:grid-cols-[1.1fr_1.1fr_1fr_130px_160px] lg:items-start">
                <div>
                  <h2 className="text-lg font-bold text-[var(--brand-dark)]">
                    {lead.fullName}
                  </h2>
                  <p className="mt-2 text-xs text-black/45">
                    {lead.createdAt.toLocaleString()}
                  </p>
                  <p className="mt-3 leading-7 text-black/70 lg:hidden">
                    {lead.message}
                  </p>
                </div>

                <div className="text-sm leading-7 text-black/68">
                  <p>{lead.email}</p>
                  <p>{lead.phone}</p>
                </div>

                <div>
                  <p className="font-semibold text-[var(--brand-purple)]">
                    {lead.serviceInterest}
                  </p>
                  <p className="mt-2 hidden leading-7 text-black/68 lg:block">
                    {lead.message}
                  </p>
                </div>

                <form action={updateLeadStatus}>
                  <input type="hidden" name="id" value={lead.id} />
                  <select
                    name="status"
                    defaultValue={lead.status}
                    className={`min-h-10 w-full rounded-full px-3 text-sm font-semibold capitalize outline-none ring-1 ${statusClasses(lead.status)}`}
                    aria-label={`Update status for ${lead.fullName}`}
                  >
                    {statuses.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <button className="mt-2 min-h-9 w-full rounded-full border border-black/10 px-3 text-xs font-semibold text-[var(--brand-dark)] transition hover:bg-black/5">
                    Update
                  </button>
                </form>

                <div className="flex gap-2 lg:justify-end">
                  <a
                    href={`mailto:${lead.email}`}
                    className="inline-flex min-h-10 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-semibold text-[var(--brand-dark)] transition hover:bg-black/5"
                  >
                    Email
                  </a>
                  <form action={deleteLead}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button className="inline-flex min-h-10 items-center justify-center rounded-full bg-red-50 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100">
                      Delete
                    </button>
                  </form>
                </div>
              </article>
            ))}

            {leads.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-lg font-bold text-[var(--brand-dark)]">
                  No leads found
                </p>
                <p className="mt-2 text-black/58">
                  Try clearing the search or choosing a different status.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
