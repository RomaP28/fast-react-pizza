import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./ui/Home";
import Menu, {loader as menuLoader} from "./features/menu/Menu";
import Cart from "./features/cart/Cart.jsx";
import Order from "./features/order/Order.jsx";
import CreateOrder from "./features/order/CreateOrder.jsx";
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
      { path: '/order/new', element: <CreateOrder /> },
      { path: '/order/:orderId', element: <Order /> }
    ],
  },
])
function App() {
  return <RouterProvider router={router} />;
}

export default App
