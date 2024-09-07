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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddProductMutation, useGetCategoriesQuery } from "@/redux/api/api";
import { TCategories } from "@/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProducts = () => {
  const { data, isLoading } = useGetCategoriesQuery({});
  const [addProduct] = useAddProductMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    rating: "",
    category: "",
    imageFile: null as File | null,
    isStock: true,
  });

  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen mt-10">
          <p className="text-4xl text-green-500">Loading...</p>
      </div>
  );
  }

  const { data: category } = data || {};

  const uniqueCategories = Array.from(
    new Set(category.map((cat: TCategories) => cat.name))
  ).map((name) => category.find((cat: TCategories) => cat.name === name));

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

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
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

    const productData = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      rating: Number(formData.rating),
      category: formData.category,
      imageUrl: imageUrl, 
      inStock: true, 
    };

    try {
      const response = await addProduct(productData).unwrap();
      navigate("/allproducts");
      console.log("Product added successfully:", response);
      toast.success("Product added successfully");
    } catch (error: any) {
      if (error.data && error.data.message) {
        console.error("Error message from server:", error.data.message);
      }
      console.error("Failed to add product:", error);
      toast.error("Failed to add product");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="relative w-full h-[100vh] bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url("./public/b.jpg")`,
      }}
    >
      <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Card className="w-[350px] md:w-[500px] bg-green-950 md:bg-transparent md:backdrop-blur-md my-10">
          <CardHeader>
            <CardTitle className="text-green-100 text-center text-3xl">
              Add product
            </CardTitle>
            <CardDescription className="text-center">
              Add a new product to Naturenest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 text-green-50">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    className="text-green-950"
                    type="text"
                    id="title"
                    placeholder="Write the product title"
                    value={formData.title}
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
                    placeholder="Write the product description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
               <div className="grid grid-cols-3 gap-4">
               <div className="flex flex-col space-y-1.5 text-green-50">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    className="text-green-950"
                    type="number"
                    id="price"
                    placeholder="Product price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5 text-green-50">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    className="text-green-950"
                    type="number"
                    id="quantity"
                    placeholder="Product quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5 text-green-50">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    className="text-green-950"
                    type="number"
                    id="rating"
                    placeholder="Product rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                  />
                </div>
               </div>
              <div className="grid grid-cols-2 gap-4">
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
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category" className="text-green-50">
                    Category
                  </Label>
                  <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger className="text-green-950" id="category">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="text-green-950">
                      {uniqueCategories.map((category: TCategories) => (
                        <SelectItem key={category?._id} value={category?.name}>
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
