/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../styles';
import {
  Img,
  Poster,
  NewPost,
  Box,
  Profile,
  FocusBar,
  Category,
  BasicModal,
  MarkBox,
  Btn,
  OrderedImg,
} from '../../components';

export default function Spec() {
  const style = css`
    width: 100%;
    height: 100%;
    ${radius[24]};
    padding: 48px 84px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > .title {
      font-size: 28px;
      height: 36px;
      ${font.weight[700]};
      color: ${color.dark1};
      line-height: 130%;
    }
    > .wrapper {
      display: flex;
      justify-content: space-between;
      .box {
        width: 100%;
        height: 100%;
        padding: 8px;
      }
      .texts {
        > * {
          margin: 8px;
        }
        > .description {
          width: 288px;
          height: 316px;
          /* overflow: scroll; */
        }
        > .footer {
          .complete {
            width: 74px;
            height: 43px;
          }
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  `;

  const contents = (
    <div className={cx(style)}>
      <div className={'title'}>{'스펙 등록하기'}</div>
      <div className={'wrapper'}>
        <Box size={[600, 470]}>
          <div className={'box'}>
            <OrderedImg
              edit
              imgs={[
                'img/camera.png',
                'img/edit.png',
                'img/filter.png',
                'img/heart-main.png',
                'img/study.png',
                'img/send.png',
                'img/star-unfilled.png',
              ]}
            />
          </div>
        </Box>
        <Box size={[336, 470]}>
          <div className={'box texts'}>
            <div className={'title'}>{'제목입니다~'}</div>
            <div>
              <FocusBar light thin />
            </div>
            <div className={'description'}>
              {
                '가나다라마바사아자차카타파하~가나다라마바사아자차카타파하~가나다라마바사아자차카타파하~가나다라마바사아자차카타파하~'
              }
            </div>
            <div className={'footer'}>
              <div className={'number'}>
                <span>{'?'}</span>
                <span>{'/300'}</span>
              </div>
              <div className={'complete'}>
                <Btn main>{'완료'}</Btn>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );

  return (
    <BasicModal big visible={true}>
      {contents}
    </BasicModal>
  );
}
