'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [accountName, setAccountName] = useState('')
  const [bayerName, setBayerName] = useState('')
  const [snippet, setSnippet] = useState('')
  const [accountNumber, setAccountNumber] = useState(1)
  const [resultLink, setResultLink] = useState('')
  const [copied, setCopied] = useState(false)


  const gifUrls = ["https://i.gifer.com/6KpW.gif", "https://i.gifer.com/19wE.gif", "https://i.gifer.com/3R2B.gif",
    "https://i.gifer.com/yH.gif", "https://i.gifer.com/2unv.gif", "https://i.gifer.com/IXNp.gif", "https://i.gifer.com/6ka.gif",
    "https://i.gifer.com/Z6W9.gif", "https://i.gifer.com/3hdw.gif"
  ]

  const [currentGif, setCurrentGif] = useState(gifUrls[0])

  // Меняем гифку каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * gifUrls.length)
      setCurrentGif(gifUrls[randomIndex])
    }, 10000)

    return () => clearInterval(interval) // Чистим интервал при размонтировании
  }, [])

  const extractValues = (text) => {
    const match = text.match(/send_to':\s*'AW-([\d]+)\/([^\']+)'/)
    if (match) {
      return { value1: match[1], value2: match[2] }
    }
    return { value1: '', value2: '' }
  }

  useEffect(() => {
    if (!accountName || !snippet) {
      setResultLink('')
      return
    }

    const { value1, value2 } = extractValues(snippet)
    const fullNetwork = `${accountName}${accountNumber}-${bayerName}`
    const finalLink = `lpurl?targetid=1ttfmin5b4w1l7pzrtwa&network=${fullNetwork}&placement=placement&creative=creative&campaignid=campaignid&gclid=gclid&keyword=keyword&param2=${value1}&param1=${value2}`
    
    setResultLink(finalLink)
    setCopied(false)
  }, [accountName, snippet, accountNumber])

  const copyToClipboard = () => {
    if (!resultLink) return;
  
    navigator.clipboard.writeText(resultLink);
    setCopied(true);
  
    // Добавляем таймер на 3 секунды
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const incrementAccount = () => {
    setAccountNumber(prev => prev + 1)
  }

  const resetAll = () => {
    setAccountName('')
    setSnippet('')
    setAccountNumber(1)
    setResultLink('')
    setCopied(false)
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-6 font-sans relative">
      {/* Основная форма */}
      <div className="flex flex-col items-center w-full max-w-xl mx-auto">
        <h1 className="text-3xl font-bold tracking-wide mb-1 text-white">NomADS</h1>
        <p className="text-gray-400 text-sm mb-6">Generating a tracking template</p>
  
        <input
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Account name"
          className="mb-4 p-2 bg-gray-800 text-white border border-gray-700 rounded w-full max-w-md focus:outline-none focus:ring focus:ring-blue-500"
        />
  
        <input
          type="text"
          value={bayerName}
          onChange={(e) => setBayerName(e.target.value)}
          placeholder="Bayer Name"
          className="mb-4 p-2 bg-gray-800 text-white border border-gray-700 rounded w-full max-w-md focus:outline-none focus:ring focus:ring-blue-500"
        />
  
        <textarea
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          placeholder="Snippet"
          rows={8}
          className="mb-4 p-2 h-60 bg-gray-800 text-white border border-gray-700 rounded w-full max-w-md focus:outline-none focus:ring focus:ring-blue-500"
        />
  
        <div className="flex flex-col items-center mb-4">
          <span className="text-xs text-gray-400 mb-1">Номер кабинета</span>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-mono">
            {accountNumber}
          </span>
        </div>
  
        <div className="flex gap-4 mb-6">
          <button onClick={incrementAccount} className="bg-blue-700 hover:bg-blue-600 transition px-4 py-2 rounded text-sm">
            + Каб
          </button>
          <button onClick={resetAll} className="bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded text-sm">
            Новый акк
          </button>
        </div>
  
        {resultLink && (
          <div
            onClick={copyToClipboard}
            className="bg-gray-800 border border-gray-700 p-4 rounded w-full max-w-2xl break-words text-sm cursor-pointer hover:border-blue-500 transition"
          >
            {resultLink}
          </div>
        )}
  
        {copied && <div className="mt-2 text-green-400 text-sm">спизжено!</div>}
      </div>
  
      {/* Абсолютно спозиционированная гифка справа */}
      <img
        src={currentGif}
        alt="Working animation"
        className="absolute top-1/4 right-8 w-80 h-auto pointer-events-none transition-opacity duration-500"
      />
    </main>
  )
}
