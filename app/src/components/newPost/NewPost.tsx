/** @format */

import { color, radius, font, shadow } from '../../styles';
import { css, cx } from '@emotion/css';
import Img from '../img/Img';
import MarkBox from '../markbox/MarkBox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/root';
import { Link } from 'react-router-dom';

interface Props {
  [key: string]: any;
}

export default function NewPost({ page, board }: Props) {
  const text: { [key: string]: any } = {
    isOver: 'DAY',
  };
  const check: { [key: string]: any } = {
    inMain: {
      size: '208',
      fontSize: '14',
      titleSize: '24',
    },
    inBoard: {
      size: '152',
      fontSize: '12',
      padding: css`
        padding: 8px 12px;
      `,
      maxUser: css`
        max-width: 152px;
      `,
    },
    inSpec: {
      size: '120',
      fontSize: '14',
      padding: css`
        padding: 16px;
      `,
      maxUser: css`
        max-width: 196px;
      `,
    },
    inReview: {
      size: '97',
      fontSize: '12',
      padding: css`
        padding: 8px;
      `,
      maxUser: css`
        max-width: 157px;
        * {
          height: 17px;
        }
      `,
      mark: css`
        top: 8px;
        right: 8px;
      `,
    },
  };

  const style = css`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: visible;
    ${shadow.normal};
    ${radius[6]};
    /* overflow: hidden; */
    border-radius: 6px;

    > .mark-box {
      position: absolute;
      top: 16px;
      right: 16px;
      ${check[page].mark};
    }

    > .img {
      width: 100%;
      height: ${`${check[page].size}px`};
      background-color: white;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      & > * {
        transition: 0.3s all ease-in-out;
        transform: scale(1);
      }
      > .logo {
        width: 60px;
        height: 45px;
      }

      :hover {
        & > * {
          transition: 0.3s all ease-in-out;
          transform: scale(1.2);
        }
      }
    }

    .info {
      ${shadow.normal}
      height: ${`calc(100% - ${check[page].size}px)`};
      padding: 14px 16px;
      ${check[page].padding}
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      position: relative;
      overflow: hidden;
      > .sub-info {
        padding: 14px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: -76px;
        transition: 0.3s ease-in-out all;
        * {
          ${font.weight[700]};
        }
        > .area {
          font-size: 14px;
        }
        > .day {
          font-size: 16px;
          color: ${`${board.decimalDay === null ? color.main : color.dark1}`};
        }
      }
      :hover {
        > .sub-info {
          transition: 0.3s ease-in-out all;
          transform: translateY(-76px);
          background-color: white;
        }
      }

      * {
        font-size: ${`${check[page].fontSize}px`} !important;
        line-height: 170%;
      }

      .user {
        width: 168px;
        ${check[page].maxUser}
        height: fit-content;
        * {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .title {
          font-size: ${`${check[page].fontSize}px`} !important;
          height: ${`${check[page].titleSize}px`};
          ${font.weight[700]}
          max-width: 168px;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .price {
        width: 90px;
        height: 27px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        > * {
          font-size: ${`${Number(check[page].fontSize) + 2}px`} !important;
          ${font.weight[700]}
        }
        .won {
          font-size: ${`${check[page].fontSize}px`} !important;
          ${font.weight[400]}
          margin-left: 2px;
        }
      }
    }
  `;

  const info = (page === 'inMain' || page === 'inBoard') && (
    <div className={'writer'}>{board && board.userNickname}</div>
  );

  const price = (page === 'inMain' || page === 'inBoard') && (
    <div className={'price '}>
      <div>{board && board.price}</div>
      <div className={'won'}>{'원'}</div>
    </div>
  );

  const markBox =
    page === 'inMain' || page === 'inBoard' ? (
      <MarkBox
        shape={(board && board.target) || 1}
        state={(board && board.isDeadline) || 1}
        big
        hover
      />
    ) : (
      <MarkBox
        big
        shape={(board && board.target) || 0}
        state={(board && board.isDeadline) || 1}
      />
    );

  return (
    <Link to={`post/${board.no}`} className={cx(style)}>
      <div className={'img'}>
        {board.boardPhotoUrl ? (
          <Img src={`${board && board.boardPhotoUrl}`} />
        ) : (
          <div className={'logo'}>
            <Img src={'/img/logo.png'} />
          </div>
        )}
      </div>
      <div className={'info'}>
        <div className={'user'}>
          <div className={'title'}>{board && board.title}</div>
          {info}
        </div>
        {price}
        <div className={'sub-info'}>
          <div className={'area'}> {board.areaName}</div>
          <div className={'day'}>{`D - ${
            board.decimalDay || text.isOver
          }`}</div>
        </div>
      </div>
      <div className={'mark-box'}>{markBox}</div>
    </Link>
  );
}
