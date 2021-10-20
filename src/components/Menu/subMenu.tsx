import React from 'react'
import { useGlobalState } from 'state-pool'
import { ReactComponent as Arrow } from 'assets/img/arrow.svg'
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

  /* eslint-disable */

  const [hiddenMenu, setHiddenMenu] = useGlobalState('hiddenMenu')

  /* eslint-enable */

  const onClickMenu = () => {
    setHiddenMenu('hidden-menu')
  }

  return (
    <div className="dropdown">
      <button type="button" className="menu-item hd-100">
        {props.text}
        <Arrow />
      </button>
      <div className="dropdown-content">
        {props.menuData.map((menu, index) => {
          return (
            <a key={index} href={menu.href} onClick={onClickMenu} className="flex-row r-flex-row">
              <p style={{ marginTop: 'auto', marginBottom: 'auto' }}> 
                {menu.content} 
              </p>
              {menu.label === '' ? '' : <Badge type="danger" content={menu.label} />}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default SubMenu
