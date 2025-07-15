import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, FileText, ArrowRight, Activity } from "lucide-react"

export type HistoryShowType = {
    id: string
    ticketId: string
    changedByName: string
    oldStatus: string
    newStatus: string
    action: string
    changeNotes: string
    changedAt: Date | string
}


const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        Open: "bg-blue-100 text-blue-800",
        "In Progress": "bg-yellow-100 text-yellow-800",
        "Under Review": "bg-purple-100 text-purple-800",
        Resolved: "bg-green-100 text-green-800",
        Closed: "bg-gray-100 text-gray-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
}

const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}
interface ICardHIstory {
    histories: HistoryShowType[]
}
export default function CardHistory({ histories }: ICardHIstory) {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <p className="text-gray-600">Recent activity and changes</p>
            </div>

            <div className="grid gap-4">
                {histories.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2 text-lg">
                                    <Activity className="w-5 h-5 text-blue-500" />
                                    <span>{item.action}</span>
                                    <Badge variant="outline" className="ml-2">
                                        {/* Changed by */}
                                        <div className="flex items-center space-x-3">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-500">
                                                Changed by <span className="font-medium text-gray-700">{item.changedByName}</span>
                                            </span>
                                        </div>
                                    </Badge>
                                </CardTitle>
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                    <Clock className="w-4 h-4" />
                                    {formatDate(item.changedAt)}
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-3">
                                {/* Status transition */}
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-500">Status:</span>
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getStatusColor(item.oldStatus)}>{item.oldStatus}</Badge>
                                        <ArrowRight className="w-4 h-4 text-gray-400" />
                                        <Badge className={getStatusColor(item.newStatus)}>{item.newStatus}</Badge>
                                    </div>
                                </div>

                                {item.changeNotes && (
                                    <div className="flex items-start space-x-3">
                                        <FileText className="w-4 h-4 text-gray-400 mt-1" />
                                        <div>
                                            <span className="text-sm text-gray-500">Notes:</span>
                                            <p className="text-sm text-gray-700 mt-1">{item.changeNotes}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
