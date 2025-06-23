'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface Category {
  id: number
  name: string
  description: string
  slug: string
}

export default function CategoriesIndex() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [form, setForm] = useState({ name: '', description: '' })

  // Cargar categorías al iniciar
  useEffect(() => {
    fetch('http://localhost:8081/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  // Cuando seleccionas editar, llena el formulario con los datos
  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setForm({ name: category.name, description: category.description || '' })
  }

  // Guardar los cambios (PUT)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCategory) return
    const res = await fetch(`http://localhost:8081/api/categories/${editingCategory.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editingCategory, ...form }),
    })
    if (res.ok) {
      const updated = await res.json()
      setCategories(categories.map(cat => cat.id === updated.id ? updated : cat))
      setEditingCategory(null)
      setForm({ name: '', description: '' })
    } else {
      alert('Error al actualizar')
    }
  }

  // Eliminar categoría (DELETE)
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta categoría?')) return
    const res = await fetch(`http://localhost:8081/api/categories/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setCategories(categories.filter(cat => cat.id !== id))
    } else {
      alert('Error al eliminar')
    }
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Categorías</h1>
        <Link
          href="/admin/categories/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 inline-flex items-center"
        >
          Nueva Categoría
        </Link>
      </div>
      {/* Formulario de edición */}
      {editingCategory && (
        <form className="mb-6 bg-gray-100 p-4 rounded" onSubmit={handleUpdate}>
          <h2 className="text-xl mb-2">Editar Categoría</h2>
          
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            className="block mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="block mb-2 p-2 border rounded w-full"
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded mr-2">Guardar</button>
          <button type="button" onClick={() => setEditingCategory(null)} className="ml-2 px-4 py-2">Cancelar</button>
        </form>
      )}

      {/* Listado */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {categories.map(cat => (
            <li key={cat.id}>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-600 truncate">{cat.name}</p>
                  <p className="text-sm text-gray-500">{cat.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}