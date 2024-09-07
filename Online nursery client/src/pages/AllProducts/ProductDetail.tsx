import { useGetASingleProductQuery } from "@/redux/api/api";
import { TProducts } from "@/types";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { FaHeart } from "react-icons/fa";

const ProductDetail = () => {
    const { id: _id } = useParams();

    const { data, isLoading } = useGetASingleProductQuery({ id: _id });
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen mt-10">
                <p className="text-4xl text-green-500">Loading...</p>
            </div>
        );
    }

    // console.log(data); 
    const { data: product } = data;


    const handleAddToCart = (product: TProducts) => {
        const storedCart = localStorage.getItem("cart");
        const cart = storedCart ? JSON.parse(storedCart) : [];
        const existingItem = cart.find((item: TProducts) => item._id === product._id);

        if (existingItem) {
            if (existingItem.quantity < product.quantity) {
                const updatedCart = cart.map((item: TProducts) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                toast.success("Product added to cart");
                setCart(updatedCart);
            } else {
                toast.error("Maximum quantity reached");
            }
        } else {
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);
        }
        navigate("/cart");
    };
    return (
        <div className="flex flex-col items-center p-4 text-green-950   min-h-screen">
            <div className="max-w-6xl w-full  rounded-lg shadow-lg p-6 animate__animated animate__fadeIn bg-green-50">
                <h1 className="block md:hidden text-4xl font-extrabold mb-4">{product?.title}</h1>
                <div className="flex flex-col md:flex-row ">
                    <img
                        src={product?.imageUrl}
                        alt="product Poster"
                        className="w-full md:w-1/2 h-auto mb-4 rounded-lg shadow-lg md:mr-6 transform hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex flex-col md:mt-10">
                        <div className="text-green-950 mb-1 md:mb-4">
                            <div className="hidden md:flex  justify-between items-center">
                                <h1 className="text-4xl font-extrabold mb-4">{product?.title}</h1>
                                <div className="flex items-center gap-2">
                                    <FaHeart className="text-2xl font-bold mb-2 text-green-900" />
                                    <h1 className="text-2xl font-bold mb-2 "> {product?.rating}</h1>
                                </div>
                            </div>
                            <div className="flex md:hidden justify-between items-center gap-2">
                                <p className="text-2xl font-bold mb-2">Price: <span className="text-green-800 font-bold">${product?.price}</span></p>
                                <div className="flex items-center gap-2">
                                    <FaHeart className="text-2xl font-bold mb-2 text-green-800" />
                                    <h1 className="text-2xl font-bold mb-2 text-green-800"> {product?.rating}</h1>
                                </div>
                            </div>
                            <p className="hidden md:block text-xl font-bold mb-2">Price: <span className="text-green-800 font-bold">${product?.price}</span></p>
                            <p className="text-xl font-bold mb-2">Quantity: <span className="text-green-800 font-bold">{product?.quantity}</span></p>
                            <p className="text-xl font-bold md:mb-2">Category: <span className="text-green-800 font-bold">{product?.category}</span></p>


                        </div>
                        <p className="text-justify mb-2 ">{product?.description.slice(0, 300)}..</p>
                        <div className="flex justify-end animate-bounce md:mt-10">
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-green-950 text-white px-6 py-2 rounded shadow hover:bg-green-700 text-3xl "
                                title="Add To Cart"
                            >
                                <IoCartOutline />
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;
