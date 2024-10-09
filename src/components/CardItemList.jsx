import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useState } from "react";

export const CardItemList = () => {
	const [cardList, setCardList] = useState([...GameData]);
	const onClickHandler = (currentId) => {
		const filteredCard = cardList.filter((item) => {
			if (item.id === currentId) {
				item.isOpen = true;
			}
		});

		setCardList((prevState) => {
			return [...prevState, ...filteredCard];
		});

		setTimeout(() => {
			setCardList((prevState) => {
				return prevState.map((item) => {
					return {
						...item,
						isOpen: false,
					};
				});
			});
		}, 500);
	};

	return (
		<div className='card-item-list'>
			{cardList.map((item) => {
				return (
					<CardItem
						key={item.id}
						id={item.id}
						image={item.pic}
						onClick={onClickHandler}
						isOpen={item.isOpen}
					></CardItem>
				);
			})}
		</div>
	);
};
