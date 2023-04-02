import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const Input = styled.input`
  height: 2rem;
  flex-grow: 3;
  background: ${({ theme: { colors } }) => colors.INPUT_BACKGROUND};
`;

const DateBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: large;
  gap: 1.25rem;
`;

export { Container, Input, DateBox };
