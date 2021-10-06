import React, {useState} from "react"
import avatar from 'assets/img/avatar.png'

interface Props {
    index: number
    color: string
    tokenId: string
    price: number 
    onClick: (index: number) => void
}


const Card: React.FC<Props> = (Props) => {
    const [mouseMoved, setMouseMoved] = useState(false)

    const handleClick = () => {
        if (mouseMoved === false) {
            Props.onClick(Props.index)
        }
    }
    return (
        <div className="card" onMouseMove={() => setMouseMoved(true)} onMouseDown={() => setMouseMoved(false)} onMouseUp={handleClick}  >
            <div className="card-img" style={{ background: Props.color }} />
            <div className="card-label">
                <div className="card-price flex-row frame-vc">
                    <p>Skin #{Props.tokenId}</p>
                    <div className="card-price flex-row right">
                        <img className="mr-5" src={avatar} alt="avatar" style={{width: '20px', height: '20px'}}/>
                        <p>{Props.price}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card