import { RxArrowRight } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

import * as S from './index.styles';

import { requestLogout } from '@/apis/request/auth';
import { CLIENT_MESSAGE } from '@/constants/message';
import { BROWSER_PATH, KAKAO_REDIRECT_URI } from '@/constants/path';
import { ANIMATION_TIME } from '@/constants/time';
import useError from '@/hooks/useError';
import useSnackbar from '@/hooks/useSnackbar';
import useUser from '@/hooks/useUser';
import { getKakaoAuthUri } from '@/utils/kakao';

const Slider = ({ isClosing, closeSlider, showSearchModal }) => {
  const { isLogin, logout } = useUser();

  const { showSnackbar } = useSnackbar();
  const handleError = useError();

  const navigate = useNavigate();

  const goToOtherPage = path => () => {
    closeSlider();
    navigate(path);
  };

  const preventBubbling = e => {
    e.stopPropagation();
  };

  const confirmLogout = () => {
    if (!window.confirm(CLIENT_MESSAGE.GUIDE.CONFIRM_LOGOUT)) return;

    requestLogout()
      .then(() => {
        logout();
        showSnackbar(CLIENT_MESSAGE.GUIDE.SUCCESS_LOGOUT);
        closeSlider();
      })
      .catch(error => {
        alert(handleError(error.response.data.code));
      });
  };

  return (
    <S.Dimmer onClick={closeSlider}>
      <S.Slider
        onClick={preventBubbling}
        className={isClosing ? 'close' : ''}
        animationTime={ANIMATION_TIME.SLIDER}
      >
        <S.ArrowButton type="button" onClick={closeSlider}>
          <RxArrowRight />
        </S.ArrowButton>
        <S.List>
          <li>
            <a href={BROWSER_PATH.BASE}>
              <S.MenuButton type="button">홈</S.MenuButton>
            </a>
          </li>
          {isLogin ? (
            <>
              <li onClick={showSearchModal}>
                <S.MenuButton type="button">검색</S.MenuButton>
              </li>
              <li onClick={goToOtherPage(BROWSER_PATH.NEW)}>
                <S.MenuButton type="button">일기 쓰기</S.MenuButton>
              </li>
              <li onClick={goToOtherPage(BROWSER_PATH.CALENDAR)}>
                <S.MenuButton type="button">캘린더</S.MenuButton>
              </li>
              <li onClick={goToOtherPage(BROWSER_PATH.MYPAGE.BASE)}>
                <S.MenuButton type="button">마이페이지</S.MenuButton>
              </li>
              <li>
                <S.MenuButton type="button" onClick={confirmLogout}>
                  로그아웃
                </S.MenuButton>
              </li>
            </>
          ) : (
            <li>
              <a href={getKakaoAuthUri(KAKAO_REDIRECT_URI)}>
                <S.MenuButton type="button">로그인</S.MenuButton>
              </a>
            </li>
          )}
        </S.List>
      </S.Slider>
    </S.Dimmer>
  );
};

export default Slider;
