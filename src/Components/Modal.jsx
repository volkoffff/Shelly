import { useState } from "react"

export function Modal() {

    const [modalState, setModaState] = useState(false)

    const toggleModal = () => {
        setModaState(!modalState)
    } 


    return (<>
    <div onClick={toggleModal} className='w-44 h-56 cursor-pointer border-[3px] border-dashed border-slate-200/80 hover:border-slate-300/70 rounded-xl flex flex-col items-center justify-center text-slate-400'>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" t="1551322312294" viewBox="0 0 1024 1024" version="1.1" pid="10297" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" pid="10298"></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z" pid="10299"></path></svg>
        <p>Ajouter un appareil</p>
    </div>
    { modalState &&
    <div className="fixed left-0 top-0 w-full h-full z-20 flex justify-center items-center">
        <div className="w-full h-full bg-slate-900/20 backdrop-blur-md absolute"></div>
        <div className="max-w-[380px] bg-white z-30 rounded-2xl shadow-lg flex flex-col pop-animation2">
            <div className="p-4">
                <div className="flex justify-center items-center rounded-full bg-blue-400/20 p-2 w-fit h-fit">
                    <div className="flex justify-center items-center rounded-full bg-blue-400/30 p-2">
                    <svg className="text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6H12.01M6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2ZM16 14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14C8 11.7909 9.79086 10 12 10C14.2091 10 16 11.7909 16 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                </div>
            </div>
            <div className="px-4 mb-8">
                <p className="font-semibold text-xl text-slate-800">Ajouter un appareil</p>
                <p className="text-slate-400 mt-1">vous pourez modifié plus tard les informations que vous avez renseigné</p>
            </div>
            <div className="flex-1 px-4 flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="deviceId" className="text-slate-700 font-semibold">Id du device</label>
                    <input type="text" id="deviceId" name="deviceId" className="border-2 border-slate-300 shadow-xs h-10 rounded-lg pl-2.5" placeholder="405e14d5rve8"/>
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="authKey" className="text-slate-700 font-semibold">Clef d'authentification</label>
                    <input type="text" id="authKey" name="authKey" className="border-2 border-slate-300 shadow-xs h-10 rounded-lg pl-2.5" placeholder="ZOEKOKFSOFEP"/>
                </div>
            </div>

            <div className="flex gap-2 px-4 pb-4 mt-8">
                <button onClick={toggleModal} className="rounded-xl text-slate-800 hover:bg-slate-100 py-2 w-full">Cancel</button>
                <button onClick={toggleModal} className="rounded-xl bg-blue-500 hover:bg-blue-600/80 text-slate-50 py-2 w-full">Save</button>
            </div>
        </div>
    </div>
    }

    </>)
}