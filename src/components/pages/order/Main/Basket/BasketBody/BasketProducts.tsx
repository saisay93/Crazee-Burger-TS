import React from "react";
import styled from "styled-components";
import {
	BASKET_MESSAGE,
	IMAGE_COMING_SOON,
} from "../../../../../../constants/product";
import BasketCard from "./BasketCard";
import { useOrderContext } from "../../../../../../context/OrderContext";
import { findObjectById } from "../../../../../../utils/array";
import { checkIfProductIsClicked } from "../../MainRightSide/Menu/helper";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { basketAnimation } from "../../../../../../theme/animations";
import { formatPrice } from "../../../../../../utils/maths";
import { convertStringToBoolean } from "../../../../../../utils/string";
import { useParams } from "react-router-dom";
import { MenuProduct } from "../../../../../../Types/Product";



export default function BasketProducts() {
	const {username} = useParams()
	const {
		basket,
		isModeAdmin,
		handleDeleteBasketProduct,
		menu,
		handleProductSelected,
		productSelected,
	} = useOrderContext();

	const handleOnDelete = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
		event.stopPropagation();
		if(username === undefined) return
		handleDeleteBasketProduct(id, username);
	};

	return (
		<TransitionGroup
			component={BasketProductsStyled}
			className={"transition-group"}
		>
			<>
				{basket.map((basketProduct) => {
					const menuProduct = findObjectById(basketProduct.id, menu as  MenuProduct[]);

					if (!menuProduct) {
						return null; // Ignore si l'objet n'est pas trouvé
					}

					return (
						<CSSTransition
							appear={true}
							classNames={"animation-basket"}
							key={basketProduct.id}
							timeout={300}
						>
							<div className="card-container">
								<BasketCard
									{...menuProduct}
									imageSource={
										menuProduct.imageSource
											? menuProduct.imageSource
											: IMAGE_COMING_SOON
									}
									quantity={basketProduct.quantity}
									onDelete={(event) => handleOnDelete(event, basketProduct.id)}
									isClickable={isModeAdmin}
									onClick={
										isModeAdmin
											? () => handleProductSelected(basketProduct.id)
											: undefined
									}
									isSelected={checkIfProductIsClicked(
										basketProduct.id,
										productSelected.id
									)}
									className={"card"}
									price={
										convertStringToBoolean(menuProduct.isAvailable)
											? formatPrice(menuProduct.price)
											: BASKET_MESSAGE.NOT_AVAILABLE
									}
									isPublicised={convertStringToBoolean(menuProduct.isPublicised)}
								/>
							</div>
						</CSSTransition>
					);
				})}
			</>
		</TransitionGroup>
	);
}



const BasketProductsStyled = styled.div`
  /* border: 1px solid red; */
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  .card-container {
    /* border: 1px solid blue; */
    margin: 10px 16px;
    height: 86px;
    box-sizing: border-box;
    position: relative;
    :first-child {
      margin-top: 20px;
      /* border: 1px solid red; */
    }
    :last-child {
      margin-bottom: 20px;
    }

    .badge-new {
      position: absolute;
      z-index: 1;
      bottom: 10%;
      left: 21%;
      transform: translateY(-21%);
      transform: translateX(-5%);
    }
  }

  ${basketAnimation}
`;