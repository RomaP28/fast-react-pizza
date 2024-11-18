import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./ui/Home";
import Menu, {loader as menuLoader} from "./features/menu/Menu";
import Cart from "./features/cart/Cart.jsx";
import Order, {loader as orderLoader} from "./features/order/Order.jsx";
import CreateOrder, {action as createOrderAction} from "./features/order/CreateOrder.jsx";
import {action, action as updateOrderAction} from "./features/order/UpdateOrder.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import Error from "./ui/Error.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader, // This will be called and fetched data when the route is navigated to
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction, //When form submit is called, this action will be called
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader, // This will be called and fetched data when the route is navigated to
        errorElement: <Error />,
        action: updateOrderAction, //When button "Make priority" submit, this action will be called
      }
    ],
  },
])
function App() {
  return <RouterProvider router={router} />;
}

export default App
