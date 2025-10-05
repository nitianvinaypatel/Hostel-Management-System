export default function StudentDashboard() {
    return (
        <div className="space-y-6">
            <div className="glass rounded-lg p-6">
                <h1 className="text-3xl font-bold">Student Dashboard</h1>
                <p className="text-muted-foreground mt-2">Welcome back! Here's your overview</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="glass rounded-lg p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">My Requests</h3>
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                            <span className="text-xl">📋</span>
                        </div>
                    </div>
                    <p className="text-3xl font-bold">3</p>
                    <p className="text-xs text-muted-foreground mt-2">2 pending approval</p>
                </div>

                <div className="glass rounded-lg p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Complaints</h3>
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                            <span className="text-xl">💬</span>
                        </div>
                    </div>
                    <p className="text-3xl font-bold">1</p>
                    <p className="text-xs text-muted-foreground mt-2">In progress</p>
                </div>

                <div className="glass rounded-lg p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Pending Payments</h3>
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                            <span className="text-xl">💳</span>
                        </div>
                    </div>
                    <p className="text-3xl font-bold">₹5,000</p>
                    <p className="text-xs text-muted-foreground mt-2">Due in 5 days</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="glass rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                    <span className="text-sm">📄</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">Request #{i} submitted</p>
                                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="glass rounded-lg p-4 hover:shadow-md transition-all text-center">
                            <div className="text-2xl mb-2">📝</div>
                            <div className="text-sm font-medium">New Request</div>
                        </button>
                        <button className="glass rounded-lg p-4 hover:shadow-md transition-all text-center">
                            <div className="text-2xl mb-2">🍽️</div>
                            <div className="text-sm font-medium">Mess Menu</div>
                        </button>
                        <button className="glass rounded-lg p-4 hover:shadow-md transition-all text-center">
                            <div className="text-2xl mb-2">💰</div>
                            <div className="text-sm font-medium">Pay Fees</div>
                        </button>
                        <button className="glass rounded-lg p-4 hover:shadow-md transition-all text-center">
                            <div className="text-2xl mb-2">📞</div>
                            <div className="text-sm font-medium">Support</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
