import Button from "../../ui/Button.jsx";
import {useFetcher} from "react-router-dom";
import {updateOrder} from "../../services/apiRestaurant.js";

function UpdateOrder({ order }) {
	const fetcher = useFetcher();
	
	return (
		<fetcher.Form method="patch" className="text-right">
			<Button type="primary">Make priority</Button>
		</fetcher.Form>
	)
}

export default UpdateOrder;


export async function action({ request, params }) {
	await updateOrder(params.orderId, { priority: true });
	return null;
}