import { useState } from 'react';
import EmailLogo from '../../assets/Email.png';

const Email = () => {
const [sent, setSent] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formdata = new FormData(form);

    const email =  formdata.get('email');
    const message = formdata.get('message');
    const name = formdata.get('name');

     await fetch("http://localhost:8000/api/send-email", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, message, name }),
      });
      setSent('Message Envoyé');
      console.log("name", name);
      form.reset();
  };

    return (
      <section className='p-8'>
        <h3 className='text-center text-redTitle text-4xl flex flex-col'>CHOOSE THE BEST OPTION FOR YOU!</h3>     
        <div className='flex flex-col md:flex-row text-center justify-around'>
            <div className='m-auto'>
              <img src={EmailLogo} alt="" className='p-6 md:p-0' /> 
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col my-6 md:w-1/2'>
              <div className='flex flex-col md:flex-row'>
                <div className='flex flex-col md:pr-12 md:w-1/2'> 
                  <label htmlFor="name" className='text-left font-semibold text-[#262a38]'>Name</label>
                  <input type="text" name='name' className="border-2 border-gray-500 p-1 my-2 mb-4 rounded-md bg-gray-200 text-left focus:border-[#FFE7A3] focus:outline-none" />
                </div>
                <div className='flex flex-col md:w-1/2'>                  
                  <label htmlFor="email" className='text-left font-semibold text-[#262a38]'>Email</label>
                  <input type="email" name='email' required className='border-2 border-gray-500 p-1 my-2 mb-4 rounded-md bg-gray-200 text-left focus:border-[#FFE7A3] focus:outline-none'/>
                </div>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="message" className='text-left font-semibold text-[#262a38]'>Message</label>
                <textarea name='message' className='border-2 border-gray-500 p-1 my-2 mb-4 h-32 rounded-md bg-gray-200 text-left focus:border-[#FFE7A3] focus:outline-none'/>
              </div>
              
              <button className='bg-[#FFE7A3] text-center border-2 border-[#667175] p-2 rounded-md font-semibold' type="submit">Send</button>
              <p className='font-semibold pt-6'>{sent}</p>
            </form>    
        </div>
      </section>
    );
  };
  
  export default Email;
  