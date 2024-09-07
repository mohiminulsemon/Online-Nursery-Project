import { Link } from "react-router-dom";
import Extra from "../../../public/Featured.jpg";
import { Button } from "../ui/button";

const ExtraSection1 = () => {
  return (
    <div className="relative w-full h-[50vh] md:h-[80vh] bg-no-repeat bg-center bg-cover" 
    style={{ 
        backgroundImage: `url(${Extra})` ,
        backgroundSize: "cover",
        backgroundPosition: "center",
        }}>
      <div className="absolute bottom-10  right-10 md:bottom-28 md:right-60 text-end md:text-start animate-bounce">
        <h5 className="font-jost text-xs md:text-lg font-medium md:pb-2 tracking-widest text-green-900">The  Garden</h5>
        <h2 className="text-xl md:text-6xl font-bold md:mb-2 text-green-950">
        Deliciosa Plant
        </h2>
        <p className="text-xs md:text-base font-medium md:mt-4 text-black">
        It is a long established fact that a reader will be <br/> distracted by the readable content
        </p>
      <Link to="/allproducts">
      <Button className="border-2  border-green-800 text-xs md:text-base px-[6px] md:px-6 py-0 md:py-6 font-bold rounded-none bg-transparent text-green-800 mt-2 md:mt-4 hover:bg-green-950 hover:text-white">
          Learn More
        </Button>
      </Link>
      </div>
    </div>
  );
};

export default ExtraSection1;
