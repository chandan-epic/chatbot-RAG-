import styles from "../style";
import { discount, robot ,robo2 } from "../assets";


const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        
        <div className="flex flex-row justify-between items-center w-full">
            <h1 className="flex-1 font-poppins font-semibold ss:text-[64px] text-[48px] text-white ss:leading-[90px] leading-[70px]">
              Create your own <br className="sm:block hidden" />{" "}
              <span className="text-gradient">Context Based</span>{" "}
            </h1>
            {/* <div className="ss:flex hidden md:mr-4 mr-0">
              <GetStarted />
            </div> */}
        </div>

          <h1 className="font-poppins font-semibold ss:text-[60px] text-[48px] text-white ss:leading-[90px] leading-[70px] w-full">
            ChatBot.
          </h1>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Effortlessly create, deploy, and manage personalized chatbots with our intuitive web app. No coding required. Enhance user engagement and streamline business communication.
          </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robo2}  className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>
s
    </section>
  );
};

export default Hero;
