import PageIndicator from "./PageIndicator";
import { Flex } from "@chakra-ui/react";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
    return (
        <Flex direction="row" justifyContent="center" alignItems="center">
            {Array.from({ length: totalPages }, (_, i) => {
                return (
                    <PageIndicator isActive={i === currentPage} key={i} onClick={() => setCurrentPage(i)} />
                )
            })}
        </Flex>
    );
}
