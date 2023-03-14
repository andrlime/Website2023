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
        <Card style={{zIndex: 1, minWidth: "200px", height: "fit-content"}} withBorder radius="md" p="md" className="bg-white w-full md:w-[24%] m-1">
            <Card.Section>
                <div style={{backgroundImage: `url(${image})`, backgroundPosition: "top center", height: "200px", backgroundSize: "cover"}}></div>
            </Card.Section>

            <Card.Section style={{borderBottom: "0.1rem solid #E1E1E1", padding: "1rem", paddingTop: "0.2rem"}} mt="md">
                <Badge size="md" color={"grape"}>{year}</Badge>
                <Group position="apart" noWrap>
                    <Text fz="lg" fw={500}>
                        {title}
                    </Text>
                </Group>
                <Text fz="sm" mt="xs" align="left">
                    {description}
                </Text>
            </Card.Section>

            <Card.Section style={{padding: "1rem", paddingTop: "0rem"}} mt="md">
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
            </Card.Section>

            <Card.Section style={{borderTop: "0.1rem solid #E1E1E1", padding: "1rem", paddingTop: "0rem"}} >

                <Group mt="xs">
                    <a href={link} style={{backgroundColor: "#4E2A84", flex: 1}} className="p-2 rounded-xl text-white text-center font-bold">Show details</a>
                </Group>

            </Card.Section>
        </Card>
    );
};

export default PortfolioCard;