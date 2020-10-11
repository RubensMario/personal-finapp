import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import './css/transactions.css';
import ArrowButton from './ArrowButton';
import './css/periodSelector.css';

export default function Select({ onChangePeriod, allPeriods, currentPeriod }) {
  const [isFirstPeriod, setIsFirstPeriod] = useState(false);
  const [isLastPeriod, setIsLastPeriod] = useState(false);

  /* Declarar dependência para que o item exibido pelo elemento select 
  seja alterado por ArrownButton.
  Caso contrário, o botão muda o currentPeriod, mas isso não é refletido 
  na exibição do Select */
  useEffect(() => {
    M.AutoInit();
  }, [currentPeriod]);

  useEffect(() => {
    if (!currentPeriod.date) return;

    const isFirstPeriodCheck = (period) => period.id === 1;
    const isLastPeriodCheck = (period) => period.id === allPeriods.length;

    setIsFirstPeriod(isFirstPeriodCheck(currentPeriod));
    setIsLastPeriod(isLastPeriodCheck(currentPeriod));
  }, [currentPeriod, isFirstPeriod, allPeriods]);

  const handleSelectChange = (event) => {
    const selectedPeriod = allPeriods.find(
      (period) => period.id.toString() === event.target.value
    );

    onChangePeriod(selectedPeriod);
  };

  const handleLeftButtonClick = () => {
    const currentPeriodIndex = allPeriods.findIndex(
      (period) => period.id === currentPeriod.id
    );

    onChangePeriod(allPeriods[currentPeriodIndex - 1]);
  };
  const handleRightButtonClick = () => {
    const currentPeriodIndex = allPeriods.findIndex(
      (period) => period.id === currentPeriod.id
    );

    onChangePeriod(allPeriods[currentPeriodIndex + 1]);
  };

  return (
    <div style={styles.flexRowStyle}>
      <ArrowButton
        type="left"
        onButtonClick={handleLeftButtonClick}
        buttonDisabled={isFirstPeriod}
      />
      <div
        className="input-field"
        style={{ width: '15%', alignItems: 'center' }}
      >
        <select
          className="waves-purple"
          value={currentPeriod.id}
          onChange={handleSelectChange}
        >
          {allPeriods.map((period) => {
            const { id, name } = period;
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
      <ArrowButton
        type="right"
        onButtonClick={handleRightButtonClick}
        buttonDisabled={isLastPeriod}
      />
    </div>
  );
}

const styles = {
  flexRowStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centraliza inputs, select, etc (flexbox/*)
    margin: '10px',
    marginTop: '5%',
  },
};

// Fluxo de controle
/* -Select ouve o evento onChange, captura o id que identifica o period escolhido
pelo usuário com o elemento select na tela
  -onChange chama a callback onChangePeriod, passando como argumento o period
de mesmo id que aquele escolhido no select (revelado com event.target.value)
  -Em app, onChangePeriod chama handlePeriodChange, que atualiza o período atual
que será o period passado como argumento em onChangePeriod */
