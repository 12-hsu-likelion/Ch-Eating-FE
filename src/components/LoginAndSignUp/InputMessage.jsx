import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

const InputMessage = ({error, text}) => {
    return (
        <Msg $error = {error}>
            {text}
        </Msg>
    );
};

const Msg = styled.div`
  margin-top: 8px;
  font-size: 10px;
  color: ${({ $error }) => $error ? `${colors.error}` : "#0066FF"};
`;

export default InputMessage;