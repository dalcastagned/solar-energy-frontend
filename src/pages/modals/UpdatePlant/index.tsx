import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Checkbox, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import api from 'services/api';
import * as Yup from 'yup';

import * as S from './styles';

const validationSchema = Yup.object({
  nickname: Yup.string().required('O apelido é obrigatório'),
  place: Yup.string().required('O local é obrigatório'),
  brand: Yup.string().required('A marca é obrigatória'),
  model: Yup.string().required('O modelo é obrigatório'),
  active: Yup.boolean(),
});

type ModalProps = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
};

type FormProps = {
  nickname: string;
  place: string;
  brand: string;
  model: string;
  active: boolean;
};

const UpdatePlantModal = ({
  id,
  open,
  setOpen,
  setUpdateTable,
}: ModalProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [loadingInputs, setLoadingInputs] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (): void => {
    setOpenAlert(false);
    setOpen(false);
  };

  const handleSubmit = async (values: FormProps): Promise<void> => {
    setLoading(true);
    setLoadingInputs(true);
    try {
      await api.put<FormProps>(`/plant/${id}`, values);
      setUpdateTable(true);
      handleClose();
    } catch (e) {
      setOpenAlert(true);
    }
    setLoading(false);
    setLoadingInputs(false);
  };

  const formik = useFormik({
    initialValues: {
      nickname: '',
      place: '',
      brand: '',
      model: '',
      active: false,
    },
    validationSchema,
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const getPlantInfo = async (): Promise<void> => {
    const response = await api.get<FormProps>(`/plant/${id}`);
    formik.setValues(response.data);
    setLoadingInputs(false);
  };

  useEffect(() => {
    setLoadingInputs(true);
    open && getPlantInfo();
    // eslint-disable-next-line
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <S.Form
        onSubmit={e => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <Typography id="modal-modal-title" variant="h3" component="h2">
          Edição de Unidade Geradora
        </Typography>
        <S.TextFieldStyled
          id="nickname"
          name="nickname"
          size="medium"
          label="Apelido"
          disabled={loadingInputs}
          InputProps={{
            placeholder: 'Painel 1',
          }}
          value={formik.values.nickname}
          onChange={formik.handleChange}
          error={formik.touched.nickname && Boolean(formik.errors.nickname)}
          helperText={formik.touched.nickname && formik.errors.nickname}
        />
        <S.TextFieldStyled
          id="place"
          name="place"
          size="medium"
          label="Local"
          disabled={loadingInputs}
          InputProps={{
            placeholder: 'Rua Alberto 430',
          }}
          value={formik.values.place}
          onChange={formik.handleChange}
          error={formik.touched.place && Boolean(formik.errors.place)}
          helperText={formik.touched.place && formik.errors.place}
        />
        <S.TextFieldStyled
          id="brand"
          name="brand"
          size="medium"
          label="Marca"
          disabled={loadingInputs}
          InputProps={{
            placeholder: 'Resun',
          }}
          value={formik.values.brand}
          onChange={formik.handleChange}
          error={formik.touched.brand && Boolean(formik.errors.brand)}
          helperText={formik.touched.brand && formik.errors.brand}
        />
        <S.TextFieldStyled
          id="model"
          name="model"
          size="medium"
          label="Modelo"
          disabled={loadingInputs}
          InputProps={{
            placeholder: '155W',
          }}
          value={formik.values.model}
          onChange={formik.handleChange}
          error={formik.touched.model && Boolean(formik.errors.model)}
          helperText={formik.touched.model && formik.errors.model}
        />
        <S.Checkbox
          control={
            <Checkbox
              checked={formik.values.active}
              onChange={formik.handleChange}
              disabled={loadingInputs}
              name="active"
              id="active"
            />
          }
          label="Ativa"
        />
        {openAlert && (
          <S.AlertStyled severity="error">
            Erro! Tente novamente mais tarde.
          </S.AlertStyled>
        )}
        <Box
          sx={{
            display: 'flex',
            alignItens: 'center',
            justifyContent: 'right',
            width: '100%',
            gap: '2rem',
          }}
        >
          <S.ButtonStyled variant="contained" type="submit">
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Atualizar'
            )}
          </S.ButtonStyled>
          <S.ButtonStyled
            variant="outlined"
            color="secondary"
            onClick={handleClose}
          >
            Cancelar
          </S.ButtonStyled>
        </Box>
      </S.Form>
    </Modal>
  );
};

export default UpdatePlantModal;
