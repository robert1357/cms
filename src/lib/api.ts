import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8081/api', // Ajusta esto a tu URL del backend
})

// Interceptor para manejar tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Servicios para categorías
export const categoryService = {
  getAll: async () => {
    const response = await api.get('/categories')
    return response.data
  },

  create: async (category: { name: string; description: string }) => {
    const response = await api.post('/categories', category)
    return response.data
  },

  update: async (id: number, category: { name: string; description: string }) => {
    const response = await api.put(`/categories/${id}`, category)
    return response.data
  },

  delete: async (id: number) => {
    await api.delete(`/categories/${id}`)
  }
}

// Servicio para autenticación
export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password })
    const { token } = response.data
    localStorage.setItem('token', token)
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
  }
}