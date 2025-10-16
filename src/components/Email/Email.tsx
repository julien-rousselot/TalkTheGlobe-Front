import { useState } from 'react';

const Email = () => {
  const [sent, setSent] = useState('');
  const [loading, setLoading] = useState(false); // ✅ Own loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSent(''); // Clear previous success message
    
    const form = e.target as HTMLFormElement;
    const formdata = new FormData(form);

    const email = formdata.get('email');
    const message = formdata.get('message');
    const name = formdata.get('name');

    try {
      const response = await fetch("http://localhost:3000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message, name }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setSent('Message envoyé avec succès!');
      form.reset();
    } catch (err) {
      console.error('Email send error:', err);
    } finally {
      setLoading(false);
    }
  };

    return (
      <section className='pb-20'>
        <div className='flex flex-col md:flex-row text-center justify-around'>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <div className='flex flex-col md:flex-row'>
                <div className='flex flex-col md:pr-12 md:w-1/2'> 
                  <label htmlFor="name" className='text-left font-extrabold text-[#262a38]'>Name</label>
                  <input disabled={loading} type="text" name='name' className="border-2 border-text p-1 my-2 mb-4 rounded-md bg-gray-100 text-left focus:outline-none" />
                </div>
                <div className='flex flex-col md:w-1/2'>                  
                  <label htmlFor="email" className='text-left font-extrabold text-[#262a38]'>Email</label>
                  <input disabled={loading} type="email" name='email' required className='border-2 border-text p-1 my-2 mb-4 rounded-md bg-gray-100 text-left focus:outline-none'/>
                </div>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="message" className='text-left font-extrabold text-[#262a38]'>Message</label>
                <textarea disabled={loading} name='message' className='border-2 border-text p-1 my-2 mb-4 h-32 rounded-md bg-gray-100 text-left focus:outline-none'/>
              </div>
              
          <button 
            className='bg-[#cba7f8] hover:bg-[#c599fa] text-center border-2 border-[#667175] p-2 rounded-md font-extrabold disabled:opacity-50 disabled:cursor-not-allowed' 
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Envoi en cours...
              </span>
            ) : (
              'Send'
            )}
          </button>
          <p className='font-semibold'>{sent}</p>
        </form>
      </div>
    </section>
  );
};
  
  export default Email;
  