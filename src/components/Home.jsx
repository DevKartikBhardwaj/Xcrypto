import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btcSrc from "../assets/btc.png"
import { motion } from "framer-motion"
export default function Home() {
    return (
        <Box bgColor={"blackAlpha.900"} w="full" h="85vh">
            <motion.div style={{ height: "80vh" }} animate={{ translateY: "10px" }} transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
            }}>
                <Image w="full" h={["80%", "full"]} objectFit={"contain"} src={btcSrc} filter={"grayScale(1)"} />
            </motion.div>
            <Text fontSize={"6xl"} textAlign="center" color={'whiteAlpha.700'} fontWeight={"thin"} mt={"-15"}>XCrypto</Text>
        </Box>
    )
}
