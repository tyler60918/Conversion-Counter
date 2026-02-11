import { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';

function LandingPage() {
  const [submitType, setSubmitType] = useState('register')

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {

    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required").min(4, "Must be at least 4 characters"),
    }),
  });

  return (
    <div>
      <h1>
        Conversion Counter
      </h1>
      <Box p={6} rounded="md" w="100%">
        <form onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}>
          <VStack spacing={4}>
            <FormControl isInvalid={formik.touched.email && formik.errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                {...formik.getFieldProps('email')}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.touched.password && formik.errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                {...formik.getFieldProps('password')}
              />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              colorScheme="purple"
              width="full"
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </div>
  )
}

export default LandingPage