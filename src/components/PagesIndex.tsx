'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface Category {
  id: number
  name: string
}

interface Page {
  id: number
  title: string
  category: Category
}

export default function PagesIndex() {
  const [pages, setPages] = useState<Page[]>([])

  useEffect(() => {
    fetch('http://localhost:8081/api/pages')
      .then(res => res.json())
      .then(data => setPages(data))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Páginas</h1>
      <Link
        href="/admin/pages/new"
        className="bg-indigo-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Nueva Página
      </Link>
      <ul className="divide-y divide-gray-200 bg-white shadow rounded">
        {pages.map(page => (
          <li key={page.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-bold">{page.title}</p>
              <p className="text-sm text-gray-500">
                Categoría: {page.category?.name || 'Sin categoría'}
              </p>
            </div>
            <div>
              <Link href={`/admin/pages/${page.id}/edit`} className="text-indigo-600 mr-4">Editar</Link>
              {/* Aquí podrías poner el botón eliminar */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}