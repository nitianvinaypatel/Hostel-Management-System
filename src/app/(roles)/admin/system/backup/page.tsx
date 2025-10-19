'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Download, Upload, RefreshCw, HardDrive } from "lucide-react"

export default function BackupRestore() {
    const backupHistory = [
        {
            id: "1",
            filename: "hms_backup_2024_01_15.sql",
            size: "45.2 MB",
            createdAt: "2024-01-15 02:00:00",
            createdBy: "System (Auto)",
            type: "automatic",
            status: "completed"
        },
        {
            id: "2",
            filename: "hms_backup_2024_01_14.sql",
            size: "44.8 MB",
            createdAt: "2024-01-14 02:00:00",
            createdBy: "System (Auto)",
            type: "automatic",
            status: "completed"
        },
        {
            id: "3",
            filename: "hms_manual_backup_2024_01_13.sql",
            size: "44.5 MB",
            createdAt: "2024-01-13 15:30:00",
            createdBy: "Admin User",
            type: "manual",
            status: "completed"
        },
    ]

    const systemInfo = {
        databaseSize: "450 MB",
        lastBackup: "2024-01-15 02:00:00",
        totalBackups: 45,
        storageUsed: "2.1 GB",
        storageAvailable: "47.9 GB"
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Backup & Restore</h1>
                <p className="text-muted-foreground">Manage system backups and data restoration</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <HardDrive className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Database Size</p>
                    </div>
                    <p className="text-2xl font-bold">{systemInfo.databaseSize}</p>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Database className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Total Backups</p>
                    </div>
                    <p className="text-2xl font-bold">{systemInfo.totalBackups}</p>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <HardDrive className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Storage Used</p>
                    </div>
                    <p className="text-2xl font-bold">{systemInfo.storageUsed}</p>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <RefreshCw className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Last Backup</p>
                    </div>
                    <p className="text-sm font-medium">{new Date(systemInfo.lastBackup).toLocaleString()}</p>
                </Card>
            </div>

            <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    <Button className="h-24 flex-col gap-2">
                        <Database className="h-6 w-6" />
                        <span>Create Manual Backup</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2">
                        <Upload className="h-6 w-6" />
                        <span>Restore from Backup</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2">
                        <RefreshCw className="h-6 w-6" />
                        <span>Schedule Auto Backup</span>
                    </Button>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Backup History</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Filename</th>
                                <th className="text-left py-3 px-4">Size</th>
                                <th className="text-left py-3 px-4">Created At</th>
                                <th className="text-left py-3 px-4">Created By</th>
                                <th className="text-left py-3 px-4">Type</th>
                                <th className="text-left py-3 px-4">Status</th>
                                <th className="text-right py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {backupHistory.map((backup) => (
                                <tr key={backup.id} className="border-b hover:bg-accent/50">
                                    <td className="py-3 px-4 font-medium">{backup.filename}</td>
                                    <td className="py-3 px-4">{backup.size}</td>
                                    <td className="py-3 px-4">{new Date(backup.createdAt).toLocaleString()}</td>
                                    <td className="py-3 px-4">{backup.createdBy}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${backup.type === 'automatic' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {backup.type}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                            {backup.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-accent rounded">
                                                <Download className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 hover:bg-accent rounded">
                                                <Upload className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
