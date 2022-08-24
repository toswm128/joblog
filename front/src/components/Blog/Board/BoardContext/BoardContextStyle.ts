import styled from "@emotion/styled";
import { basicColor, DisabledColor } from "style/color";

export const BoardContextContainer = styled.div`
  width: 100%;
  font-size: 1.125rem;
  white-space: pre-line;
`;

export const BoardContextDivTag = styled.div`
  width: 100%;
  font-size: 1.125rem;
  padding: 6px 2px;
`;

export const BoardContextUlTag = styled.ul`
  margin: 0;
`;

export const BoardContextImgTag = styled.img`
  margin: 0;
`;

export const BoardContextH1Tag = styled.h1`
  margin: 0;
`;
export const BoardContextH2Tag = styled.h2`
  margin: 0;
`;
export const BoardContextH3Tag = styled.h3`
  margin: 0;
`;
export const BoardContextATag = styled.a`
  margin: 0;
  color: ${DisabledColor};
`;
export const BoardContextCallOutTag = styled.div`
  padding: 24px 12px;
  background-color: ${basicColor};
  border-radius: 4px;
  align-items: center;
`;
