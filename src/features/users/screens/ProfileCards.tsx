import React from "react";

interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  is_private: boolean;
  mute_status: boolean | null;
}

interface ProfileCardsProps {
  user: Profile;
}

const ProfileCards: React.FC<ProfileCardsProps> = ({ user }) => {
  console.log("USERSSSSSS", user);

  return (
    <div className="border rounded-lg p-5 border-gray-300">
      <h4 className="font-semibold mt-2">
        Name: {user.first_name + " " + user.last_name}
      </h4>
      <h4 className="font-semibold mt-2">Username: {user.username}</h4>
      <p className="font-semibold mt-2">
        Is Private: {user.is_private ? "Yes" : "No"}
      </p>
      <p className="font-semibold mt-2">
        Mute Status: {user.mute_status ? "Muted" : "Not Muted"}
      </p>
    </div>
  );
};

export default ProfileCards;
