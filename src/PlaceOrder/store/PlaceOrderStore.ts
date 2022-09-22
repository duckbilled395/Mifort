import {action, computed, observable} from "mobx";

import {OrderSide} from "../model";

export class PlaceOrderStore {
  @observable activeOrderSide: OrderSide = "buy";
  @observable price: number = 0;
  @observable amount: number = 0;
  @observable isTakeProfit: boolean = false;
  @observable profitTargetNumber: number[] = [0];
  @observable profitTargetState: { profit: string, targetPrice: string | number, amountToSell: string | number }[]
    = [
    {profit: '2', targetPrice: 0, amountToSell: 0},
    {profit: '4', targetPrice: 0, amountToSell: 0},
    {profit: '6', targetPrice: 0, amountToSell: 0},
    {profit: '8', targetPrice: 0, amountToSell: 0},
    {profit: '10', targetPrice: 0, amountToSell: 0},
  ]
  @observable projectedProfit: number | string = 0;

  @computed get total(): number {
    return this.price * this.amount;
  }

  get totalTargetPrice(): number {
    let temp = 0
    this.profitTargetState.map((obj, i) => {
      if (+obj.targetPrice !== 0 && +obj.targetPrice !== 0){
        this.activeOrderSide === 'buy'
          ? temp = temp + (this.amount * (+obj.amountToSell / 100) *  (+obj.targetPrice - this.price))
          : temp = temp + +obj.amountToSell / 100 * (this.price - +obj.targetPrice)
      }
    })
    return temp
  }

  get amountToSell(): number[] {
    let arr: number[] = []
    if (this.profitTargetNumber.length === 1) {
      arr = [100]
    } else if (this.profitTargetNumber.length === 2) {
      arr = [80, 20]
    } else if (this.profitTargetNumber.length === 3) {
      arr = [60, 20, 20]
    } else if (this.profitTargetNumber.length === 4) {
      arr = [40, 20, 20, 20]
    } else {
      arr = [20, 20, 20, 20, 20]
    }
    return arr
  }

  set targetPrice(id: number) {
    this.profitTargetState[id].targetPrice = this.price + this.price * +this.profitTargetState[id].profit / 100
  }

  get targetPrice(): any {
    return [
      this.price + this.price * +this.profitTargetState[0].profit / 100,
      this.price + this.price * +this.profitTargetState[1].profit / 100,
      this.price + this.price * +this.profitTargetState[2].profit / 100,
      this.price + this.price * +this.profitTargetState[3].profit / 100,
      this.price + this.price * +this.profitTargetState[4].profit / 100,
    ];
  }

  @action.bound
  public setOrderSide(side: OrderSide) {
    this.activeOrderSide = side;
  }

  @action.bound
  public setProfitOfProfitTargetState(id: number, value: string) {
    this.profitTargetState[id] = {
      profit: value,
      targetPrice: this.profitTargetState[id].targetPrice,
      amountToSell: this.profitTargetState[id].amountToSell
    }
    console.log(this.profitTargetState)
  }

  @action.bound
  public setTargetPriceOfProfitTargetState(id: number, value: string | number) {
    this.profitTargetState[id] = {
      profit: this.profitTargetState[id].profit,
      targetPrice: value,
      amountToSell: this.profitTargetState[id].amountToSell
    }
  }

  @action.bound
  public setAmountToSellOfProfitTargetState(id: number, value: string | number) {
    this.profitTargetState[id] = {
      profit: this.profitTargetState[id].profit,
      targetPrice: this.profitTargetState[id].targetPrice,
      amountToSell: value
    }
  }

  @action.bound
  public setPrice(price: number) {
    this.price = price;
  }

  @action.bound
  public setAmount(amount: number) {
    this.amount = amount;
  }

  @action.bound
  public setTotal(total: number) {
    this.amount = this.price > 0 ? total / this.price : 0;
  }

  @action.bound
  public toggleTakeProfit(isTakeProfit: boolean) {
    this.isTakeProfit = !isTakeProfit
  }

  @action.bound
  public pushProfitTargetNumber(profitTargetNumber: number[]) {
    if (this.profitTargetNumber.indexOf(9) !== -1) {
      this.profitTargetNumber.splice(this.profitTargetNumber.indexOf(9), 1, this.profitTargetNumber.indexOf(9))
    } else {
      this.profitTargetNumber.push(profitTargetNumber.length)
    }
  }

  @action.bound
  public resetProfitTargetNumberArray() {
    this.profitTargetNumber = this.profitTargetNumber.slice(0, 1)
  }

  @action.bound
  public removeProfitTargetNumber(id: number) {
    this.profitTargetNumber.splice(id, 1, 9)
  }
}
