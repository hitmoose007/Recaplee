import { Button, ButtonProps } from '@chakra-ui/react'

 const ActionButton = (props: ButtonProps) => (
  <Button
    colorScheme="blue"
    size="lg"
    w="full"
    fontWeight="extrabold"
    py={{ md: '8' }}
    {...props}
  />
)
export default ActionButton