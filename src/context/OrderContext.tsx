import { PropsWithChildren, createContext, useContext, useRef, useState } from "react"
import { findObjectById } from "../utils/array";
import {useMenu} from "../hooks/useMenu"
import {useBasket} from "../hooks/useBasket"
import { EMPTY_PRODUCT } from "../constants/product";
import { ADMIN_TAB_LABEL } from "../constants/tab";
import { BasketProductQuantity, MenuProduct } from "../Types/Product";

type OrderContextType = {
isModeAdmin: boolean,
setIsModeAdmin: React.Dispatch<React.SetStateAction<boolean>>,
isCollapsed: boolean,
setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
currentTabSelected: ADMIN_TAB_LABEL,
setCurrentTabSelected: React.Dispatch<React.SetStateAction<ADMIN_TAB_LABEL>>,
menu:  MenuProduct[] | undefined,
setMenu: React.Dispatch<React.SetStateAction<MenuProduct[] | undefined>>,
handleAdd: (newProduct: MenuProduct, username: string) => void,
handleDelete: (idOfProductToDelete: string, username: string) => void,
resetMenu: (username: string) => void,
newProduct: MenuProduct,
setNewProduct: React.Dispatch<React.SetStateAction<MenuProduct>>,
productSelected: MenuProduct,
setProductSelected: React.Dispatch<React.SetStateAction<MenuProduct>>,
handleEdit: (productBeingEdited: MenuProduct, username: string) => void,
titleEditRef: React.RefObject<HTMLInputElement>,
basket: BasketProductQuantity[],
setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>,
handleAddToBasket: (idProductToAdd: string, username: string) => void,
handleDeleteBasketProduct: (idBasketProduct: string, username: string) => void,
handleProductSelected: (idProductClicked: string) => Promise<void>,
}

// 1. Creation du context

 const OrderContext = createContext<OrderContextType | null>(null)

// 2. Installation du context

export const OrderContextProvider = ({children}: PropsWithChildren) => {

  const [isModeAdmin, setIsModeAdmin] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [currentTabSelected, setCurrentTabSelected] = useState<ADMIN_TAB_LABEL>(ADMIN_TAB_LABEL.ADD);
	const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT);
	const [productSelected, setProductSelected] = useState(EMPTY_PRODUCT);
	const titleEditRef = useRef<HTMLInputElement>(null);
	const { menu, setMenu, handleAdd, handleDelete, handleEdit, resetMenu } =
		useMenu();
	const { basket, setBasket, handleAddToBasket, handleDeleteBasketProduct } =
		useBasket();

	const handleProductSelected = async (idProductClicked: string) => {
		if(!menu) return
		const productClickedOn = findObjectById(idProductClicked, menu);
		if(!productClickedOn) return
		await setIsCollapsed(false);
		await setCurrentTabSelected(ADMIN_TAB_LABEL.EDIT);
		await setProductSelected(productClickedOn);
		titleEditRef.current?.focus();
	};

  const orderContextValue = {
		isModeAdmin,
		setIsModeAdmin,
		isCollapsed,
		setIsCollapsed,
		currentTabSelected,
		setCurrentTabSelected,
		menu,
		setMenu,
		handleAdd,
		handleDelete,
		resetMenu,
		newProduct,
		setNewProduct,
		productSelected,
		setProductSelected,
		handleEdit,
		titleEditRef,
		basket,
		setBasket,
		handleAddToBasket,
		handleDeleteBasketProduct,
		handleProductSelected,
	}


  return (
    <OrderContext.Provider value={orderContextValue}>
      {children}
    </OrderContext.Provider>
  )
  
}

// 3. Consommation du context

export const useOrderContext = () => useContext(OrderContext)