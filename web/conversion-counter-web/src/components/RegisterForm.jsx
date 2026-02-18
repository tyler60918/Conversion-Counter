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

function RegisterForm({ sendLoginStatus }) {
  async function signUpNewUser(newFirstName, newLastName, newEmail, newPassword) {
    const { data, error } = await supabase.auth.signUp({
      email: newEmail,
      password: newPassword,
      options: {
        data: {
          first_name: newFirstName,
          last_name: newLastName
        }
      }
    })

    if (error) {
      console.error("Supabase: " + error.message)
    } else if (data) {
      console.log("New user registered!")
      sendLoginStatus(true)
      console.log(data)
    }
  }

  const regFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      signUpNewUser(values.firstName, values.lastName, values.email, values.password)
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required").min(6, "Must be at least 6 characters"),
    }),
  });

  return (
    <Box p={6} rounded="md" w="100%">
      <form onSubmit={(e) => {
        e.preventDefault()
        regFormik.handleSubmit()
      }}>
        <VStack spacing={4}>
          <FormControl isInvalid={regFormik.touched.firstName && regFormik.errors.firstName}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              {...regFormik.getFieldProps('firstName')}
            />
            <FormErrorMessage>{regFormik.errors.firstName}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={regFormik.touched.lastName && regFormik.errors.lastName}>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              {...regFormik.getFieldProps('lastName')}
            />
            <FormErrorMessage>{regFormik.errors.lastName}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={regFormik.touched.email && regFormik.errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              {...regFormik.getFieldProps('email')}
            />
            <FormErrorMessage>{regFormik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={regFormik.touched.password && regFormik.errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              {...regFormik.getFieldProps('password')}
            />
            <FormErrorMessage>{regFormik.errors.password}</FormErrorMessage>
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
  )
}

export default RegisterForm;