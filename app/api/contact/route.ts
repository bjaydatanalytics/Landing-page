import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot spam protection
    if (data.honeypot) {
      return NextResponse.json({ ok: true });
    }

    const lead = await prisma.lead.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        serviceInterest: data.serviceInterest,
        message: data.message,
      },
    });

    sendWelcomeEmail({
      fullName: data.fullName,
      email: data.email,
      serviceInterest: data.serviceInterest,
    }).catch((error) => {
      console.error("Welcome email failed", error);
    });

    return NextResponse.json(
      { success: true, leadId: lead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission failed", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
