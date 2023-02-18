import { Alert, AlertIcon } from "@chakra-ui/react";

export default function ErrorComponent({ msg }) {
    return (
        <Alert status="error" position={"fixed"} bottom={"4"} left={"50%"} transform={"translateX(-50%)"}>
            <AlertIcon />
            {msg}
        </Alert >
    )
}
