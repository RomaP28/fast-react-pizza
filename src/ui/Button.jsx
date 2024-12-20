import {Link} from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
	
	const base = "bg-yellow-400 uppercase tracking-wide text-sm rounded-full font-semibold text-stone-800 inline-block hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";
	
	const styles = {
		primary: base + " py-3 px-4 md:px-6 md:py-4",
		small: base + " py-2 px-4 sm:px-5 sm:py-2.5 text-xs",
		secondary: "py-2.5 px-4 md:px-6 md:py-3.5 border-2 border-stone-300 text-sm uppercase tracking-wide rounded-full font-semibold text-stone-400 inline-block hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed",
		round: base + " py-1 px-2.5 sm:px-3.5 sm:py-2 text-sm",
	}
	
	
	if(to) return <Link className={styles[type]} to={to}>{children}</Link>
	
	if(onClick) return (
		<button disabled={disabled} onClick={onClick} className={styles[type]}>
			{children}
		</button>
	);
	
    return (
	    <button disabled={disabled} className={styles[type]}>
		    {children}
	    </button>
    );
}

export default Button;