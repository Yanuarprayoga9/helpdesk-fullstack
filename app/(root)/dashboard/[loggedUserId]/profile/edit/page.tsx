import { GeneralProfileForm } from "../components/general-profile-form";
import { PasswordUpdateForm } from "../components/password-profile-form";
import { getUserById } from "@/actions/user";

type PageParams = {
  params: Promise<{ loggedUserId: string }>;
};

export default async function ProfilePage({ params }: PageParams) {
  const { loggedUserId } = await params; // Awaiting the params Promise
  const response = await getUserById(loggedUserId);
  const me = response.success ? response.user : null;

  return (
    <div className="container min-w-96 mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Profile Settings</h1>

      {/* Form to update general data */}
      <GeneralProfileForm user={me} />

      {/* Form to update password */}
      <PasswordUpdateForm userId={me?.id || ""} />
    </div>
  );
}
