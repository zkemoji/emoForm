import Twitter from '../assets/logo-twitter.svg'

function Social() {
  return (
    <div>
        <div className="fixed bottom-4 right-4 flex flex-col md:flex-row">
            <a href="https://twitter.com/EraEmoji" className="text-2xl flex justify-center items-center bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full p-2 mb-2 md:mb-0 md:mr-2">
                <ion-icon name="logo-twitter" className=''></ion-icon>
            </a>
        </div>
    </div>
  )
}

export default Social