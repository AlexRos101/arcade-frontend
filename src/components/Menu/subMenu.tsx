import React from 'react'
import {ReactComponent as Arrow} from 'assets/img/arrow.svg'
import Badge from '../badge'

interface Props {
    text: string
}

const SubMenu: React.FC<Props> = (props) => {
    return (
        <div className="dropdown">
            <button type="button" className="menu-item hd-100">{props.text}<Arrow /></button>
            <div className="dropdown-content">
                <a href="#">ArcadeDoge Skins</a>
                <a href="#">Arcade Maps</a>
                <a href="#" className="flex-row">Weapons <Badge type="danger" content="Hot Releases"/></a>
            </div>
        </div>
    )
}

export default SubMenu

