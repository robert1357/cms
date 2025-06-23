'use client'
import { useEffect, useState } from 'react'

interface Page {
  id: number
  title: string
  slug: string
  // otros campos si los tienes
}

export default function PagesIndex() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:8081/api/pages')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar páginas')
        return res.json()
      })
      .then(data => setPages(data))
      .catch(() => setError('Error al cargar páginas'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Páginas</h1>
        <a 
          href="/admin/pages/new" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Nueva Página
        </a>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {loading && <p className="p-4">Cargando...</p>}
        {error && <p className="p-4 text-red-600">{error}</p>}
        <ul className="divide-y divide-gray-200">
          {pages.map(page => (
            <li key={page.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-indigo-600 truncate">{page.title}</p>
                      <p className="text-sm text-gray-500">/{page.slug}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a 
                      href={`/admin/pages/${page.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </a>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      // Aquí puedes poner lógica para eliminar la página
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {(!loading && pages.length === 0) && (
          <p className="p-4 text-gray-500">No hay páginas creadas.</p>
        )}
      </div>
    </div>
  )
}