import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;
  align-items: center;

  div {
    flex: 1;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-around;
    margin-left: 50px;
    padding-bottom: 20px;
    
  }

  img {
    width: 200px;
    height: 150px;
    object-fit: cover;
    
  }
`;
