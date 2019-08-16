import styled from 'styled-components';

const StyledSingleUser = styled.div`
    line-height: 20px;
    font-size: 16px;
    // position: relative;
    // background-color: ${props => props.theme.colors.black};
`;

const StyledSingleUserContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    padding-left: 24px;
    padding-right: 24px;
    max-width: 640px;
`;

const StyledSingleUserContent = styled.div`
    display: flex;
    align-items: flex-start;
`;

const StyledSingleUserInfo = styled.div`
    flex: 1 1 auto;
`;

const StyledSingleUserName = styled.h1`
    color: ${props => props.theme.colors.black};
    font-weight: 600;
    margin-bottom: .4rem;
`;

const StyledSingleUserDate = styled.div`
    color: ${props => props.theme.colors.lightBlack};
    font-weight: 400;
    letter-spacing: 0;
    line-height: 20px;
    margin-bottom: 24px;
    font-size: 14px;
`;

const StyledSingleUserDescription = styled.p`
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 18px;
`;

export {
    StyledSingleUser,
    StyledSingleUserContainer,
    StyledSingleUserInfo,
    StyledSingleUserContent,
    StyledSingleUserName,
    StyledSingleUserDate,
    StyledSingleUserDescription,
};
