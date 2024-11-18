import Button from "../../ui/Button.jsx";
import {useDispatch} from "react-redux";
import {deleteItem} from "./cartSlice.js";

function DeleteItem({ pizzaId }) {
	const dispatch = useDispatch();
	
	function handleDeleteItem() {
		dispatch(deleteItem(pizzaId));
	}
	
	return <Button type="small" onClick={handleDeleteItem}>Delete</Button>
}

export default DeleteItem;