import React from "react";
interface ViewProfileModalProps {
  user: User | null;
}
const UserDetailModel = ({ user, email }: ViewProfileModalProps) => {
  const ProfileCards = () => {
    return (
      <div className="flex justify-between ">
        <div className="border rounded-lg p-5">
          <h3 className="font-bold ">Name</h3>
          <p>{user.first_name + " " + user.last_name}</p>
          {/* <h3 className="font-bold">Email</h3>
          <p>{user.email}</p> */}
          {/* <h3 className="font-bold">Mobile Number</h3>
          <p>{user.mobile_number || "N/A"}</p> */}
          <h3 className="font-bold">Email Verified</h3>
          <p>{user.isEmailVerified ? "Yes" : "No"}</p>
          <h3 className="font-bold">Profile Complete</h3>
          {/* <p>{user.profiles.length > 0 ? "Yes" : "No"}</p> */}
        </div>
      </div>
    );
  };

  return <ProfileCards />;
};
export default UserDetailModel;
