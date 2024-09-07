import MainLayout from "@/components/Layouts/MainLayouts";
import AllCategories from "@/pages/AllCategories/AllCategories";
import AllProductsByCategory from "@/pages/AllCategories/AllProductsByCategory";
import CategorySideBar from "@/pages/AllCategories/CategorySideBar";
import AllClients from "@/pages/AllClients/AllClients";
import AddCategory from "@/pages/AllProducts/AddCategory";
import AddProducts from "@/pages/AllProducts/AddProducts";
import AllProducts from "@/pages/AllProducts/AllProducts";
import ProductDetail from "@/pages/AllProducts/ProductDetail";
import CartCheckout from "@/pages/CartPayment/CartCheckout";
import Payment from "@/pages/CartPayment/Payment";
import FAQ from "@/pages/FAQ/FAQ";
import Home from "@/pages/Home/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "@/pages/TermsCondition/TermsCondition";
import NotFound from "@/pages/shared/NotFound";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allproducts",
        element: <AllProducts />,
      },
      {
        path: "/addproduct",
        element: <AddProducts />,
      },
      {
        path: "/allproducts/:id",
        element: <ProductDetail />,
      },
      {
        path: "/allcategories",
        element: <AllCategories />,
        children: [
          
            {
              path: "/allcategories/allproductscategory/:name",
              element: <CategorySideBar />,
            },
          
        ]
      },
  
      {
        path: "/addcategory",
        element: <AddCategory />,
      },
      {
        path: "/cart",
        element: <CartCheckout  />,
      },
      {
        path: "/payments",
        element: <Payment />,
      },
      {
        path: "/allclients",
        element: <AllClients />,
      },
      {
        path: "/privacypolicy",
        element: <PrivacyPolicy />,
      }, 
      {
        path:"/terms&condition",
        element:<TermsCondition/>,
      },
      {
        path: "/faq",
        element:<FAQ/>
      }
    ],
  },
]);

export default router;
