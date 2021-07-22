import styled from "styled-components";
import { constants } from "../Constants";

export const Title = styled.h6`
	color: white;
	font-family: "Poppins", sans-serif;
	font-size: 4vw;
`;

export const CustomizePage = styled.div`
<<<<<<< HEAD
  background: ${(props) => {
    //@ts-ignore
    return props.bgcolor;
  }};
=======
	/* @ts-ignore */
	background: ${(props) => {
		//@ts-ignore
		return props.bgcolor;
	}};
>>>>>>> 2a9930143736506904ce91d05a26900dffe59259

	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	> *::selection {
		color: ${(props) => {
			//@ts-ignore
			return props.bgcolor;
		}};
		background-color: white;
	}
	.react-colorful {
		width: 20vw;
		height: 20vw;
		margin-top: 3vw;
	}
	.react-colorful__pointer {
		width: 2vw;
		height: 2vw;
	}
	.react-colorful__hue {
		height: 1.5vw;
	}
	h2 {
		color: white;
		margin-top: 1vw;
		font-family: "Poppins", sans-serif;
	}
`;

export const ButtonsWrapper = styled.section`
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const Button = styled.button`
	padding: 0 2vw;
	height: 3vw;
	margin: 1vw 1vw;
	background-color: #1741ff;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border: 0;
	color: white;
	border-radius: 10px;
	transition: 200ms ease-in-out;
	&:hover {
		background-color: steelblue;
	}
	span {
		font-family: "Poppins", sans-serif;
		font-size: 1.1vw;
		font-size: 1.5vw;
	}

	span,
	svg {
		display: inline-block;
	}
	svg {
		font-size: 1.5vw;
		padding: 0;
		margin: 0 0.3vw;
		color: white;
	}
`;
