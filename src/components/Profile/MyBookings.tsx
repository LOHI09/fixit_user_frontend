import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { getUserBookings } from "../../api/userApi"
import { Booking } from "../../types"
import { useQuery } from "@tanstack/react-query"
import PayNowModal from "./PayNowModal"

export default function MyBookings() {
  const username = localStorage.getItem("username") ?? ""

  const { data } = useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: () => getUserBookings({ username }),
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box w="100%">
      <Flex
        justifyContent="flex-start"
        bg="gray.200"
        p="4"
        w="75%"
        mx="auto"
        mt="4"
        flexDir="column"
        gap="4"
        boxShadow="md"
        rounded="md"
      >
        <Heading>My Bookings</Heading>
        {data &&
          data.map((booking, index) => (
            <Flex
              key={index}
              p="4"
              gap="4"
              flexDir="column"
              shadow="md"
              rounded="md"
              bg="white"
            >
              <Text>
                <b>Service Name:</b> {booking.service_name}
              </Text>
              <Text>
                <b>Company Name:</b> {booking.company_name}
              </Text>
              <Text>
                <b>Category:</b> {booking.category}
              </Text>
              <Text>
                <b>Price:</b> {booking.price}
              </Text>
              <Text>
                <b>Payment Method:</b> {booking.payment_method.type}{" "}
                {booking.payment_method.type == "Card" &&
                  `- ${booking.payment_method.card_no}`}
              </Text>
              <Text>
                <b>Status:</b> {booking.status}
              </Text>
              <Text>
                <b>Booked at:</b> {booking.booked_at}
              </Text>
              {booking.completed_at && (
                <Text>
                  <b>Completed at:</b> {booking.completed_at}
                </Text>
              )}
              {booking.payment_method.type == "Pay after service" && (
                <Button mx="auto" colorScheme="blue" onClick={onOpen}>
                  Pay Now
                </Button>
              )}
              <PayNowModal
                isOpen={isOpen}
                onClose={onClose}
                service_name={booking.service_name}
                company_name={booking.company_name}
                category={booking.category}
                price={booking.price}
                booking_id={booking.booking_id}
              />
            </Flex>
          ))}
      </Flex>
    </Box>
  )
}
