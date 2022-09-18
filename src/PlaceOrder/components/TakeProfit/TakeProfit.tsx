/* eslint @typescript-eslint/no-use-before-define: 0 */
import React from "react";

import "./TakeProfit.module.scss";
import {Switch} from "../../../components";
import {useStore} from "../../context";
import {observer} from "mobx-react";
import {HelpRounded} from "@material-ui/icons";
import styles from './TakeProfit.module.scss'
import ProfitTarget from "./ProfitTarget/ProfitTarget";
import {Tooltip} from "../../../components/Tooltip/Tooltip";
import cn from "classnames";

import {InputBaseProps as MUIInputProps, InputLabelProps as MUIInputLabelProps, TextField} from "@material-ui/core";
import {QUOTE_CURRENCY} from "../../constants";

const TakeProfit = observer(() => {
  const {
    isTakeProfit,

    toggleTakeProfit
  } = useStore();
  console.log(isTakeProfit)
const error = 'aasdas'
  const inputClasses: MUIInputProps["classes"] = {
    root: cn(styles.inputWrapper, { [styles.error]: Boolean(error) }),
    focused: cn(styles.inputWrapper, styles.focused),
    adornedEnd: cn(styles.inputWrapper, styles.adornedEnd),
    adornedStart: cn(styles.inputWrapper, styles.adornedStart),
    input: styles.input
  };

  const labelClasses: MUIInputLabelProps["classes"] = {
    root: styles.inputLabel
  };

  return (
    <>
      <div className={styles.takeProfitHeader}>
        <HelpRounded className={styles.helpIcon} fontSize={'small'}/>
        <Switch
          checked={isTakeProfit}
          label={'Take Profit'}
          reversed={true}
          fullWidth={true}
          onChange={() => toggleTakeProfit(isTakeProfit)}/>

      </div>
      <ProfitTarget/>
      <ProfitTarget/>
    </>
  );

  function handleChange() {
    toggleTakeProfit(isTakeProfit)
  }
});

export {TakeProfit};
