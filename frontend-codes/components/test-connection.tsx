"use client"

import { useState } from 'react'
import { signupUser, signinUser, getProtectedData } from '@/services/auth'

export default function TestConnection() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testRegistration = async () => {
    setLoading(true)
    try {
      const response = await signupUser({
        username: 'testfrontend',
        email: 'frontend@test.com',
        password: 'TestPass123!'
      })
      setResult(`Registration successful: ${JSON.stringify(response, null, 2)}`)
    } catch (error: any) {
      setResult(`Registration failed: ${error.message}`)
    }
    setLoading(false)
  }

  const testLogin = async () => {
    setLoading(true)
    try {
      const response = await signinUser({
        email: 'test@example.com',
        password: 'TestPass123!'
      })
      setResult(`Login successful: ${JSON.stringify(response, null, 2)}`)
      
      // Store tokens for testing protected endpoint
      if (response.access) {
        localStorage.setItem('access_token', response.access)
      }
    } catch (error: any) {
      setResult(`Login failed: ${error.message}`)
    }
    setLoading(false)
  }

  const testProtectedEndpoint = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('access_token')
      if (!token) {
        setResult('No access token found. Please login first.')
        setLoading(false)
        return
      }
      
      const response = await getProtectedData(token)
      setResult(`Protected endpoint successful: ${JSON.stringify(response, null, 2)}`)
    } catch (error: any) {
      setResult(`Protected endpoint failed: ${error.message}`)
    }
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Backend Connection Test</h2>
      
      <div className="space-y-4">
        <button
          onClick={testRegistration}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Registration
        </button>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 ml-2"
        >
          Test Login
        </button>
        
        <button
          onClick={testProtectedEndpoint}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50 ml-2"
        >
          Test Protected Endpoint
        </button>
      </div>
      
      {loading && <p className="mt-4 text-blue-600">Loading...</p>}
      
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Result:</h3>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </div>
  )
}