import { checkout } from "@/config/schema";
import { getDb } from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.json();
        const db = getDb();
        const { firstName, lastName, email, phone, checkInDate, checkOutDate, travelers, price } = data;

        // Validate required fields
        const requiredFields = { firstName, lastName, email, phone, checkInDate, checkOutDate, travelers, price };
        const missingFields = Object.entries(requiredFields)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return NextResponse.json({ 
                success: false,
                error: "Missing required fields", 
                missingFields 
            }, { status: 400 });
        }

        // Validate dates
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        
        if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
            return NextResponse.json({ 
                success: false,
                error: "Invalid date format" 
            }, { status: 400 });
        }

        if (checkIn >= checkOut) {
            return NextResponse.json({ 
                success: false,
                error: "Check-out date must be after check-in date" 
            }, { status: 400 });
        }

        // Create booking
        const result = await db.insert(checkout).values({
            firstName,
            lastName,
            email,
            phone,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            travelers,
            price,
            createdAt: new Date()
        }).returning(checkout);

        return NextResponse.json({
            success: true,
            checkout: result[0]
        }, { status: 201 });

    } catch (error) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ 
            success: false,
            error: "Failed to process checkout",
            details: error.message 
        }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const db = getDb();
        const bookings = await db.select().from(checkout).orderBy('createdAt', 'desc');

        return NextResponse.json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json({ 
            success: false, 
            error: "Failed to fetch bookings",
            details: error.message 
        }, { status: 500 });
    }
}