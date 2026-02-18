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
import { useFormik } from "formik";
import { supabase } from "./ui/supabase";

function LoginForm() {
  async function signInUser(userEmail, userPassword) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    })

    if (error) {
      console.error("Supabase: " + error.message)
    } else if (data) {
      console.log("Signed in!")
      console.log(data)
    }
  }

  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      signInUser(values.email, values.password)
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required").min(4, "Must be at least 4 characters"),
    }),
  });

  return (
    <Box p={6} rounded="md" w="100%">
      <form onSubmit={(e) => {
        e.preventDefault()
        signInFormik.handleSubmit()
      }}>
        <VStack spacing={4}>
          <FormControl isInvalid={signInFormik.touched.email && signInFormik.errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              {...signInFormik.getFieldProps('email')}
            />
            <FormErrorMessage>{signInFormik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={signInFormik.touched.password && signInFormik.errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              {...signInFormik.getFieldProps('password')}
            />
            <FormErrorMessage>{signInFormik.errors.password}</FormErrorMessage>
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
  );
}

export default LoginForm;