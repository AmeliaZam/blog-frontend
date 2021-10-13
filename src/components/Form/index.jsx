import { Button, CardContent, TextField, Typography, Box } from '@mui/material'
import { Fragment } from 'react'
import { Formik } from 'formik'
import { isEmpty } from 'lodash'

import { Select } from 'components'

import './styles.scss'

const Form = ({ fieldsInitialValues, handleSubmition, action, validate, fields, handleAction, navigate, selectList }) => (
  <CardContent className='mat-card-content'>
    <Formik
      initialValues={fieldsInitialValues}
      enableReinitialize
      validate={validate}
      onSubmit={handleSubmition}
    >
      {({
        values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue,
      }) => (
        <form className='mat-form' onSubmit={handleSubmit}>
          {fields.map((field) => (field.type !== 'select' ? (
            <Fragment key={field.name}>
              <TextField
                className='text-field'
                fullWidth
                label={field.label}
                variant='outlined'
                type={field.type}
                multiline
                minRows={field.type == 'multiline' ? 2 : 1}
                name={field.name}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values[field.name]}
              />
              <Typography className='warn-typography'>
                {errors[field.name] && touched[field.name] && errors[field.name]}
              </Typography>
            </Fragment>
          ) : (
            <Fragment key={field.name}>
              <Box className='select-container'>
                <Select
                  setValue={(value) => setFieldValue(field.name, value)}
                  selectOptions={selectList.options}
                  placeHolder={selectList.placeholder}
                  value={values[field.name]}
                />
              </Box>
              <Typography className='warn-typography'>
                {errors[field.name] && touched[field.name] && errors[field.name]}
              </Typography>
            </Fragment>
          )))}

          <Box className='btn-container'>
            <Button
              className='submit-button'
              type='submit'
              disabled={!isEmpty(errors)}
              variant='contained'
              size='large'
            >
              {action}
            </Button>
            <Button
              className='submit-button close-button'
              onClick={handleAction}
              variant='text'
              size='large'
            >
              {navigate}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </CardContent>
)

export default Form
