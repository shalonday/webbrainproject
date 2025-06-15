/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Web Brain Project

The Web Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Web Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Web
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

import { useQuery } from "@tanstack/react-query";
import { getDraftBranchesByUserId, getSubmittedBranches } from "../services/apiBranches";
import { useUser } from "../hooks/useUser";
import Avatar from "../components/profile/Avatar";
import BranchList from "../components/profile/BranchList";
import BranchCard from "../components/profile/BranchCard";

function Profile() {
  const { user, userRole } = useUser();
  const userId = user?.id;
  const { data: branchesByUser, error: userBranchesError } = useQuery({
    queryKey: ["branchesByUser"],
    queryFn: () => getDraftBranchesByUserId(user.id),
    enabled: !!userId,
  });

  const { data: submittedBranches, error: submittedBranchesError } = useQuery({
    queryKey: ["submittedBranches"],
    queryFn: () => getSubmittedBranches(),
    enabled: userRole === "admin"
  });

  // write a useQuery with a function that gets submitted branches when this user is an admin
  return (
    <div>
      <Avatar /> 
      <BranchList title={"Draft Branches"}>
        {userBranchesError && <p>{userBranchesError.message}</p>}
        {!userBranchesError &&
          branchesByUser?.map((branch) => (
            <BranchCard branch={branch} key={branch.id} />
          ))}
      </BranchList>
      {userRole === 'admin' && 
      <BranchList title={"Submissions"}>
        {submittedBranchesError && <p>{submittedBranchesError.message}</p>}
        {!submittedBranchesError &&
          submittedBranches?.map((branch) => (
            <BranchCard branch={branch} key={branch.id} />
          ))}
      </BranchList>}
      {/* Render a branch list of submissions when the user is an admin */}
    </div>
  );
}

export default Profile;
