'use client'
import Loader from "@/components/Loader";
import MeetingTypeList from "@/components/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";
import dayjs from "dayjs";

const Home = () => {
    const now = new Date();

    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString('en-US', { dateStyle: 'full' })

    const {
        upcomingCalls,
        isLoading
    } = useGetCalls();

    const UpcomingCallLatest = upcomingCalls.sort((a, b) => {
        const startTimeA = dayjs(a.state.startsAt);
        const startTimeB = dayjs(b.state.startsAt);
        return startTimeA.diff(startTimeB);
    });
    if (isLoading) return <Loader />
    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
                <div className="flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
                    {
                        UpcomingCallLatest.length > 0 ? <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">Upcoming Meeting at: {dayjs(UpcomingCallLatest[0].state.startsAt).format('HH:mm A')}</h2> :
                            <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">No upcoming meetings</h2>
                    }
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
                        <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
                    </div>
                </div>
            </div>
            <MeetingTypeList />
        </section>
    )
}

export default Home