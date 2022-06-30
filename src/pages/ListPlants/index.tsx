import { useCallback, useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  AlertProps,
  CardContent,
  CircularProgress,
  InputAdornment,
  Pagination,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useFormik } from 'formik';
import { ReadPlants } from 'models/plants';
import AddPlantModal from 'pages/modals/AddPlant';
import UpdatePlantModal from 'pages/modals/UpdatePlant';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from 'services/api';
import { handleErrorResponse } from 'utils/error-response';
import { notify } from 'utils/toast-notification';
import * as Yup from 'yup';

import * as S from './styles';

const validationSchema = Yup.object({
  filter: Yup.string(),
});

const Cols = [
  { id: 1, name: 'ID' },
  { id: 2, name: 'Apelido' },
  { id: 3, name: 'Local' },
  { id: 4, name: 'Marca' },
  { id: 5, name: 'Modelo' },
  { id: 6, name: 'Status' },
  { id: 7, name: '' },
  { id: 8, name: '' },
];

type ShowAlertProps = AlertProps & {
  message: string;
};

const ListPlants = (): JSX.Element => {
  const [plants, setPlants] = useState<ReadPlants>();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [updatePlantId, setUpdatePlantId] = useState(0);
  const [openAddPlantModal, setOpenAddPlantModal] = useState(false);
  const [openUpdatePlantModal, setOpenUpdatePlantModal] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [alertProps, setAlertProps] = useState<ShowAlertProps>({
    severity: 'success',
    message: '',
  });
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      filter: '',
    },
    validationSchema,
    onSubmit: values => {
      setFilter(values.filter);
    },
  });

  const getPlants = useCallback(async () => {
    setAlertProps({
      severity: 'info',
      message: '',
    });
    const response = await api.get<ReadPlants>(
      `/plant?page=${page}&limit=8&filter=${filter}`,
    );
    setLoading(false);
    !response.data.plants.length &&
      setAlertProps({
        severity: 'info',
        message: 'Nenhuma unidade cadastrada',
      });
    setPlants(response.data);
    setUpdateTable(false);
  }, [page, filter]);

  const removePlant = useCallback(
    async (id: number): Promise<void> => {
      const removeToast = toast.loading('Removendo...');
      try {
        await api.delete<ReadPlants>(`/plant/${id}`);
        notify(removeToast, {
          message: 'Planta removida com sucesso',
          type: 'success',
        });
        getPlants().catch(e =>
          setAlertProps({ severity: 'error', message: handleErrorResponse(e) }),
        );
      } catch (e) {
        notify(removeToast, {
          message: handleErrorResponse(e),
          type: 'error',
        });
      }
    },
    [getPlants],
  );

  const handleEdit = (id: number): void => {
    setUpdatePlantId(id);
    setOpenUpdatePlantModal(true);
  };

  const handleGoToGenerations = (
    id: number,
    plantName: string,
    active: boolean,
  ): void => {
    history.push('/generations', { id, plantName, active });
  };

  useEffect(() => {
    getPlants().catch(e =>
      setAlertProps({ severity: 'error', message: handleErrorResponse(e) }),
    );
  }, [getPlants, page, loading, updateTable]);

  return (
    <>
      {!alertProps.message.length && !plants?.plants.length ? (
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
            <S.TextFieldStyled
              id="filter"
              name="filter"
              InputProps={{
                placeholder: 'Apelido, Local, Marca, Modelo',
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="medium"
              value={formik.values.filter}
              onChange={formik.handleChange}
              error={formik.touched.filter && Boolean(formik.errors.filter)}
              helperText={formik.touched.filter && formik.errors.filter}
            />
            <S.ButtonSearch type="submit" onClick={() => setLoading(true)}>
              {loading ? <CircularProgress color="inherit" /> : 'Pesquisar'}
            </S.ButtonSearch>
          </S.Form>
          {alertProps.message.length ? (
            <S.AlertStyled severity={alertProps.severity}>
              {alertProps.message}
            </S.AlertStyled>
          ) : null}
          {plants?.plants.length ? (
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
                      {plants?.plants.map(plant => (
                        <S.TableRowStyled key={plant.id}>
                          <S.TableCellBodyStyled
                            width={50}
                            onClick={() =>
                              handleGoToGenerations(
                                plant.id,
                                plant.nickname,
                                plant.active,
                              )
                            }
                          >
                            {plant.id.toString().length > 5
                              ? `${plant.id.toString().substring(0, 5)}...`
                              : plant.id.toString()}
                          </S.TableCellBodyStyled>
                          <S.TableCellBodyStyled
                            onClick={() =>
                              handleGoToGenerations(
                                plant.id,
                                plant.nickname,
                                plant.active,
                              )
                            }
                          >
                            {plant.nickname[0].toUpperCase() +
                              plant.nickname.slice(1).toLowerCase()}
                          </S.TableCellBodyStyled>
                          <S.TableCellBodyStyled
                            onClick={() =>
                              handleGoToGenerations(
                                plant.id,
                                plant.nickname,
                                plant.active,
                              )
                            }
                          >
                            {plant.place[0].toUpperCase() +
                              plant.place.slice(1).toLowerCase()}
                          </S.TableCellBodyStyled>
                          <S.TableCellBodyStyled
                            onClick={() =>
                              handleGoToGenerations(
                                plant.id,
                                plant.nickname,
                                plant.active,
                              )
                            }
                          >
                            {plant.brand[0].toUpperCase() +
                              plant.brand.slice(1).toLowerCase()}
                          </S.TableCellBodyStyled>
                          <S.TableCellBodyStyled
                            onClick={() =>
                              handleGoToGenerations(
                                plant.id,
                                plant.nickname,
                                plant.active,
                              )
                            }
                          >
                            {plant.model[0].toUpperCase() +
                              plant.model.slice(1).toLowerCase()}
                          </S.TableCellBodyStyled>
                          <S.TableCellBodyStyled
                            onClick={() =>
                              handleGoToGenerations(
                                plant.id,
                                plant.nickname,
                                plant.active,
                              )
                            }
                          >
                            {plant.active ? 'Ativa' : 'Inativa'}
                          </S.TableCellBodyStyled>
                          <TableCell width={80}>
                            <S.ButtonEdit onClick={() => handleEdit(plant.id)}>
                              Editar
                            </S.ButtonEdit>
                          </TableCell>
                          <TableCell width={110}>
                            <S.ButtonRemove
                              onClick={() => removePlant(plant.id)}
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
                {plants?.plants.map(plant => (
                  <S.CardStyled key={plant.id}>
                    <CardContent
                      onClick={() =>
                        handleGoToGenerations(
                          plant.id,
                          plant.nickname,
                          plant.active,
                        )
                      }
                    >
                      <S.BoxStyled>
                        <Typography variant="h4">Id:</Typography>
                        <Typography variant="h4">{plant.id}</Typography>
                      </S.BoxStyled>
                      <S.BoxStyled>
                        <Typography variant="h4">Apelido:</Typography>
                        <Typography variant="h4">
                          {plant.nickname[0].toUpperCase() +
                            plant.nickname.slice(1).toLowerCase()}
                        </Typography>
                      </S.BoxStyled>
                      <S.BoxStyled>
                        <Typography variant="h4">Local:</Typography>
                        <Typography variant="h4">
                          {plant.place[0].toUpperCase() +
                            plant.place.slice(1).toLowerCase()}
                        </Typography>
                      </S.BoxStyled>
                      <S.BoxStyled>
                        <Typography variant="h4">Marca:</Typography>
                        <Typography variant="h4">
                          {plant.brand[0].toUpperCase() +
                            plant.brand.slice(1).toLowerCase()}
                        </Typography>
                      </S.BoxStyled>
                      <S.BoxStyled>
                        <Typography variant="h4">Modelo:</Typography>
                        <Typography variant="h4">
                          {plant.model[0].toUpperCase() +
                            plant.model.slice(1).toLowerCase()}
                        </Typography>
                      </S.BoxStyled>
                      <S.BoxStyled>
                        <Typography variant="h4">Status:</Typography>
                        <Typography variant="h4">
                          {plant.active ? 'Ativa' : 'Inativa'}
                        </Typography>
                      </S.BoxStyled>
                    </CardContent>
                    <S.CardActionsStyled>
                      <S.ButtonEditStyled onClick={() => handleEdit(plant.id)}>
                        <EditIcon />
                      </S.ButtonEditStyled>
                      <S.ButtonRemoveStyled
                        onClick={() => removePlant(plant.id)}
                      >
                        <DeleteIcon />
                      </S.ButtonRemoveStyled>
                    </S.CardActionsStyled>
                  </S.CardStyled>
                ))}
              </S.ContainerCard>
            </>
          ) : null}
          {plants?.plants.length ? (
            <Pagination
              count={plants?.pageCount}
              page={plants?.pageNumber}
              size="large"
              onChange={(_, value) => setPage(value)}
            />
          ) : null}
          <S.ButtonNewPlant onClick={() => setOpenAddPlantModal(true)}>
            Nova Unidade
          </S.ButtonNewPlant>
        </S.Wrapper>
      )}
      <AddPlantModal
        open={openAddPlantModal}
        setOpen={setOpenAddPlantModal}
        setUpdateTable={setUpdateTable}
      />
      <UpdatePlantModal
        id={updatePlantId}
        open={openUpdatePlantModal}
        setOpen={setOpenUpdatePlantModal}
        setUpdateTable={setUpdateTable}
      />
    </>
  );
};

export default ListPlants;
