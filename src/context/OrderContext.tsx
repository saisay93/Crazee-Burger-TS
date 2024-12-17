import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from "react"
import { findObjectById } from "../utils/array";
import {useMenu} from "../hooks/useMenu"
import {useBasket} from "../hooks/useBasket"
import { useParams } from "react-router-dom";
import { EMPTY_PRODUCT } from "../constants/product";
import { ADMIN_TAB_LABEL } from "../constants/tab";
//@ts-ignore
import { initialiseUserSession } from "../components/pages/order/helpers/initialiseUserSession";

// 1. Creation du context

 const OrderContext = createContext({
  username: "",
  isModeAdmin: false,
  setIsModeAdmin: () => {},

  isCollapsed: false,
  setIsCollapsed: () => {},

  currentTabSelected: false,
  setCurrentTabSelected: () => {},

  menu: [],
  handleAdd: () => {},
  handleDelete: () => {},
  handleEdit: () => {},
  resetMenu: () => {},

  newProduct: {},
  setNewProduct: () => {},

  productSelected: {},
  setProductSelected: () => {},
  handleProductSelected: () => {},

  titleEditRef: {},

  basket: [],
  handleAddToBasket: () => {},
  handleDeleteBasketProduct: () => {},
})

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
	const { username } = useParams();

	const handleProductSelected = async (idProductClicked: string) => {
		if(!menu) return
		const productClickedOn = findObjectById(idProductClicked, menu);
		if(!productClickedOn) return
		await setIsCollapsed(false);
		await setCurrentTabSelected(ADMIN_TAB_LABEL.EDIT);
		await setProductSelected(productClickedOn);
		titleEditRef.current?.focus();
	};

	useEffect(() => {
		initialiseUserSession(username, setMenu, setBasket);
	}, []);

  const orderContextValue = {
		username,
		isModeAdmin,
		setIsModeAdmin,
		isCollapsed,
		setIsCollapsed,
		currentTabSelected,
		setCurrentTabSelected,
		menu,
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