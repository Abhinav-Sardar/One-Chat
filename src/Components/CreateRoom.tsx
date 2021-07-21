import { useRef, FC as FunctionalComponent, FormEvent } from "react";
import {
	AvatarActionBtns,
	AvatarsWrapper,
	Page,
} from "../Styled-components/CreateRoom.styled";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { Form } from "../Styled-components/CreateRoom.styled";
import { useEffect } from "react";
import Modal from "react-responsive-modal";
import { FaTimes, FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";
import parse from "html-react-parser";
import { constants } from "../Constants";
import { AiOutlineReload } from "react-icons/ai";
import { HiOutlineArrowDown } from "react-icons/hi";
const CreateRoom: FunctionalComponent = () => {
	type maxAvatarType = {
		isNew: boolean;
		number: number;
	};

	const NameRef = useRef<HTMLInputElement | null>()!;
	const RoomRef = useRef<HTMLInputElement | null>()!;
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [avatars, setAvatars] = useState<string[]>([]);
	const [maxAvatarIndex, setMaxAvatar] = useState<maxAvatarType>({
		number: 42,
		isNew: true,
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [currentAvatar, setCurrentAvatar] = useState<string>("");
	useEffect(() => {
		NameRef.current?.focus();
	}, []);
	function handleClose() {
		setIsModalOpen(false);
	}
	function setAvatarIcon(avatar: string): void {
		handleClose();
		setCurrentAvatar(avatar);
	}
	useEffect(() => {
		if (maxAvatarIndex.isNew) {
			let acc = [];
			while (acc.length !== maxAvatarIndex.number) {
				acc.push(returnRandomAvatar());
			}
			setAvatars(acc);
		} else {
			let acc = [...avatars];
			while (acc.length !== maxAvatarIndex.number) {
				acc.push(returnRandomAvatar());
			}
			setAvatars(acc);
		}
		setLoading(false);
		console.log(maxAvatarIndex);
	}, [maxAvatarIndex]);
	function handleSubmit(e: FormEvent): void {
		e.preventDefault();
		if (
			NameRef.current?.value &&
			NameRef.current?.value.trim() &&
			RoomRef.current?.value &&
			RoomRef.current?.value.trim()
		) {
			window.location.assign(`/room/${RoomRef.current.value}`);
		}
	}
	useEffect(() => {
		if (avatars.length === 42) {
			setCurrentAvatar(avatars[0]);
		}
	}, [avatars]);
	return (
		<Page>
			<h1 className='purpose'>Sup B)</h1>
			<Form onSubmit={(e) => handleSubmit(e)}>
				<div className='field'>
					<span>Name</span>
					<br />
					{/* @ts-ignore */}
					<input type='text' ref={NameRef} spellCheck placeholder='Your Name' />
				</div>
				<div className='field'>
					<span>Room Name</span>
					<br />
					<input
						type='text'
						//@ts-ignore
						ref={RoomRef}
						spellCheck
						placeholder='Name Your Room'
					/>
				</div>
				<div className='field'>
					<span>Avatar</span>
					{currentAvatar && parse(currentAvatar)}
					<br />
					<button
						onClick={() => setIsModalOpen(true)}
						className='choose__avatar'
					>
						<span>Choose Avatar</span> <FaUserAlt className='btn-avatar' />
					</button>
				</div>
				<button type='submit'>Create Room</button>
			</Form>
			<Modal
				open={isModalOpen}
				styles={{
					modal: {
						background: constants.appAccentColor,
						color: "white",
					},
				}}
				onClose={() => handleClose()}
				closeIcon={
					<FaTimes
						fill='red'
						fontSize={"2vw"}
						style={{
							margin: "1vh 0",
						}}
					/>
				}
			>
				<AvatarActionBtns>
					<h1>Choose your avatar</h1>
				</AvatarActionBtns>
				<AvatarsWrapper>
					{avatars.map((avatar: string) => {
						if (avatar !== currentAvatar) {
							return (
								<div onClick={() => setAvatarIcon(avatar)}>{parse(avatar)}</div>
							);
						} else {
							return (
								<div onClick={() => setAvatarIcon(avatar)} className='current'>
									{parse(avatar)}
								</div>
							);
						}
					})}
				</AvatarsWrapper>
				<br />
				<AvatarActionBtns>
					{loading ? (
						<AiOutlineReload className='loader' />
					) : (
						<>
							<button
								onClick={() => {
									setLoading(true);
									setMaxAvatar((prev) => {
										return { isNew: false, number: prev.number + 18 };
									});
								}}
							>
								<span>Load More</span>
								<HiOutlineArrowDown />
							</button>
							<button
								onClick={() => {
									setLoading(true);
									setMaxAvatar((prev) => {
										return { isNew: true, number: prev.number };
									});
								}}
							>
								<span>Load New </span>
								<AiOutlineReload className='loader2' />
							</button>
						</>
					)}
				</AvatarActionBtns>
			</Modal>
			<ToastContainer
				closeOnClick={false}
				draggable={false}
				pauseOnHover={false}
			/>
		</Page>
	);
};
export default CreateRoom;
function returnRandomAvatar(): string {
	return createAvatar(style);
}
