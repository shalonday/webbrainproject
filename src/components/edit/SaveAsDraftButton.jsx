import { useMutation } from "@tanstack/react-query";
import {
  createDraftBranch,
  createDraftLinks,
  createDraftNodes,
} from "../../services/apiBranches";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MainButton from "../MainButton";
import { useUser } from "../../hooks/useUser";

function SaveAsDraftButton({ currentTree, branchTitle }) {
  const navigate = useNavigate();
  const { user } = useUser();

  // mutate functions for saving a branch draft
  const { mutate: mutateDraftNodes, error: nodesError } = useMutation({
    mutationFn: createDraftNodes,
    onError: (err) => console.error(err.message),
  });
  const { mutate: mutateDraftLinks, error: linksError } = useMutation({
    mutationFn: createDraftLinks,
    onError: (err) => console.error(err.message),
  });
  const { mutate: mutateDraftBranch, error: branchError } = useMutation({
    mutationFn: createDraftBranch,
    onSuccess: () =>
      toast.success("Branch draft has been saved to your account"),
    onError: (err) => console.error(err.message),
  });

  async function handleSave() {
    const draftBranch = {
      title: branchTitle,
      nodeIds: currentTree.nodes.map((node) => node.id),
      linkIds: currentTree.links.map((link) => link.id),
      user_id: user.id,
      status: "draft",
    };
    // save a tree object to the Supabase PostgreSQL db containing the User's ID or smth
    await mutateDraftNodes(currentTree.nodes); // if need ng validation, just fill in empty columns with null
    await mutateDraftLinks(currentTree.links);
    await mutateDraftBranch(draftBranch);

    if (!nodesError && !linksError && !branchError) navigate("/profile");
  }

  return <MainButton onClick={handleSave}>Save as Draft</MainButton>;
}

export default SaveAsDraftButton;
