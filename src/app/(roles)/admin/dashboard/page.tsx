export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome to the HMS Admin Dashboard</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="text-sm font-medium">Total Users</h3>
                    <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="text-sm font-medium">Active Hostels</h3>
                    <p className="text-2xl font-bold">12</p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="text-sm font-medium">Pending Requisitions</h3>
                    <p className="text-2xl font-bold">45</p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="text-sm font-medium">Reports</h3>
                    <p className="text-2xl font-bold">89</p>
                </div>
            </div>
        </div>
    )
}
