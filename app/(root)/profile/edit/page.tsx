import { getCurrentUser } from "@/actions/user";
import { GeneralProfileForm } from "../components/general-profile-form";
import { PasswordUpdateForm } from "../components/password-profile-form";


export default async function ProfilePage() {
  const { user } = await getCurrentUser();
    if (!user?.id) return <div className="text-red-500 text-center">User not found.</div>;
  
 
  return (
    <div className="container  space-y-8">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <GeneralProfileForm user={user} /> 

      {/* Form to update password */}
      <PasswordUpdateForm userId={user.id} />    </div>
  );
}
