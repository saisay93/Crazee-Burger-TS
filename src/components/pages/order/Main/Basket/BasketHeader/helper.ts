import { BasketProductQuantity, MenuProduct } from "../../../../../../Types/Product"
import { findObjectById } from "../../../../../../utils/array"
import { convertStringToBoolean } from "../../../../../../utils/string"

export const calculateSumToPay = (basket: BasketProductQuantity[], menu: MenuProduct[] | undefined) => {
  if(menu === undefined) return 0
 
  return basket.reduce((total, basketProduct) => {
    const menuProduct = findObjectById(basketProduct.id, menu)

    if(menuProduct === undefined) return total

    if (isNaN(menuProduct.price)) return total

  
    if (convertStringToBoolean(menuProduct.isAvailable) === false) return total


    const subTotal = menuProduct.price * basketProduct.quantity
    total += subTotal
    return total
  }, 0)
}

