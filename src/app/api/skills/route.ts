import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a single PrismaClient instance for the entire application
const prisma = new PrismaClient();

// GET /api/skills
export async function GET() {
  try {
    const skills = await prisma.skill.findMany();
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST /api/skills
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, iconUrl } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        iconUrl,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
} 