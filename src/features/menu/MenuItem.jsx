import {formatCurrency} from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addItem, getCurrentQuantityById} from "../cart/cartSlice.js";
import {useNavigate} from "react-router-dom";
import DeleteItem from "../cart/DeleteItem.jsx";
import UpdateItemQuantity from "../cart/UpdateItemQuantity.jsx";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  
  
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  
  const currentQuantity = useSelector(getCurrentQuantityById(id))
  
  const isInCart = currentQuantity > 0;
  // const navigate = useNavigate();
  const handleAddToCart = () => {
      const item = {
          pizzaId: id,
          name,
          unitPrice,
          quantity: 1,
          totalPrice: unitPrice * 1,
      }
      dispatch(addItem(item));
  }

  return (
    <li className="flex gap-4 py-2">
      <img className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} src={imageUrl} alt={name} />
      <div className="flex flex-col flex-1 pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone capitalize">{ingredients.join(', ')}</p>
        <div className="flex items=center justify-between mt-auto">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
            
          {isInCart && <div className="flex gap-3">
                        <UpdateItemQuantity currentQuantity={currentQuantity} pizzaId={id} />
                        <DeleteItem pizzaId={id} />
                    </div>}
          
          {!soldOut && !isInCart && <Button type="small" onClick={handleAddToCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
