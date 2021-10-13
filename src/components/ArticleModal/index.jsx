import { Box, Paper, Typography, Modal } from '@mui/material'
import Card from '@mui/joy/Card'
import { isEmpty, isEqual } from 'lodash'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

import { addArticle, updateArticle } from 'api/articles'
import { articleFields, articleInitialValues } from 'utils/constants/articles'
import { LoadingModal, Form } from 'components'
import { validateArticle } from 'utils/validations'

import './styles.scss'

const ArticleModal = ({
  open,
  handleClose,
  action,
  currentArticles,
  isArticleChange,
  setIsArticleChange,
}) => {
  const [loading, setloading] = useState(false)
  const [articleFieldsInitialValues, setInitialValues] = useState(articleInitialValues)
  const [articleOptions, setArticleOptions] = useState({
    options: [
      { value: 'published', label: 'Publish' },
      { value: 'draft', label: 'Draft' },
    ],
    placeholder: 'Select Status',
  })

  useEffect(() => {
    if (action === 'update') setInitialValues(currentArticles)

    return () => setInitialValues(articleInitialValues)
  }, [action, currentArticles])

  const handleArticle = async (values) => {
    setloading(true)
    if (action === 'create') {
      const data = await addArticle(values)
      if (!isEmpty(data)) {
        handleClose()
        setIsArticleChange(!isArticleChange)
        toast.success(`Article  ${action === 'add' ? 'added' : 'updated'}`)
      } else {
        toast.error('Error! Article not added')
      }
    } else if (!isEqual(values, currentArticles)) {
      const data = await updateArticle(values, currentArticles._id)
      if (!isEmpty(data)) {
        handleClose()
        setIsArticleChange(!isArticleChange)
        toast.success(`Article  ${action === 'add' ? 'added' : 'updated'}`)
      } else {
        toast.error('Error! Article not updated')
      }
    }
    handleClose()
    setloading(false)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      onBackdropClick={handleClose}
    >
      <Box className='add-article-container container-fluid container'>
        <LoadingModal show={loading} />
        <Box className='container'>
          <Paper className='mat-paper' elevation={2}>
            <Card className='mat-card'>
              <Typography className='heading' variant='h4'>
                {action} Article
              </Typography>
              <Form
                fieldsInitialValues={articleFieldsInitialValues}
                handleSubmition={handleArticle}
                action={action}
                validate={validateArticle}
                fields={articleFields}
                handleAction={handleClose}
                navigate='Cancel'
                selectList={articleOptions}
              />
            </Card>
          </Paper>
        </Box>
      </Box>
    </Modal>
  )
}

export default ArticleModal
