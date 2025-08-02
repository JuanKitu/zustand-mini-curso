import {useBearStore} from "../../stores";
import {WhiteCard} from "../shared/cards/WhiteCard.tsx";

export function BearsDisplay() {
    const bears = useBearStore(state => state.bears);
    const addBears = useBearStore(state => state.addBears);
    const clearBears = useBearStore(state => state.clearBears);
    return (
        <WhiteCard>
            <h2>Osos</h2>
            <button className="mt-2" onClick={ addBears }>Agregar Oso</button>
            <button className="mt-2" onClick={ clearBears }>Borrar Osos</button>
            <pre>
                { JSON.stringify(bears, null, 2) }
            </pre>
        </WhiteCard>
    )
}
