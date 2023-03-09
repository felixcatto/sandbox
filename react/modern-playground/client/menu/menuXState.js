import React from 'react';
import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import cn from 'classnames';
import Submenu from './submenu';
import { sleep } from '../lib/utils';
import s from './styles.module.scss';

const menuMachine = createMachine({
  initial: 'closed',
  states: {
    closed: {
      on: { TOGGLE: 'opening' },
    },
    opening: {
      invoke: {
        src: () => sleep(300),
        onDone: { target: 'open' },
      },
    },
    open: {
      on: { TOGGLE: 'closing' },
    },
    closing: {
      invoke: {
        src: () => sleep(300),
        onDone: { target: 'closed' },
      },
    },
  },
});

const MenuXState = () => {
  const [state, send] = useMachine(menuMachine);
  const toggleAction = () => send('TOGGLE');
  const menuClass = cn(s.menu, {
    [s.menu_open]: ['open', 'opening'].some(state.matches),
    [s.menu_closed]: ['closed', 'closing'].some(state.matches),
  });

  console.log(state.value);

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

export default MenuXState;
