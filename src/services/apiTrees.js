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

const BASE_URL = "https://perk-api-production.up.railway.app"; //"http://localhost:3000"; //

export async function fetchUniversalTree() {
  try {
    const res = await fetch(`${BASE_URL}/tree`);
    const data = await res.json();
    return data;
  } catch {
    throw new Error("There was an error fetching the universal tree");
  }
}

export async function createNeo4jUserNode(user) {
  try {
    await fetch(`${BASE_URL}/user`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    throw new Error("There was an error adding the user to the neo4j database");
  }
}