import { useState, useCallback, useEffect } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import Sidebar from '@/components/Sidebar'
import useLocalStorage from 'use-local-storage'
import Image from 'next/image'
import ScrollableFeed from 'react-scrollable-feed'

const locales = {
  de: () => import('dayjs/locale/de'),
  en: () => import('dayjs/locale/en'),
  es: () => import('dayjs/locale/es'),
  fr: () => import('dayjs/locale/fr'),
}

const Chat = (props) => {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [typing, setIsTyping] = useState(false)
  const [storedValues, setStoredValues] = useLocalStorage('chat', [])
  const [newQuestion, setNewQuestion] = useState('')
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleSubmit = (e) => {
    e.preventDefault()
    setNewQuestion('')
  }

  const loadLocale = useCallback(async () => {
    const loadedLocale = await locales[props._nextI18Next.initialLocale]()
    return loadedLocale.default
  }, [props._nextI18Next.initialLocale])

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true)
    } else if (status === 'unauthenticated') {
      setLoading(false)
      router.push('/login')
    } else if (status === 'authenticated') {
      setLoading(false)
      loadLocale()
        .then((locale) => {
          dayjs.locale(locale)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [status, router, loadLocale])

  const generateResponse = async (newQuestion, setNewQuestion) => {
    setIsTyping(true)
    const response = await fetch('/api/chatGpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: newQuestion,
        language: session.user.language,
      }),
    })

    let answer = await response.json()
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
      <Sidebar
        chat={t('sideMenu.chat')}
        recipes={t('sideMenu.recipes')}
        settings={t('sideMenu.settings')}
        logout={t('sideMenu.logout')}
      />
      <div className='flex flex-row md:w-4/6 lg:w-5/6 h-[87%] md:h-[92%] absolute top-0 right-0 mx-auto shadow-2xl'>
        {loading ? (
          'Loading...'
        ) : (
          <ScrollableFeed className='mt-[89px] md:mt-0 md:pb-0'>
            <div className='flex flex-row justify-between rounded-b-md md:mt-0'>
              <div className='px-4 flex flex-col justify-between'>
                <div className='flex flex-col mt-5'>
                  <div className='flex justify-start mb-4'>
                    <div className='py-3 px-4 bg-purple rounded-lg text-white'>
                      <p className='text-md'>
                        {t('chat.greeting')}
                        {session && session.user.name
                          ? `, ${session.user.name
                              .split(' ')
                              .slice(0, -1)
                              .join(' ')}`
                          : session && session.user.fullName
                          ? `, ${session.user.fullName
                              .split(' ')
                              .slice(0, -1)
                              .join(' ')}`
                          : ''}
                        ?
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
                {storedValues.length !== 0 && (
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
        )}
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
              focus:border-purple focus:outline-none py-4 px-4 rounded-xl'
          placeholder={t('chat.placeholder')}
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
          {t('chat.send')}
        </button>
      </form>
    </>
  )
}

const AnswerSection = ({ storedValues }) => {
  const [saved, setSaved] = useState(false)
  const { t } = useTranslation('common')
  const { data: session } = useSession()

  const saveRecipe = async (
    email,
    timestamp,
    title,
    description,
    ingredients,
    instructions
  ) => {
    const response = await fetch('/api/saveRecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        timestamp: Number(timestamp),
        title: title,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
      }),
    })
    let answer = await response.json()
    answer.text ? setSaved(true) : setSaved(false)
  }
  return (
    <>
      {storedValues !== undefined &&
        storedValues
          .map((data, i) => {
            const answerString = JSON.stringify(data.answer)
            const answer = JSON.parse(answerString)
            return (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  translateY: -100,
                }}
                className='my-3'
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  duration: 1.5,
                  delay: 0.25 * i,
                }}
              >
                <div className='flex justify-start mb-4'>
                  <div className='py-3 px-4 bg-slate-400 dark:bg-slate-600 rounded-lg text-zinc-50'>
                    <p className='text-md'>{data.question}</p>
                  </div>
                </div>
                <div className='flex justify-start mb-4'>
                  <div className='py-3 px-4 bg-purple rounded-lg text-white'>
                    <p className='font-bold'>{answer.recipeTitle}</p>
                    <p>{answer.recipeDescription}</p>
                    <br />
                    <p className='font-bold'>{t('chat.ingredients')}:</p>
                    {answer.ingredients.map((ingredient, i) => {
                      return <p key={i}>- {ingredient}</p>
                    })}
                    <br />
                    <p className='font-bold'>{t('chat.instructions')}:</p>
                    <p>{answer.instructions}</p>
                    <br />
                    <button
                      className='text-md my-5 bg-white px-4 rounded-lg py-1 text-purple shadow-md outline-none border-none hover:bg-purpleDark hover:text-white'
                      onClick={() => {
                        saveRecipe(
                          session.user.email,
                          Date.now(),
                          answer.recipeTitle,
                          answer.recipeDescription,
                          answer.ingredients,
                          answer.instructions
                        )
                      }}
                    >
                      {saved ? t('chat.saved') : t('chat.save')}
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
              </motion.div>
            )
          })
          .reverse()}
    </>
  )
}

export default Chat

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
