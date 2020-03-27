import React from 'react';
import Typography from '@material-ui/core/Typography';

const AboutText: React.FC = () => (
  <>
    <Typography variant="h6" align="center">
      Simulador de Rentabilidade de Investimentos
    </Typography>
    <Typography align="justify">
      O Bitcoin teve o maior preço da história no final de 2017, atraíndo a atenção de
      muitas pessoas e trazendo investidores para o ramo das criptomoedas.
      <br />
      Este simulador demonstra a quantia de rendimento acumulado, considerando a quantia
      e o ativo investido em algum momento do passado.
    </Typography>
  </>
);

export default AboutText;
