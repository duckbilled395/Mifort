import React, {ChangeEventHandler, useEffect, useState} from 'react';
import {observer} from "mobx-react";

import {createTheme, TextField, ThemeProvider} from "@material-ui/core";
import {InputBaseProps as MUIInputProps} from "@material-ui/core/InputBase/InputBase";
import {InputLabelProps as MUIInputLabelProps} from "@material-ui/core/InputLabel/InputLabel";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import cn from "classnames";
import {QUOTE_CURRENCY} from "../../../constants";
import {useStore} from "../../../context";
import {Tooltip} from 'components/Tooltip/Tooltip';

import styles from './ProfitTarget.module.scss'

type Props = {
  profitTargetId: number,
  removeProfitTarget: (profitTargetId: number ) => Array<JSX.Element>
}

const ProfitTarget = observer(({profitTargetId, removeProfitTarget}: Props) => {

  let {
    profitTargetState,
    price,
    profitTargetNumber,
    targetPrice,
    amountToSell,
    setProfitOfProfitTargetState,
    setTargetPriceOfProfitTargetState,
    setAmountToSellOfProfitTargetState,
  } = useStore()

  type profitErrorType = {
    profitErrorMax: string,
    isProfitErrorMax: boolean,
    profitErrorMin: string,
    isProfitErrorMin: boolean,
  }
  const [profitError, setProfitError] = useState<profitErrorType>({
    profitErrorMax: 'Maximum profit sum is 500%',
    isProfitErrorMax: false,
    profitErrorMin: 'Minimum value is 0.01',
    isProfitErrorMin: false
  })

  type targetPriceType = {
    targetPriceMin: string,
    isTargetPriceMin: boolean,
  }
  const [targetPriceError, setTargetPriceError] = useState<targetPriceType>({
    targetPriceMin: 'Price must be greater than 0',
    isTargetPriceMin: false
  })

  type amountToBuyType = {
    amountToBuy: string,
    isAmountToBuy: boolean,
  }
  type amountToBuyErrorRangeType = {
    first: number,
    second: number
  }
  const [amountToBuyErrorRange, setAmountToBuyErrorRange] = useState<amountToBuyErrorRangeType>({
    first: 0,
    second: 0
  })
  const [amountToBuyError, setAmountToBuyError] = useState<amountToBuyType>({
    amountToBuy: `${amountToBuyErrorRange.first} out of 100% selected. Please decrease by ${amountToBuyErrorRange.second}`,
    isAmountToBuy: false,
  })

  const inputClasses: MUIInputProps["classes"] = {
    root: cn(styles.inputWrapper, {[styles.error]: Boolean(profitError.isProfitErrorMax || profitError.isProfitErrorMin)}),
    focused: cn(styles.inputWrapper, styles.focused),
    adornedEnd: cn(styles.inputWrapper, styles.adornedEnd),
    input: styles.input
  };

  const inputClassesForTargetPrice: MUIInputProps["classes"] = {
    root: cn(styles.inputWrapper, {[styles.error]: Boolean(targetPriceError.isTargetPriceMin)}),
  };

  const inputClassesForAmountToBuy: MUIInputProps["classes"] = {
    root: cn(styles.inputWrapper, {[styles.error]: Boolean(amountToBuyError.isAmountToBuy)}),
  };

  const labelClasses: MUIInputLabelProps["classes"] = {
    root: styles.inputLabel
  };

  const theme = createTheme({
    typography: {
      fontFamily: [
        "sans-serif"
      ].join(",")
    }
  });

  const checkOnNumbers = (value: string) => {
    const isNumbersReg = /^[0-9]+$/gi
    if (isNumbersReg.test(value)) {
      return value
    } else {
      return value.substring(0, value.length - 1)
    }
  }

  useEffect(() => {
    setTargetPriceOfProfitTargetState(profitTargetId, targetPrice[profitTargetId])
  }, [price, profitTargetState[profitTargetId].profit])

  useEffect(() => {
    setAmountToSellOfProfitTargetState(profitTargetId, amountToSell[profitTargetId])
  }, [profitTargetNumber.length])

  const handleOnChangeProfit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = checkOnNumbers(event.target.value)
    if (+value < 0.01) {
      setProfitError((prevState) => ({
        ...prevState,
        isProfitErrorMin: true
      }))
    } else {
      setProfitError((prevState) => ({
        ...prevState,
        isProfitErrorMin: false,
      }))
    }
    setProfitOfProfitTargetState(profitTargetId, value)
  }

  const handleOnBlurProfit = (event: React.FocusEvent<HTMLInputElement>) => {
    let totalValue = 0
    profitTargetState.map(el => {
      totalValue = totalValue + +el.profit
    })
    if (totalValue > 500) {
      setProfitError((prevState) => ({
        ...prevState,
        isProfitErrorMax: true
      }))
    } else {
      setProfitError((prevState) => ({
        ...prevState,
        isProfitErrorMax: false,
      }))
    }
  }

  const handleOnChangeTargetPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = checkOnNumbers(event.target.value)
    if (+value <= 0) {
      setTargetPriceError((prevState) => ({
        ...prevState,
        isTargetPriceMin: true,
      }))
    } else {
      setTargetPriceError((prevState) => ({
        ...prevState,
        isTargetPriceMin: false,
      }))
    }
    setTargetPriceOfProfitTargetState(profitTargetId, value)
  }

  const handleOnChangeAmountToSell = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = checkOnNumbers(event.target.value)
    let totalValue = 0
    profitTargetState.map(el => {
      totalValue = totalValue + +el.amountToSell
    })
    if (totalValue > 100) {
      setAmountToBuyErrorRange(() => ({
        first: totalValue,
        second: totalValue - 100
      }))
    }
    setAmountToSellOfProfitTargetState(profitTargetId, value)
  }

  const handleOnBlurAmountToSell = (event: React.FocusEvent<HTMLInputElement>) => {
    let totalValue = 0
    profitTargetState.map(el => {
      totalValue = totalValue + +el.amountToSell
    })
    console.log(totalValue)
    if (totalValue > 100) {
      setAmountToBuyErrorRange(() => ({
        first: totalValue,
        second: totalValue - 100
      }))
      setAmountToBuyError((prevState) => ({
        ...prevState,
        isAmountToBuy: true
      }))
    } else {
      setAmountToBuyError((prevState) => ({
        ...prevState,
        isAmountToBuy: false,
      }))
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <div className={styles.profitTargetBox}>
        <div className={styles.profitTargetBoxInner}>
          <div className={styles.price}>
            <Tooltip
              open={profitError.isProfitErrorMax || profitError.isProfitErrorMin}
              message={(profitError.isProfitErrorMin && profitError.profitErrorMin) || (profitError.isProfitErrorMax && profitError.profitErrorMax)}
              isError
              placement={'top'}
            >
              <TextField id='profit' variant='standard' value={profitTargetState[profitTargetId].profit} label="Profit"
                         className={styles.root} InputProps={{
                onChange: handleOnChangeProfit,
                onBlur: handleOnBlurProfit,
                endAdornment: '%',
                disableUnderline: true,
                classes: inputClasses
              }} InputLabelProps={{
                classes: labelClasses
              }}/>
            </Tooltip>
          </div>
          <div className={styles.targetPrice}>
            <Tooltip
              open={targetPriceError.isTargetPriceMin}
              message={targetPriceError.isTargetPriceMin && targetPriceError.targetPriceMin}
              isError
              placement={'top'}
            >
              <TextField id='targetPrice' variant='standard' value={profitTargetState[profitTargetId].targetPrice}
                         label="Target price" className={styles.root} InputProps={{
                onChange: handleOnChangeTargetPrice,
                endAdornment: QUOTE_CURRENCY,
                disableUnderline: true,
                classes: {...inputClasses, ...inputClassesForTargetPrice}
              }} InputLabelProps={{
                classes: labelClasses
              }}/>
            </Tooltip>
          </div>
          <div className={styles.amount}>
            <Tooltip
              open={amountToBuyError.isAmountToBuy}
              message={amountToBuyError.isAmountToBuy && amountToBuyError.amountToBuy}
              isError
              placement={'top'}
            >
              <TextField id='amount' variant='standard' value={profitTargetState[profitTargetId].amountToSell}
                         label="Amount to buy" className={styles.root} InputProps={{
                onChange: handleOnChangeAmountToSell,
                onBlur: handleOnBlurAmountToSell,
                endAdornment: '%',
                disableUnderline: true,
                classes: {...inputClasses, ...inputClassesForAmountToBuy}
              }} InputLabelProps={{
                classes: labelClasses
              }}/>
            </Tooltip>
          </div>
        </div>
        <div className={styles.closeIconBox}>
          <IconButton className={styles.closeIconBtn} onClick={() => removeProfitTarget(profitTargetId)}>
            <CancelIcon className={styles.closeIcon}/>
          </IconButton>
        </div>
      </div>
    </ThemeProvider>
  );
});

export default ProfitTarget;
