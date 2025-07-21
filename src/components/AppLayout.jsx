
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Header from "./Header";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: 55px auto;
  width: 100vw;
`;

const Main = styled.main`
  position: relative;
  background-color: var(--color-grey-50);
`;

function AppLayout() {
    return (
        <StyledAppLayout>
            <Header />
            <Main>
                <Outlet />
            </Main>
        </StyledAppLayout>
    );
}

export default AppLayout;
