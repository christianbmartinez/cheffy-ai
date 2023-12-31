import { useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import backgroundPattern from '../public/vegetablepattern.jpg'

const Signup = () => {
  const { t } = useTranslation('common')
  const [data, setData] = useState({
    fullName: '',
    email: '',
    password: '',
    language: 'English',
    country: 'United States of America',
  })
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCountryChange = (e) => {
    setData({ ...data, country: e.target.value })
  }

  const handleLanguageChange = (e) => {
    setData({ ...data, language: e.target.value })
  }

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      let answer = await response.json()
      answer.success ? setIsSignedUp(true) : setSubmitError(answer.error)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <main className='relative w-full overflow-hidden bg-zinc-50 min-h-screen'>
      <div className='absolute inset-0 opacity-5 aspect-square'>
        <Image src={backgroundPattern} alt='background image' fill />
      </div>
      <div className='flex flex-col relative z-50 items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0'>
        <div className='flex flex-col justify-center items-center'>
          <Link href='/' className='flex items-center'>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/cheffyIcon.svg`}
              className='h-32 w-32'
              alt='Cheffy Icon'
              width={100}
              height={100}
            />
          </Link>
          <p className='-mt-5 mb-16 font-semibold text-xl tracking-tight text-zinc-900'>
            CheffyAI
          </p>
        </div>
        {!isSignedUp ? (
          <div className='w-full bg-white rounded-lg dark:border md:mt-0 shadow-xl sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                {t('signUp.title')}
              </h1>
              <hr />
              <form className='space-y-4 md:space-y-6' onSubmit={handleSignup}>
                <div>
                  <label
                    htmlFor='fullName'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    {t('signUp.full-name')}
                  </label>
                  <input
                    type='text'
                    name='fullName'
                    value={data.fullName}
                    onChange={handleInputChange}
                    className='text-base
                w-full
                font-normal
                text-zinc-700 dark:text-zinc-200
                bg-zinc-50 dark:bg-slate-800 bg-clip-padding
                border border-solid border-zinc-300 dark:border-zinc-500
                transition
                ease-in-out
                m-0
                  focus:border-purple focus:outline-none py-4 px-4 rounded-xl'
                    placeholder='Jane Doe'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    {t('signUp.email')}
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={data.email}
                    onChange={handleInputChange}
                    className='text-base
                w-full
                font-normal
                text-zinc-700 dark:text-zinc-200
                bg-zinc-50 dark:bg-slate-800 bg-clip-padding
                border border-solid border-zinc-300 dark:border-zinc-500
                transition
                ease-in-out
                m-0
                  focus:border-purple focus:outline-none py-4 px-4 rounded-xl'
                    placeholder='email@example.com'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    {t('signUp.password')}
                  </label>
                  <input
                    type='password'
                    name='password'
                    placeholder='••••••••'
                    value={data.password}
                    onChange={handleInputChange}
                    className='text-base
                w-full
                font-normal
                text-zinc-700 dark:text-zinc-200
                bg-zinc-50 dark:bg-slate-800 bg-clip-padding
                border border-solid border-zinc-300 dark:border-zinc-500
                transition
                ease-in-out
                m-0
                  focus:border-purple focus:outline-none py-4 px-4 rounded-xl'
                    required
                  />
                </div>
                <div className='w-full mb-6'>
                  <label
                    htmlFor='country'
                    className='block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2'
                  >
                    {t('signUp.country')}
                  </label>
                  <div className='flex-shrink w-full inline-block relative'>
                    <select
                      name='country'
                      onChange={handleCountryChange}
                      value={data.country}
                      className='block appearance-none text-zinc-500 w-full bg-white border border-zinc-400 shadow-inner px-4 py-2 pr-8 rounded'
                    >
                      {t('signUp.countries', { returnObjects: true }).map(
                        (country, index) => {
                          return <option key={index}>{country}</option>
                        }
                      )}
                    </select>
                    <div className='pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-zinc-600'>
                      <svg
                        className='fill-current h-4 w-4'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className='w-full mb-6'>
                  <label className='block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2'>
                    {t('signUp.language')}
                  </label>
                  <div className='flex-shrink w-full inline-block relative'>
                    <select
                      name='language'
                      onChange={handleLanguageChange}
                      value={data.language}
                      className='block appearance-none text-zinc-500 w-full bg-white border border-zinc-400 shadow-inner px-4 py-2 pr-8 rounded'
                    >
                      {t('signUp.languages', { returnObjects: true }).map(
                        (language, index) => {
                          return <option key={index}>{language}</option>
                        }
                      )}
                    </select>
                    <div className='pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-zinc-600'>
                      <svg
                        className='fill-current h-4 w-4'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type='submit'
                  className='w-full hover:shadow-lg text-white bg-purple hover:bg-purpleDark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  disabled={loading}
                >
                  {t('signUp.sign-up')}
                </button>
                <p className='text-sm font-light text-gray-700 dark:text-gray-400'>
                  {t('signUp.has-account')}{' '}
                  <Link
                    href='/login'
                    className='font-medium text-purple hover:underline dark:text-primary-500'
                  >
                    {t('signUp.login')}
                  </Link>
                </p>
                {submitError && <p>{submitError}</p>}
              </form>
            </div>
          </div>
        ) : (
          <div className='w-full bg-white rounded-lg dark:border md:mt-0 shadow-xl sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8 text-center'>
              <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                {t('signUp.success')}
              </h1>
              <p className='mt-5 text-md font-normal text-gray-700 dark:text-gray-400'>
                {t('signUp.click')}{' '}
                <Link
                  href='/login'
                  className='font-medium text-purple hover:underline dark:text-primary-500'
                >
                  {t('signUp.here')}
                </Link>{' '}
                {t('signUp.return-to-login')}
                {`, ${data.fullName.split(' ').slice(0, -1).join(' ')}`}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Signup

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
