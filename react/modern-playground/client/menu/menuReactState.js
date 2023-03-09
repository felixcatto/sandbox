import React, { useState } from 'react';
import cn from 'classnames';
import Submenu from './submenu';
import { sleep } from '../lib/utils';
import s from './styles.module.scss';

const MenuReactState = () => {
  const [menuState, setMenuState] = useState('closed'); // closed, opening, open, closing
  const toggleAction = async () => {
    if (menuState === 'open') {
      setMenuState('closing');
      await sleep(300);
      setMenuState('closed');
    }
    if (menuState === 'closed') {
      setMenuState('opening');
      await sleep(300);
      setMenuState('open');
    }
  };
  const menuClass = cn(s.menu, {
    [s.menu_open]: ['open', 'opening'].includes(menuState),
    [s.menu_closed]: ['closed', 'closing'].includes(menuState),
  });

  console.log(menuState);

  return (
    <div>
      <Submenu />
      <div className={s.menuWrap}>
        <div className={menuClass}></div>
        <div className={s.menuButton} onClick={toggleAction}>
          Toggle
        </div>
      </div>
    </div>
  );
};

export default MenuReactState;
