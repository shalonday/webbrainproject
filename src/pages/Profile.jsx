/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Online Brain Project

The Online Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Online Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Online
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

import { useQuery } from "@tanstack/react-query";
import { getDraftBranchesByUserId } from "../services/apiBranches";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useUser();
  const userId = user?.id;
  const { data: branchesByUser, error } = useQuery({
    queryKey: ["branchesByUser"],
    queryFn: () => getDraftBranchesByUserId(user.id),
    enabled: !!userId,
  });

  return (
    <div>
      Profile
      <ul>
        {error && <p>{error.message}</p>}
        {!error &&
          branchesByUser?.map((branch) => (
            <Link key={branch.id} to={"/edit/blank"} state={{ draft: branch }}>
              <li>{branch.title}</li>
            </Link>
          ))}
      </ul>
    </div>
  );
}

export default Profile;
