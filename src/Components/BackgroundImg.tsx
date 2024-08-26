interface customProps {
  img?: any;
  header?: String;
  text?: String;
  text1?: String;
  check?: boolean;
}

const BackgroundImg: React.FC<customProps> = ({
  img,
  text,
  header,
  check,
  text1,
}) => {
  return (
    <div>
      <section
        className={`relative bg-black flex items-center ${
          check ? "justify-start" : "justify-center"
        } h-[250px]`}
      >
        <img
          src={img}
          alt="logo"
          className="w-[100%] absolute h-full object-cover"
        />

        <div
          className={`absolute text-white  w-[90%] ${
            !check
              ? "text-center lg:w-[60%] md:w-[80%]"
              : "sm:ps-[5rem] ps-0 text-center sm:text-start lg:w-[40%] md:w-[60%]"
          } transition-all`}
        >
          {text1 && <div className=" font-semibold text-[.9rem]">{text1}</div>}
          <div className="md:text-[2.5rem] sm:text-[2rem] text-[1.7rem] fontdm uppercase">
            {header}
          </div>
          {text && <div className="sm:text-[1rem] text-[.9rem]">{text}</div>}
        </div>
      </section>
    </div>
  );
};

export default BackgroundImg;
