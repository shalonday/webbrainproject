import { useMutation } from "@tanstack/react-query";
import {
  upsertDraftBranch,
  upsertDraftLinks,
  upsertDraftNodes,
} from "../../services/apiBranches";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MainButton from "../MainButton";
import { useUser } from "../../hooks/useUser";
import { uuidv4 } from "../../utils";

function SaveAsDraftButton({ state = null, currentTree, branchTitle }) {
  const navigate = useNavigate();
  const { user } = useUser();

  // mutate functions for upserting a branch draft
  const { mutate: mutateDraftNodes, error: nodesError } = useMutation({
    mutationFn: upsertDraftNodes,
    onError: (err) => console.error("upsertDraftNodes error:" + err.message),
  });
  const { mutate: mutateDraftLinks, error: linksError } = useMutation({
    mutationFn: upsertDraftLinks,
    onError: (err) => console.error("upsertDraftLinks error:" + err.message),
  });
  const { mutate: mutateDraftBranch, error: branchError } = useMutation({
    mutationFn: upsertDraftBranch,
    onSuccess: () =>
      toast.success("Branch draft has been saved to your account"),
    onError: (err) => console.error("upsertDraftBranch error:" + err.message),
  });

  async function handleSave() {
    const draftBranch = {
      id: state?.draft?.id ? state.draft.id : uuidv4(),
      title: branchTitle,
      nodeIds: currentTree.nodes.map((node) => node.id),
      linkIds: currentTree.links.map((link) => link.id),
      author_id: user.id,
      status: "draft",
    };

    // for each link and new module, add author_id if it doesn't exist  yet (nodes should already have authors added in AddNodeSection)
    const linksWithAuthors = currentTree.links.map((link) =>
      !link.author_id ? { ...link, author_id: user.id } : link
    );

    await mutateDraftNodes(currentTree.nodes); // if need ng validation, just fill in empty columns with null
    await mutateDraftLinks(linksWithAuthors);
    await mutateDraftBranch(draftBranch);

    if (!nodesError && !linksError && !branchError) navigate("/profile");
  }

  return <MainButton onClick={handleSave}>Save as Draft</MainButton>;
}

export default SaveAsDraftButton;
