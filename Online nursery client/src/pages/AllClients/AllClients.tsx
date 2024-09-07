import { useGetOrdersQuery } from "@/redux/api/api";
import { TOrders } from "@/types";
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const AllClients = () => {
    const { data, isLoading } = useGetOrdersQuery([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState<TOrders | null>(null);
    const itemsPerPage = 8;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen mt-10">
                <p className="text-4xl text-green-500">Loading...</p>
            </div>
        );
    }

    const { data: orders } = data || {};
    const totalItems = orders?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginatedOrders = orders?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleClick = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const viewOrderDetails = (order: TOrders) => {
        setSelectedOrder(order);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    const renderPageNumbers = () => {
        const pages = [];

        // If there are multiple pages and we are not on the first page
        if (currentPage > 1) {
            pages.push(
                <PaginationItem key="previous">
                    <PaginationPrevious
                        href="#"
                        onClick={() => handleClick(currentPage - 1)}
                    />
                </PaginationItem>
            );
        }

        // Previous page (if it exists)
        if (currentPage > 2) {
            pages.push(
                <PaginationItem key={currentPage - 1}>
                    <PaginationLink href="#" onClick={() => handleClick(currentPage - 1)}>
                        {currentPage - 1}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Current page
        pages.push(
            <PaginationItem key={currentPage}>
                <PaginationLink href="#" isActive onClick={() => handleClick(currentPage)}>
                    {currentPage}
                </PaginationLink>
            </PaginationItem>
        );

        // Next page (if it exists)
        if (currentPage < totalPages - 1) {
            pages.push(
                <PaginationItem key={currentPage + 1}>
                    <PaginationLink href="#" onClick={() => handleClick(currentPage + 1)}>
                        {currentPage + 1}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // If there are more pages after the current selection
        if (currentPage < totalPages) {
            pages.push(
                <PaginationItem key="next">
                    <PaginationNext href="#" onClick={() => handleClick(currentPage + 1)} />
                </PaginationItem>
            );
        }

        return pages;
    };

    return (
        <div className="md:p-6">
            <div className="mb-6 hidden md:flex flex-col md:flex-row-reverse justify-center items-center md:h-[67vh] bg-green-50 py-2 ">
                <div className="w-full md:w-1/2 p-10 md:p-0 md:mx-10 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    <h5 className="font-jost text-xs md:text-base text-green-900 font-medium md:pb-2 tracking-widest uppercase ml-6 md:ml-1">Naturenest</h5>
                    <h2 className="text-2xl md:text-6xl font-bold md:mb-2 text-green-950">
                        Our Happy Clients
                    </h2>
                    <p className="text-xs md:text-base font-medium md:mt-4 ml-6 md:ml-1">
                        We are proud to have some of the best clients. Our clients have been happy with our services.
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <img src="../../../public/people2.jpg" alt="People" className="w-full md:h-[65vh] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105" />
                </div>
            </div>
            <div className="relative mb-6 flex md:hidden flex-col md:flex-row-reverse justify-center items-center md:h-[67vh] bg-green-50 py-2 "
                style={{
                    backgroundImage: `url("./../public/people2.jpg")`,
                    backgroundPosition: "center",
                    height: "36vh",
                    backgroundSize: "cover",
                    opacity: "0.9",
                }}
            >
                <div className="absolute w-full px-10 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    <div className="bg-green-100 py-2 opacity-80">
                        <h5 className="font-jost text-xs md:text-base text-green-950 font-medium md:pb-2 tracking-widest uppercase ml-6 md:ml-1">Naturenest</h5>
                        <h2 className="text-2xl md:text-6xl font-bold md:mb-2 text-green-950 text-center">
                            Our Happy Clients
                        </h2>
                        <p className="text-xs md:text-base font-medium md:mt-4 ml-6 md:ml-1">
                            We are proud to have some of the best clients. Our clients have been happy with our services.
                        </p>
                    </div>
                </div>
            </div>
            {selectedOrder && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={closeModal}
                >
                    <div
                        className="bg-transparent backdrop-blur-md p-10 rounded-none max-w-md w-full text-green-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedOrder.userImage}
                            alt="User"
                            className="w-full h-80 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-2xl font-bold mb-2">{selectedOrder.name}</h2>
                        <p className="text-lg mb-1"><strong>Email:</strong> {selectedOrder.email}</p>
                        <p className="text-lg mb-1"><strong>Phone:</strong> {selectedOrder.phoneNumber}</p>
                        <p className="text-lg mb-1"><strong>Address:</strong> {selectedOrder.address}</p>
                        <button
                            className="absolute top-4 right-4 font-bold text-green-50"
                            onClick={closeModal}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
                <Masonry gutter="16px">
                    {paginatedOrders?.map((order: TOrders, index: number) => (
                        <div
                            key={order._id}
                            className="relative cursor-pointer"
                            onClick={() => viewOrderDetails(order)}
                        >
                            <img
                                src={order.userImage}
                                alt=""
                                style={{
                                    width: "100%",
                                    display: "block",
                                    height: index % 2 === 0 ? "280px" : "340px",
                                    objectFit: "cover",
                                    margin: "10px 0",
                                }}
                            />
                            <div className="absolute bottom-3 left-0 right-0 bg-green-900 bg-opacity-20 p-4 text-center">
                                <p className="text-white text-lg font-bold">{order.name}</p>
                            </div>
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
            <div className="my-6 md:my-10 flex justify-center">
                <Pagination>
                    <PaginationContent>
                        {renderPageNumbers()}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default AllClients;
