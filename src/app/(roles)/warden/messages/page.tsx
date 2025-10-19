'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Send, MessageSquare, User } from "lucide-react"

export default function WardenMessages() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
    const [newMessage, setNewMessage] = useState("")

    const conversations = [
        {
            id: "1",
            withId: "CT001",
            withName: "Ram Kumar",
            withRole: "caretaker",
            lastMessage: "I've completed the maintenance work in Block A",
            lastMessageTime: "2024-01-15 16:30",
            unreadCount: 2,
            status: "unread"
        },
        {
            id: "2",
            withId: "S001",
            withName: "John Doe",
            withRole: "student",
            lastMessage: "Thank you for approving my room change request",
            lastMessageTime: "2024-01-15 14:20",
            unreadCount: 0,
            status: "read"
        },
        {
            id: "3",
            withId: "CT002",
            withName: "Shyam Singh",
            withRole: "caretaker",
            lastMessage: "Need approval for cleaning supplies purchase",
            lastMessageTime: "2024-01-15 11:45",
            unreadCount: 1,
            status: "unread"
        },
        {
            id: "4",
            withId: "S002",
            withName: "Jane Smith",
            withRole: "student",
            lastMessage: "When will the AC repair be completed?",
            lastMessageTime: "2024-01-14 18:00",
            unreadCount: 0,
            status: "read"
        },
    ]

    const messages = [
        {
            id: "1",
            fromId: "CT001",
            fromName: "Ram Kumar",
            message: "Good morning. I've completed the plumbing work in Block A, 2nd floor.",
            sentAt: "2024-01-15 16:20",
            isOwn: false
        },
        {
            id: "2",
            fromId: "warden",
            fromName: "You",
            message: "Great work! Please send me the expense report.",
            sentAt: "2024-01-15 16:25",
            isOwn: true
        },
        {
            id: "3",
            fromId: "CT001",
            fromName: "Ram Kumar",
            message: "I've completed the maintenance work in Block A. Total cost was ₹15,000.",
            sentAt: "2024-01-15 16:30",
            isOwn: false
        },
    ]

    const filteredConversations = conversations.filter(conv =>
        conv.withName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (newMessage.trim()) {
            console.log("Sending message:", newMessage)
            setNewMessage("")
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Internal Messages</h1>
                <p className="text-muted-foreground">Communicate with caretakers and students</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="p-6 lg:col-span-1">
                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search conversations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                        {filteredConversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => setSelectedConversation(conv.id)}
                                className={`p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors ${selectedConversation === conv.id ? 'bg-accent' : ''
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <h4 className="font-semibold text-sm">{conv.withName}</h4>
                                    </div>
                                    {conv.unreadCount > 0 && (
                                        <span className="px-2 py-0.5 rounded-full text-xs bg-primary text-white">
                                            {conv.unreadCount}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground mb-1">
                                    <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                                        {conv.withRole}
                                    </span>
                                </p>
                                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(conv.lastMessageTime).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6 lg:col-span-2">
                    {selectedConversation ? (
                        <>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <MessageSquare className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">
                                        {conversations.find(c => c.id === selectedConversation)?.withName}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {conversations.find(c => c.id === selectedConversation)?.withRole}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[70%] p-3 rounded-lg ${message.isOwn
                                                ? 'bg-primary text-white'
                                                : 'bg-accent'
                                                }`}
                                        >
                                            {!message.isOwn && (
                                                <p className="text-xs font-semibold mb-1">{message.fromName}</p>
                                            )}
                                            <p className="text-sm">{message.message}</p>
                                            <p className={`text-xs mt-1 ${message.isOwn ? 'text-white/70' : 'text-muted-foreground'
                                                }`}>
                                                {new Date(message.sentAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <Input
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1"
                                />
                                <Button type="submit">
                                    <Send className="h-4 w-4 mr-2" />
                                    Send
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-[500px] text-muted-foreground">
                            <div className="text-center">
                                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Select a conversation to start messaging</p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}
