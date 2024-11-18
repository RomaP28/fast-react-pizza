import { useState } from "react";
import {Form, redirect, useActionData, useNavigation} from "react-router-dom";
import {createOrder} from "../../services/apiRestaurant.js";
import Button from "../../ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchAddress, getUserName} from "../user/userSlice.js";
import {clearCart, getCart, getTotalCartPrice} from "../cart/cartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
import store from "../../store.js";
import {formatCurrency} from "../../utils/helpers.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);       {/*fom action="/order/new"*/}
  
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const {username, status: addressStatus, position, address, error: errorAddress} = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  
  const formErrors = useActionData();
  
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  
  if(!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" >
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" required defaultValue={username} />
        </div>
        
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required/>
            {formErrors?.phone && <p className="mt-2 text-xs p-2 text-red-700 bg-red-100 rounded-md">{formErrors.phone}</p>}
          </div>
        </div>
        
        <div className="relative mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" defaultValue={address} required/>
            {addressStatus === 'error' && <p className="mt-2 text-xs p-2 text-red-700 bg-red-100 rounded-md">{errorAddress}</p>}
          </div>
          {!position.latitude && !position.longitude && (<span className="absolute right-0 top-[35px] sm:top-0 md:right-1.5 md:top-1.5 z-10">
            <Button
                default={address}
                disabled={isSubmitting || isLoadingAddress}
                type="small"
                onClick={(e) => {e.preventDefault(); dispatch(fetchAddress())}}>
              Get position</Button>
          </span>)}
        </div>
        
        <div className="mb-12 flex items-center gap-5">
        <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
          <input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude}, ${position.latitude}` : ''}/>
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting ? 'Placing order...' : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)
  
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  }

  const errors = {};
  if(!isValidPhone(order.phone))
    errors.phone = "Please give us your correct phone number. We might need to call you to confirm your order.";
  
  if(Object.keys(errors).length > 0)  return  errors
  
  //if everything is correct, create the order and redirect to the order
  
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
