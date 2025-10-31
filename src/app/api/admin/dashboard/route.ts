import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function GET(request: NextRequest) {
    try {
        // Get the authorization token from the request headers
        const token = request.headers.get('authorization')

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Authorization token is required',
                },
                { status: 401 }
            )
        }

        // Call the backend API
        const response = await fetch(`${BACKEND_URL}/admin/dashboard`, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            return NextResponse.json(
                {
                    success: false,
                    message: errorData.message || 'Failed to fetch dashboard data',
                },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Dashboard API error:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch dashboard data',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}
