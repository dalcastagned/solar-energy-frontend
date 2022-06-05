import { useCallback, useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import {
  AlertProps,
  CardContent,
  CircularProgress,
  IconButton,
  Pagination,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import { ReadGenerations } from 'models/generations';
import moment from 'moment';
import AddGenerationModal from 'pages/modals/AddGeneration';
import UpdateGenerationModal from 'pages/modals/UpdateGeneration';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from 'services/api';
import { handleErrorResponse } from 'utils/error-response';
import { notify } from 'utils/toast-notification';
import * as Yup from 'yup';

import * as S from './styles';

import 'moment/locale/pt-br';

const validationSchema = Yup.object({
  initialDate: Yup.date().nullable(),
  finalDate: Yup.date().nullable(),
});

const Cols = [
  { id: 1, name: 'ID' },
  { id: 2, name: 'Data' },
  { id: 3, name: 'Geração' },
  { id: 7, name: '' },
  { id: 8, name: '' },
];

type ShowAlertProps = AlertProps & {
  message: string;
};

const ListGenerations = (): JSX.Element => {
  const [generations, setGenerations] = useState<ReadGenerations>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialDate, setInitialDate] = useState<Date | null>();
  const [finalDate, setFinalDate] = useState<Date | null>();
  const [updateGenerationId, setUpdateGenerationId] = useState(0);
  const [openAddGenerationModal, setOpenAddGenerationModal] = useState(false);
  const [openUpdateGenerationModal, setOpenUpdateGenerationModal] =
    useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [alertProps, setAlertProps] = useState<ShowAlertProps>({
    severity: 'success',
    message: '',
  });
  const location = useLocation();

  const getGenerations = useCallback(async () => {
    setAlertProps({
      severity: 'info',
      message: '',
    });
    const response = await api.get<ReadGenerations>(
      `/plant/${location.state?.id}/generation?page=${page}&limit=8&startDate=${
        initialDate ? moment(initialDate).format('YYYY-MM-DD') : ''
      }&endDate=${finalDate ? moment(finalDate).format('YYYY-MM-DD') : ''}`,
    );
    setLoading(false);
    !response.data.generations.length &&
      setAlertProps({
        severity: 'info',
        message: 'Nenhuma geração cadastrada',
      });
    setGenerations(response.data);
    setUpdateTable(false);
  }, [page, location.state?.id, initialDate, finalDate]);

  const removeGeneration = useCallback(
    async (id: number): Promise<void> => {
      const removeToast = toast.loading('Removendo...');
      try {
        await api.delete<ReadGenerations>(
          `/plant/${location.state?.id}/generation/${id}`,
        );
        notify(removeToast, {
          message: 'Geração removida com sucesso',
          type: 'success',
        });
        getGenerations().catch(e =>
          setAlertProps({ severity: 'error', message: handleErrorResponse(e) }),
        );
      } catch (e) {
        notify(removeToast, {
          message: handleErrorResponse(e),
          type: 'error',
        });
      }
    },
    [getGenerations, location.state?.id],
  );

  const handleEdit = (id: number): void => {
    setUpdateGenerationId(id);
    setOpenUpdateGenerationModal(true);
  };

  const formik = useFormik({
    initialValues: {
      initialDate: null,
      finalDate: null,
    },
    validationSchema,
    onSubmit: values => {
      setInitialDate(values.initialDate);
      setFinalDate(values.finalDate);
    },
  });

  useEffect(() => {
    getGenerations().catch(e =>
      setAlertProps({ severity: 'error', message: handleErrorResponse(e) }),
    );
  }, [getGenerations, page, loading, updateTable]);

  return (
    <>
      {!alertProps.message.length && !generations?.generations.length ? (
        <S.Loading>
          <CircularProgress />
        </S.Loading>
      ) : (
        <S.Wrapper>
          <S.Form
            onSubmit={e => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="Data Inicial"
                inputFormat="DD/MM/yyyy"
                value={formik.values.initialDate}
                onChange={value => {
                  formik.setFieldValue('initialDate', value);
                }}
                renderInput={params => (
                  <S.TextFieldStyled
                    {...params}
                    error={
                      formik.touched.initialDate &&
                      Boolean(formik.errors.initialDate)
                    }
                  />
                )}
              />
              <DesktopDatePicker
                label="Data Final"
                inputFormat="DD/MM/yyyy"
                value={formik.values.finalDate}
                onChange={value => {
                  formik.setFieldValue('finalDate', value);
                }}
                renderInput={params => (
                  <S.TextFieldStyled
                    {...params}
                    error={
                      formik.touched.finalDate &&
                      Boolean(formik.errors.finalDate)
                    }
                  />
                )}
              />
            </LocalizationProvider>
            <S.ButtonSearch type="submit" onClick={() => setLoading(true)}>
              {loading ? <CircularProgress color="inherit" /> : 'Pesquisar'}
            </S.ButtonSearch>
          </S.Form>
          {alertProps.message.length ? (
            <S.AlertStyled severity={alertProps.severity}>
              {alertProps.message}
            </S.AlertStyled>
          ) : null}
          {generations?.generations.length ? (
            <>
              <S.ContainerTable>
                <TableContainer component={Paper}>
                  <Table size="medium" aria-label="a dense table">
                    <S.TableHeadStyled>
                      <TableRow>
                        {Cols.map(col => (
                          <S.TableCellTopStyled key={col.id}>
                            {col.name}
                          </S.TableCellTopStyled>
                        ))}
                      </TableRow>
                    </S.TableHeadStyled>
                    <TableBody>
                      {generations?.generations.map(generation => (
                        <S.TableRowStyled key={generation.id}>
                          <S.TableCellBodyStyled width={50}>
                            {generation.id}
                          </S.TableCellBodyStyled>
                          <S.TableCellBodyStyled>
                            {moment(generation.date).format(
                              'D [de] MMMM, YYYY',
                            )}
                          </S.TableCellBodyStyled>
                          <S.TableCellBodyStyled>
                            {generation.generatePower} kw
                          </S.TableCellBodyStyled>
                          <TableCell width={80}>
                            <S.ButtonEdit
                              onClick={() => handleEdit(generation.id)}
                            >
                              Editar
                            </S.ButtonEdit>
                          </TableCell>
                          <TableCell width={110}>
                            <S.ButtonRemove
                              onClick={() => removeGeneration(generation.id)}
                            >
                              Remover
                            </S.ButtonRemove>
                          </TableCell>
                        </S.TableRowStyled>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </S.ContainerTable>
              <S.ContainerCard>
                {generations?.generations.map(generation => (
                  <S.CardStyled key={generation.id}>
                    <CardContent>
                      <S.BoxStyled>
                        <Typography variant="h4">Id:</Typography>
                        <Typography variant="h4">{generation.id}</Typography>
                      </S.BoxStyled>
                      <S.BoxStyled>
                        <Typography variant="h4">Data:</Typography>
                        <Typography variant="h4">
                          {moment(generation.date).format('D [de] MMMM, YYYY')}
                        </Typography>
                      </S.BoxStyled>
                      <S.BoxStyled>
                        <Typography variant="h4">Geração:</Typography>
                        <Typography variant="h4">
                          {generation.generatePower} kw
                        </Typography>
                      </S.BoxStyled>
                    </CardContent>
                    <S.CardActionsStyled>
                      <S.ButtonEditStyled
                        onClick={() => handleEdit(generation.id)}
                      >
                        <EditIcon />
                      </S.ButtonEditStyled>
                      <S.ButtonRemoveStyled
                        onClick={() => removeGeneration(generation.id)}
                      >
                        <DeleteIcon />
                      </S.ButtonRemoveStyled>
                    </S.CardActionsStyled>
                  </S.CardStyled>
                ))}
              </S.ContainerCard>
            </>
          ) : null}
          {generations?.generations.length ? (
            <Pagination
              count={generations?.pageCount}
              page={generations?.pageNumber}
              size="large"
              onChange={(_, value) => setPage(value)}
            />
          ) : null}
          <S.TooltipBox>
            {!location.state?.active && (
              <S.TooltipStyled
                title={
                  <span style={{ fontSize: '1.6rem' }}>
                    Não é possivel adicionar geração a uma unidade inativa
                  </span>
                }
                arrow
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </S.TooltipStyled>
            )}
            <S.ButtonNewGeneration
              disabled={!location.state?.active}
              onClick={() => setOpenAddGenerationModal(true)}
            >
              Nova Geração
            </S.ButtonNewGeneration>
          </S.TooltipBox>
        </S.Wrapper>
      )}
      <AddGenerationModal
        open={openAddGenerationModal}
        setOpen={setOpenAddGenerationModal}
        setUpdateTable={setUpdateTable}
      />
      <UpdateGenerationModal
        id={updateGenerationId}
        open={openUpdateGenerationModal}
        setOpen={setOpenUpdateGenerationModal}
        setUpdateTable={setUpdateTable}
      />
    </>
  );
};

export default ListGenerations;
