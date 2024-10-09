import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useState, useEffect } from "react";

export const CardItemList = () => {
    const [cardList, setCardList] = useState([...GameData]);
	const [selectedCards, setSelectedCards] = useState([]);
	const [matchedCards, setMatchedCards] = useState(new Set());

	const onClickHandler = (currentId) => {
		const clickedCard = cardList.find((card) => card.id === currentId);

		if (clickedCard.isOpen || matchedCards.has(currentId)) {
			return;
		}

		setCardList((prevCards) =>
			prevCards.map((card) =>
				card.id === currentId ? { ...card, isOpen: true } : card
			)
		);
		setSelectedCards((prev) => [...prev, currentId]);

		if (selectedCards.length === 1) {
			const firstCardId = selectedCards[0];
			const firstCard = cardList.find((card) => card.id === firstCardId);

			if (firstCard.name !== clickedCard.name) {
				setTimeout(() => {
					setCardList((prevCards) =>
						prevCards.map((card) =>
							card.id === currentId || card.id === firstCardId
								? { ...card, isOpen: false }
								: card
						)
					);
				}, 500);
			} else {
				setMatchedCards(
					(prev) => new Set([...prev, firstCardId, currentId])
				);
			}
		}
	};

	useEffect(() => {
		if (selectedCards.length === 2) {
			setSelectedCards([]);
		}
	}, [selectedCards]);

	return (
		<div className='card-item-list'>
			{cardList.map((item) => (
				<CardItem
					key={item.id}
					id={item.id}
					image={item.pic}
					onClick={onClickHandler}
					isOpen={item.isOpen}
				/>
			))}
		</div>
	);
};
