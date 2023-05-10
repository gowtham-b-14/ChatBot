import * as Yup from 'yup'

const signupValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string()
      .min(8)
      .required("please enter password")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        "Must contain alphabitics, numbers, symbols and should be minimum 8 charecterstics"
      ),
    firstname: Yup.string().min(3).required("Required"),
    lastname: Yup.string().min(1).required("Required"),
  });

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string().min(8).required('please enter password').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
    'Must contain alphabitics, numbers, symbols and should be minimum 8 charecterstics')
  })

  export {signupValidationSchema,loginValidationSchema}