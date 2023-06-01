import { useState, useEffect } from "react"

import AnimatedCursor from "react-animated-cursor"
import {Fade} from 'react-awesome-reveal';

import toast, { Toaster } from 'react-hot-toast'

import { db } from './config/firebaseConfig'
import {collection, getDoc, addDoc, doc, updateDoc} from 'firebase/firestore'

import Background from './assets/background.jpg'
import Social from "./components/Social";


function App() {

  const [componentsLoaded, setComponentsLoaded] = useState(false);

  const [loading, setLoading] = useState(false)

  const [secretPhrase, setSecretPhrase] = useState('');
  const [phrase, setPhrase] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    link: '',
    address: '',
  })

  const isFormEmpty = Object.values(formData).some(value => value === '')

  const submissionsRef = collection(db, 'submissions')

  const [submissionCount, setSubmissionCount] = useState(0)
  const [submissionLimit, setSubmissionLimit] = useState(null)

  useEffect(() => {

    setTimeout(() => {
      setComponentsLoaded(true);
    }, 5000); 

  }, []);

  useEffect(() => {
    // Fetch the secret phrase from Firestore
    const fetchSecretPhrase = async () => {
      try {
        const secretPhraseDoc = await getDoc(doc(db, 'settings', 'lyHVoyErVldDju4VHJIg'))
        
        if (secretPhraseDoc.exists()) {
          setPhrase(secretPhraseDoc.data().phrase);
          setSubmissionCount(secretPhraseDoc.data().formCount)
          setSubmissionLimit(secretPhraseDoc.data().maxLimit)
        }
      } catch (error) {
        console.error('Error fetching secret phrase: ', error)
        // toast.error('phrase error')
      }
    }

    fetchSecretPhrase()
  }, []);

  // Secret phase input 
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate the secret phrase
    if (secretPhrase === phrase) {
      if (submissionCount < submissionLimit) {
        setIsFormVisible(true);
        setSecretPhrase('')
      } else {
        // alert('Submission limit exceeded!');
        toast.error('Limit exceeded!')
      }
    } else {
      // alert('Invalid secret phrase!');
      toast.error('Invalid EmoForm Phrase!')
    }

  }

  const handleSecretPhraseChange = (e) => {
    setSecretPhrase(e.target.value);
  };

  // Form input 
  const handleInputChange = (e) => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Save form data to Firestore
    try {
      if (submissionCount < submissionLimit) {

        if (formData.username === '' || formData.link === '' || formData.address === '') {
          toast.error('Fill All field');
          return;
        }

        setLoading(true)

        const docRef = await addDoc(submissionsRef, formData)
  
        const countRef = await doc(db, 'settings', 'lyHVoyErVldDju4VHJIg')
        await updateDoc(countRef, {formCount: submissionCount + 1})

        setSubmissionCount(submissionCount + 1)
        
        setFormData({
          username: '',
          link: '',
          address: '',
        })
        setIsFormVisible(false)
        setLoading(false)
        // alert('Form submitted successfully!', docRef.id);
        toast.success('EMOListed!')

      } else {

        // alert('Submission limit exceeded!');
        toast.error('Limit Exceeded!')

      }
      
    } catch (error) {
      console.error('Error adding data: ', error)
      setLoading(false)
      // alert('An error occurred while submitting the form.');
      toast.error('An error occurred while submitting the form.')
    }
  };


  return (
    <div className="flex items-center justify-center h-screen w-full bg-cover bg-center bg-scroll" style={{ backgroundImage: `url(${Background})` }}>
      <Toaster />

      <AnimatedCursor
        innerSize={20}
        outerSize={50}
        color='95, 255, 230'
        outerAlpha={0.2}
        innerScale={1}
        outerScale={2}
        innerStyle={{
          backgroundColor: 'var(--cursor-color)'
        }}
      />

      {!componentsLoaded ? (
        <div>
          <span className='uppercase text-white text-center text-6xl md:text-8xl lg:text-9xl font-guy tracking-widest'>
            <Fade cascade damping={6e-1}>
              EMOFORM
            </Fade>
          </span>
        </div>
      ) : (
        <div className="">
          {(!isFormVisible) ? (
            <div>
              {(submissionCount < submissionLimit) ? (
                <form onSubmit={handleSubmit} className="w-full flex items-center drop-shadow-xl">
                  <div className="flex justify-between items-center">
                    <input 
                      type="text" 
                      autoComplete="off"
                      className="md:w-96 w-full bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-gray-200" 
                      placeholder="Secret Phrase"
                      value={secretPhrase}
                      onChange={handleSecretPhraseChange}
                    />
                    
                    <div className="flex justify-center items-center space-x-2">
                      <button type="submit" className="bg-gray-200 hover:bg-gray-200 text-black px-4 py-2 font-medium rounded">
                        ENTER
                      </button>
                    </div>
    
                  </div>
                </form>
              ) : (
                <div className="font-guy text-white text-5xl tracking-widest bg-red-400 px-4 py-4 rounded-xl">
                  Form Closed
                </div>
              )}
            </div>
          ) : (
            <div className="">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="flex items-center">
                  <input 
                    type="text" 
                    autoComplete="off"
                    className="md:w-96 w-full bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-gray-200 text-black" 
                    placeholder="Twitter Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center">
                  <input 
                    type="text" 
                    autoComplete="off"
                    className="md:w-96 w-full bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-gray-200 text-black" 
                    placeholder="Retweet Link"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center">
                  <input 
                    type="text" 
                    autoComplete="off"
                    className="md:w-96 w-full bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-gray-200 text-black" 
                    placeholder="0x Address"
                    name="address"
                    maxLength={42}
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex justify-center items-center space-x-2">
                  <button
                    disabled={isFormEmpty || loading}
                    type="submit" 
                    className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 font-medium rounded uppercase"
                  >{
                    isFormEmpty ? 'Fill the form' : (
                      <div>
                        {loading ? 'Loading...' : 'Submit'}
                      </div>
                    )
                  }
                  </button>
                </div>

              </form>
            </div>
          )}
        </div>
      )}
      <Social />
    </div>
  )
}

export default App
