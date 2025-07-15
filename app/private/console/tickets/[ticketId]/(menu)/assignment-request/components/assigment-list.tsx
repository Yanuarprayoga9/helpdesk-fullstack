"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Check, X, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { RequestAssignmentShowType } from "@/@types/ticket-assignment-request"
import { acceptRequestAssignment, updateTicketAssignmentRequestStatus } from "@/actions/ticket-assignment-request"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"


interface RequestAssignmentsListProps {
  requestAssignments: RequestAssignmentShowType[]
}

export default function RequestAssignmentsList({
  requestAssignments
}: RequestAssignmentsListProps) {
  const [actionLoading, setActionLoading] = useState<{ [key: string]: "accept" | "reject" | null }>({})
  const [createdBy, setCreatedBy] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {

      const createdByL = localStorage.getItem('createdBy')
      setCreatedBy(createdByL as string)
    }
  }, []);
  const loggedInId = useSession().data?.user.id

  const isOwner = createdBy == loggedInId

  const handleAcceptRequest = async (requestId: string) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: "accept" }))
    try {
      const result = await acceptRequestAssignment(requestId)

      if (result.success) {

        toast.success("success")
      } else {

        toast.error("error")
      }
      // eslint-disable-next-line no-console
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred while accepting the request.");
      }
    } finally {
      setActionLoading((prev) => ({ ...prev, [requestId]: null }))
    }
  }

  const handleRejectRequest = async (requestId: string) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: "reject" }))
    try {
      const result = await updateTicketAssignmentRequestStatus(requestId, "Rejected")

      if (result.success) {

        toast.success("success")

      } else {
        toast.error("error")

      }
      // eslint-disable-next-line no-console
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred while accepting the request.");
      }
    } finally {
      setActionLoading((prev) => ({ ...prev, [requestId]: null }))
    }
  }

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadgeProps = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "accepted":
        return {
          variant: "default" as const,
          className: "bg-green-100 text-green-800 hover:bg-green-100",
        }
      case "rejected":
        return {
          variant: "destructive" as const,
          className: "",
        }
      case "pending":
      default:
        return {
          variant: "outline" as const,
          className: "bg-yellow-50 text-yellow-800 border-yellow-200",
        }
    }
  }

  return (
    <div className="space-y-6">


      <div className="space-y-4">
        {requestAssignments.length === 0 ? (
          <p className="text-gray-500">No contribution requests yet.</p>
        ) : (
          <div className="space-y-3">
            {requestAssignments.map((assignment) => {
              const badgeProps = getStatusBadgeProps(assignment.status)
              const isActionLoading = actionLoading[assignment.id]
              const isPending = assignment.status.toLowerCase() === "pending"

              return (
                <Card key={assignment.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-100">
                            {assignment.requestedBy
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{assignment.requestedBy}</CardTitle>
                          <p className="text-xs text-gray-500">Requested on {formatDate(assignment.requestedAt)}</p>
                        </div>
                      </div>
                      <Badge variant={badgeProps.variant} className={badgeProps.className}>
                        {assignment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-gray-700">{assignment.notes}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-gray-500">Ticket: {assignment.ticketId}</span>
                      <div className="flex items-center gap-2">
                        {(isPending && isOwner) && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectRequest(assignment.id)}
                              disabled={!!isActionLoading}
                              className="text-xs flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              {isActionLoading === "reject" ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <X size={12} />
                              )}
                              Reject
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleAcceptRequest(assignment.id)}
                              disabled={!!isActionLoading}
                              className="text-xs flex items-center gap-1 bg-green-600 hover:bg-green-700"
                            >
                              {isActionLoading === "accept" ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Check size={12} />
                              )}
                              Accept
                            </Button>
                          </>
                        )}


                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
