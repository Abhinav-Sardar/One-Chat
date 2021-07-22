import { useSpring } from "react-spring";
export const constants = {
	appAccentColor: localStorage.getItem("one-chat-accent-color") || "#bd14ca",
};

export function accentColorChecker(): void {
	if (!localStorage.getItem("one-chat-accent-color")) {
		localStorage.setItem("one-chat-accent-color", "#bd14ca");
	}
}

export function Animation() {
	return {
		fade: useSpring({
			from: {
				opacity: 0,
			},
			to: {
				opacity: 1,
			},
		}),
		FontFamChanger: useSpring({ fontFamily: '"Poppins" , sans-serif' }),
	};
}

export type user = {
  name: string;
  currentRoomName: string;
  avatarSvg: string;
};

export type maxAvatarType = {
  isNew: boolean;
  number: number;
};
