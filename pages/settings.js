import Sidebar from '@/components/Sidebar'

const Settings = () => {
  return (
    <>
      <Sidebar />
      <div className='flex flex-row justify-top fixed top-0 right-0 w-5/6 mx-auto mt-36'>
        <div className='inputs w-full max-w-2xl p-6 mx-auto'>
          <h2 className='text-2xl text-zinc-900'>Account Settings</h2>
          <form className='mt-6 border-t border-zinc-400 pt-4'>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full border-zinc-400'>
                <div className='flex items-center justify-between mt-3'>
                  <div className='w-full md:w-1/2 px-3 mb-6'>
                    <label className='block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2'>
                      first name
                    </label>
                    <input
                      className='appearance-none block w-full bg-white text-zinc-700 border border-zinc-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-zinc-500'
                      type='text'
                      placeholder='Christian'
                      required
                    />
                  </div>
                  <div className='w-full md:w-1/2 px-3 mb-6'>
                    <label className='block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2'>
                      last name
                    </label>
                    <input
                      className='appearance-none block w-full bg-white text-zinc-700 border border-zinc-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-zinc-500'
                      type='text'
                      placeholder='Martinez'
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='w-full md:w-full px-3 mb-6'>
                <label
                  className='block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2'
                  for='grid-text-1'
                >
                  email address
                </label>
                <input
                  className='appearance-none block w-full bg-white text-zinc-700 border border-zinc-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-zinc-500'
                  id='grid-text-1'
                  type='text'
                  placeholder='hello@christianbmartinez.com'
                  required
                />
              </div>
              <div className='w-full md:w-full px-3 mb-6 '>
                <label className='block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2'>
                  password
                </label>
                <div className='flex flex-row justify-between'>
                  <input
                    className='inline-block w-4/6 bg-white text-zinc-700 border border-zinc-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-zinc-500'
                    id='grid-text-1'
                    type='text'
                    placeholder='**************'
                    required
                  />
                  <button className='w-1/4 py-3 rounded-xl inline-block text-md px-4 leading-none border text-white bg-purple border-purple hover:border-purpleDark hover:bg-purpleDark hover:text-white'>
                    Update
                  </button>
                </div>
              </div>
              <div className='w-full md:w-full px-3 mb-6'>
                <label className='block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2'>
                  Country
                </label>
                <div className='flex-shrink w-full inline-block relative'>
                  <select className='block appearance-none text-zinc-500 w-full bg-white border border-zinc-400 shadow-inner px-4 py-2 pr-8 rounded'>
                    <option>USA</option>
                    <option>France</option>
                    <option>Spain</option>
                    <option>UK</option>
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
              <div className='w-full md:w-full px-3 mb-6'>
                <label className='block uppercase tracking-wide text-zinc-700 text-xs font-bold mb-2'>
                  Language
                </label>
                <div className='flex-shrink w-full inline-block relative'>
                  <select className='block appearance-none text-zinc-500 w-full bg-white border border-zinc-400 shadow-inner px-4 py-2 pr-8 rounded'>
                    <option>English</option>
                    <option>France</option>
                    <option>Spanish</option>
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
                className='ml-3 mb-6 py-3 rounded-xl inline-block text-md px-4 leading-none border text-white bg-purple border-purple hover:border-purpleDark hover:bg-purpleDark hover:text-white'
                type='submit'
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Settings
