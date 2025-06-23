'use client'
import { useState, useEffect } from "react"
import PageForm from "@/components/PageForm"
import { useRouter, useParams } from "next/navigation"

export default function PageEdit() {
  const router = useRouter()
  const params = useParams()
  const [initialData, setInitialData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`http://localhost:8081/api/pages/${params.id}`)
      .then(res => res.json())
      .then(data => setInitialData(data))
      .catch(() => setError("No se pudo cargar la página"))
  }, [params.id])

  const handleEdit = async (data: any) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`http://localhost:8081/api/pages/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error("Error al actualizar la página")
      router.push("/admin/pages")
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Editar Página</h1>
      {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-2">{error}</div>}
      {initialData ? (
        <PageForm onSubmit={handleEdit} initialData={initialData} loading={loading} />
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  )
}