import HowItWork from "../../../public/howitworks.jpg";
import HowItWork2 from "../../../public/howitworks2.jpg";

const HowItWorks = () => {
  return (
    <div>
      <section className="bg-orange-50 mb-10">
        <div className=" py-10 md:py-16">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">Here's How It <span className="text-green-600">Works</span></h2>
          <hr className="border-2 border-green-600 w-5/12 md:w-1/12 mx-auto"/>
          <div className="mt-8 flex justify-around">
            <div className="md:hidden text-center">
              <img src={HowItWork2} alt="How it work" className="w-full " />
            </div>
            <div className="hidden md:block text-center">
              <img src={HowItWork} alt="How it work" className="w-full" />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
