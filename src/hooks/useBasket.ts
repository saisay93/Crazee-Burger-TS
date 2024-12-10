import { useState } from "react"
import { deepClone, findObjectById, findIndexById, removeObjectById } from "../utils/array"
import { setLocalStorage } from "../utils/window"

type BasketProduct = {
  id: ID, 
  imageSource?: string, 
  isAvailable?: boolean, 
  isPublicised?: boolean, 
  price?: number, 
  quantity: number, 
  title?: string
}

type setBasketType = React.Dispatch<React.SetStateAction<BasketProduct[]>>

type ID = string | number

export const useBasket = () => {
  const [basket, setBasket] = useState<BasketProduct[]>([])

  const handleAddToBasket = (idProductToAdd: ID, username: string) => {
    const basketCopy = deepClone(basket)
    const productAlreadyInBasket = findObjectById(idProductToAdd, basketCopy)

    if (productAlreadyInBasket) {
      incrementProductAlreadyInBasket(idProductToAdd, basketCopy, username)
      return
    }

    createNewBasketProduct(idProductToAdd, basketCopy, setBasket, username)
  }

  const incrementProductAlreadyInBasket = (idProductToAdd: ID, basketCopy: BasketProduct[], username: string) => {
    const indexOfBasketProductToIncrement = findIndexById(idProductToAdd, basketCopy)
    basketCopy[indexOfBasketProductToIncrement].quantity += 1
    setBasket(basketCopy)
    setLocalStorage(username, basketCopy)
  }

  const createNewBasketProduct = (idProductToAdd: ID, basketCopy: BasketProduct[], setBasket: setBasketType, username: string) => {
    // we do not re-create a whole product, we only add the extra info a basket product has in comparison to a menu product
    const newBasketProduct = { id: idProductToAdd, quantity: 1 }
    const newBasket = [newBasketProduct, ...basketCopy]
    setBasket(newBasket)
    setLocalStorage(username, newBasket)
  }

  const handleDeleteBasketProduct = (idBasketProduct:ID, username: string) => {
    const basketUpdated = removeObjectById(idBasketProduct, basket)
    setBasket(basketUpdated)
    setLocalStorage(username, basketUpdated)
  }

  return { basket, setBasket, handleAddToBasket, handleDeleteBasketProduct }
}
