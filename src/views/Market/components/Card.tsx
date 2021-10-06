import React, {useState} from "react"
import avatar from 'assets/img/avatar.png'

interface Props {
    index: number
    tokenId: number
    name: string
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
            <img className="card-img" src={`${process.env.REACT_APP_THUMBNAIL_NODE}${Props.tokenId}.png`} />
            <div className="card-label">
                <div className="card-price flex-row frame-vc">
                    <p>{Props.name}</p>
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