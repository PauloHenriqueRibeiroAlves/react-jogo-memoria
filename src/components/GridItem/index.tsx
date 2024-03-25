import { GridItemsType } from '../../types/GridItemsType';
import * as C from './style';
import b7 from '../../svgs/b7.svg';
import { items } from '../../data/items'

type Props = {
    item: GridItemsType,
    onClick: () => void
}

export const GridItem = ({ item, onClick }: Props) => {
    return(
        <C.Container 
        showBackground={item.permanentShow || item.show}
            onClick={onClick}
        >
            {item.permanentShow === false && item.show === false &&
                <C.Icon src={b7} alt="" opacity={.1}/>
            }
            {(item.permanentShow || item.show) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt=''/>
            }
        </C.Container>
    );
}