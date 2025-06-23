import { DocumentTextIcon, FolderIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const stats = [
  { name: 'Páginas', icon: DocumentTextIcon, count: 12, href: '/admin/pages' },
  { name: 'Categorías', icon: FolderIcon, count: 4, href: '/admin/categories' },
]

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.count}</p>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link href={item.href} className="font-medium text-indigo-600 hover:text-indigo-500">
                      Ver todos<span className="sr-only"> {item.name}</span>
                    </Link>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}