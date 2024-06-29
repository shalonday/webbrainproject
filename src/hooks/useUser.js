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
import { getCurrentUser, getUserRole } from "../services/apiLogin";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const { isLoading: isUserRoleLoading, data: userRole } = useQuery({
    queryKey: ["userRole", {userId: user?.id}],
    queryFn: getUserRole,
  });

  return { isLoading, isUserRoleLoading, user, userRole, isAuthenticated: user?.role === "authenticated" };
}
