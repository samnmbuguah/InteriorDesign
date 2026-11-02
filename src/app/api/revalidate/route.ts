import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Webhook handler for Strapi CMS On-Demand Revalidation.
 * When an editor publishes or updates a Service, Project, or Case Study in Strapi,
 * Strapi triggers this webhook to instantaneously refresh the static pages.
 */
export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get("secret");
    const configuredSecret = process.env.REVALIDATION_SECRET || "aura-noir-strapi-secret-key";

    if (secret !== configuredSecret) {
      return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const model = body?.model || body?.entry?.__contentType || "general";

    console.log(`[Strapi Webhook] Triggered revalidation for model: ${model}`);

    // Revalidate paths based on content type
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/portfolio");

    if (body?.entry?.slug) {
      revalidatePath(`/services/${body.entry.slug}`);
    }

    return NextResponse.json({
      revalidated: true,
      model,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Revalidation failed";
    return NextResponse.json(
      { message: "Revalidation failed", error: message },
      { status: 500 }
    );
  }
}
