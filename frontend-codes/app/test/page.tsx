import TestConnection from '@/components/test-connection'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Frontend-Backend Connection Test</h1>
        <TestConnection />
      </div>
    </div>
  )
}