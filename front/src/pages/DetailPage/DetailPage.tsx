import React from "react";
import Header from "components/header";
import { DetailPageContainer, DetailPageContent } from "./DetailPageStyle";
import heart from "assets/png/heart.png";
import Comment from "components/Comment";

const DetailPage = () => {
  return (
    <>
      <Header />
      <DetailPageContainer>
        <img
          className="banner"
          src="https://4.bp.blogspot.com/-Q4xvnaN8nRA/XQSar7IrP4I/AAAAAAAABFM/4snWrZNx_18pgJKIJJHczXMIPtpfCznpACLcBGAs/s1600/fromis-20190614-224241-001.jpg"
          alt=""
        />
        <DetailPageContent>
          <div className="title">제에에에에목</div>
          <div className="info">
            <div className="profil">
              <img
                className="profilImg"
                src="https://thumbs.gfycat.com/UnluckyQualifiedArabianwildcat-size_restricted.gif"
                alt=""
              />
              <p>2022.02.03</p>
            </div>
            <img src={heart} alt="" />
          </div>
          <div className="content">
            <div>
              <p>
                진행하는 프로젝트에서 웹 에디터 기능을 구현해야 했다.
                <br />
                필수로 구현해야 하는 항목은 다음과 같았다.
              </p>
              <blockquote>
                <ul>
                  <li>
                    유저가 원하는 부분을 드래그하여 블럭으로 만들 수 있어야
                    한다.
                  </li>
                  <li>기본적인 복사/붙여넣기가 가능해야 한다.</li>
                  <li>
                    줄바꿈/삭제 시 키보드의 커서(caret)가 자연스럽게 focus되어야
                    한다.
                  </li>
                  <li>블럭의 추가/삭제가 가능해야 한다.</li>
                  <li>
                    블럭간의 drag&amp;drop으로 순서를 변경하는 것이 가능해야
                    한다.
                  </li>
                </ul>
              </blockquote>
              <p>우선 완성된 에디터는 다음과 같다.</p>
              <p>
                <img src="https://media.vlpt.us/images/n0wkim/post/dbccf711-e5ad-41a0-be42-419080221024/editor_velog.gif" />
              </p>
              <h2 id="메인-아이디어">메인 아이디어</h2>
              <p>
                일반적인 웹 에디터로 가장 먼저 <strong>markdown editor</strong>
                를 떠올렸는데, 이 방법은 진행하는 프로젝트와 맞지 않는 부분들이
                많았다.
              </p>
              <p>
                첫째로, 사용자가 마크다운 문법과 친숙하지 않을 수 있다는 우려가
                있었다.
                <br />
                둘째로, '블럭' 단위로 컴포넌트를 관리해야 하는데, 이 부분을
                구현하기 쉽지 않을 것 같다고 느꼈다.
                <br />
                그래서 과감하게 버리고, <strong>contenteditable</strong> 속성을
                이용하기로 결정하였다.
              </p>
              <p>
                또한, 백엔드와 data를 주고받을때에도 content의 내용을 배열
                형태로 주고받는 것이 좋을 것 같았기 때문에 contenteditable을
                이용하여 개발을 진행하기로 결정하였다.
              </p>
              <p>
                <em>다음과 같은 형태로 content의 내용을 주고받게 된다.</em>
                <br />
                <img src="https://media.vlpt.us/images/n0wkim/post/787b3175-db96-4891-9d04-32a71b9b6284/datatype.png" />
              </p>
              <p>
                유저는 다음과 같은 화면을 보게 된다.
                <br />
                <img src="https://media.vlpt.us/images/n0wkim/post/885b17a7-c1df-4602-b86a-73413d9cb058/user_editor.png" />
              </p>
              <h2 id="라이브러리-선택">라이브러리 선택</h2>
              <p>
                라이브러리를 사용하지 않고 <code>useRef</code>를 통해{" "}
                <code>html</code>을 직접 수정할까 하는 생각도 했었지만, 단기간에
                결과를 보여주어야 하는 프로젝트이기 때문에 시간을 절약하기 위해
                좋은 라이브러리가 있는지 검색해보았다.
              </p>
              <p>후보가 된 라이브러리는 두 가지였다.</p>
              <blockquote>
                <ul>
                  <li>
                    <code>react-contenteditable</code>
                  </li>
                  <li>
                    <code>react-editor-js</code>
                  </li>
                </ul>
              </blockquote>
              <p>
                이 중에서 <code>react-contenteditable</code>을 사용했다.
                <br />
                <a href="https://www.npmjs.com/package/react-contenteditable">
                  react-contenteditable
                </a>
              </p>
              <p>
                <code>react-editor-js</code>는 이미 웹 에디터로 사용 가능할
                정도로 구현이 되어있는데, 세부적인 부분들까지 custom하기
                어렵다고 판단했다. 또한 불필요한 기능들까지도 구현이 되어 있어서
                무겁다고 느껴졌다.
                <br />
                반면, <code>react-contenteditable</code> 과 같은 경우에는 단순히{" "}
                <code>contentEditable</code> 속성만을 가지고 있고, 자유도가
                높아서 원하는 디자인, 기능을 구현할 수 있다고 판단하였다.
              </p>
              <h2 id="기본-구조">기본 구조</h2>
              <p>
                블럭 단위의 기본 구조는 다음과 같다.
                <br />
                배열로 <code>state</code> 관리를 하였고, map을 통해 블럭을
                세팅해 주었다.
                <br />
                <code>EditableBlock</code> 컴포넌트 내에서 위에서 언급한
                라이브러리를 사용한다.
              </p>
              <p>
                <img src="https://media.vlpt.us/images/n0wkim/post/5b9834b6-ab60-421f-b0f7-1ddc2c6b7908/basic.png" />
              </p>
              <p>
                <code>EditableBlock</code>에서의 여러 이벤트들은 prop으로 받은{" "}
                <code>handler</code>를 통해 부모 컴포넌트로 넘겨주고, 부모
                컴포넌트에서 이벤트에 대한 결과로 <code>state</code> 변화를
                만든다. 이때, <code>state</code>의 변화가 있기 때문에{" "}
                <code>child component</code>의 렌더링이 일어나게 된다. (기본적인
                리액트의 하위 컴포넌트로 state를 전달하는 로직과 동일하다.)
              </p>
              <p>
                그리고 추가로 <code>createRef()</code> 를 필연적으로 사용할 수
                밖에 없었는데, 붙여넣기를 하거나, 드래그를 할 때, caret 위치를
                계산하거나 할 때 직접 DOM에 접근해야 했기 때문이다.{" "}
                <em>
                  함수형일 경우 <code>useRef()</code>를 사용하면 된다.
                </em>
              </p>
              <h2 id="여러-문제점들">여러 문제점들</h2>
              <p>
                우선 가장 기본적으로 <code>onChange</code>일 경우 내부{" "}
                <code>text</code>를 현재 상태로 계속 업데이트해주면 되기 때문에
                어려움이 없었다.{" "}
              </p>
              <p>
                사실 내부 텍스트가 프로젝트 특성상 <code>&lt;p&gt;</code>태그
                말고 없기 때문에 쉽게 구현할 수 있을 것이라고 생각했는데, 문제는
                생각했던 것보다 정말 많이 존재했다.
              </p>
              <h3 id="붙여넣기-할-경우">붙여넣기 할 경우</h3>
              <p>
                개발한 에디터에 텍스트를 어딘가에서 복사해서 붙여넣기할 경우{" "}
                <code>html</code>의 태그들이 그대로 적용되어 들어가게 되는
                오류가 존재했다. 우리 서비스에서 제공할 계획이 없는 볼드체나,
                링크가 걸려있는 경우, <code>&lt;h1&gt;</code>과 같은 여러
                태그들이 다 적용되어 들어갔다.
              </p>
              <p>
                그러나 우리가 원하는 것은 plain text이기 때문에 유저가
                붙여넣기를 시도할 경우에 이벤트 핸들러를 따로 만들게 되었다.
              </p>
              <p>
                <img src="https://media.vlpt.us/images/n0wkim/post/437a268e-ecd3-4960-b0ff-e48754f7a398/paste.png" />
              </p>
              <h3 id="새로운-블럭을-만들거나-제거할-경우">
                새로운 블럭을 만들거나 제거할 경우
              </h3>
              <p>
                새로운 블럭을 만들 때 키보드 커서(caret)이 자연스럽게 다음
                블럭으로 focus되어야 하며, 제거할 경우 역시 마찬가지로 이전
                블럭으로 focus되어야 한다. 이를 위해 caret의 위치를 가져올
                필요가 있는데, 글자수대로 처음과 끝의 위치 index를 가져올 수
                있다.
              </p>
              <p>
                사실 이 부분은 예시 코드도 많고 딱히 내가 작성할 필요가 없는
                부분이었는데, 문제는 이 다음이었다.{" "}
                <strong>
                  실제로 화면에 보이는 text와, state에 들어있는 html값은 서로
                  달랐다.
                </strong>
              </p>
              <p>
                <img src="https://media.vlpt.us/images/n0wkim/post/a8a45807-c955-4228-ac9c-2c8843fe98b8/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-09%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.27.40.png" />
              </p>
              <p>
                <em>
                  아, 참고로 <code>state</code>는 chrome extension에서 "react
                  developer tool"을 설치하면 볼 수 있다.
                </em>
              </p>
              <p>
                이 문제점 때문에 드래그하여 원하는 영역만큼 블럭을 지정할 때, 그
                사이에 태그가 존재할 경우 시작 index와 끝 index를 가져오기가
                쉽지 않았다.
              </p>
              <p>이 문제를 해결하기 위해 생각한 알고리즘은 다음과 같다.</p>
              <blockquote>
                <ul>
                  <li>
                    원하는 영역만큼의 <code>index</code>는 동일하게 그대로
                    가져온다.
                  </li>
                  <li>
                    html state의 처음부터 끝까지 불필요한 태그만큼 index를
                    옮긴다.
                    <ul>
                      <li>
                        시작점 전까지 태그가 있다면 시작점과 종료점 둘 다 태그
                        길이만큼 +
                      </li>
                      <li>시작점을 찾은 후부터는 종료점 index만 +한다.</li>
                    </ul>
                  </li>
                </ul>
              </blockquote>
              <p>
                그러나 이 문제를 완벽하게 해결하지 못했는데, 그이유는 여러 가지
                예외 조건들이 있었는데, 대표적으로 줄바꿈의 시작점부터 영역을
                지정하는 것이 아닌 중간에서 영역을 지정하게 되는 경우이다.
              </p>
              <p>
                <img src="https://media.vlpt.us/images/n0wkim/post/e7c11bb2-721a-4a42-901f-1b8cb1451730/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-09%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.42.46.png" />
              </p>
              <p>
                위와 같은 상황에서 <code>html</code> 은{" "}
                <code>
                  1234&lt;div&gt;5678&lt;/div&gt;&lt;div&gt;aaaa&lt;/div&gt;
                </code>{" "}
                로 나오게 되는데, 해당 부분을 블럭으로 지정하게 되면
                <br />
                <code>12</code> , <code>34&lt;div&gt;56&lt;div/&gt;</code> ,{" "}
                <code>78&lt;div&gt;aaaa&lt;/div&gt;</code> 이렇게 세 개로
                나누어야 한다. 이 부분을 구현하는 것이 생각보다 어려워서 편볍을
                사용하게 되었다.
              </p>
              <blockquote>
                <ul>
                  <li>
                    블럭으로 쪼개기 전에 정규식을 이용하여 내부의 태그를 전부
                    제거하여 plain text만 가져온다.
                  </li>
                  <li>
                    해당 text에서 시작점과 끝점 index를 리턴하여 블럭을 만든다.
                  </li>
                </ul>
              </blockquote>
              <p>
                이런 로직을 사용하게 되어{" "}
                <strong>이전에 존재하던 줄바꿈은 전부 사라지게 되지만</strong>,
                그래도 어쩔 수 없었다....ㅠㅠ
              </p>
              <h3 id="키보드커서-caret을-자동으로-focus하기">
                키보드커서 (caret)을 자동으로 focus하기
              </h3>
              <p>
                이 부분이 만들면서 가장 재미있었는데, 어떤 시점에 함수를
                호출해야 하는지 정하는 것이 재미있었던 것 같다. 나는{" "}
                <code>useEffect()</code>를 이용하여 구현하였는데, deps로{" "}
                <code>block.length</code>를 넣어 주어 블럭이 새로 생기거나
                제거될 경우 키보드의 커서를 focus하는 이벤트가 일어나도록
                하였다.
              </p>
              <p>
                블럭을 만드는 경우와 제거하는 경우는 <code>command</code>로
                구분하였는데, 앞서 <code>props</code>로 넘겨준{" "}
                <code>add, delete handler</code> 를 실행할 경우 command에 최근에
                어떤 이벤트가 일어났는지 저장하게 된다. 이를 분기로 삼아 focus를
                앞으로 할지, 뒤로 할지 결정하게 된다.
              </p>
              <p>
                <img src="https://media.vlpt.us/images/n0wkim/post/02dd755a-269b-4967-9944-bd600e785986/carbon.png" />
              </p>
              <h2 id="많은-도움이-되었던-문서들">많은 도움이 되었던 문서들</h2>
              <p>
                <a href="https://www.npmjs.com/package/react-contenteditable">
                  react-contenteditable document
                </a>{" "}
                - 만약 이 라이브러리를 사용할 계획이라면{" "}
                <strong>중반부에 Known Issues를 꼭 읽어보세요..!</strong>
              </p>
              <p>
                <a href="https://www.bucketplace.co.kr/post/2020-09-18-%EC%9B%90%ED%99%9C%ED%95%9C-%EC%BD%98%ED%85%90%EC%B8%A0-%EC%9E%91%EC%84%B1%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%97%90%EB%94%94%ED%84%B0-%EA%B0%9C%EB%B0%9C%EA%B8%B0/">
                  오늘의집 기술문서
                </a>{" "}
                - 마무리할 즈음 알게 되어서 많은 참고를 하지 못했지만 아이디어를
                배울 수 있었습니다.
              </p>
              <p>
                <a href="https://medium.com/swlh/how-to-build-a-text-editor-like-notion-c510aedfdfcc">
                  notion-clone
                </a>{" "}
                - notion clone을 목표로 웹 에디터를 만드는 과정에 대해 상세하게
                작성된 글입니다. 코드의 상당수를 참고하였고, 아이디어 또한 많이
                배웠습니다.
              </p>
              <p>
                <a href="https://blog.logrocket.com/building-inline-editable-ui-in-react/">
                  building-inline-editable-ui-in-react
                </a>{" "}
                - 역시 좋은 아이디어와 뼈대에 대한 힌트를 얻을 수 있었습니다.
              </p>
              <h2 id="결과물">결과물</h2>
              <p>
                <a href="https://mailedit.me/workspace">에디터페이지</a> -
                프로젝트의 에디터 페이지입니다. 1920-1440 size에 최적화되어있기
                때문에 크게 느껴질 수 있습니다.
              </p>
              <p>
                <a href="https://github.com/Team-MailedIt/mailedit-client">
                  깃헙 레포
                </a>{" "}
                - 전체 프로젝트에 대한 레포입니다.
              </p>
            </div>
          </div>
          <Comment />
        </DetailPageContent>
      </DetailPageContainer>
    </>
  );
};

export default DetailPage;
