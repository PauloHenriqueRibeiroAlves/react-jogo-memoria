import styled from "styled-components";

export const container = styled.div`
    width: 100%;
    max-width: 750px;
    margin: auto;
    display: flex;
    padding: 50px 0px;

    @media (max-width:750px) {
        flex-direction: column;
    }
`; 

export const info = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;

    @media (max-width: 750px) {
        margin-bottom: 50px;
        align-items: center;
    }
`;

export const logoLink = styled.div`
    display: block;
`;

export const infoArea = styled.div`
    width: 100%;
    margin: 10px 0px;

    @media (max-width: 750px) {
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
`;

export const gridArea = styled.div`
    flex: 1;
    display: flex;
    justify-content: end;
    //background-color: #ff0000;

    @media (max-width: 750px) {
        justify-content: center;
        margin: 0px 20px;
    }
`;

export const Grid = styled.div`
    width: 430px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    @media (max-width-750px) {
        grid-template-columns: repeat(3. 1fr);
    }
`;