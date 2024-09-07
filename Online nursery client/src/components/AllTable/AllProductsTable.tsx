import {
    Table,
    TableBody,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { VscOpenPreview } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { useDeleteProductMutation, useGetCategoriesQuery, useGetProductsQuery, useUpdateProductMutation } from "@/redux/api/api";
import { TCategories, TProducts } from "@/types";
import Swal from 'sweetalert2';
import { toast } from "sonner";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AllProductsTable = () => {
    const { data, isLoading } = useGetProductsQuery({});
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const { data: category, isLoading: categoryLoading } = useGetCategoriesQuery({});
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortByRating, setSortByRating] = useState<boolean>(false);
    const [sortByPrice, setSortByPrice] = useState<boolean>(false);
    const [cart, setCart] = useState([])
    const navigate = useNavigate();
    const [editFormData, setEditFormData] = useState({
        title: "",
        description: "",
        price: "",
        quantity: "",
        rating: "",
        category: "",
        imageFile: "" || null as File | null,
    });
    const [uploading, setUploading] = useState(false);

    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen mt-10">
                <p className="text-4xl text-green-500">Loading...</p>
            </div>
        );
    }
    if (categoryLoading) {
        return <div>Loading...</div>
    }
    // console.log(data);
    const { data: product } = data;
    // console.log(product);

    const { data: categoryData } = category;

    const uniqueCategories = Array.from(
        new Set(categoryData?.map((cat: TCategories) => cat.name))
    ).map((name) => categoryData.find((cat: TCategories) => cat.name === name));

    const itemsPerPage = 5;

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormData({
            ...editFormData,
            [e.target.id]: e.target.value,
        });
    };

 
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormData({
            ...editFormData,
            imageFile: e.target.files ? e.target.files[0] : "" || null as File | null,
        });
    };

  
    const handleCategoryChange = (value: string) => {
        setEditFormData({
            ...editFormData,
            category: value,
        });
    };

   
    const uploadImageToImgbb = async (file: File) => {
        const imageFormData = new FormData();
        imageFormData.append("image", file);

        try {
            const response = await fetch(image_upload_api, {
                method: "POST",
                body: imageFormData,
            });
            const data = await response.json();
            if (data.success) {
                return data.data.url;
            }
            throw new Error("Image upload failed");
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

 
    const handleUpdateProduct = async () => {
        setUploading(true);

        let imageUrl = "";
        if (editFormData.imageFile) {
            imageUrl = await uploadImageToImgbb(editFormData.imageFile);
        }

        if (!imageUrl && editFormData.imageFile) {
            setUploading(false);
            return;
        }

        const updatedProductData = {
            title: editFormData.title,
            description: editFormData.description,
            price: Number(editFormData.price),
            quantity: Number(editFormData.quantity),
            rating: Number(editFormData.rating),
            category: editFormData.category,
            imageUrl: imageUrl || editFormData.imageFile,  
        };

        try {
            if (selectedProductId) {
                const res = await updateProduct({
                    id: selectedProductId,
                    data: updatedProductData
                }).unwrap();
                toast.success("Product updated successfully");
                
                setSelectedProductId(null);
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Failed to update product");
        } finally {
            setUploading(false);
        }
    };

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
    
        toast.success("Product added to cart");
        navigate("/cart"); 
    };
    
    const filteredData = product?.filter(
        (item: TProducts) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
    const sortedData = [...filteredData].sort((a, b) => {
        if (sortByRating && sortByPrice) {
            return b.rating - a.rating || b.price - a.price;
        } else if (sortByRating) {
            return b.rating - a.rating;
        } else if (sortByPrice) {
            return a.price - b.price;
        }
        return 0; // No sorting if no criteria is selected
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    const toggleSortByRating = () => {
        setSortByRating((prev) => !prev);
    };

    const toggleSortByPrice = () => {
        setSortByPrice((prev) => !prev);
    };

    const handleDeleteProduct = (_id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteProduct(_id).unwrap();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error("Error deleting product:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue deleting your product.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="container w-full">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 my-4">
                <Link to="/addproduct">
                    <div className="border border-green-900 px-3 py-2 rounded-none font-semibold hover:bg-green-900 hover:text-white">
                        <button>Add Products</button>
                    </div>
                </Link>

                {/* Sort Select */}
                <div className="flex my-2 md:my-10 md:ml-40 space-x-4 ">
                    <button
                        onClick={toggleSortByRating}
                        className={`border border-green-900 px-3 py-2 rounded-none font-semibold ${sortByRating ? "bg-green-900 text-white" : ""
                            }`}
                    >
                        Top Rating
                    </button>
                    <button
                        onClick={toggleSortByPrice}
                        className={`border border-green-900 px-3 py-2 rounded-none font-semibold ${sortByPrice ? "bg-green-900 text-white" : ""
                            }`}
                    >
                        In Budget
                    </button>
                </div>

                <div className="flex  relative hover:bg-green-900 hover:text-white">
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-green-900 px-3 py-2 rounded-none hover:bg-green-900 hover:text-white    pl-10"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 hover:bg-green-900 hover:text-white" />

                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="text-center">
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="pl-11">Image</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead> Details </TableHead>
                        <TableHead >
                            Delete
                        </TableHead>
                        <TableHead >Edit</TableHead>
                        <TableHead >Cart</TableHead>
                        <TableHead className="text-right">Price</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody className="">
                    {currentData.map((item, index) => (
                        <TableRow key={item.id} className={`${index % 2 === 0 ? "bg-green-50 hover:bg-green-50" : "bg-white"}`}>
                            <TableCell className="font-medium">
                                {indexOfFirstItem + index + 1}
                            </TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell className="">
                                <Link to={`/allproducts/${item._id}`}>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-24 h-24 object-cover transform hover:scale-105 transition-transform duration-300"
                                    />
                                </Link>
                            </TableCell>
                            <TableCell>{item.rating}</TableCell>
                            <TableCell>
                                <Link to={`/allproducts/${item._id}`}>
                                    < VscOpenPreview className="text-xl  " title="View Details" />
                                </Link>
                            </TableCell>
                            <TableCell className="">
                                <button onClick={() => handleDeleteProduct(item._id)}>
                                    <AiFillDelete className="text-red-600 text-xl" />
                                </button>
                            </TableCell>
                            <TableCell >
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button
                                            onClick={() => {
                                                setSelectedProductId(item._id);
                                                setEditFormData({
                                                    title: item.title,
                                                    description: item.description,
                                                    price: item.price,
                                                    quantity: item.quantity,
                                                    rating: item.rating,
                                                    category: item.category,
                                                    imageFile: item.imageFile,
                                                });
                                            }}
                                            className="text-blue-500 text-xl"
                                        >
                                            <CiEdit />
                                        </button>
                                    </DialogTrigger>

                                    <DialogContent className="bg-green-50 backdrop-blur-xl">
                                        <DialogHeader>
                                            <DialogTitle className="text-green-950 font-bold text-center text-2xl">Edit Product</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 text-green-950">
                                            <div>
                                                <Label htmlFor="title">Title</Label>
                                                <Input
                                                    id="title"
                                                    defaultValue={editFormData.title}
                                                    onChange={handleEditInputChange}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="description">Description</Label>
                                                <Input
                                                    id="description"
                                                    defaultValue={editFormData.description}
                                                    onChange={handleEditInputChange}
                                                />
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <Label htmlFor="price">Price</Label>
                                                    <Input
                                                        id="price"
                                                        type="number"
                                                        defaultValue={editFormData.price}
                                                        onChange={handleEditInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="quantity">Quantity</Label>
                                                    <Input
                                                        id="quantity"
                                                        type="number"
                                                        defaultValue={editFormData.quantity}
                                                        onChange={handleEditInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="rating">Rating</Label>
                                                    <Input
                                                        id="rating"
                                                        type="number"
                                                        step="0.1"
                                                        defaultValue={editFormData.rating}
                                                        onChange={handleEditInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="category">Category</Label>
                                                <Select
                                                    defaultValue={editFormData.category}
                                                    onValueChange={handleCategoryChange}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {uniqueCategories?.map((cat) => (
                                                            <SelectItem key={cat.name} value={cat.name}>
                                                                {cat.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="image">Image</Label>
                                                <Input
                                                    id="image"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                   
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            
                                          <DialogClose >
                                          <Button
                                                type="button"
                                                onClick={handleUpdateProduct}
                                                disabled={uploading }
                                                
                                            >
                                             
                                                {uploading ? "Uploading..." : "Save Changes"}
 
                                            </Button>
                                            </DialogClose>
                                            <DialogClose>
                                                <Button type="button">Cancel</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>

                                </Dialog>
                            </TableCell>
                            <TableCell>
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="text-green-950 text-xl"
                                >
                                    <IoCartOutline />
                                </button>
                            </TableCell>
                            <TableCell className="text-right">
                                {item.price}$
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="my-6 md:my-10">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => handleClick(currentPage - 1)}
                                isActive={currentPage === 1}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === index + 1}
                                    onClick={() => handleClick(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => handleClick(currentPage + 1)}
                                isActive={currentPage === totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default AllProductsTable;