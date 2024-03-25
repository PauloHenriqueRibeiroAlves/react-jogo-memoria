import * as C from './App.styles';
import { useEffect, useState } from 'react';
import logoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'

import { InfoItem } from './components/infoItem';
import { Button } from './components/Button';
import { GridItem } from './components/GridItem/index';

import { GridItemsType } from './types/GridItemsType';
import { items } from './data/items';
import { formatTimeElepsed } from './helpers/formatTimeElepsed';
//import { clearInterval } from 'timers';



const App = () => {
  //criar toda a logica primeiro
  const [playing, setPlating] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemsType[]>([]);
  // função que vai monitorar quando a página for aberta para começar o jogo
  useEffect(() => resetAndCreatGrid(), []);
//essa função adiciona o numero de jogadas
  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) setTimeElapsed(timeElapsed + 1);
          }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);
//essa função verifica se as cartas que forem viradas são iguais
  useEffect(() => {
    if(showCount === 2) {
      let opened  = gridItems.filter(items => items.show === true)
      if (opened.length === 2) {
        //V1 se as cartas forem iguais, tornalos permanente
        
        if (opened[0].item === opened[1].item){
          let tempgrid = [...gridItems];
           for(let i in tempgrid) {
            if (tempgrid[i].show){
              tempgrid[i].permanentShow === true;
              tempgrid[i].show === false;
            }
            setGridItems(tempgrid);
            setShowCount(0);
          }     
        }else{
          //V2 se as cartas que forem viradas não são igual zerar a contagem de cartas que estão sendo exibidas
          setTimeout(() => {
          let tempgrid = [...gridItems];
          for(let i in tempgrid) {
            tempgrid[i].show = false;
          }
          setGridItems(tempgrid);
          setShowCount(0);
          }, 1000);
        }
        //depois vamos almentar a contagem de movimentos
        setMoveCount(moveCount => moveCount+1);
      }
    }
  }, [showCount, gridItems]);
  //função para verificar se o jogo acabou
  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShow === true)) {
      setPlating(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreatGrid = () => {
    //passo 1 - resetar o jogo
    //setPlating(false);
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);
    //passo 2 - criar o grid
    //2.1 - criar um grid vazio
    let tmpGrid: GridItemsType[] = [];
    for(let i = 0; i < (items.length * 2); i++) tmpGrid.push({
      item: null, show: false, permanentShow: false
    });
    //2.2 preencher o grid
    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < items.length; i++){
        let pos = -1;
        while(pos <0 || tmpGrid[pos].item !== null) {
        pos = Math.floor(Math.random() * (items.length * 2));
      }
        tmpGrid[pos].item = i;
      }
    }

    //2.3 jogar no state
    setGridItems(tmpGrid);
    //passo 3 - começar o jogo
    setPlating(true);
  }

  const hundleItemClick = (index: number) => {
    if(playing && index !== null && showCount < 2) {
      let tempGrid = [...gridItems];
      if(tempGrid[index].permanentShow === false && tempGrid[index].show === false) {
        tempGrid[index].show = true;
        setShowCount(showCount +1);
      }
      setGridItems(tempGrid);
    }
  } 

  return (
    <div>
      <C.container>
        <C.info>
          <C.logoLink>
            <img src={logoImage} width="200" alt=""/>
          </C.logoLink>

          <C.infoArea>
            <InfoItem label="Tempo" value={formatTimeElepsed(timeElapsed)}/>
            <InfoItem label="Movimentos" value={moveCount.toString()}/>
          </C.infoArea>

          <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreatGrid}/>
        </C.info>

        <C.gridArea>
            <C.Grid>
              {gridItems.map((item, index) => (
                <GridItem
                  key={index}
                  item={item}
                  onClick={() => hundleItemClick(index)}
                />
              ))}
            </C.Grid>
        </C.gridArea>
      </C.container>
    </div>
  );
}

export default App;
