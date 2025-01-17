import React, { useState, Dispatch, SetStateAction } from 'react';
import { css, cx } from '@emotion/css';
import { color, font, radius } from '../../styles';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Props } from './Container';
import { Btn, Popup } from '../../components';
import PostWriter from './PostWriter';

// target, 카테고리, 제목, d-day, 지역, 작성자여부, 좋아요, 조회수, 가격
interface PostInfoProps extends Props {
  quickMenu?: boolean;
  close: () => void;
  likeCount: number;
  setLikeCount: Dispatch<SetStateAction<number>>;
}

function PostInfo(props: PostInfoProps) {
  const { quickMenu, data, close, likeCount, setLikeCount } = props;
  const datas = data.response.board;
  const { no } = useParams();
  const [popupView, setPopupView] = useState(false);

  const showDDAYContent = () => {
    if (!datas.isDeadline) {
      if (datas.decimalDay !== null) {
        return css`
          background-color: ${color.subtle};
          color: ${color.main};
          content: 'D ${datas.decimalDay}';
        `;
      }
      return css`
        background-color: ${color.main};
        color: white;
        content: '상시';
      `;
    } else {
      return css`
        background-color: ${color.dark1};
        color: white;
        content: '마감';
      `;
    }
  };

  const wrap = css`
    border-bottom: ${!quickMenu && ` 1px solid ${color.light4}`};
    width: ${!quickMenu && '736px'};
    display: flex;
    justify-content: space-between;
    color: ${color.dark1};
    ${font.weight[400]}
    .popup-btn {
      width: 74px;
      height: 43px;
    }

    .sectionWrap-1 {
      display: flex;
      flex-direction: column;
      height: 154px;
      .title {
        display: flex;
        align-items: center;
        ${font.weight[700]}
        ${font.size[24]}
        :after {
          width: 47px;
          height: 24px;
          ${showDDAYContent()}
          ${font.size[14]}
          ${font.weight[400]}
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2px 0px 0px 16px;
        }
      }
      .price {
        margin-bottom: 16px;
        ${font.size[24]}
        ${font.weight[700]}
            :after {
          ${font.size[22]}
          ${font.weight[400]}
        }
        :after {
          content: '${datas.price ? '원' : ''}';
          margin: 0px 0px 0px 4px;
        }
      }
    }

    .sectionWrap-2 {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      ${font.size[12]}

      div:nth-child(1) {
        display: flex;
        justify-content: end;
        margin-top: 4px;
        cursor: pointer;
        visibility: ${data.decoded && data.decoded.userNo === datas.userNo
          ? 'visible'
          : 'hidden'};
        p:nth-child(1) {
          margin-right: 8px;
          padding-right: 8px;
          border-right: 1px solid ${color.light4};
        }
      }
      div:nth-child(2) {
        display: flex;
        p:nth-child(1) {
          margin-right: 16px;
        }
      }
    }
  `;

  const showPopup = () => {
    return (
      popupView && (
        <Popup
          visible={popupView}
          text1={'정말 삭제 하시겠습니까? '}
          text2={'삭제 시 게시판으로 이동합니다.'}
        >
          <div className='popup-btn'>
            <Btn white onClick={() => setPopupView(false)}>
              닫기
            </Btn>
          </div>
          <div className='popup-btn'>
            <Link to={'/boards/category/17?take=12&page=1'}>
              <Btn main onClick={deletePost}>
                삭제하기
              </Btn>
            </Link>
          </div>
        </Popup>
      )
    );
  };

  const deletePost = () => {
    axios
      .delete(`https://mo-hae.site/boards/${no}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className={cx(wrap)}>
        <div className='sectionWrap-1'>
          {showPopup()}
          <div>
            <p className='coordinates'>
              {datas.target ? '구할래요' : '해줄래요'} {'>'} 카테고리 {'>'}{' '}
              {datas.categoryName}
            </p>
            <p className='title'>{datas.title}</p>
            <p className='area'>
              {datas.areaName ? datas.areaName : '지역 선택 없음'}
            </p>
          </div>
          <p className='price'>
            {datas.price ? datas.price.toLocaleString() : '무료'}
          </p>
        </div>
        <div className='sectionWrap-2'>
          <div className='textBtnWrap'>
            <Link to={`/edit/${datas.no}`}>
              <p>수정하기</p>
            </Link>
            <p onClick={() => setPopupView(true)}>삭제하기</p>
          </div>
          <div className='textBtnWrap'>
            <p>좋아요 {likeCount}개</p>
            <p>조회수 {datas.hit}회</p>
          </div>
        </div>
      </div>
      <PostWriter
        close={close}
        data={data}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
      />
    </>
  );
}

export default PostInfo;
