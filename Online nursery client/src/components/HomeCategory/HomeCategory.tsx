
import { useGetCategoriesQuery } from '@/redux/api/api';
import CategoryCard from '../AllCard/CategoryCard';

const HomeCategory = () => {
    const  {data, isLoading } = useGetCategoriesQuery({});

if (isLoading) {
    return (
      <p className="text-4xl text-yellow-500 flex justify-center items-center">
        Loading...
      </p>
    );
  }
    console.log(data);

    const { data: categories } = data;

    return (

        <div className="my-10 md:my-16">
        <div>
        <h2 className="text-2xl md:text-4xl font-bold my-4 text-center ">Some Propular <span className="text-green-600">Categories</span></h2>
        {/* <h5 className="text-base md:text-xl mt-6  mb-2 font-bold text-center">Our top selling products</h5> */}
        <hr className="border-2 border-green-800 w-5/12 md:w-1/12 mx-auto mb-10"/>
        </div>

        <CategoryCard categories={categories}/>
    </div>
    );
};

export default HomeCategory;