import React from 'react'
import {ReactComponent as Arrow} from 'assets/img/arrow.svg'
import Badge from '../badge'

interface DropMenuItem {
    content: string
    label: string
    href: string
}

interface Props {
    text: string
    menuData: Array<DropMenuItem>
}

const SubMenu: React.FC<Props> = (props) => {
    return (
        <div className="dropdown">
            <button type="button" className="menu-item hd-100">{props.text}<Arrow /></button>
            <div className="dropdown-content">
            {
                props.menuData.map((menu, index) => {
                    return (<a href={menu.href} className="flex-row r-flex-row">{menu.content} 
                    {menu.label === '' ? '' : (<Badge type="danger" content={menu.label}/>)}
                    </a>)
                })
            }
            </div>
        </div>
    )
}

export default SubMenu

