'use client'
import { useState } from "react"
import PageForm from "@/components/PageForm"
import { useRouter } from "next/navigation"

export default function PageCreate() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async (data: any) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("http://localhost:8081/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error("Error al crear la página")
      router.push("/admin/pages")
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Nueva Página</h1>
      {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-2">{error}</div>}
      <PageForm onSubmit={handleCreate} loading={loading} />
    </div>
  )
}