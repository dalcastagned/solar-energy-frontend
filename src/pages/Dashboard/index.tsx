import { useCallback, useEffect, useState } from 'react';

import { AlertProps, CircularProgress, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { GenerationPower } from 'models/generations';
import { PlantCounts } from 'models/plants';
import { Line } from 'react-chartjs-2';
import api from 'services/api';
import { handleErrorResponse } from 'utils/error-response';

import * as S from './styles';

type ShowAlertProps = AlertProps & {
  message: string;
};

const Dashboard = (): JSX.Element => {
  const [counts, setCounts] = useState<PlantCounts>();
  const [monthsGenerations, setMonthsGenerations] = useState<GenerationPower[]>(
    [],
  );
  const [alertProps, setAlertProps] = useState<ShowAlertProps>({
    severity: 'success',
    message: '',
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const data = {
    labels: monthsGenerations.map(
      (generation: GenerationPower) => generation.month,
    ),
    datasets: [
      {
        label: 'Geração',
        data: monthsGenerations.map(
          (generation: GenerationPower) => generation.generation,
        ),
        borderColor: '#2196F3',
        backgroundColor: '#2196F3',
      },
    ],
  };

  const getCounts = useCallback(async () => {
    setAlertProps({
      severity: 'info',
      message: '',
    });
    const response = await api.get<PlantCounts>('/plant/counts');
    setCounts(response.data);
  }, []);

  const getGenerations = useCallback(async () => {
    setAlertProps({
      severity: 'info',
      message: '',
    });
    const response = await api.get<GenerationPower[]>(
      '/plant/generations-last-12-months',
    );
    setMonthsGenerations(response.data);
  }, []);

  useEffect(() => {
    getCounts().catch(e =>
      setAlertProps({ severity: 'error', message: handleErrorResponse(e) }),
    );
    getGenerations().catch(e =>
      setAlertProps({ severity: 'error', message: handleErrorResponse(e) }),
    );
  }, [getCounts, getGenerations]);

  return (
    <>
      {!monthsGenerations.length && !counts ? (
        <S.Loading>
          <CircularProgress />
        </S.Loading>
      ) : null}
      {alertProps.message.length ? (
        <S.AlertStyled severity={alertProps.severity}>
          {alertProps.message}
        </S.AlertStyled>
      ) : null}
      {monthsGenerations.length && counts && !alertProps.message.length ? (
        <S.Wrapper>
          <S.ContainerCards>
            <S.Card elevation={2}>
              <Typography variant="h2">Total de Unidades</Typography>
              <p>{counts && counts?.activePlants + counts?.inactivePlants}</p>
            </S.Card>
            <S.Card elevation={2}>
              <Typography variant="h2">Unidades Ativas</Typography>
              <p>{counts?.activePlants}</p>
            </S.Card>
            <S.Card elevation={2}>
              <Typography variant="h2">Unidades Inativas</Typography>
              <p>{counts?.inactivePlants}</p>
            </S.Card>
            <S.Card elevation={2}>
              <Typography variant="h2">Média de Energia</Typography>
              <p>
                {(
                  monthsGenerations.reduce(
                    (acc, curr) => acc + curr.generation,
                    0,
                  ) / 12
                ).toFixed(2)}
                <span>kW</span>
              </p>
            </S.Card>
          </S.ContainerCards>
          <S.ContainerChart>
            <Typography variant="h1">
              Total de energia gerada por mês
            </Typography>
            <Line options={options} data={data} />
          </S.ContainerChart>
        </S.Wrapper>
      ) : null}
    </>
  );
};

export default Dashboard;
