import axios from "axios"
import { useEffect, useState } from "react"
import { server } from ".."
import Loader from "./Loader";
import { Container, HStack, VStack, Image, Heading, Text } from "@chakra-ui/react";
import ErrorComponent from "./ErrorComponent";


export default function Exchanges() {

    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {

        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`);
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchExchanges();
    }, [])


    if (error) return <ErrorComponent msg="Error while fetching exchanges" />

    return (
        <Container maxW={"container.xl"}> {loading ? <Loader /> : <>
            <HStack wrap={"wrap"} justifyContent="space-evenly">
                {
                    exchanges.map((i, index) => {
                        return <ExchangeCard key={index} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
                    })
                }
            </HStack>
        </>
        }
        </Container>

    )
}


const ExchangeCard = ({ name, img, rank, url }) => {

    return (
        <>
            <a href={url} target="blank" >
                <VStack w="52" shadow={"lg"} p="8" borderRadius={"lg"} transition={"all 0.3s"} m="4" css={{ "&:hover": { transform: "scale(1.1)" } }}>
                    <Image src={img} w="10" h="10" objectFit={"contain"} />
                    <Heading size={"md"} noOfLines={1}>{rank}</Heading>
                    <Text noOfLines={1}>{name}</Text>
                </VStack>
            </a>
        </>
    )
}