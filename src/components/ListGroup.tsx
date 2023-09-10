import { MouseEvent, useState } from "react";

interface Props {
	name: string;
	items: string[];
	onSelectedItem: (item: string) => void;
}

const ListGroup = ({ name, items, onSelectedItem }: Props) => {
	const [selectedIndex, setSelectedIndex] = useState(-1);

	const getMessages = () => {
		return (
			items.length === 0 && <p className="text-danger">No items found</p>
		);
	};

	const handleClick = (item: string, idx: number) => {
		setSelectedIndex(idx);
		onSelectedItem(item);
	};

	return (
		<>
			<h3 className="mt-4">{name}</h3>
			{getMessages()}
			<ul className="list-group">
				{items.map((item, idx) => (
					<li
						role="button"
						className={`list-group-item list-group-item-action ${
							idx == selectedIndex && "active"
						}`}
						key={item}
						onClick={() => handleClick(item, idx)}
					>
						{item}
					</li>
				))}
			</ul>
		</>
	);
};

export default ListGroup;
