import styled from "styled-components";

const ProfilePic = styled.img`
  display: block;
  margin: 0 auto;
`;

const UserName = styled.h1`
  text-align: center;
`;

function Avatar({ user }) {
  return (
    <div>
      <ProfilePic src="/src/assets/avatar-placeholder.svg" />
      <UserName>{user?.name ? user.name : "-"}</UserName>
    </div>
  );
}

export default Avatar;
