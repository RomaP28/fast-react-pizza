import {useSelector} from "react-redux";
import {getUserName} from "./userSlice.js";

function Username() {
	const username = useSelector(getUserName);
	if(!username) return null;
	return <div className="hidden md:block text-sm font-semibold">{username}</div>
}

export default Username;