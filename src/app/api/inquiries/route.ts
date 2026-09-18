import { NextResponse } from "next/server";
import { supabaseClient, InquiryRecord } from "@/lib/supabase/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.phone_number) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const inquiry: InquiryRecord = {
      customer_name: body.customer_name || "Guest Customer",
      phone_number: body.phone_number,
      occasion: body.occasion || "General",
      quantity: Number(body.quantity) || 1,
      target_budget_per_unit: Number(body.target_budget_per_unit) || 0,
      notes: body.notes || "",
      source: body.source || "api"
    };

    const result = await supabaseClient.insertInquiry(inquiry);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to record inquiry" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      message: "Inquiry recorded successfully in Kakinada showroom queue"
    });
  } catch (error: any) {
    console.error("Inquiry API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
