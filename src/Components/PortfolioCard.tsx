import { FC } from "react";

export const PortfolioCard: FC<{title: string, description: string, link: string, image: string, index: number, languages: string}> = ({title, description, link, image, index, languages}) => {
    return (
        <div className={`border-2 border-[#A2A2A2] rounded-2xl p-5 flex flex-col ${index%2===0 ? "md:flex-row-reverse" : "md:flex-row"} overflow-scroll my-2`}>
            
            <div className="w-[100%] md:w-2/4" style={{backgroundImage: `url(${image})`, height: "200px", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></div>
            
            <div className={`md:mx-4 md:my-0 my-4 mx-0 flex flex-col ${index%2===0 ? "text-right" : "text-left"}`} style={{justifyContent: "space-between"}}>
                <div>
                    <div className="font-black text-xl text-[#414141]">{title}</div>
                    <div>{description}</div>
                    <div className={`flex flex-row ${index%2===0 ? "float-right" : "float-left"}`}>{languages.split(", ").map((element: string, index: number) => (
                        <img style={{padding: "0.1rem"}} alt={element} key={index} src={`https://img.shields.io/static/v1?label=&message=${element.charAt(0).toUpperCase() + element.slice(1)}&style=flat&logo=${element}&labelColor=cbcbcb`}/>
                    ))}</div>
                </div>
                
                <a href={link}><button className="bg-gray-500 hover:bg-gray-900 transition-all ease-in-out text-white font-black px-4 p-2 rounded-md">More Info</button></a>
            </div>
        </div>
    );
};

export default PortfolioCard;