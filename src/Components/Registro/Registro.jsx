import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  InputGroup,
  InputRightElement,
  FormHelperText,
  Flex,
  useBreakpointValue
} from "@chakra-ui/react";
import { IoEye, IoEyeOff } from "react-icons/io5";

//  validación de Yup para los campos del formulario
const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .matches(/^[a-zA-ZñÑ]+$/, "*El nombre solo puede contener letras")
    .min(2, "*El nombre debe tener al menos 2 caracteres")
    .max(50, "*El nombre no puede tener más de 50 caracteres")
    .required("*El nombre es obligatorio"),
  apellido: Yup.string()
    .matches(/^[a-zA-ZñÑ]+$/, "*El apellido solo puede contener letras")
    .min(2, "*El apellido debe tener al menos 2 caracteres")
    .max(50, "*El apellido no puede tener más de 50 caracteres")
    .required("*El apellido es obligatorio"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-ñÑ]+@[a-zA-Z0-9.-ñÑ]+\.[a-zA-Z]{2,}$/,///^\S+@\S+\.\S+$/
      "*El email no es válido"
    )
    .required("*El email es obligatorio"),
  telefono: Yup.string()
    .matches(/^[0-9]+$/, "*El teléfono solo puede contener números")
    .min(10, "*El teléfono debe tener al menos 10 dígitos")
    .max(15, "*El teléfono no puede tener más de 15 dígitos")
    .required("*El teléfono es obligatorio"),
  password: Yup.string()
    .min(8, "*La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "*al menos una mayúscula, una letra minúscula y un número"
    )
    .required("*La contraseña es obligatoria"),
  confirmarPassword: Yup.string()
    .oneOf([Yup.ref('password')], '*Las contraseñas deben coincidir')
    .required('*La confirmación de la contraseña es obligatoria'),
});

const PasswordInput = ({ label, name, isSubmitting, errors, touched }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl id={name} isRequired>
      <FormLabel>{label}</FormLabel>
      <InputGroup size="md">
        <Field as={Input} pr="4.5rem" type={show ? "text" : "password"} name={name} isDisabled={isSubmitting} />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <IoEyeOff /> : <IoEye />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {errors[name] && touched[name] && <FormHelperText color="red.500">{errors[name]}</FormHelperText>}
      <FormErrorMessage><ErrorMessage name={name} /></FormErrorMessage>
    </FormControl>
  );
};

const Registro = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmarPassword: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onClose = () => setIsOpen(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    setSubmitting(false);
    resetForm();
    setIsOpen(true);
    setIsSubmitted(true);
  };

  const variant = useBreakpointValue({ base: "column", md: "row" });

  return (
    <Flex direction={variant} justify="center" align="center" height="100vh" backgroundColor="pink">
      
      {!isSubmitted ? (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, errors, touched }) => {
            setFormValues(values);
            return (
              <Form noValidate>
                <FormControl id="nombre" isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Field as={Input} type="text" name="nombre" isDisabled={isSubmitting} />
                  {errors.nombre && touched.nombre && <FormHelperText color="red.500">{errors.nombre}</FormHelperText>}
                  <FormErrorMessage><ErrorMessage name="nombre" /></FormErrorMessage>
                </FormControl>
                <FormControl id="apellido" isRequired>
                  <FormLabel>Apellido</FormLabel>
                  <Field as={Input} type="text" name="apellido" isDisabled={isSubmitting} />
                  {errors.apellido && touched.apellido && <FormHelperText color="red.500">{errors.apellido}</FormHelperText>}
                  <FormErrorMessage><ErrorMessage name="apellido" /></FormErrorMessage>
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Field as={Input} type="email" name="email" isDisabled={isSubmitting} />
                  {errors.email && touched.email && <FormHelperText color="red.500">{errors.email}</FormHelperText>}
                  <FormErrorMessage><ErrorMessage name="email" /></FormErrorMessage>
                </FormControl>
                <FormControl id="telefono" isRequired>
                  <FormLabel>Teléfono</FormLabel>
                  <Field as={Input} type="text" name="telefono" isDisabled={isSubmitting} />
                  {errors.telefono && touched.telefono && <FormHelperText color="red.500">{errors.telefono}</FormHelperText>}
                  <FormErrorMessage><ErrorMessage name="telefono" /></FormErrorMessage>
                </FormControl>
                <PasswordInput label="Contraseña" name="password" isSubmitting={isSubmitting} errors={errors} touched={touched} />
                <PasswordInput label="Confirmar contraseña" name="confirmarPassword" isSubmitting={isSubmitting} errors={errors} touched={touched} />
                <Button type="submit" colorScheme="blue" isLoading={isSubmitting} loadingText="Registrando">
                  Registrarse
                </Button>
              </Form>
            );
          }}
        </Formik>
      ) : null}
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Gracias por enviar tus datos
            </AlertDialogHeader>
            <AlertDialogBody>
              ¡Gracias por registrarte, {formValues.nombre}! Hemos enviado un correo electrónico a {formValues.email} para confirmar tu registro.<strong>Y gracias profe por esas horas de más que dio clases para ayudarnos!!</strong>
            </AlertDialogBody>
            <AlertDialogFooter>
             
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default Registro;






