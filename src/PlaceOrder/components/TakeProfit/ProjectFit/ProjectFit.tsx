import React from 'react';
import {observer} from "mobx-react";

import {useStore} from "../../../context";

import styles from './ProjectFit.module.scss'

const ProjectFit = observer(() => {
  let {
    totalTargetPrice,
  } = useStore()
  return (
    <div className={styles.projectFit}>
      <p className={styles.text}>Project profit</p>
      <p className={styles.text}><span className={styles.price}>{totalTargetPrice}</span> USDT</p>
    </div>
  );
});

export default ProjectFit;
