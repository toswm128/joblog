import styled from "@emotion/styled";
import { DisabledColor } from "style/color";

export const H1 = styled.h1`
  margin: 0;
  & > div > textarea {
    font-size: 2rem !important;
    font-weight: bold;
  }
`;
export const H2 = styled.h2`
  margin: 0;
  & > div > textarea {
    font-size: 1.5rem !important;
    font-weight: bold;
  }
`;
export const H3 = styled.h3`
  margin: 0;
  & > div > textarea {
    font-size: 1.17rem !important;
    font-weight: bold;
  }
`;
export const A = styled.a`
  margin: 0;
  & > div > textarea {
    color: ${DisabledColor};
    text-decoration: underline;
  }
`;
export const Code = styled.div`
  margin: 0;
  & > div > textarea {
    position: absolute;
    left: 10px;
    z-index: -10;
    opacity: 0;
  }
`;
export const Img = styled.img`
  margin: 0;
  max-width: 100%;
  object-fit: cover;
`;
