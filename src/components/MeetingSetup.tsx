'use client'

import { DeviceSettings, MicrophoneManagerState, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
    const [isMicToggledOn, setIsMicToggledOn] = useState(false)
    const [isCamToggledOn, setIsCamToggledOn] = useState(false)

    const call = useCall()
    if (!call) throw new Error(`useCall must be used within StreamCall component`)
    useEffect(() => {
        if (!isMicToggledOn) {
            call?.microphone.disable();
        } else {
            call?.microphone.enable();
        }
        if (!isCamToggledOn) {
            call?.camera.disable();
        } else {
            call?.camera.enable();
        }
    }, [isMicToggledOn, isCamToggledOn, call?.camera, call?.microphone])
    return (
        <div className='flex h-screen w-full flex-col items-center justify-center gap-4 text-white'>
            <h1 className='text-2xl font-bold'>Setup</h1>
            <VideoPreview />
            <DeviceSettings />
            <div className='flex h-16 items-center justify-between w-[160px]'>
                <label className='flex justify-center items-center gap-2 font-medium w-fit px-2 py-2 rounded-full hover:bg-blue-1 duration-200 cursor-pointer'>
                    <input
                        hidden
                        type="checkbox"
                        checked={isMicToggledOn}
                        onChange={(e) => setIsMicToggledOn(e.target.checked)} />
                    {
                        isMicToggledOn ? <Image src={'/icons/microphone-active.svg'} alt='Microphone active' width={32} height={32} /> :
                            <Image src={'/icons/microphone-unactive.svg'} alt='Microphone active' width={32} height={32} />

                    }
                </label>
                <label className='flex justify-center items-center gap-2 font-medium w-fit px-2 py-2 rounded-full hover:bg-blue-1 duration-200 cursor-pointer'>
                    <input
                        hidden
                        type="checkbox"
                        checked={isCamToggledOn}
                        onChange={(e) => setIsCamToggledOn(e.target.checked)} />
                    {
                        isCamToggledOn ? <Image src={'/icons/camera-active.svg'} alt='Microphone active' width={32} height={32} /> :
                            <Image src={'/icons/camera-unactive.svg'} alt='Microphone active' width={32} height={32} />

                    }
                </label>
            </div>
            <Button className='rounded-md bg-green-500 px-4 py-2.5' onClick={() => {
                call.join();
                setIsSetupComplete(true);
            }}>
                Join meeting
            </Button>
        </div>
    )
}

export default MeetingSetup