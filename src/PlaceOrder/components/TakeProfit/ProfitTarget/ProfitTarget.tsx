import React from 'react';

import styles from './ProfitTarget.module.scss'
import {TextField} from "@material-ui/core";
import {InputBaseProps as MUIInputProps} from "@material-ui/core/InputBase/InputBase";
import cn from "classnames";
import {InputLabelProps as MUIInputLabelProps} from "@material-ui/core/InputLabel/InputLabel";
import {QUOTE_CURRENCY} from "../../../constants";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";

const ProfitTarget = () => {
  const error = false
  const inputClasses: MUIInputProps["classes"] = {
    root: cn(styles.inputWrapper, {[styles.error]: Boolean(error)}),
    focused: cn(styles.inputWrapper, styles.focused),
    adornedEnd: cn(styles.inputWrapper, styles.adornedEnd),
    adornedStart: cn(styles.inputWrapper, styles.adornedStart),
    input: styles.input
  };

  const labelClasses: MUIInputLabelProps["classes"] = {
    root: styles.inputLabel
  };

  return (
    <div className={styles.profitTargetBox}>
      <div className={styles.price}>
        <TextField id='price' variant='standard' value={'2'} label="Profit" InputProps={{
          // ...InputProps,
          // onFocus: handleFocus,
          // onBlur: handleBlur,
          endAdornment: '%',
          disableUnderline: true,
          classes: inputClasses
        }} InputLabelProps={{
          classes: labelClasses
        }}/>
      </div>
      <div className={styles.targetPrice}>
        <TextField id='targetPrice' variant='standard' value={'0'} label="Target price" InputProps={{
          // ...InputProps,
          // onFocus: handleFocus,
          // onBlur: handleBlur,
          endAdornment: QUOTE_CURRENCY,
          disableUnderline: true,
          classes: inputClasses
        }} InputLabelProps={{
          classes: labelClasses
        }}/>
      </div>
      <div className={styles.amount}>
        <TextField id='amount' variant='standard' value={'100'} label="Amount to buy" InputProps={{
          // ...InputProps,
          // onFocus: handleFocus,
          // onBlur: handleBlur,
          endAdornment: '%',
          disableUnderline: true,
          classes: inputClasses
        }} InputLabelProps={{
          classes: labelClasses
        }}/>
      </div>
      <div className={styles.closeIconBox}>
        <IconButton className={styles.closeIconBtn}>
          <CancelIcon className={styles.closeIcon}/>
        </IconButton>
      </div>
    </div>
  );
};

export default ProfitTarget;