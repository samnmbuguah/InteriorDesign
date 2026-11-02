import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, projectType, budget, notes } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are mandatory fields." },
        { status: 400 }
      );
    }

    const reservationId = `AN-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const dossier = {
      reservationId,
      timestamp: new Date().toISOString(),
      client: { name, email, phone },
      project: { location, projectType, budget, notes },
      status: "CONFIRMED_AUDIT",
    };

    console.log("[AURA & NOIR] New Consultation Dossier:", JSON.stringify(dossier, null, 2));

    return NextResponse.json({
      success: true,
      reservationId,
      message: `Consultation dossier registered successfully for ${name}.`,
      dossier,
    });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error processing consultation request." },
      { status: 500 }
    );
  }
}
