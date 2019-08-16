import styled from 'styled-components';

const StyledBackground = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 200px;
    left: 0;
    top: 0;
    z-index: -1;
    transition: opacity 0.25s linear;
    border-bottom: 1px solid ${props => props.theme.colors.grey};
`;

export { StyledBackground };
