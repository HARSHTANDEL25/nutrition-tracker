import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/db";

export async function POST(req: NextRequest) {
  const {
    name,
    birthYear,
    sex,
    height,
    heightUnit,
    weight,
    weightUnit,
    activityLevel,
    goal,
    deficitLevel,
    dietPreference,
  } = await req.json();
  try {
    const user = await prisma.user.create({
      data: {
        name,
        birthYear,
        sex,
        height,
        heightUnit,
        weight,
        weightUnit,
        activityLevel,
        goal,
        deficitLevel,
        dietPreference,
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 },
    );
  }
}
