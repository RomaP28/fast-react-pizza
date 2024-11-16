import {formatCurrency} from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex gap-4 py-2">
      <img className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} src={imageUrl} alt={name} />
      <div className="flex flex-col flex-1 pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone capitalize">{ingredients.join(', ')}</p>
        <div className="flex items=center justify-between mt-auto">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          <Button type="small">Add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
