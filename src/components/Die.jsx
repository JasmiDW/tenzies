/* eslint-disable react/prop-types */
export default function Die({value, isHeld, hold ,id}){
    return (
        <>
            <button onClick={() => hold(id)} className={isHeld ? 'dice-held' : 'dice'}> {value}</button>
        </>
    )

}