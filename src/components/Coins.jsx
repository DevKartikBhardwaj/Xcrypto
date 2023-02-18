import axios from "axios"
import { useEffect, useState } from "react"
import { server } from ".."
import Loader from "./Loader";
import { Container, HStack, VStack, Image, Heading, Text, Button, RadioGroup, Radio } from "@chakra-ui/react";
import ErrorComponent from "./ErrorComponent";
import { Link } from "react-router-dom";


export default function Coins() {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("inr");
    let currencySymbol = "₹";


    if (currency != "inr") currency === "usd" ? currencySymbol = "$" : currencySymbol = "€";
    const changePage = (page) => {
        setPage(page);
        setLoading(true);
    }

    const btns = new Array(132).fill(1);

    useEffect(() => {

        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
                setCoins(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchCoins();
    }, [currency, page])


    if (error) return <ErrorComponent msg="Error while fetching coins" />

    return (
        <Container maxW={"container.xl"}> {loading ? <Loader /> : <>

            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                <HStack spacing={"4"} >
                    <Radio value="inr" >INR</Radio>
                    <Radio value="usd" >USD</Radio>
                    <Radio value="eur" >EUR</Radio>
                </HStack>
            </RadioGroup>
            <HStack wrap={"wrap"} justifyContent="space-evenly">
                {
                    coins.map((i, index) => {
                        return <CoinCard key={index} name={i.name} img={i.image} price={i.current_price} currencySymbol={currencySymbol} id={i.id} symbol={i.symbol} />
                    })
                }
            </HStack>

            <HStack w={"full"} overflowX={"auto"} p={"8"}>
                {btns.map((item, index) => (
                    <Button
                        key={index}
                        bgColor={"blackAlpha.900"}
                        color={"white"}
                        onClick={() => changePage(index + 1)}
                    >
                        {index + 1}
                    </Button>
                ))}
            </HStack>
        </>
        }
        </Container>

    )
}


const CoinCard = ({ name, img, id, price, currencySymbol, symbol }) => {

    return (
        <>
            <Link to={`/coins/${id}`} >
                <VStack w="52" shadow={"lg"} p="8" borderRadius={"lg"} transition={"all 0.3s"} m="4" css={{ "&:hover": { transform: "scale(1.1)" } }}>
                    <Image src={img} w="10" h="10" objectFit={"contain"} />
                    <Heading size={"md"} noOfLines={1}>
                        {symbol}
                    </Heading>
                    <Text noOfLines={1}>{name}</Text>
                    <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
                </VStack>
            </Link>
        </>
    )
}