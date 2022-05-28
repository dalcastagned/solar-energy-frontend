import * as S from './styles';

const NotFound = (): JSX.Element => (
  <S.Wrapper>
    <S.Bot src="/img/bot.svg" alt="" />
    <S.TitleCode>Oops! Página não encontrada</S.TitleCode>
    <S.DetailsCode>
      A página que você está tentando acessar não existe ou foi movida.
    </S.DetailsCode>
    <S.DetailsCode>Tente voltar para a nossa página inicial</S.DetailsCode>
    <S.ReturnButton variant="contained" href="/">
      Ir para página inicial
    </S.ReturnButton>
  </S.Wrapper>
);

export default NotFound;
