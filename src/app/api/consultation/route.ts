import { NextResponse } from "next/server";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { submitStrapiInquiry } from "@/lib/strapi";

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
      project: { location: location || "Nairobi", projectType: projectType || "General Renovation", budget: budget || "Not specified", notes: notes || "None" },
      status: "CONFIRMED_AUDIT",
    };

    console.log("[AURA & NOIR] New Consultation Dossier:", JSON.stringify(dossier, null, 2));

    // 1. Persist dossier to local storage so leads are permanently recorded
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, "consultation_leads.json");
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        try {
          leads = JSON.parse(fs.readFileSync(leadsFile, "utf-8"));
        } catch (_) {
          leads = [];
        }
      }
      leads.push(dossier);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("[AURA & NOIR] Notice: could not write local leads file:", fsErr);
    }

    // 2. Dispatch to Strapi CMS (asynchronously with non-blocking error handling)
    try {
      submitStrapiInquiry({
        name,
        email,
        phone,
        location,
        projectType,
        budget,
        notes,
        reservationId,
      }).catch((e) => console.warn("[AURA & NOIR] Strapi inquiry dispatch notice:", e));
    } catch (_) {}

    // 3. Dispatch email notification via system sendmail to quotes@interiordesign.akilinova.co.ke
    try {
      const recipient = "quotes@interiordesign.akilinova.co.ke";
      const subject = `[New Quote Request] ${projectType || "Interior Design"} - ${name} (${reservationId})`;
      
      const emailContent = `To: ${recipient}
From: AURA & NOIR Atelier <quotes@interiordesign.akilinova.co.ke>
Reply-To: ${name} <${email}>
Subject: ${subject}
MIME-Version: 1.0
Content-Type: text/html; charset=utf-8

<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background: #ffffff; }
    .header { background: #111827; color: #f9fafb; padding: 24px; text-align: center; }
    .title { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #d4af37; }
    .subtitle { margin-top: 6px; font-size: 12px; color: #9ca3af; letter-spacing: 1px; text-transform: uppercase; }
    .body-content { padding: 24px; }
    .badge { display: inline-block; padding: 4px 10px; background: #fef3c7; color: #92400e; border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 16px; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; }
    .label { color: #6b7280; font-weight: 500; }
    .value { color: #111827; font-weight: 600; text-align: right; }
    .notes-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-top: 16px; font-size: 13px; color: #374151; }
    .footer { background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 16px 24px; text-align: center; font-size: 11px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">AURA & NOIR</h1>
      <div class="subtitle">Bespoke Architectural Interior Design Atelier</div>
    </div>
    <div class="body-content">
      <span class="badge">Reference ID: ${reservationId}</span>
      <h2 style="font-size: 16px; margin: 0 0 16px; color: #111827;">New Client Quotation Request</h2>
      
      <div class="row">
        <span class="label">Client Name:</span>
        <span class="value">${name}</span>
      </div>
      <div class="row">
        <span class="label">Client Phone:</span>
        <span class="value"><a href="tel:${phone}">${phone}</a></span>
      </div>
      <div class="row">
        <span class="label">Client Email:</span>
        <span class="value"><a href="mailto:${email}">${email}</a></span>
      </div>
      <div class="row">
        <span class="label">Project Location:</span>
        <span class="value">${location || "Nairobi"}</span>
      </div>
      <div class="row">
        <span class="label">Requested Service:</span>
        <span class="value">${projectType || "General Interior Design"}</span>
      </div>
      <div class="row">
        <span class="label">Budget Bracket:</span>
        <span class="value">${budget || "Not specified"}</span>
      </div>
      
      <div style="margin-top: 16px;">
        <span class="label">Specifications & Notes:</span>
        <div class="notes-box">${notes || "No additional specifications provided."}</div>
      </div>
    </div>
    <div class="footer">
      Delivered by AURA & NOIR Atelier Web Platform · Subdomain: interiordesign.akilinova.co.ke
    </div>
  </div>
</body>
</html>
`;

      const sendmail = spawn("/usr/sbin/sendmail", ["-t", "-i"]);
      sendmail.stdin.write(emailContent);
      sendmail.stdin.end();
      sendmail.on("error", (err) => {
        console.warn("[AURA & NOIR] sendmail invocation warning:", err);
      });
    } catch (mailErr) {
      console.warn("[AURA & NOIR] Could not dispatch sendmail:", mailErr);
    }

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
