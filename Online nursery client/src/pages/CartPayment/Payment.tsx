import Lottie from "lottie-react";
import payment from "../../../public/payment.json";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAddOrderMutation } from "@/redux/api/api";
import { useState } from "react";
import { TOrders } from "@/types";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Payment = () => {
    const [addOrder] = useAddOrderMutation();
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const allPrice = localStorage.getItem("TotalPrice") || "0";

    // console.log(cartItems);
    // console.log(allPrice);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        company: "",
        postCode: "",
        city: "",
        country: "",
        imageFile: null as File | null,
        TotalPrice: "",
        StripePayment: false,
        CashOnDelivery: true,
    });

    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            imageFile: e.target.files ? e.target.files[0] : null,
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
            toast.error("Failed to upload image");
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

      
        let userImage = "";
        if (formData.imageFile) {
            userImage = await uploadImageToImgbb(formData.imageFile);
        }

        if (!userImage) {
            setUploading(false);
            return;
        }

       
        const productArray = cartItems.map((item: TOrders) => ({
            _id: item._id,
            title: item.title,
            imageUrl: item.imageUrl, 
            quantity: item.quantity,
            category: item.category,
        }));

        console.log(productArray);
        const orderData = {
            name: formData.name,
            email: formData.email,
            phoneNumber: Number(formData.phoneNumber),
            address: formData.address,
            company: formData.company,
            postCode: Number(formData.postCode),
            city: formData.city,
            country: formData.country,
            userImage: userImage,
            TotalPrice: allPrice,
            StripePayment: formData.StripePayment,
            CashOnDelivery: formData.CashOnDelivery,
            productItem: productArray,
        };

        try {
            const response = await addOrder(orderData).unwrap();
            console.log("Order placed successfully:", response);
            toast.success("Order placed successfully!");
          
            navigate("/");
        } catch (error: any) {
            if (error.data && error.data.message) {
                console.error("Error message from server:", error.data.message);
            }
            console.error("Failed to place order:", error);
            toast.error("Failed to place order");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="w-1/2">
                <Lottie animationData={payment} loop={true} />
            </div>
            <div className="w-1/2 flex flex-col gap-4 mx-10">
                <Card className="w-[350px] md:w-[500px] bg-green-950 md:bg-transparent md:backdrop-blur-md my-10">
                    <CardHeader>
                        <CardTitle className="text-green-950 text-center text-3xl">Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="Your email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input
                                        type="number"
                                        id="phoneNumber"
                                        placeholder="Your phone number"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        type="text"
                                        id="address"
                                        placeholder="Your address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        type="text"
                                        id="company"
                                        placeholder="Your company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="postCode">Post Code</Label>
                                    <Input
                                        type="number"
                                        id="postCode"
                                        placeholder="Your post code"
                                        value={formData.postCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        type="text"
                                        id="city"
                                        placeholder="Your city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="country">Country</Label>
                                    <Input
                                        type="text"
                                        id="country"
                                        placeholder="Your country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="TotalPrice">Total Price</Label>
                                    <Input
                                        type="number"
                                        id="TotalPrice"
                                        defaultValue={allPrice}
                                        readOnly
                                        required
                                    />
                                </div>

                            </div>
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="userImage">Profile Image</Label>
                                <Input type="file" id="userImage" onChange={handleFileChange} required />
                            </div>
                            <CardFooter className="flex justify-between items-center mt-6 -mr-6 -ml-6">
                                <Button variant="outline" type="button">Cancel</Button>
                                <Button type="submit" className="bg-green-900" disabled={uploading}>
                                    {uploading ? "Saving..." : "Save"}
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Payment;
