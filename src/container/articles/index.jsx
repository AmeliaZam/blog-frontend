import { Box, Button, CardContent, Paper, Typography, Pagination, Stack } from '@mui/material'
import MuiCard from '@mui/joy/Card'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { defaultPageCount } from 'utils/constants/common'
import { fetchAllArticles, removeArticle } from 'api/articles'
import { isEmpty } from 'lodash'
import { DeleteModal, LoadingModal } from 'components'
import ArticleModal from '../../components/ArticleModal'
import { getProfile, logout } from 'api/auth'
import Card from 'components/Card'

import './styles.scss'

const Articles = () => {
  const [articles, setArticles] = useState([])
  const [articlesCount, setArticlesCount] = useState(0)
  const [confirmModal, setConfirmModal] = useState(false)
  const [currentArticles, setCurrentArticles] = useState({})
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setloading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [isArticleChange, setIsArticleChange] = useState(false)
  const [currenAction, setCurrenAction] = useState(null)
  const [category, setCategory] = useState('published')
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  const getArticles = async () => {
    try {
      setloading(true)
      const data = await fetchAllArticles(defaultPageCount, pageNumber, category)
      if (isEmpty(data)) return

      setArticles(data.rows)
      setArticlesCount(data.count)
    } catch (error) {
      if (error.response.status == 401) {
        toast.error('Please login to see draft articles')
        handleLogout()
      }
    } finally {
      setloading(false)
    }
  }

  const getCurrentUser = async () => {
    try {
      const { user } = await getProfile()
      setUser(user)
    } catch (error) {}
  }

  useEffect(() => {
    getCurrentUser()
    getArticles()
  }, [pageNumber, isArticleChange, category])

  const handleRemoveArticle = async () => {
    setConfirmModal(false)
    setloading(true)
    console.log('currentArticles._id', currentArticles)
    const data = await removeArticle(currentArticles._id)
    if (!isEmpty(data)) {
      await getArticles()
      toast.success('Article removed')
    } else {
      toast.error('Error! Article not removed')
    }
    setloading(false)
  }

  const handleAction = (type, article) => {
    setCurrenAction(type)
    setCurrentArticles(article)

    if (type == 'delete') return setConfirmModal(true)

    setOpenModal(true)
  }

  const handleAddArticle = () => {
    setCurrenAction('create')
    setOpenModal(true)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <DeleteModal
        handleDelete={handleRemoveArticle}
        setConfirmModal={setConfirmModal}
        show={confirmModal}
      />
      <ArticleModal
        action={currenAction}
        currentArticles={currentArticles}
        open={openModal}
        handleClose={() => setOpenModal(false)}
        isArticleChange={isArticleChange}
        setIsArticleChange={setIsArticleChange}
      />
      <Box className='container-fluid article-container'>
        <LoadingModal show={loading} />
        <Paper className='mat-paper' elevation={2}>
          <Button
            onClick={handleLogout}
            sx={{ marginLeft: 2 }}
            className='submit-button'
            type='submit'
            variant='contained'
            size='large'
            color='error'
          >
            LOGOUT
          </Button>
          <MuiCard>
            <MuiCard className='card-wrapper'>
              <Typography variant='h4'>Publish Articles</Typography>
              <CardContent className='mat-card-header'>
                <Box className='btn-container'>
                  <Button
                    onClick={() => setCategory('published')}
                    sx={{ marginRight: 1, marginLeft: -2 }}
                    className='submit-button'
                    type='submit'
                    variant={category === 'published' ? 'contained' : 'outlined'}
                    size='large'
                  >
                    Published Articles
                  </Button>
                  <Button
                    className='submit-button close-button'
                    onClick={() => setCategory('drafts')}
                    variant={category === 'drafts' ? 'contained' : 'outlined'}
                    size='large'
                  >
                    Draft Articles
                  </Button>
                </Box>
                <Button
                  onClick={handleAddArticle}
                  className='add-button'
                  color='primary'
                  variant='contained'
                >
                  + Add Article
                </Button>
              </CardContent>
            </MuiCard>
            <Box className='card-container'>
              {!loading && articles.length == 0 ? (
                <Box className='no-article-msg'>
                  <Typography>No Article Found, Please add some</Typography>
                </Box>
              ) : (
                articles.map((article) => (
                  <Card
                    author={`${article.authorId.firstname} ${article.authorId.lastname}`}
                    title={article.title}
                    status={article.status}
                    description={article.content}
                    date={article.createdDate}
                    handleAction={(action) => handleAction(action, article)}
                    isAuthorized={user.email == article.authorId.email}
                  />
                ))
              )}
            </Box>
          </MuiCard>
          <MuiCard className='navigation-container'>
            <Stack spacing={2}>
              <Pagination
                onChange={(_, value) => setPageNumber(value)}
                page={pageNumber}
                count={Math.ceil(articlesCount / defaultPageCount)}
                variant='outlined'
                color='primary'
              />
            </Stack>
          </MuiCard>
        </Paper>
      </Box>
    </>
  )
}

export default Articles
