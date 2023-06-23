import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import useLocalStorage from 'use-local-storage'
import Image from 'next/image'
import ScrollableFeed from 'react-scrollable-feed'

const Chat = () => {
  const [typing, setIsTyping] = useState(false)
  const [storedValues, setStoredValues] = useLocalStorage('chat', [])
  const [newQuestion, setNewQuestion] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    setNewQuestion('')
  }

  const generateResponse = async (newQuestion, setNewQuestion) => {
    setIsTyping(true)
    const response = await fetch('/api/chatGpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: newQuestion,
      }),
    })

    let answer = await response.json()
    console.log(JSON.parse(answer.json.choices[0].message.content))
    if (answer.json.choices) {
      setStoredValues([
        {
          question: newQuestion,
          answer: JSON.parse(answer.json.choices[0].message.content),
        },
        ...storedValues,
      ])
      setNewQuestion('')
      setIsTyping(false)
    } else if (answer.json.text) {
      setStoredValues([
        {
          question: newQuestion,
          answer: answer.json.text,
        },
        ...storedValues,
      ])
      setNewQuestion('')
      setIsTyping(false)
    } else {
      setStoredValues([
        {
          question: newQuestion,
          answer: answer.json.text,
        },
        ...storedValues,
      ])
      setNewQuestion('')
      setIsTyping(false)
    }
  }

  return (
    <>
      <Sidebar chatPage={true} />
      <div className='flex flex-row md:w-4/6 lg:w-5/6 h-[92%] absolute top-0 right-0 mx-auto shadow-2xl'>
        <ScrollableFeed>
          <div className='flex flex-row justify-between rounded-b-md mt-[100px] md:mt-0'>
            <div className='px-4 flex flex-col justify-between'>
              <div className='flex flex-col mt-5'>
                <div className='flex justify-start mb-4'>
                  <div className='py-3 px-4 bg-purple rounded-lg text-white'>
                    <p className='text-md'>
                      Welcome! I am Cheffy! Would you like me to give you ideas
                      for your next meal?
                    </p>
                  </div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/cheffyIcon.svg`}
                    className='h-12 w-12'
                    alt='Cheffy Icon'
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              {storedValues.length > 0 && (
                <AnswerSection storedValues={storedValues} />
              )}
              {typing && (
                <div className='typing-indicator'>
                  <div className='typing-indicator-bubble'>
                    <div className='typing-indicator-dot'></div>
                    <div className='typing-indicator-dot'></div>
                    <div className='typing-indicator-dot'></div>
                  </div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/cheffyIcon.svg`}
                    className='h-12 w-12 m-1'
                    alt='Cheffy Icon'
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </div>
          </div>
        </ScrollableFeed>
      </div>
      <form
        onSubmit={handleSubmit}
        className='shadow-inner w-full flex flex-row justify-between items-center fixed md:w-4/6 lg:w-5/6 h-[15.25%] bottom-0 right-0 bg-zinc-50 px-4'
      >
        <input
          className='text-base
            w-3/4
            font-normal
            text-zinc-700 dark:text-zinc-200
            bg-zinc-50 dark:bg-slate-800 bg-clip-padding
            border border-solid border-zinc-300 dark:border-zinc-500
            transition
            ease-in-out
            m-0
              focus:border-purple-600 focus:outline-none py-4 px-4 rounded-xl'
          placeholder='Ask Cheffy a question'
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          type='text'
        />
        <button
          type='submit'
          aria-label='Chat submit button'
          className='w-1/4 ml-5 py-5 rounded-xl inline-block text-md px-4 leading-none border text-white bg-purple border-purple hover:border-purpleDark hover:bg-purpleDark hover:text-white'
          onClick={() => generateResponse(newQuestion, setNewQuestion)}
        >
          SEND
        </button>
      </form>
    </>
  )
}

const AnswerSection = ({ storedValues }) => {
  const [saved, setSaved] = useState(false)
  const [savedIndex, setSavedIndex] = useState()
  const saveRecipe = async (
    title,
    description,
    ingredients,
    instructions,
    index
  ) => {
    const response = await fetch('/api/saveRecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: Date.now(),
        title: title,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
        index: index,
      }),
    })
    let answer = await response.json()
    setSaved(true)
    setSavedIndex(answer.index)
  }
  return (
    <>
      {storedValues !== undefined &&
        storedValues
          .map((data, index) => {
            const answerString = JSON.stringify(data.answer)
            const answer = JSON.parse(answerString)
            return (
              <div key={index}>
                <div className='flex justify-start mb-4'>
                  <div className='py-3 px-4 bg-slate-400 dark:bg-slate-600 rounded-lg text-zinc-50'>
                    <p className='text-md'>{data.question}</p>
                  </div>
                </div>
                <div className='flex justify-start mb-4'>
                  <div className='py-3 px-4 bg-purple rounded-lg text-white'>
                    <p className='font-bold'>{answer.recipeTitle}</p>
                    <p>{answer.recipeDescription}</p>
                    <p className='font-bold'>Ingredients:</p>
                    {answer.ingredients.map((ingredient, i) => {
                      return <p key={i}>- {ingredient}</p>
                    })}
                    <p className='font-bold'>Instructions:</p>
                    <p>{answer.instructions}</p>
                    <button
                      className='text-md my-5 bg-white px-4 rounded-lg py-1 text-purple shadow-md outline-none border-none hover:bg-purpleDark hover:text-white'
                      onClick={() => {
                        saveRecipe(
                          answer.recipeTitle,
                          answer.recipeDescription,
                          answer.ingredients,
                          answer.instructions,
                          index
                        )
                      }}
                    >
                      {saved && index === savedIndex ? 'Saved!' : 'Save'}
                    </button>
                  </div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/cheffyIcon.svg`}
                    className='h-12 w-12'
                    alt='Cheffy Icon'
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            )
          })
          .reverse()}
    </>
  )
}

export default Chat
