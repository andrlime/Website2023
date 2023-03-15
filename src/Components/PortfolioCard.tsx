import { FC } from "react";
import {
    Card,
    Text,
    Group,
    Badge
  } from '@mantine/core';

interface ProjectProps {
    title: string;
    description: string;
    image: string;
    year: string;
    languages: string[];
    link: string;
}

export const PortfolioCard: FC<ProjectProps> = ({title, description, image, year, languages, link}) => {
    return (
        <Card style={{zIndex: 1, minWidth: "200px"}} withBorder radius="md" p="md" className="bg-white w-full md:w-[32%] m-1 flex flex-col p-0">
            <div>
                <div style={{backgroundImage: `url(${image})`, backgroundPosition: "top center", height: "300px", backgroundSize: "cover"}}></div>
            </div>

            <div style={{borderBottom: "0.1rem solid #E1E1E1", padding: "1rem 1rem 1rem 1rem", flexGrow: 2}}>
                <Group position="apart">
                    <Text fz="lg" fw={500} style={{textAlign: "left"}}>
                        {title}
                    </Text>
                    <Badge size="md" color={"grape"}>{year}</Badge>
                </Group>
                <Text fz="sm" mt="xs" align="left">
                    {description}
                </Text>
            </div>

            <div style={{padding: "1rem"}}>
                <Group position="apart">
                <Text fz="lg" fw={500}>
                    Languages
                </Text>
                </Group>
                <Group spacing={7} mt={5}>
                    {languages.map((e) => (
                        <Badge size="md" color={"grape"} key={e}>{e}</Badge>
                    ))}
                </Group>
            </div>

            <div style={{borderTop: "0.1rem solid #E1E1E1", padding: "1rem", display: "flex", alignItems: "end"}} >

                <Group mt="xs" style={{width: "100%"}}>
                    <a href={link} style={{backgroundColor: "#4E2A84", flex: 1}} className="p-2 rounded-xl text-white text-center font-bold">Show details</a>
                </Group>

            </div>
        </Card>
    );
};

export default PortfolioCard;