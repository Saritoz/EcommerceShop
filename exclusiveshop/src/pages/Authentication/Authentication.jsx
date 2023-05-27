import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import Container from '../../layouts/Container'
import { useMountTransition } from '../../hooks/useMountTransition'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import { loginUser, registerUSer } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'

export default function Authentication() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [switchAuth, setSwitchAuth] = useState(false)
  const hasLoginIn = useMountTransition(switchAuth, 500)
  const hasRegisterIn = useMountTransition(!switchAuth, 500)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'onChange' })
  const handleSubmitRegister = (data) => {
    console.log(data)
    const registerData = {
      username: data.signup_name,
      email: data.signup_email,
      password: data.signup_password
    }
    dispatch(registerUSer(registerData))
    reset()
  }

  const handleSubmitLogin = async (data) => {
    const newLogin = {
      username: data.signin_name,
      password: data.signin_password
    }
    const res = dispatch(loginUser(newLogin))
    res.then((data) => (data.payload.name === 'LOGIN_SUCCESS' ? navigate('/') : reset()))
  }

  useEffect(() => {
    reset()
  }, [switchAuth, reset])

  return (
    <section className='mb-5'>
      <Container>
        <BreadCrumb />
        <div className='flex flex-wrap-reverse items-center gap-10 sm:flex-nowrap'>
          <img src='/assets/imgs/loginimg.png' alt='' className='hidden min-w-[250px] basis-3/5 md:block' />
          <div className='mx-auto basis-[2/5]'>
            {switchAuth ? (
              <div className={`flex w-[325px] flex-col gap-y-5 lg:w-[375px] ${hasRegisterIn && 'animate-fade-in'}`}>
                <h2 className='text-4xl font-semibold tracking-wider'>Log in to Exclusive</h2>
                <p className='text-xl'>Enter your details below</p>
                <form action='' onSubmit={handleSubmit(handleSubmitLogin)}>
                  <div>
                    <input
                      type='text'
                      placeholder='username'
                      autoComplete='off'
                      className='mb-1 w-full border-b-[1px] border-neutral-300 p-2 pl-0'
                      {...register('signin_name', {
                        required: {
                          value: true,
                          message: 'required name'
                        }
                      })}
                    />
                    <div className='mb-1 min-h-[24px] text-red-500'>{errors.signin_name?.message}</div>
                  </div>
                  <div>
                    <input
                      type='password'
                      placeholder='password'
                      autoComplete='off'
                      className='mb-1 w-full border-b-[1px] border-neutral-300 p-2 pl-0'
                      {...register('signin_password', {
                        required: {
                          value: true,
                          message: 'required password'
                        }
                      })}
                    />
                    <div className='mb-1 min-h-[24px] text-red-500'>{errors.signin_password?.message}</div>
                  </div>
                  <button
                    type='submit'
                    className='mt-3 w-full rounded bg-red-500 py-3 text-white transition-colors duration-300 hover:bg-red-400'
                  >
                    Log in
                  </button>
                </form>
                <p>
                  Don't have an account ?{' '}
                  <span
                    className='select-none text-red-500 underline hover:cursor-pointer'
                    onClick={() => setSwitchAuth((prev) => !prev)}
                  >
                    Register
                  </span>
                </p>
              </div>
            ) : (
              <div className={`flex w-[325px] flex-col gap-y-5 lg:w-[375px] ${hasLoginIn && 'animate-fade-in'}`}>
                <h2 className='text-4xl font-semibold tracking-wider'>Create an account</h2>
                <p className='text-xl'>Enter your details below</p>
                <form action='' onSubmit={handleSubmit(handleSubmitRegister)}>
                  <div>
                    <input
                      type='text'
                      placeholder='Name'
                      autoComplete='off'
                      className='mb-1 w-full border-b-[1px] border-neutral-300 p-2 pl-0'
                      {...register('signup_name', {
                        required: {
                          value: true,
                          message: 'required name'
                        },
                        minLength: {
                          value: 6,
                          message: 'at least 6 characters'
                        }
                      })}
                    />
                    <div className='mb-1 min-h-[24px] text-red-500'>{errors.signup_name?.message}</div>
                  </div>
                  <div>
                    <input
                      type='text'
                      placeholder='Email'
                      autoComplete='off'
                      className='mb-1 w-full border-b-[1px] border-neutral-300 p-2 pl-0'
                      {...register('signup_email', {
                        required: {
                          value: true,
                          message: 'required email'
                        },
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: 'incorrect email, exp: abc@gmail.com'
                        }
                      })}
                    />
                    <div className='mb-1 min-h-[24px] text-red-500'>{errors.signup_email?.message}</div>
                  </div>
                  <div>
                    <input
                      type='password'
                      placeholder='Password'
                      autoComplete='off'
                      className='mb-1 w-full border-b-[1px] border-neutral-300 p-2 pl-0'
                      {...register('signup_password', {
                        required: {
                          value: true,
                          message: 'required password'
                        },
                        pattern: {
                          value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/,
                          message: 'at least 6 characters, includes 1 uppercase, 1 lowercase and 1 digit '
                        }
                      })}
                    />
                    <div className='mb-1 min-h-[24px] text-red-500'>{errors.signup_password?.message}</div>
                  </div>
                  <button
                    type='submit'
                    className='mt-3 w-full rounded bg-red-500 py-3 text-white transition-colors duration-300 hover:bg-red-400'
                  >
                    Create account
                  </button>
                </form>
                <p>
                  Already have account ?{' '}
                  <span
                    className='select-none text-red-500 underline hover:cursor-pointer'
                    onClick={() => setSwitchAuth((prev) => !prev)}
                  >
                    Login
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
