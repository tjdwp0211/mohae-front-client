import React, { Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import Profile from '../../components/profile/Profile';
import { Btn, Img, PostIt } from '../../components';
import { color, font } from '../../styles';
import Btns from './Btns';
import { Props } from './Container';

// 프로필 이미지, 닉네임, 전공, 로그인 상태(버튼 그려줘야 함),
interface PostWriterProps extends Props {
  close: () => void;
  likeCount: number;
  setLikeCount: Dispatch<SetStateAction<number>>;
}

function PostWriter({ close, data, likeCount, setLikeCount }: PostWriterProps) {
  const datas = data.response.board;

  const userImg =
    datas.userPhotoUrl !== null
      ? `https://mohaeproj.s3.amazonaws.com/${datas.userPhotoUrl}`
      : null;

  const style = css`
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    p {
      color: ${color.dark1};
      &:nth-child(1) {
        ${font.size[14]}
        ${font.weight[700]}
        margin-bottom: 4px;
      }
      &:nth-child(2) {
        ${font.size[14]}
        ${font.weight[400]}
      }
    }
    .btnContainer {
      display: flex;
      justify-content: space-between;
      width: 128px;
    }
    .btnWrap {
      width: 60px;
      height: 60px;
    }
    .imgWrap {
      width: 32px;
      height: 32px;
    }
    .userData {
      display: flex;
      align-items: center;
      > :nth-child(2) {
        margin-left: 16px;
      }
    }
  `;

  return (
    <>
      <div className={cx(style)}>
        <div className='userData'>
          <Profile img={userImg} size={60} smallShadow />
          <div>
            <p>{datas.nickname}</p>
            <p>{datas.majorName}</p>
          </div>
        </div>
        <Btns
          data={data}
          close={close}
          setLikeCount={setLikeCount}
          likeCount={likeCount}
        />
      </div>
    </>
  );
}

export default PostWriter;
