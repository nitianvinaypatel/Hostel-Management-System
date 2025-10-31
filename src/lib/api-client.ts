import { getAuthToken } from './auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function apiClient(endpoint: string, options: RequestInit = {}) {
    const token = getAuthToken()

    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
}
