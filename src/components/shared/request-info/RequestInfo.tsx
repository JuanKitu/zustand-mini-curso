import {useEffect, useState} from "react";
import {tesloApi} from "../../../api/teslo.api.ts";

export function RequestInfo() {
    const [requestInfo, setRequestInfo] = useState<unknown>();
    useEffect(() => {
        tesloApi.get('/auth/private').then(resp => {
            setRequestInfo(resp.data);
        }).catch(()=> setRequestInfo('error'))
    }, [])
    return (
        <>
            <h2>Info</h2>
            <pre>{ JSON.stringify(requestInfo, null, 2) }</pre>
        </>
    )
}
