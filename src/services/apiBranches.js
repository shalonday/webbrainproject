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

import supabase from "./supabase";

export async function upsertDraftNodes(draftNodesArray) {
  const { data, error } = await supabase
    .from("draftNodes")
    .upsert(draftNodesArray)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function upsertDraftLinks(draftLinksArray) {
  const { data, error } = await supabase
    .from("draftLinks")
    .upsert(draftLinksArray)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function upsertDraftBranch(draftBranch) {
  const { data, error } = await supabase
    .from("branches")
    .upsert([draftBranch])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getDraftBranchesByUserId(userId) {
  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .eq("author_id", userId)
    .eq("status", "draft");

  if (error) throw new Error(error.message);

  return data;
}

export async function getSubmittedBranches() {
  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .eq("status", "submitted");

  if (error) throw new Error(error.message);

  return data;
}

export async function getNodesByIdsArray(nodeIdsArray) {
  let { data, error } = await supabase
    .from("draftNodes")
    .select("*")
    .in("id", nodeIdsArray);

  if (error) throw new Error(error.message);

  return data;
}

export async function getLinksByIdsArray(linkIdsArray) {
  let { data, error } = await supabase
    .from("draftLinks")
    .select("*")
    .in("id", linkIdsArray);

  if (error) throw new Error(error.message);

  return data;
}
