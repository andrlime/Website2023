import { FC } from "react";

export const PortfolioCard: FC<{title: string, description: string, link: string, image: string, index: number}> = ({title, description, link, image, index}) => {
    return (
        <div className={`border-2 border-[#A2A2A2] rounded-2xl p-5 flex flex-col ${index%2===0 ? "sm:flex-row-reverse" : "sm:flex-row"} overflow-scroll my-2`}>
            <img src={image} style={{height: "200px"}} alt={description}/>
            <div className={`sm:mx-4 sm:my-0 my-4 mx-0 flex flex-col ${index%2===0 ? "text-right" : "text-left"}`} style={{justifyContent: "space-between"}}>
                <div>
                    <div className="font-black text-xl text-[#414141]">{title}</div>
                    <div>{description}</div>
                </div>
                
                <a href={link}><button className="bg-gray-500 hover:bg-gray-900 transition-all ease-in-out text-white font-black px-4 p-2 rounded-md">More Info</button></a>
            </div>
        </div>
    );
};

export default PortfolioCard;