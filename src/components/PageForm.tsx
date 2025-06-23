'use client'
import React, { useEffect, useState } from 'react'

interface Category {
  id: number
  name: string
}

interface Page {
  id?: number
  title: string
  content: string
  categoryId?: number
}

export default function PageForm({
  initialData,
  onSubmit,
}: {
  initialData?: Page
  onSubmit: (data: Page) => void
}) {
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState<Page>(
    initialData || { title: '', content: '', categoryId: undefined }
  )

  useEffect(() => {
    fetch('http://localhost:8081/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'categoryId' ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        required
        className="block w-full border p-2 rounded"
      />
      <textarea
        name="content"
        placeholder="Contenido"
        value={form.content}
        onChange={handleChange}
        required
        className="block w-full border p-2 rounded"
      />
      <select
        name="categoryId"
        value={form.categoryId || ''}
        onChange={handleChange}
        required
        className="block w-full border p-2 rounded"
      >
        <option value="">Selecciona una categoría</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Guardar Página
      </button>
    </form>
  )
}