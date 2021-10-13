import instance from 'api'

export const fetchAllArticles = async (rowsPerPage, pageNumber, category) => {
  const { data } = await instance.get(
    `/article/${category}?limit=${+rowsPerPage}&page=${+pageNumber}`
  )
  return data
}

export const removeArticle = async (id) => {
  const { data } = await instance.delete(`/Article/${id}`)
  return data
}

export const addArticle = async (body) => {
  const response = await instance.post('/article', body)
  return response
}

export const updateArticle = async (body, id) => {
  const response = await instance.patch(`/article/${id}`, body)
  return response
}
