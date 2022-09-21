import React from 'react';
import {observer} from "mobx-react";

import {AddRounded} from '@material-ui/icons';
import ProfitTarget from "../ProfitTarget/ProfitTarget";
import {useStore} from "../../../context";

import styles from './AddProfitTarget.module.scss'

const AddProfitTarget = observer(({pushItem, removeProfitTarget}: any) => {
  let {
    profitTargetNumber,
    pushProfitTargetNumber,
  } = useStore();

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (profitTargetNumber.length < 5) {
      if (profitTargetNumber.indexOf(9) !== -1) {
        pushItem(ProfitTarget, profitTargetNumber.indexOf(9), removeProfitTarget)
        pushProfitTargetNumber(profitTargetNumber)
      } else {
        pushProfitTargetNumber(profitTargetNumber)
        pushItem(ProfitTarget, profitTargetNumber.length - 1, removeProfitTarget)
      }
    }
  }

  const amount = profitTargetNumber.map((el, i) => {
    if (el < 9) {
      return i
    }
  }).filter(el => typeof el === 'number').length


  return (
    <div className={styles.addProfitTarget}>
      <div className={styles.inner}>
        <button className={styles.button} onClick={e => handleOnClick(e)}>
          <AddRounded className={styles.circle}/>
          <p className={styles.text}>Add profit target {amount} / 5</p>
        </button>
      </div>
    </div>
  );
});

export default AddProfitTarget;