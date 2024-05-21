import {useEffect, useState} from "react";
import {Call, useStreamVideoClient} from "@stream-io/video-react-sdk";
import {useUser} from "@clerk/nextjs";
import {sort} from "next/dist/build/webpack/loaders/css-loader/src/utils";

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const client = useStreamVideoClient();
    const {user} = useUser();

    useEffect(() => {
        const loadCalls = async () => {
            if (!client || !user?.id) return;
            setIsLoading(true);
            try {
                const {calls} = await client.queryCalls({
                    sort: [{field: 'starts_at',direction: -1}],
                    filter_conditions: {
                        start_at: {$exists: true},
                        $or: [
                            {created_by_user_id: user?.id},
                            {members: { $in: [user?.id]}},
                        ]
                    }
                })
                setCalls(calls);
            }catch (e) {
                console.log(e)
            }finally {
                setIsLoading(false)
            }
        }
        loadCalls();
    }, [client, user?.id]);

    const now = new Date();

    const endedCalls = calls.filter(({ state: {startsAt, endedAt}} : Call) => {return (startsAt && new Date(startsAt) < now || !!endedAt)});
    const upcomingCalls = calls.filter(({state: {startsAt, endedAt}}: Call)=> {return (startsAt && new Date(startsAt) > now)});

    return {endedCalls, upcomingCalls, callRecordings:calls, isLoading}
}