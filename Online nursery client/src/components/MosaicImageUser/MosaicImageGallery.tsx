import { useGetOrdersQuery } from "@/redux/api/api";
import { TOrders } from "@/types";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";

const MosaicImageGallery = () => {
    const { data, isLoading } = useGetOrdersQuery({});
    const [view, setView] = useState(null);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen mt-10">
                <p className="text-4xl text-green-500">Loading...</p>
            </div>
        );
    }
    const { data: orders } = data;
    console.log(orders);


    const viewImage = (img) => {
        setView(img);
    };

    const closeModal = () => {
        setView(null);
    };

    return (
        <div className="my-4 md:my-10">
            <div>
                <h2 className="text-2xl my-4 md:text-4xl font-bold text-center ">Our Happy <span className="text-green-600">Client's</span></h2>
                {/* <h5 className="text-base md:text-xl mt-6  mb-2 font-bold text-center">Our top demanding products</h5> */}
                <hr className="border-2 border-green-600 w-5/12 md:w-1/12 mx-auto" />
            </div>

            {view && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={closeModal}>
                    <div className="relative">
                        <img src={view} alt="Full view" className="max-h-screen max-w-screen rounded-xl" />
                        <button className="absolute top-0 right-2 m-4 font-bold text-green-50" onClick={closeModal}>X</button>
                    </div>
                </div>
            )}
            <div className="py-10">
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4, 1500: 5 }}
                >
                    <Masonry gutter="24px" className="">
                        {orders?.slice(0, 8)?.map((item: TOrders, index: number) => {

                            if (index % 2 === 0) {
                                return (
                                    <div key={item._id} className="flex flex-col space-y-2 ">
                                        <div className="relative">
                                            <img
                                                src={item.userImage}
                                                alt=""
                                                style={{
                                                    width: "100%",
                                                    display: "block",
                                                    height: index % 4 === 0 ? "300px" : "200px",
                                                    objectFit: "cover",
                                                    margin: "10px 0",
                                                }}
                                                onClick={() => viewImage(item.userImage)}
                                            />
                                            <div className="absolute bottom-3 left-0 right-0 bg-green-900 bg-opacity-20 p-4 text-center">
                                                <p className="text-white text-lg font-bold">{item.name}</p>
                                            </div>
                                        </div>
                                        {orders[index + 1] && (
                                            <div className="relative">
                                                <img
                                                    src={orders[index + 1].userImage}
                                                    alt=""
                                                    style={{
                                                        width: "100%",
                                                        display: "block",
                                                        height: index % 4 === 0 ? "200px" : "300px",
                                                        objectFit: "cover",
                                                    }}
                                                    onClick={() => viewImage(orders[index + 1].userImage)}
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-green-900 bg-opacity-20 p-4 text-center">
                                                    <p className="text-white text-lg font-bold">{orders[index + 1].name}</p>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                );
                            }
                            return null;
                        })}
                    </Masonry>

                </ResponsiveMasonry>
            </div>
          <Link to="/allclients">
          <div className="flex items-center justify-center gap-4 mt-6 mb-16 hover:animate-wobble">
                <button className="relative flex items-center justify-center border-2 border-green-800 text-green-900  px-6 py-3 rounded-full w-20 h-20 bg-white shadow-lg  transition duration-300">


                </button>
                <h1 className="absolute font-semibold text-xl  ml-6 bg-white py-1">
                    View Our More Client's
                </h1>
                <FaArrowRight className="  text-green-900 text-lg mt-1 ml-40" />
            </div>
          </Link>
        </div>
    );
};

export default MosaicImageGallery;
