import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/features/common/components/atoms/dialog";
import Image from "next/image";
import { Button } from "../components/atoms/button";
import { AlertTriangle, Badge, Flag, ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/atoms/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// import { User } from "path/to/user/icon";

interface FeedbackDetailModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  variant: string;
  feedback: Feedback | null;
}

const UserDetailsCard = ({
  user,
  isReportedUser,
}: {
  user: any;
  isReportedUser?: boolean;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        {isReportedUser ? <AlertTriangle className="h-5 w-5" /> : null}
        <span>
          {isReportedUser ? "Reported User Details" : "Reported By Details"}
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src="/placeholder.svg?height=50&width=50"
            alt={isReportedUser ? "Reported User" : "Reporter"}
          />
          <AvatarFallback>{isReportedUser ? "RU" : "RB"}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="space-y-2">
        <p>
          <span className="font-semibold">User ID:</span> {user.id}
        </p>
        <p>
          <span className="font-semibold">Account Status:</span>{" "}
          <Badge fontVariant={isReportedUser ? "destructive" : undefined}>
            {user.status}
          </Badge>
        </p>
        <p>
          <span className="font-semibold">Join Date:</span> {user.joinDate}
        </p>
      </div>
    </CardContent>
  </Card>
);

const ReportInformationCard = ({
  reason,
  details,
  imageSrc,
}: {
  reason: string;
  details: string;
  imageSrc: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Flag className="h-5 w-5" />
        <span>Report Information</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Report Reason</h3>
          <p>{reason}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Report Details</h3>
          <p className="text-sm text-muted-foreground">{details}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2 flex items-center space-x-2">
            <ImageIcon className="h-4 w-4" />
            <span>Report Image</span>
          </h3>
          <div className="border rounded-md overflow-hidden">
            <img
              src={imageSrc}
              alt="Report Evidence"
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const FeedbackDetailModal = ({
  open,
  setOpen,
  variant,
  feedback,
}: FeedbackDetailModalProps) => {
  console.log("Variant", variant);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!w-[60vw] !h-[90vh] flex flex-col justify-center space-y-5">
        <DialogTitle>Report Details</DialogTitle>
        <div className="flex flex-col p-4 rounded-lg  !h-[90vh] overflow-auto">
          {variant === "Highlight" ? (
            feedback ? (
              <div className="space-y-6 h-full">
                <h2 className="text-lg font-semibold">
                  Report Type: Highlight
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <UserDetailsCard
                    user={{
                      name: "John Doe",
                      email: "john.doe@example.com",
                      id: "#12345",
                      status: "Active",
                      joinDate: "Jan 15, 2023",
                    }}
                  />
                  <UserDetailsCard
                    user={{
                      name: "Jane Smith",
                      email: "jane.smith@example.com",
                      id: "#67890",
                      status: "Suspended",
                      joinDate: "Mar 3, 2022",
                    }}
                    isReportedUser
                  />
                </div>
                <ReportInformationCard
                  reason="Violation of community guidelines"
                  details="The user posted content that violates community guidelines. The post contains explicit language and offensive imagery."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />
              </div>
            ) : (
              <p>No feedback details available.</p>
            )
          ) : variant === "Stories" ? (
            feedback ? (
              <div className="space-y-6 h-full">
                <h2 className="text-lg font-semibold">Report Type: Stories</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <UserDetailsCard
                    user={{
                      name: feedback.reporter_name,
                      email: feedback.reporter_email,
                      id: feedback.reporter_id,
                      status: feedback.reporter_status,
                      joinDate: feedback.reporter_join_date,
                    }}
                  />
                  <UserDetailsCard
                    user={{
                      name: feedback.reported_user_name,
                      email: feedback.reported_user_email,
                      id: feedback.reported_user_id,
                      status: feedback.reported_user_status,
                      joinDate: feedback.reported_user_join_date,
                    }}
                    isReportedUser
                  />
                </div>
                <ReportInformationCard
                  reason={feedback.report_reason}
                  details={feedback.report_details}
                  imageSrc={feedback.report_image}
                />
              </div>
            ) : (
              <p>No feedback details available.</p>
            )
          ) : variant === "Post" ? (
            feedback ? (
              <div className="space-y-6 h-full">
                <h2 className="text-lg font-semibold">Report Type: Post</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <UserDetailsCard
                    user={{
                      name: feedback.reporter_name,
                      email: feedback.reporter_email,
                      id: feedback.reporter_id,
                      status: feedback.reporter_status,
                      joinDate: feedback.reporter_join_date,
                    }}
                  />
                  <UserDetailsCard
                    user={{
                      name: feedback.reported_user_name,
                      email: feedback.reported_user_email,
                      id: feedback.reported_user_id,
                      status: feedback.reported_user_status,
                      joinDate: feedback.reported_user_join_date,
                    }}
                    isReportedUser
                  />
                </div>
                <ReportInformationCard
                  reason={feedback.report_reason}
                  details={feedback.report_details}
                  imageSrc={feedback.report_image}
                />
              </div>
            ) : (
              <p>No feedback details available.</p>
            )
          ) : variant === "Dm" ? (
            feedback ? (
              <div className="space-y-6 h-full">
                <h2 className="text-lg font-semibold">Report Type: Dm</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <UserDetailsCard
                    user={{
                      name: feedback.reporter_name,
                      email: feedback.reporter_email,
                      id: feedback.reporter_id,
                      status: feedback.reporter_status,
                      joinDate: feedback.reporter_join_date,
                    }}
                  />
                  <UserDetailsCard
                    user={{
                      name: feedback.reported_user_name,
                      email: feedback.reported_user_email,
                      id: feedback.reported_user_id,
                      status: feedback.reported_user_status,
                      joinDate: feedback.reported_user_join_date,
                    }}
                    isReportedUser
                  />
                </div>
                <ReportInformationCard
                  reason={feedback.report_reason}
                  details={feedback.report_details}
                  imageSrc={feedback.report_image}
                />
              </div>
            ) : (
              <p>No feedback details available.</p>
            )
          ) : variant === "Profile" ? (
            feedback ? (
              <div className="space-y-6 h-full">
                <h2 className="text-lg font-semibold">Report Type: Profile</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <UserDetailsCard
                    user={{
                      name: feedback.reporter_name,
                      email: feedback.reporter_email,
                      id: feedback.reporter_id,
                      status: feedback.reporter_status,
                      joinDate: feedback.reporter_join_date,
                    }}
                  />
                  <UserDetailsCard
                    user={{
                      name: feedback.reported_user_name,
                      email: feedback.reported_user_email,
                      id: feedback.reported_user_id,
                      status: feedback.reported_user_status,
                      joinDate: feedback.reported_user_join_date,
                    }}
                    isReportedUser
                  />
                </div>
                <ReportInformationCard
                  reason={feedback.report_reason}
                  details={feedback.report_details}
                  imageSrc={feedback.report_image}
                />
              </div>
            ) : (
              <p>No feedback details available.</p>
            )
          ) : (
            <p>
              This modal is only for Highlight, Stories, Post, Dm, and Profile
              reports.
            </p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Button
            variant="default"
            onClick={() => {
              // Add your action here, e.g., perform some action
              console.log("Action button clicked");
            }}
          >
            Action
          </Button>
          <Button
            variant="destructive"
            className="ml-2"
            onClick={() => {
              // Add your delete functionality here
              console.log("Delete button clicked");
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDetailModal;
