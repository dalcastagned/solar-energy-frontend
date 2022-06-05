import { Dispatch, SetStateAction, useState } from 'react';

import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import api from 'services/api';
import * as Yup from 'yup';

import * as S from './styles';

const validationSchema = Yup.object({
  date: Yup.date().required('A data é obrigatória'),
  generatePower: Yup.string().required('A geração é obrigatória'),
});

type ModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
};

type FormProps = {
  date: Date;
  generatePower: string;
};

const AddGenerationModal = ({
  open,
  setOpen,
  setUpdateTable,
}: ModalProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [loadingInputs, setLoadingInputs] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const location = useLocation();

  const handleClose = (): void => {
    setOpenAlert(false);
    setOpen(false);
  };

  const handleSubmit = async (values: FormProps): Promise<void> => {
    setLoading(true);
    setLoadingInputs(true);
    try {
      await api.post<FormProps>(
        `/plant/${location.state?.id}/generation`,
        values,
      );
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
      date: new Date(),
      generatePower: '',
    },
    validationSchema,
    onSubmit: values => {
      handleSubmit(values).then(() => {
        formik.resetForm();
      });
    },
  });

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
          Cadastro de Geração
        </Typography>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="Data"
            inputFormat="DD/MM/yyyy"
            value={formik.values.date}
            onChange={value => {
              formik.setFieldValue('date', value);
            }}
            disabled={loadingInputs}
            renderInput={params => (
              <S.TextFieldStyled
                {...params}
                error={formik.touched.date && Boolean(formik.errors.date)}
              />
            )}
          />
        </LocalizationProvider>
        <S.TextFieldStyled
          id="generatePower"
          name="generatePower"
          size="medium"
          label="Geração (kW)"
          disabled={loadingInputs}
          InputProps={{
            placeholder: '150',
          }}
          value={formik.values.generatePower}
          onChange={formik.handleChange}
          error={
            formik.touched.generatePower && Boolean(formik.errors.generatePower)
          }
          helperText={
            formik.touched.generatePower && formik.errors.generatePower
          }
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
              'Cadastrar'
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

export default AddGenerationModal;
