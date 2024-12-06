import React from 'react'
import {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useRegisterMutation } from '../../redux/api/userApiSlice'
import { setCredientials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { set } from 'mongoose'



const Register = () => {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector(state => state.auth)
    const {search} = useLocation();
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        if(password != confirmPassword){
            toast.error('Password not match check the password')
        }else{
            try {
                const res = await register({username, email, password, confirmPassword}).unwrap()
                dispatch(setCredientials({...res}))
                navigate(redirect)
                toast.success('User register succesfully')
            } catch (error) {
                console.log(error);
                toast.error(error?.data?.message || error.message)
            }
        }
    }

  return (
    <section className="pl-[10rem] flex flex-wrap">
          <div className="mr-[4rem] mt-[5rem]">
              <h1 className="text-[#8b5cf6] text-2xl font-semibold mb-4">Register</h1>
          <form onSubmit={submitHandler} className="container w-[40rem]">
              <div className="my-[2rem]">
                  <label htmlFor="email" className="text-[#8b5cf6] block text-sm font-medium">
                      Name:
                  </label>
                  <input
                      type="text"
                      name="name"
                      id="name"
                      className="mt-1 p-2 border rounded w-full b"
                      placeholder='Name'
                      value={username}
                      onChange={(e) => setUserName(e.target.value)} />
              </div>

              <div className="my-[2rem]">
                  <label htmlFor="email" className="text-[#8b5cf6] block text-sm font-medium">
                  Email:
              </label>
              <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 p-2 border rounded w-full b"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="my-[2rem]">
              <label htmlFor="password" className="text-[#8b5cf6] block text-sm font-medium">
                  Password:
              </label>
              <input
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 p-2 border rounded w-full b"
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="my-[2rem]">
              <label htmlFor="confirmPassword" className="text-[#8b5cf6] block text-sm font-medium ">
                  Confirm Password:
              </label>
              <input
                  type="password"
                  name="confirmpassword"
                  id="confirmPassword"
                  className="mt-1 p-2 border rounded w-full b"
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button disabled={isLoading} type='submit' className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
              {isLoading ? "Register In..." : "Register"}
          </button>
          {isLoading && <Loader />}
      </form>
      <div className="mt-4">
              <p className="text-[#8b5cf6]">Already have account ? {" "}
                  <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}
                      className="text-pink-500 hover:underline">Login</Link>
              </p>
          </div>
            </div>
            {/* <div className="hidden md:flex w-1/2 items-center justify-center">
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                    alt="Registration"
                    className="h-[65rem] w-[90%] rounded-lg object-cover"
                />
            </div> */}
    </section>

    
  )
}

export default Register
