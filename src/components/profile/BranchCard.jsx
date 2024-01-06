import { Link } from "react-router-dom";

function BranchCard({ branch }) {
  return (
    <li>
      <Link key={branch.id} to={"/edit/blank"} state={{ draft: branch }}>
        {branch.title}
      </Link>
    </li>
  );
}

export default BranchCard;
