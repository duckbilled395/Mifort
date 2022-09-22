/* eslint @typescript-eslint/no-use-before-define: 0 */
import React, {useMemo} from "react";
import {observer} from "mobx-react";

import {HelpRounded} from "@material-ui/icons";
import AddProfitTarget from "./AddProfitTarget/AddProfitTarget";
import ProjectFit from "./ProjectFit/ProjectFit";
import ProfitTarget from "./ProfitTarget/ProfitTarget";
import {Switch} from "../../../components";
import {useStore} from "../../context";

import styles from './TakeProfit.module.scss'

const TakeProfit = observer(() => {
  const {
    isTakeProfit,
    profitTargetNumber,
    toggleTakeProfit,
    resetProfitTargetNumberArray,
    setTargetPriceOfProfitTargetState,
    setAmountToSellOfProfitTargetState,
    removeProfitTargetNumber
  } = useStore();

  const removeProfitTarget = (profitTargetId: number) => {
    removeProfitTargetNumber(profitTargetId)
    setTargetPriceOfProfitTargetState(profitTargetId, 0)
    setAmountToSellOfProfitTargetState(profitTargetId, 0)
    return profitTargetItems.splice(profitTargetId, 1)
  }

  const pushItem = (Component: new() => React.Component<any, any, any>, id: number, removeProfitTarget: (id: number) => Array<React.Component>) => {
    if (profitTargetNumber.indexOf(9) !== -1) {
      profitTargetItems.splice(profitTargetNumber.indexOf(9), 0, <Component key={id} profitTargetId={id}
                                                                            removeProfitTarget={removeProfitTarget}/>)
    } else {
      profitTargetItems.push(<Component key={id} profitTargetId={id} removeProfitTarget={removeProfitTarget}/>)
    }
  }

  const profitTargetItems = useMemo(() => {
    return [<ProfitTarget key={0} profitTargetId={0} removeProfitTarget={removeProfitTarget}/>,]
  }, [])

  const handleNumberOfProfitTarget = () => {
    if (profitTargetNumber.length < 5) {
      return profitTargetItems.slice(0, profitTargetNumber.length)
    } else {
      return profitTargetItems.slice(0, 5)
    }
  }

  return (
    <>
      <div className={styles.takeProfitHeader}>
        <HelpRounded className={styles.helpIcon} fontSize={'small'}/>
        <Switch
          checked={isTakeProfit}
          label={'Take Profit'}
          reversed={true}
          fullWidth={true}
          onChange={() => handleChange()}/>
      </div>
      {isTakeProfit &&
        <>
          {handleNumberOfProfitTarget()}
          {(profitTargetNumber.length < 5 || profitTargetNumber.indexOf(9) !== -1) &&
            <AddProfitTarget pushItem={pushItem} removeProfitTarget={removeProfitTarget}/>}
        </>
      }
      <ProjectFit/>
    </>
  );

  function handleChange() {
    if (!isTakeProfit) {
      resetProfitTargetNumberArray()
    }
    toggleTakeProfit(isTakeProfit)
  }
});

export {TakeProfit};
