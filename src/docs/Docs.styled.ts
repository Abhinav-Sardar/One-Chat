import styled from 'styled-components';

export const DocsPage = styled.div`
height:100vh ;
width:100vw;
display:flex;
.titles {
width:20vw ; 
border-right:1px solid black;

}
.currentTitleContent {
    width:80vw;
    overflow-x:hidden ; 
    overflow-y: auto;
}
.btns-wrapper {
    border:1px solid black;
    margin-top:0.5vw;
    scrollbar-width:thin;
    overflow-x:hidden ; 
    overflow-y: auto;
}
`;

export const Title = styled.h1`
    font-size:${pr => pr.about};
    font-family: 'Inter', sans-serif;
`

export const TitleButton = styled.button`
    margin-top:1vw; 
    width:100%;
    height:5vh;
`
export const Typography = styled.p`

`