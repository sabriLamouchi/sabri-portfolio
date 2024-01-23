import React, { useRef, useState } from 'react'
import {motion} from 'framer-motion'
import emailjs from '@emailjs/browser'
import { styles } from '../style'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'
const Contact = () => {

  const[form,setForm]=useState({
    name:"",
    email:"",
    message:"",
  })
  const formRef=useRef();
  const [loading,setLoading]=useState();
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setForm({...form,[name]:value})

  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_wtczn79',
      'template_9npcs9k',{
        from_name:form.name,
        to_name:"sabri",
        to_email:'lamouchsabri@gmail.com',
        message:form.message,
      },
      '5oZ4jAZlCLjSg7b7i').then(()=>{
        setLoading(false);
        alert("thank you. I will back to you as soon as possible");
        setForm({
          name:'',
          email:'',
          message:'',
        })
      },(error)=>{
        setLoading(false);
        console.log(error);
        alert('Something went wrong!!')
      }
      )
  }
  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
      variants={slideIn('left','tween',0.2,1)}
      className='flex-[0.75] bg-black-100 p-8 rounded-2xl  '
      >
       <p className={styles.heroSubText}>Get in touch </p> 
       <h3 className={styles.sectionHeadText}>Contact.</h3>

       <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8' action="">
          <label htmlFor="" className='flex flex-col '>
            <span className='text-white font-medium mb-4 '>Your Name</span>
            <input type="text"
            name='name'
            value={form
            .name}
            onChange={handleChange}
            placeholder="What's your name? "
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium' />
          </label>

          <label htmlFor="" className='flex flex-col '>
            <span className='text-white font-medium mb-4 '>Your email</span>
            <input type="text"
            name='email'
            value={form
            .email}
            onChange={handleChange}
            placeholder="What's your email?"
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium' />
          </label>

          <label htmlFor="" className='flex flex-col '>
            <span className='text-white font-medium mb-4 '>Your Name</span>
            <textarea
            rows={7}
            name='message'
            value={form
            .message}
            onChange={handleChange}
            placeholder="What do you want to say?"
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium' />
          </label>
          <button type='submit ' className='bg-tertiary outline-none w-[25%] rounded-xl text-white px-3 py-8 font-bold shadow-md shadow-primary'>{loading ? "Send ...":"Send"}</button>
       </form>
      </motion.div>

      <motion.div
      variants={slideIn('right',"tween",.2,1)}
      className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] ' >
        <EarthCanvas/>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact,'contact');