import Carousel from "@/app/components/Carousel";
import Image from "next/image";
import Directions from "./Directions";

const Landing = () => {
  const images = [
    "/img/home/car1.jpg",
    "/img/home/car2.jpg",
    "/img/home/car3.jpg",
    "/img/home/car4.jpg",
    "/img/home/car5.jpg",
    "/img/home/car6.jpg",
  ];

  let styles = `
    @keyframes pictopres {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }
          .animate-pictopres {
        
            animation: pictopres 1s ease-in-out;
          }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="h-fit ">
        <div className="heading-font w-11/12 mt-10 mx-auto  hover:scale-105 transition-transform ease-in-out -my-8 ">
          <img
            src="/img/home/pictoreal-presents.svg"
            className="w-3/5 md:w-2/6 mx-auto animate-pictopres"
          />
        </div>
        {/* <img src="/img/home/pictoreal-presents.png" className="absolute right-10"/> */}

        <div className=" lg:w-3/6 w-5/6 mx-auto">
          <Image
            className=" mx-auto hover:scale-105 transition-transform ease-in-out"
            src="/img/common/final_logo.png"
            alt="Logo"
            loading="lazy"
            width={2000}
            height={2000}
            quality={100}
          />
        </div>
        <div className="w-full grid grid-cols-12  lg:-my-40 md:px-20">
          <div className="col-span-5">
            <Image
              src="/img/home/dates.png"
              width={225}
              height={225}
              className="mt-20"
            />
          </div>
          <div className="spacer md:col-span-2"></div>
          <div className="col-span-5 flex justify-end">
            {/* <div className="links rotate-[4deg]  flex flex-col justify-evenly py-16 pb-20 -mx-36 z-10 ">
  <div className="link text-xl text-center mt-3 md:mt-6">link1</div>
  <div className="link text-xl text-center mt-3 md:mt-6">link2</div>
  <div className="link text-xl text-center mt-3 md:mt-8">link3</div>
  <div className="link text-xl text-center mt-3 md:mt-8">link4</div>
  <div className="link text-xl text-center mt-3 md:mt-8">link5</div>

  
</div> */}
            {/* <Image src="/img/home/directions.png" width={225} height={225} className="relative top-0" /> */}

            <Directions />
          </div>
        </div>
        {/* <div className="w-4/5 lg:w-3/5 max-h-sm mx-auto pt-6 xl:pt-10 mt-16 mb-24 pb-6 bg-orange-50 shadow-md ">
        <Carousel images={images} />
        <h1 className=" text-base mt-5 text-center lg:text-3xl font-bold">
          PICS-O-REEL 2K23
        </h1>
      </div> */}
      </div>
    </>
  );
};

export default Landing;
