import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-100);
  padding: 2.4rem 3.2rem;
  height: 100vh;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.4rem;
`;

const AppLayout = () => {
  return (
    <GridContainer>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </GridContainer>
  );
};

export default AppLayout;
