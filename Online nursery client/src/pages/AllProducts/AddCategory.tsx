import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAddCategoryMutation } from "@/redux/api/api";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProducts = () => {
  const [ addCategory] = useAddCategoryMutation();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        imageFile: null as File | null,

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

        let imageUrl = "";
        if (formData.imageFile) {
            imageUrl = await uploadImageToImgbb(formData.imageFile);
        }

        if (!imageUrl) {
            setUploading(false);
            return;
        }

        const categoryData = {
            name: formData.name,
            description: formData.description,
            imageUrl: imageUrl ,
        };

        try {
            const response = await addCategory(categoryData).unwrap();
            navigate("/allcategories");
            console.log("Category added successfully:", response);
            toast.success("Category added successfully");
        } catch (error: any) {
            if (error.data && error.data.message) {
                console.error("Error message from server:", error.data.message);
            }
            console.error("Failed to add category:", error);
            toast.error("Failed to add category");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            className="relative w-full h-[100vh] bg-no-repeat bg-center bg-cover"
            style={{
                backgroundImage: `url("./public/a.jpg")`,
            }}
        >
            <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Card className="w-[350px] md:w-[500px] bg-green-950 md:bg-transparent md:backdrop-blur-md my-10">
                    <CardHeader>
                        <CardTitle className="text-green-100 text-center text-3xl">
                            Add Category
                        </CardTitle>
                        <CardDescription className="text-center">
                            Add a new Category to Naturenest
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5 text-green-50">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        className="text-green-950"
                                        type="text"
                                        id="name"
                                        placeholder="Write the Category name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 text-green-50">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        className="text-green-950"
                                        type="text"
                                        id="description"
                                        placeholder="Write the Category description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                           
                                    <div className="flex flex-col space-y-1.5 text-green-50">
                                        <Label htmlFor="imageUrl">Image</Label>
                                        <Input
                                            className="text-green-950"
                                            type="file"
                                            id="imageUrl"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </div>
                                   
                              
                            </div>
                            <CardFooter className="flex justify-between items-center mt-6 -mr-6 -ml-6">
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-green-900"
                                    disabled={uploading}
                                >
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

export default AddProducts;
