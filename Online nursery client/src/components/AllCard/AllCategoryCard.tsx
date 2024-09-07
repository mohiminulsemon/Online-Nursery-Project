import { useState, useEffect } from "react";
import { useGetCategoriesQuery } from "@/redux/api/api";
import { TCategories } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";

const AllCategoryCard = () => {
  const { data, isLoading } = useGetCategoriesQuery({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(6);
  const [filteredCategories, setFilteredCategories] = useState<TCategories[]>([]);

  useEffect(() => {
    if (data) {
      const { data: categories } = data;
      const filtered = categories.filter((item: TCategories) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [data, searchQuery]);


  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);


  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen mt-10">
        <p className="text-4xl text-green-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mt-10 mx-6">
      <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center mb-6 ">
        <Link to="/addcategory">
          <button className=" bg-green-900 hover:bg-green-700 text-white py-2 px-6 rounded-sm transform hover:scale-105 transition-transform duration-300">Add Category</button>
        </Link>
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentCategories.map((item: TCategories) => (
          <div className="rounded-2xl mb-5 flex flex-col md:flex-row gap-2 bg-green-50" key={item._id}>
            <div className="w-full md:w-1/2 bg-green-50">
              <img src={item.imageUrl} alt={item.name} className="w-full md:w-72 h-72 rounded-2xl md:rounded-l-2xl transform hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col text-start justify-between">
             <div>
             <h1 className="my-4 font-bold text-green-950 text-2xl mr-2">{item.name}</h1>
             <p className="font-bold text-base text-black ">{item.description.slice(0, 200)}..</p>
             </div>
              <Link to={`/allcategories/allproductscategory/${encodeURIComponent(item.name)}`}>
                <button className="bg-green-900 hover:bg-green-700 text-white py-2 px-6 rounded-sm transform hover:scale-105 transition-transform duration-300 my-4 w-full md:w-1/2 md:ml-32">
                  View Products
                </button>
              </Link>

            </div>
          </div>
        ))}
      </div>


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

export default AllCategoryCard;
