import styled from 'styled-components';

export const Banner = styled.div`
  width: 100%;
  position: fixed;
  bottom: -100%; left: 0; right: 0;
  z-index: 999;
  transition: all .6s ease;
  background: #5738FF;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 20px;

  &.show {
    bottom: 0;
  }
`;

export const BannerLeft = styled.div`
  p {
    font: normal normal normal 20px/26px Avenir;
    letter-spacing: 0px;
    color: #fff;
    margin: 0;
    padding: 0;
  }
`;

export const BannerRight = styled.div`
  margin-left: auto;
`;