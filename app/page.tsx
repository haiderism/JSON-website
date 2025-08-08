'use client'

import { useState, useCallback } from 'react'
import { Copy, Download, FileText, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react'

interface ToastState {
  show: boolean
  message: string
  type: 'success' | 'error'
}

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isFormatted, setIsFormatted] = useState(false)
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' })

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
  }, [])

  const formatJSON = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter some JSON to format')
      setOutput('')
      setIsFormatted(false)
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError('')
      setIsFormatted(true)
      showToast('JSON formatted successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format')
      setOutput('')
      setIsFormatted(false)
    }
  }, [input, showToast])

  const minifyJSON = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter some JSON to minify')
      setOutput('')
      setIsFormatted(false)
      return
    }

    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
      setIsFormatted(true)
      showToast('JSON minified successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format')
      setOutput('')
      setIsFormatted(false)
    }
  }, [input, showToast])

  const copyToClipboard = useCallback(async () => {
    if (!output) {
      showToast('Nothing to copy', 'error')
      return
    }

    try {
      await navigator.clipboard.writeText(output)
      showToast('Copied to clipboard!')
    } catch (err) {
      showToast('Failed to copy to clipboard', 'error')
    }
  }, [output, showToast])

  const downloadJSON = useCallback(() => {
    if (!output) {
      showToast('Nothing to download', 'error')
      return
    }

    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showToast('JSON file downloaded!')
  }, [output, showToast])

  const clearAll = useCallback(() => {
    setInput('')
    setOutput('')
    setError('')
    setIsFormatted(false)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg animate-slide-up ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {toast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">JSON Formatter</h1>
                <p className="text-sm text-gray-600">Fast, clean, and ad-free</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Blazing Fast</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Input JSON</h2>
              <button
                onClick={clearAll}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="input-field min-h-[400px] resize-none font-mono text-sm"
              />
              {input && (
                <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                  {input.length} characters
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={formatJSON}
                className="button-primary flex items-center gap-2"
              >
                <Sparkles size={18} />
                Format JSON
              </button>
              <button
                onClick={minifyJSON}
                className="button-secondary flex items-center gap-2"
              >
                Minify JSON
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Formatted Output</h2>
              {isFormatted && (
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="button-secondary flex items-center gap-2 text-sm px-4 py-2"
                  >
                    <Copy size={16} />
                    Copy
                  </button>
                  <button
                    onClick={downloadJSON}
                    className="button-secondary flex items-center gap-2 text-sm px-4 py-2"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              {error ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-red-800">JSON Error</h3>
                      <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <pre className={`code-block min-h-[400px] ${!output ? 'flex items-center justify-center' : ''}`}>
                    {output || (
                      <span className="text-gray-400 text-center">
                        Formatted JSON will appear here...
                      </span>
                    )}
                  </pre>
                  {output && (
                    <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                      {output.length} characters
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600">Instant JSON formatting and validation with real-time feedback</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Error Detection</h3>
            <p className="text-sm text-gray-600">Smart error detection with helpful messages to fix JSON issues</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Copy className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Export</h3>
            <p className="text-sm text-gray-600">One-click copy to clipboard or download as JSON file</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>Built with ❤️ for developers. Fast, clean, and completely ad-free.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}