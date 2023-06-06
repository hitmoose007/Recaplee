import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { SiHive, SiMarketo, SiMicrosoft } from 'react-icons/si';
import ActionButton from '@/components/StripeComponents/ActionButton';
import PricingCard from '@/components/StripeComponents/PricingCard';
import { ChakraProvider } from '@chakra-ui/react';

import { useSession } from '@supabase/auth-helpers-react';

import { Stripe } from '@stripe/stripe-js';
import getStripe from '@/utils/getStripe';
import { stripe } from '@/lib/stripe';
const Subscribe = () => {
  const session = useSession();
  const fetchTestPlan = async (e: any) => {
    e.preventDefault();
    // Create a Checkout Session.
    console.log(window.location.origin);
    const data = await fetch('/api/checkout_sessions', {
      //set req.body['userId'] = userId
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session?.user.id,
        priceId: 'price_1N96wGEwJCgTqEWBOtlRv6gQ',
      }),
    });

    const checkoutSession = await data.json();
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSession.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
  };

  return (
    <ChakraProvider>
      <Box
        as="section"
        bg={useColorModeValue('gray.50', 'gray.800')}
        py="14"
        px={{ base: '4', md: '8' }}
      >
        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing={{ base: '8', lg: '0' }}
          maxW="7xl"
          mx="auto"
          justifyItems="center"
          alignItems="center"
        >
          <PricingCard
            data={{
              price: '$29',
              name: 'Application UI',
              features: [
                'All application UI components',
                'Lifetime access',
                'Use on unlimited projects',
                'Free Updates',
              ],
            }}
            icon={SiMicrosoft}
            button={
              <ActionButton variant="outline" borderWidth="2px">
                Buy now
              </ActionButton>
            }
          />
          <PricingCard
            zIndex={1}
            isPopular
            transform={{ lg: 'scale(1.05)' }}
            data={{
              price: '$10',
              name: 'Bundle',
              features: [
                'All application UI components',
                'Lifetime access',
                'Use on unlimited projects',
                'Use on unlimited projects',
                'Free Updates',
              ],
            }}
            icon={SiHive}
            button={<ActionButton>Buy now</ActionButton>}
          />
          <PricingCard
            data={{
              price: '$5',
              name: 'Test',
              features: [
                'Test plan',
                
              ],
            }}
            icon={SiMarketo}
            button={
              <ActionButton
                onClick={(e) => fetchTestPlan(e)}
                variant="outline"
                borderWidth="2px"
              >
                Buy now
              </ActionButton>
            }
          />
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
};

export default Subscribe;
